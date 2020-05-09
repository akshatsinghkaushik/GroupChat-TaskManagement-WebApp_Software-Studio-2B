import React from "react";
import "./TaskColumn.scss";
import { Card, CardContent, Typography } from "@material-ui/core";

const TaskColumn = ({ name, tasks }) => {
  return (
    <div id="task-column-container">
      <Typography variant="h5" component="h2">
        {name}
      </Typography>
      {tasks.map((task, index) => {
        return (
          <Card key={index} variant="outlined">
            <CardContent>
              <Typography color="textPrimary" gutterBottom>
                {task.name}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TaskColumn;
