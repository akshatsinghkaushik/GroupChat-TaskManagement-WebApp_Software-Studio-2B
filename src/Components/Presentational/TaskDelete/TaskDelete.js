import React from "react";
import "./TaskDelete.scss";
import { deleteTask } from "../../../helpers/db";
import { Button } from "@material-ui/core";

const TaskDelete = ({ columnId, taskDetails, close }) => {
  const handleDeleteTask = async () => {
    try {
      await deleteTask(columnId, taskDetails.id);
      console.log("Delete pressed" + columnId + " " + taskDetails.id);
      close();
    } catch (err) {
      alert(`An error occurred when deleting column ${err.message}`); // TODO: Dont use alerts for error messages..
    }
  };

  return (
    <div className="task-delete">
      <div className="button-lockup">
        <Button onClick={() => handleDeleteTask()}>Delete</Button>
      </div>
    </div>
  );
};

export default TaskDelete;
