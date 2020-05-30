import React from "react";
import "./TaskSidebar.scss";
import TaskDelete from "../TaskDelete/TaskDelete";

const TaskSidebar = ({ columnId, taskDetails, close }) => {
  return (
    <div className="sidebar">
      <TaskDelete columnId={columnId} taskDetails={taskDetails} close={close} />
    </div>
  );
};

export default TaskSidebar;
