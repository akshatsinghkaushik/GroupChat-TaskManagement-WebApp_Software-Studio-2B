import React from "react";
import "./Taskboard.scss";
import TaskColumn from "../Presentational/TaskColumn/TaskColumn";
import NewTaskColumn from "../Presentational/NewTaskColumn/NewTaskColumn";

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
  return (
    <div id="taskboard-container">
      <div className="taskboard-navbar">
        <p>Board Title Here</p>
      </div>
      <div className="taskboard">
        <TaskColumn name="col 1" tasks={exampleTasks} />
        <TaskColumn name="col 1" tasks={exampleTasks} />
        <NewTaskColumn />
      </div>
    </div>
  );
};

export default Taskboard;
