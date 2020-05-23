import React from "react";
import "./TaskDescription.scss";
import { Button, Typography } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateTask } from "../../../helpers/db";

const TaskDescription = ({ columnId, taskDetails }) => {
  const [description, setDescription] = React.useState(taskDetails.description); // See if not using description as state breaks
  const [newDescription, setNewDescription] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(description.length === 0);

  const submitNewDescription = async () => {
    console.log("saving new description", newDescription);
    try {
      await updateTask(columnId, taskDetails.id, {
        description: newDescription,
      });
      setDescription(newDescription);
      stopEditing();
    } catch (err) {
      console.log("an error occured when saving new description", err);
    }
  };

  const handleStartEditing = () => {
    setNewDescription(description);
    setIsEditing(true);
  };

  const handleChangeDescription = (e) => {
    setNewDescription(e.target.value);
  };

  const stopEditing = () => {
    setNewDescription("");
    setIsEditing(false);
  };

  return (
    <div className="task-description">
      <div className="title-lockup">
        <Typography variant="h5" component="h2">
          Description
        </Typography>
        {!isEditing && <Button onClick={handleStartEditing}>Edit</Button>}
      </div>
      {isEditing ? (
        <div className="editing-lockup">
          <textarea
            id="standard-multiline-static"
            label="Description"
            value={newDescription}
            onChange={handleChangeDescription}
            placeholder="Add a more detailed description"
            rows={5}
            variant="outlined"
          />
          <div className="button-lockup">
            <Button onClick={submitNewDescription}>Save</Button>
            <Button onClick={stopEditing}>
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </Button>
          </div>
        </div>
      ) : (
        <Typography>
          {description || "Add a more detailed description... "}
        </Typography>
      )}
    </div>
  );
};

export default TaskDescription;
