import React, { useEffect } from "react";
import "./TaskboardNavbar.scss";
import { Button, Typography } from "@material-ui/core";
import {
  faEdit,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateTaskboard } from "../../../helpers/db";

const TaskboardNavbar = ({ groupId, taskboard }) => {
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [newTitleText, setNewTitleText] = React.useState("");
  const [titleText, setTitleText] = React.useState("");

  useEffect(() => {
    setTitleText(taskboard.name);
  }, [taskboard.name]);

  const handleTitleChange = (e) => {
    setNewTitleText(e.target.value);
  };

  const saveNewTitle = async (e) => {
    e.preventDefault();
    if (!taskboard.id || !newTitleText) return;
    try {
      await updateTaskboard(groupId, taskboard.id, {
        name: newTitleText,
      });
      setTitleText(newTitleText);
      stopEditing();
    } catch (err) {
      console.log("An error occurred when saving new title", err);
    }
  };
  const startEditing = () => {
    setNewTitleText(titleText);
    setIsEditingTitle(true);
  };
  const stopEditing = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="taskboard-navbar-lockup">
      {isEditingTitle ? (
        <form onSubmit={saveNewTitle}>
          <input onChange={handleTitleChange} value={newTitleText} />

          <div className="button-lockup">
            <Button type="submit">
              <FontAwesomeIcon icon={faCheckCircle} size="1x" />
            </Button>
            <Button onClick={stopEditing}>
              <FontAwesomeIcon icon={faTimesCircle} size="1x" />
            </Button>
          </div>
        </form>
      ) : (
        <>
          <Typography variant="h5">{titleText}</Typography>
          <div className="button-lockup">
            <Button onClick={startEditing}>
              <FontAwesomeIcon icon={faEdit} size="1x" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskboardNavbar;
