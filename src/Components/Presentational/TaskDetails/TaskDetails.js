import React from "react";
import { Button, Typography } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TaskDetails.scss";
import TaskDescription from "../TaskDescription/TaskDescription";
import TaskActivity from "../TaskActivity/TaskActivity";
import TaskTodos from "../TaskTodos/TaskTodos";
import { updateTask } from "../../../helpers/db";
import TaskDelete from "../TaskDelete/TaskDelete";
import TaskAssign from "../TaskAssign/TaskAssign";

const TaskDetails = ({ columnId, taskDetails, close }) => {
  const [newTaskName, setNewTaskName] = React.useState("");
  const [isEditingTaskName, setIsEditingTaskName] = React.useState(false);
  const submitNewTaskName = async () => {
    if (taskDetails.name === newTaskName) {
      stopEditing();
      return;
    }
    try {
      await updateTask(columnId, taskDetails.id, {
        name: newTaskName,
      });
      stopEditing();
    } catch (err) {
      console.log("err is ", err);
    }
  };

  const handleStartEditing = () => {
    setNewTaskName(taskDetails.name);
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
          <Typography variant="h4" component="h1" onClick={handleStartEditing}>
            {taskDetails.name}
          </Typography>
        )}
        <Button onClick={close}>
          <FontAwesomeIcon icon={faTimes} size="1x" />
        </Button>
      </div>
      <div className="grid-lockup">
        <div className="main-col">
          {/* <div className="task-detail"></div> */}
          <TaskDescription columnId={columnId} taskDetails={taskDetails} />
          <TaskTodos columnId={columnId} taskDetails={taskDetails} />
          <TaskActivity columnId={columnId} taskDetails={taskDetails} />
          <TaskAssign columnId={columnId} taskDetails={taskDetails} />
        </div>
        <div className="sidebar">
          <TaskDelete
            columnId={columnId}
            taskDetails={taskDetails}
            close={close}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
