import React from "react";
import "./NewTaskColumn.scss";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-ui/core";

const NewTaskColumn = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const handleSetIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setTitle("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sumbitted");
  };
  return (
    <div id="new-task-column-container">
      <form onSubmit={handleSubmit}>
        {isEditing ? (
          <div id="add-column-selected">
            <input
              onChange={handleTitleChange}
              value={title}
              placeholder="Enter list title..."
            />
            <div id="button-lockup">
              <Button>Add List</Button>
              <Button onClick={handleCancelEditing}>
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </Button>
            </div>
          </div>
        ) : (
          // <button onClick={handleSetIsEditing}>
          //   <FontAwesomeIcon icon={faGithub} size="1x" />
          //   <Typography component="p">Add another list</Typography>
          // </button>
          <div id="add-column">
            <button onClick={handleSetIsEditing}>
              <FontAwesomeIcon icon={faPlus} size="1x" />
              <Typography component="p">Add another list</Typography>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewTaskColumn;
