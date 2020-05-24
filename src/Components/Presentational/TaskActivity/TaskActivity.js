import React, { useEffect } from "react";
import "./TaskActivity.scss";
import { Typography } from "@material-ui/core";
import NewTaskComment from "../NewTaskComment/NewTaskComment";
import { db } from "../../../services/firebase";
import { getUserById, deleteComment } from "../../../helpers/db";
import moment from "moment";

const TaskActivity = ({ columnId, taskDetails }) => {
  const [comments, setComments] = React.useState([]);
  const [usernameMap, setUsernameMap] = React.useState({});

  useEffect(() => {
    getUserById("3wHGLaOci8gI9Mk1e3jVQ7HA8gD2");
    try {
      const columns = db.ref(`taskComments/${taskDetails.id}`);
      columns.on("value", async (snapshot) => {
        const tmpComments = [];
        snapshot.forEach((comment) => {
          const val = comment.val();
          if (val.deletedTimestamp) return; // Don't display deleted columns
          // TODO: Unshift isnt the best to use here for displaying tasks with most recent first, can sort the list (potentially from firebase) or something else but works for now
          tmpComments.unshift({
            id: comment.key,
            ...val,
          });
        });

        // TODO: Look at caching names
        const tmpUsernameMap = {};
        await Promise.all(
          tmpComments.map(async (comment) => {
            const user = await getUserById(comment.createdBy);
            tmpUsernameMap[comment.createdBy] = user.val().name;
          })
        );
        setUsernameMap(tmpUsernameMap);
        setComments(tmpComments);
      });
    } catch (err) {
      alert(`An error occurred when getting comments... ${err.message}`); // TODO: Dont use an alert, do this properly...
    }
    return () => db.ref(`taskComments/${taskDetails.id}`).off("value");
  }, [taskDetails.id]);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(taskDetails.id, commentId);
    } catch (err) {
      console.log("An error occurred when deleting comment", err);
    }
  };

  return (
    <div className="task-activity">
      <div className="title-lockup">
        <Typography variant="h5" component="h2">
          Activity:
        </Typography>
      </div>
      <NewTaskComment taskId={taskDetails.id} />
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <div key={comment.id} className="comment">
                <Typography className="comment-username">
                  {usernameMap[comment.createdBy]}
                </Typography>
                <p className="comment-timestamp">
                  {moment
                    .utc(parseInt(comment.lastUpdatedTimestamp))
                    .fromNow(true)}
                </p>
                <Typography className="comment-text">{comment.text}</Typography>
              </div>
              <div className="button-lockup">
                <p onClick={() => handleDeleteComment(comment.id)}>Delete</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskActivity;
