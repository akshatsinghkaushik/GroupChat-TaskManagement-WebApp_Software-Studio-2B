import React, { useEffect } from "react";
import "./TaskColumn.scss";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTaskColumn, createTask } from "../../../helpers/db";
import { db } from "../../../services/firebase";
import TaskDetails from "../TaskDetails/TaskDetails";
import Modal from "../Modal/Modal";

const TaskColumn = ({ column, user }) => {
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [selectedTask, setSelectedTask] = React.useState(null);

  useEffect(() => {
    try {
      const tasks = db.ref(`tasks/${column.id}`);
      tasks.on("value", (snapshot) => {
        const tmpTasks = [];
        snapshot.forEach((col) => {
          const val = col.val();
          if (val.deletedTimestamp) return; // Don't display deleted tasks
          tmpTasks.push({
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
      await deleteTaskColumn(column.id);
    } catch (err) {
      alert(`An error occurred when deleting column ${err.message}`); // TODO: Dont use alerts for error messages..
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
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

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
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
        <div className="task-list">
          <ul>
            {tasks.map((task) => {
              return (
                <li key={task.id} onClick={(e) => setSelectedTask(task)}>
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
      {!!selectedTask && (
        <Modal closeModal={handleCloseModal}>
          <TaskDetails taskDetails={selectedTask} close={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default TaskColumn;
