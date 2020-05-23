import React from "react";
import "./TaskDescription.scss";
import { Button, Typography } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskDescription = () => {
  const [description, setDescription] = React.useState(
    "Lorem Ipsum Lasdj ppadspa Lorem Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem  Lorem Ipsum Lasdj ppadspa Lorem \n asdasd \nHiHO"
  );
  const [newDescription, setNewDescription] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);

  const handleStartEditing = () => {
    setNewDescription(description);
    setIsEditing(true);
  };

  const handleChangeDescription = (e) => {
    setNewDescription(e.target.value);
  };

  const saveNewDescription = () => {
    console.log("saveing new description", newDescription);
    setDescription(newDescription);
    setIsEditing(false);
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
            rows={5}
            variant="outlined"
          />
          <div className="button-lockup">
            <Button onClick={saveNewDescription}>Save</Button>
            <Button onClick={stopEditing}>
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </Button>
          </div>
        </div>
      ) : (
        <Typography>{description}</Typography>
      )}
    </div>
  );
};

export default TaskDescription;
