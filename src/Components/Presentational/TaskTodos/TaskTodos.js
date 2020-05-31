import React, { useState, useEffect } from "react";
import "./TaskTodos.scss";
import { Button, Checkbox, Typography } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createTaskTodo,
  deleteTaskTodo,
  updateTaskTodoStatus,
} from "../../../helpers/db";

const TaskTodos = ({ columnId, taskDetails }) => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [
    completedTodosPercentage,
    setCompletedTodosPercentage,
  ] = React.useState(0);

  useEffect(() => {
    if (!taskDetails.todos) {
      setTodos([]);
      return;
    }
    let todosCount = 0;
    let todosCompleted = 0;
    const newList = Object.keys(taskDetails.todos).map((key) => {
      const todo = taskDetails.todos[key];
      todosCount++;
      todosCompleted += todo.isComplete ? 1 : 0;
      return {
        id: key,
        ...todo,
      };
    });
    setTodos(newList);
    const newPercentage = ((todosCompleted / todosCount) * 100).toFixed(0);
    setCompletedTodosPercentage(newPercentage);
  }, [taskDetails.todos]);

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo) {
      return;
    }
    try {
      await createTaskTodo(columnId, taskDetails.id, {
        text: newTodo,
        isComplete: false,
      });
      setNewTodo("");
    } catch (err) {
      console.log("An error occurred when creating task todo");
    }
  };
  const handleUpdateNewTodoText = (e) => {
    setNewTodo(e.target.value);
  };

  const handleUpdateTodoStatus = async (id) => {
    try {
      await updateTaskTodoStatus(
        columnId,
        taskDetails.id,
        id,
        !taskDetails.todos[id].isComplete
      );
    } catch (err) {
      console.log("An error occurred when trying to update todo status", err);
    }
  };

  const handleRemoveTodo = async (id) => {
    try {
      await deleteTaskTodo(columnId, taskDetails.id, id);
    } catch (err) {
      console.log("An error occurred when removing todo", err);
    }
  };

  return (
    <div className="task-todos-lockup">
      <div className="title-lockup">
        <Typography variant="h5" component="h2">
          Task Items
        </Typography>
      </div>
      <div className="task-grid-lockup">
        <div className="todo-list-lockup">
          {todos.length > 0 ? (
            <ul>
              {todos.map((todo, index) => {
                return (
                  <li key={index}>
                    <div className="todo-lockup">
                      <Checkbox
                        onChange={() => handleUpdateTodoStatus(todo.id)}
                        checked={todo.isComplete}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                      <Typography>{todo.text}</Typography>
                      <div className="button-lockup">
                        <Button onClick={() => handleRemoveTodo(todo.id)}>
                          <FontAwesomeIcon icon={faTimes} size="2x" />
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Typography>
              No progress items have been set for this task
            </Typography>
          )}
        </div>
        <div className="todo-progress-lockup">
          {todos.length > 0 && (
            <Typography variant="h5">
              {completedTodosPercentage}% Completed
            </Typography>
          )}
        </div>
      </div>
      <div className="create-todo-lockup">
        <form onSubmit={handleCreateTodo}>
          <input
            onChange={handleUpdateNewTodoText}
            value={newTodo}
            placeholder="Enter progress item name..."
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default TaskTodos;
