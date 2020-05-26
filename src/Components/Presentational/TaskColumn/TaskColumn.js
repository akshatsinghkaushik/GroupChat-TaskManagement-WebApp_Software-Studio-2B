import React, { useEffect } from "react";
import "./TaskColumn.scss";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteTaskColumn,
  createTask,
  updateTaskColumn,
} from "../../../helpers/db";
import { db } from "../../../services/firebase";
import TaskDetails from "../TaskDetails/TaskDetails";
import Modal from "../Modal/Modal";
import "jquery";

const TaskColumn = ({ boardId, column, user }) => {
  const [tasks, setTasks] = React.useState(new Map());
  const [newTask, setNewTask] = React.useState("");
  const [selectedTaskId, setSelectedTaskId] = React.useState("");

  useEffect(() => {
    try {
      const tasks = db.ref(`tasks/${column.id}`);
      tasks.on("value", (snapshot) => {
        const tmpTasks = new Map();
        snapshot.forEach((col) => {
          const val = col.val();
          if (val.deletedTimestamp) return; // Don't display deleted tasks
          tmpTasks.set(col.key, {
            id: col.key,
            ...val,
          });
        });
        setTasks(tmpTasks);
      });
    } catch (err) {
      alert(`An error occurred when reading data... ${err.message}`); // TODO: Dont use an alert, do this properly...
    }
    return () => db.ref(`tasks/${column.id}`).off("value");
  }, [column.id]);

  const handleDeleteColumn = async () => {
    try {
      await deleteTaskColumn(boardId, column.id);
    } catch (err) {
      alert(`An error occurred when deleting column ${err.message}`); // TODO: Dont use alerts for error messages..
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask) return; // Dont want to add tasks with empty names
    const task = {
      name: newTask,
      description: "",
      createdTimeStamp: Date.now(),
      createdBy: user.uid,
      deletedTimestamp: null,
    };

    try {
      await createTask(column.id, task);
      setNewTask("");
    } catch (err) {
      alert(`An error occurred when deleting column ${err.message}`);
    }
  };

  const handleMoveTask = async (targetListId, sourceListId, taskId) => {
    try {
      await updateTaskColumn(targetListId, sourceListId, taskId);
    } catch (err) {
      alert(`An error occurred when deleting column ${err.message}`);
    }
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCloseModal = () => {
    setSelectedTaskId("");
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const sourceId = e.dataTransfer.getData("text/plain");
    const sourceEl = document.getElementById(sourceId);
    const targetEl = document.getElementById(e.target.id);
    if (!targetEl || !sourceEl) {
      return;
    }

    // TODO: Fix this
    const sourceTaskList = sourceEl.closest("div");
    const sourceTaskListId = sourceTaskList.id;

    const targetTaskList = targetEl.closest("div");
    const targetTaskListId = targetTaskList.id;

    if (sourceTaskListId !== targetTaskListId) {
      handleMoveTask(targetTaskListId, sourceTaskListId, sourceId);
    } else {
      //TODO: Fix later
    }
  };

  return (
    <div className="task-column-container">
      <div className="task-column-lockup">
        <div className="header-lockup">
          <Typography variant="h5" component="h2">
            {column.name}
          </Typography>
          <FontAwesomeIcon
            onClick={handleDeleteColumn}
            icon={faTimes}
            size="1x"
          />
        </div>
        <div
          id={column.id}
          className="task-list, drop-zone"
          onDrop={(e) => handleDrop(e)}
          onDragStart={(e) => handleDragStart(e)}
          onDragOver={(e) => handleDragOver(e)}
        >
          <ul>
            {Array.from(tasks.values()).map((task) => {
              return (
                <li
                  key={task.id}
                  id={task.id}
                  draggable="true"
                  onClick={(e) => setSelectedTaskId(task.id)}
                >
                  <Card variant="outlined">
                    <CardContent className="dropzone" id={task.id}>
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
        <div className="new-task-lockup">
          <form onSubmit={handleCreateTask}>
            <input
              onChange={handleNewTaskChange}
              value={newTask}
              placeholder="Enter a title for this card..."
            />
            <Button type="submit">Add Task</Button>
          </form>
        </div>
      </div>
      {!!selectedTaskId && (
        <Modal closeModal={handleCloseModal}>
          <TaskDetails
            columnId={column.id}
            taskDetails={tasks.get(selectedTaskId)}
            close={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default TaskColumn;
