import React from "react";
import { Button, Typography } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TaskDetails.scss";
import TaskDescription from "../TaskDescription/TaskDescription";
import TaskActivity from "../TaskActivity/TaskActivity";

const TaskDetails = ({ taskDetails, close }) => {
  return (
    <div className="task-details-lockup">
      <div className="header">
        <Typography variant="h5" component="h1">
          {taskDetails.name}
        </Typography>
        <Button onClick={close}>
          <FontAwesomeIcon icon={faTimes} size="1x" />
        </Button>
      </div>
      <div className="grid-lockup">
        <div className="main-col">
          <div className="task-detail"></div>
          <TaskDescription />
          <TaskActivity />
        </div>
        <div className="sidebar">
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
