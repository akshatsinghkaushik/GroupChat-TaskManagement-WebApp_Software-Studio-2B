import React from "react";
import { Button, Typography } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TaskDetails.scss";
import TaskDescription from "../TaskDescription/TaskDescription";
import TaskActivity from "../TaskActivity/TaskActivity";
import { updateTask } from "../../../helpers/db";

const TaskDetails = ({ columnId, taskDetails, close }) => {
  const [taskName, setTaskName] = React.useState(taskDetails.name);
  const [newTaskName, setNewTaskName] = React.useState("");
  const [isEditingTaskName, setIsEditingTaskName] = React.useState(false);
  const submitNewTaskName = async () => {
    try {
      await updateTask(columnId, taskDetails.id, {
        name: newTaskName,
      });
      setTaskName(newTaskName);
      stopEditing();
    } catch (err) {
      console.log("err is ", err);
    }
  };

  const handleStartEditing = () => {
    setNewTaskName(taskName);
    setIsEditingTaskName(true);
  };

  const handleChangeName = (e) => {
    setNewTaskName(e.target.value);
  };
  const stopEditing = () => {
    setNewTaskName("");
    setIsEditingTaskName(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      return submitNewTaskName();
    }
  };

  return (
    <div className="task-details-lockup">
      <div className="header">
        {isEditingTaskName ? (
          <input
            onChange={handleChangeName}
            onBlur={submitNewTaskName}
            onKeyPress={handleKeyPress}
            value={newTaskName}
            placeholder="Enter a title for this card..."
          />
        ) : (
          <Typography variant="h5" component="h1" onClick={handleStartEditing}>
            {taskName}
          </Typography>
        )}
        <Button onClick={close}>
          <FontAwesomeIcon icon={faTimes} size="1x" />
        </Button>
      </div>
      <div className="grid-lockup">
        <div className="main-col">
          <div className="task-detail"></div>
          <TaskDescription columnId={columnId} taskDetails={taskDetails} />
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
