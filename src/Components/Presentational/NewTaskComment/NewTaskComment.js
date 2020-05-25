import React from "react";
import "./NewTaskComment.scss";
import { Button } from "@material-ui/core";
import { createComment } from "../../../helpers/db";
import { auth } from "../../../services/firebase";

const NewTaskComment = ({ taskId }) => {
  const [text, setText] = React.useState("");

  const handleChangeComment = (e) => {
    setText(e.target.value);
  };
  const submitComment = async () => {
    let userId = auth().currentUser.uid;
    try {
      await createComment(taskId, {
        text,
        createdBy: userId,
        lastUpdatedTimestamp: Date.now(),
      });
      setText("");
    } catch (err) {
      console.log("An error occurred when submitting the comment");
    }
  };
  return (
    <div className="new-task-comment-lockup">
      <textarea
        label="Description"
        value={text}
        onChange={handleChangeComment}
        placeholder="Write a comment..."
        variant="outlined"
        rows={2}
      />
      {text.length > 0 && <Button onClick={submitComment}>Save</Button>}
    </div>
  );
};

export default NewTaskComment;
