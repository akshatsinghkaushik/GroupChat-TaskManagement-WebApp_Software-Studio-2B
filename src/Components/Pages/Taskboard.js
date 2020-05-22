import React, { useEffect } from "react";
import "./Taskboard.scss";
import TaskColumn from "../Presentational/TaskColumn/TaskColumn";
import NewTaskColumn from "../Presentational/NewTaskColumn/NewTaskColumn";
import { db } from "../../services/firebase";
import { auth } from "../../services/firebase";

/*
taskboard:
  Name: string
  Description: string
  createdDate: Date
  createdBy: string // userId
  Columns: string[]
  deletedDate: Date | null
column:
  Name: string
  Tasks: string[]
tasks:
  name: string
  description: string
  createdDate: Date
  assignees: string[] // User IDs
*/

const Taskboard = () => {
  const [columns, setColumns] = React.useState([]);
  const [readError, setReadError] = React.useState(false); // TODO: use this
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    setUser(auth().currentUser);
    try {
      const columns = db.ref("columns");
      columns.on("value", (snapshot) => {
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
      alert(`An error occurred when reading data... ${err.message}`); // TODO: Dont use an alert, do this properly...
    }
    return () => db.ref("columns").off("value");
  }, []);

  console.log("Readerror is ", readError); // Just keeping this here until we look at using readError
  return (
    <div id="taskboard-container">
      <div className="taskboard-navbar">
        <p>Board Title Here</p>
      </div>
      <div className="taskboard-canvas">
        <div className="taskboard">
          {columns.map((column) => {
            return <TaskColumn key={column.id} column={column} user={user} />;
          })}
          <NewTaskColumn />
        </div>
      </div>
    </div>
  );
};

export default Taskboard;
