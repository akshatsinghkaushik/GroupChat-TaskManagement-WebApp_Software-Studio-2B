import React from "react";
import "./TaskActivity.scss";
import { Typography } from "@material-ui/core";

const TaskActivity = () => {
  return (
    <div className="task-activity">
      <div className="title-lockup">
        <Typography variant="h5" component="h2">
          Activity:
        </Typography>
      </div>
    </div>
  );
};

export default TaskActivity;
