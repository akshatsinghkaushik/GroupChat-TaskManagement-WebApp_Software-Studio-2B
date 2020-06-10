import React, { useState, useEffect } from "react";
import "./TaskAssign.scss";
import { addMember, deleteMember } from "../../../helpers/db";
import { Typography, Button } from "@material-ui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskAssign = ({ columnId, taskDetails }) => {
  const [newMember, setNewMember] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!taskDetails.members) {
      setMembers([]);
      return;
    }
    const newList = Object.keys(taskDetails.members).map((key) => {
      const member = taskDetails.members[key];
      return {
        id: key,
        ...member,
      };
    });
    setMembers(newList);
  }, [taskDetails.members]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember) {
      return;
    }
    try {
      for (let i = 0; i < members.length; i++) {
        if (members[i].text === newMember) {
          setNewMember("");
          return;
        }
      }
      await addMember(columnId, taskDetails.id, { text: newMember });
      setNewMember("");
    } catch (err) {
      console.log("An error occured when assigning member");
    }
  };

  const handleUpdateMemberText = (e) => {
    setNewMember(e.target.value);
  };

  const handleRemoveMember = async (id) => {
    try {
      await deleteMember(columnId, taskDetails.id, id);
    } catch (err) {
      console.log("An error occurred when removing todo", err);
    }
  };

  return (
    <div className="task-assign-lockup">
      <div className="title-lockup">
        <Typography variant="h5" component="h2">
          Members:
        </Typography>
      </div>
      <div className="member-grid-lockup">
        <div className="member-list-lockup">
          {members.length > 0 ? (
            <ul>
              {members.map((member, index) => {
                return (
                  <li key={index}>
                    <div className="member-lockup">
                      <Typography>{member.text}</Typography>
                      <div className="button-lockup">
                        <Button onClick={() => handleRemoveMember(member.id)}>
                          <FontAwesomeIcon icon={faTimes} size="2x" />
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Typography>No member has been assigned to this task</Typography>
          )}
        </div>
      </div>
      <div className="assign-member-lockup">
        <form onSubmit={handleAddMember}>
          <input
            onChange={handleUpdateMemberText}
            value={newMember}
            placeholder="Add member..."
          />
          <Button type="submit">Assign</Button>
        </form>
      </div>
    </div>
  );
};

export default TaskAssign;
