import React from "react";
import "./TaskColumn.scss";
import { Card, CardContent, Typography } from "@material-ui/core";

const TaskColumn = ({ name, tasks }) => {
  return (
    <div id="task-column-container">
      <Typography variant="h5" component="h2">
        {name}
      </Typography>
      <div className="task-list">
        <ul>
          {tasks.map((task, index) => {
            return (
              // TODO: Dont use index as key, use task id when we have it..
              <li key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                      {task.name}
                    </Typography>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TaskColumn;
