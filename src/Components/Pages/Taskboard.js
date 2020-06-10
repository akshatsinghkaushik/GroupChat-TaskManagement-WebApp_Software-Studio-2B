import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Taskboard.scss";
import TaskColumn from "../Presentational/TaskColumn/TaskColumn";
import NewTaskColumn from "../Presentational/NewTaskColumn/NewTaskColumn";
import TaskboardNavbar from "../Presentational/TaskboardNavbar/TaskboardNavbar";
import { db } from "../../services/firebase";
import { readUrlQueryParam, isEmptyObj } from "../../helpers/utils";
import { Typography } from "@material-ui/core";
import { auth } from "../../services/firebase";

const Taskboard = () => {
  const [taskboardData, setTaskboardData] = React.useState({});
  const [isBoardLoaded, setIsBoardLoaded] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [readError, setReadError] = React.useState(false); // TODO: use this
  const [user, setUser] = React.useState(null);
  const groupId = localStorage.getItem("groupId");

  useEffect(() => {
    const boardId = readUrlQueryParam("id");
    try {
      db.ref(`/taskboards/${groupId}/${boardId}`).on("value", (snapshot) => {
        const result = snapshot.val();
        if (!result) {
          setTaskboardData({});
          setIsBoardLoaded(true);
          return;
        }
        setTaskboardData({
          id: snapshot.key,
          ...result,
        });
        setIsBoardLoaded(true);
      });
    } catch (err) {
      console.log("An error occurred when getting taskboard data", err);
      setTaskboardData({});
      setIsBoardLoaded(true);
    }

    return () => db.ref(`/taskboards/${groupId}/${boardId}`).off("value");
  }, [groupId]);

  useEffect(() => {
    if (isEmptyObj(taskboardData)) return;
    setUser(auth().currentUser);
    try {
      db.ref(`columns/${taskboardData.id}`).on("value", (snapshot) => {
        const tmpCols = [];
        snapshot.forEach((col) => {
          const val = col.val();
          if (val.deletedTimestamp) return; // Don't display deleted columns
          tmpCols.push({
            id: col.key,
            ...val,
          });
        });
        setColumns(tmpCols);
        setReadError(false);
      });
    } catch (err) {
      setReadError(true);
      console.error(`An error occurred when reading data... ${err.message}`); // TODO: Dont use an alert, do this properly...
    }
    return () => db.ref(`columns/${taskboardData.id}`).off("value");
  }, [taskboardData]);

  console.log("Readerror is ", readError); // Just keeping this here until we look at using readError
  if (isBoardLoaded && isEmptyObj(taskboardData)) {
    return (
      <div className="taskboard-error-lockup">
        <Typography variant="h5">Taskboard does not exist</Typography>
        <Link to="chat">Go back to Home Page</Link>
      </div>
    );
  }
  return (
    <div id="taskboard-container">
      <TaskboardNavbar groupId={groupId} taskboard={taskboardData} />
      <div className="taskboard-canvas">
        {isBoardLoaded ? (
          <div className="taskboard">
            {columns.map((column) => {
              return (
                <TaskColumn
                  key={column.id}
                  boardId={taskboardData.id}
                  column={column}
                  user={user}
                  onDragOver={(e) => e.preventDefault()}
                />
              );
            })}
            <NewTaskColumn boardId={taskboardData.id} />
          </div>
        ) : (
          <div className="loading-lockup">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Taskboard;
