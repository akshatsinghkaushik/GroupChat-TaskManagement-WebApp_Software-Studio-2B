import React, { useEffect } from "react";
import "./Taskboard.scss";
import TaskColumn from "../Presentational/TaskColumn/TaskColumn";
import NewTaskColumn from "../Presentational/NewTaskColumn/NewTaskColumn";
import { db } from "../../services/firebase";

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

// These are just example tasks, we should be reading these from the database...
const exampleTasks = [
  {
    name: "Assign a leader to a subgroup",
    description:
      "We will need to assign a leader to the frontend subgroup and the backend subgroup",
    createdDate: Date.now(),
  },
  {
    name: "Create tasks",
    description: "Users should be able to create tasks on their own",
    createdDate: Date.now() - 300000,
  },
];

const Taskboard = () => {
  const [columns, setColumns] = React.useState([]);
  const [readError, setReadError] = React.useState(false); // TODO: use this
  useEffect(() => {
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
            return <TaskColumn column={column} tasks={exampleTasks} />;
          })}
          <NewTaskColumn />
        </div>
      </div>
    </div>
  );
};

export default Taskboard;
