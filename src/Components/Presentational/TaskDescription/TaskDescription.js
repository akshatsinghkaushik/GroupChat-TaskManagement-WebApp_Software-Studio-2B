import React from "react";
import "./TaskDescription.scss";
import { Typography } from "@material-ui/core";

const TaskDescription = () => {
  return (
    <div className="task-description">
      <Typography variant="h5" component="h2">
        Description:
      </Typography>
      <Typography>
        {
          "Lorem Ipsum Lasdj ppadspa Lorem Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem \n asdasd \nHiHO"
        }
      </Typography>
    </div>
  );
};

export default TaskDescription;
