import React, { memo, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";
import "./Modal.scss";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import SHA1 from "../../services/sha1";

import {
  useInputValue,
  useParticipants,
} from "../Participant-Components/Participants-custom-hooks";
import AddParticipant from "../Participant-Components/AddParticipant";
import ParticipantList from "../Participant-Components/ParticipantList";

import { db } from "../../services/firebase";

const AddGroupParticipant = memo((props) => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const {
    //participants,
    addParticipants,
    checkParticipants,
    removeParticipants,
  } = useParticipants(props);
  const clearInputAndAddParticipant = () => {
    const userExists = () => {
      let userEx = false;

      let uid = null;

      for (let [k, v] of props.users) {
        //console.log("Key: " + k);
        //console.log("Value: " + v);
        if (v.email === inputValue || v.name === inputValue) {
          userEx = true;
          uid = k;
        }
      }
      return {
        userExists: userEx,
        userID: uid,
      };
    };

    clearInput();
    addParticipants(inputValue, userExists());
  };
  return (
    <div>
      <AddParticipant
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddParticipant}
        onInputKeyPress={(event) =>
          keyInput(event, clearInputAndAddParticipant)
        }
      />
      <ParticipantList
        items={props.participants}
        onItemCheck={(idx) => checkParticipants(idx)}
        onItemRemove={(idx) => removeParticipants(idx)}
      />
    </div>
  );
});

const AddGroupLeader = memo((props) => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const {
    //participants,
    addParticipants,
    checkParticipants,
    removeParticipants,
  } = useParticipants(props);
  const clearInputAndAddParticipant = (_) => {
    const userExists = () => {
      let userEx = false;
      let uid = null;

      for (let [k, v] of props.users) {
        //console.log("Key: " + k);
        //console.log("Value: " + v);
        if (v.email === inputValue || v.name === inputValue) {
          userEx = true;
          uid = k;
        }
      }
      return {
        userExists: userEx,
        userID: uid,
      };
    };

    clearInput();
    addParticipants(inputValue, userExists());
  };
  return (
    <div>
      <AddParticipant
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddParticipant}
        onInputKeyPress={(event) =>
          keyInput(event, clearInputAndAddParticipant)
        }
      />
      <ParticipantList
        items={props.participants}
        onItemCheck={(idx) => checkParticipants(idx)}
        onItemRemove={(idx) => removeParticipants(idx)}
      />
    </div>
  );
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "35%",
    minWidth: "620px",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    padding: "0px, 0px 0px 0px",
    borderRadius: "10px",
    boxShadow:
      "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
    overflow: "auto",
    maxHeight: "100%",
  },
}));

export default function AnimatedModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [savingGroup, setSavingGroup] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");

  const [participants, setParticipants] = useState([]);
  const [leaders, setLeaders] = useState([]);

  const [groups, setGroups] = useState(new Map());

  useEffect(() => {
    try {
      db.ref("groups").on("value", (snapshot) => {
        let groups_temp = new Map();
        snapshot.forEach((snap) => {
          groups_temp.set(snap.key, snap.val());
        });

        setGroups(groups_temp);
      });
    } catch (error) {
      setSaveError(error.message);
    }
    return () => {
      db.ref("groups").off("value");
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleDescChange = (event) => {
    setGroupDesc(event.target.value);
  };

  const handleSaveGroup = (event) => {
    setSavingGroup(true);
    setSaveError(null);

    try {
      let groupID = SHA1.hash(groupName);

      if (!groups.has(groupID)) {
        db.ref("groups/" + groupID).update({
          name: groupName,
          description: groupDesc,
          id: groupID,
        });

        /* Template db call for storing chats to a group
        db.ref("groups/6c48a6eadfed63a0af3e39eb36911e24b4e356de/chats/").push({
          content: this.state.content,
          timestamp: Date.now(),
          uid: this.state.user.uid,
        });
        */

        for (let i = 0; i < participants.length; ++i) {
          if (
            participants[i].registered === true &&
            participants[i].checked === true
          ) {
            let displayName = props.users.get(participants[i].uid).name;

            if (props.users.get(participants[i].uid).name === undefined) {
              displayName = props.users.get(participants[i].uid).email;
            }

            db.ref(`groups/${groupID}/members/${participants[i].uid}`).update({
              displayName: displayName,
              groupAccess: "member",
            });

            db.ref(`users/${participants[i].uid}/groups/${groupID}`).update({
              displayName: displayName,
              groupAccess: "member",
            });
          }
        }

        for (let i = 0; i < leaders.length; ++i) {
          if (leaders[i].registered === true && leaders[i].checked === true) {
            let displayName = props.users.get(leaders[i].uid).name;

            if (props.users.get(leaders[i].uid).name === undefined) {
              displayName = props.users.get(leaders[i].uid).email;
            }
            db.ref(`groups/${groupID}/members/${leaders[i].uid}`).update({
              displayName: displayName,
              groupAccess: "leader",
            });
            db.ref(`users/${leaders[i].uid}/groups/${groupID}`).update({
              displayName: displayName,
              groupAccess: "leader",
            });
          }
        }
        props.refreshGroups();

        setSavingGroup(false);
        setOpen(false);
        setParticipants([]);
        setLeaders([]);
      } else {
        setSavingGroup(false);
        setSaveError("Group exists");
      }
    } catch (error) {
      setSaveError(error);
    }
  };

  return (
    <div>
      <div className="fab">
        <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <GroupAddIcon />
        </Fab>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form className={classes.paper}>
            <div className="new_group_header" style={{ background: "#05728f" }}>
              <h2
                style={{
                  color: "#fff",
                  borderBottom: "1px solid #05728f",
                  padding: "1em 3.1em 1em 3.1em",
                }}
              >
                {" "}
                Create Group
              </h2>
            </div>
            <div
              className="new_group_details"
              style={{ padding: "0px 100px 0px 100px" }}
            >
              <h6 style={{ color: "#05728f", marginTop: "50px" }}>
                {" "}
                Group Name{" "}
              </h6>
              <TextField
                className="group_name"
                inputProps={{ style: { fontSize: 20 } }}
                onChange={handleNameChange}
                style={{ size: "small" }}
              >
                {" "}
              </TextField>
              <h6 style={{ color: "#05728f", marginTop: "40px" }}>
                {" "}
                Group Description{" "}
              </h6>
              <TextField
                className="group_description"
                fullWidth={true}
                inputProps={{ style: { fontSize: 16 } }}
                onChange={handleDescChange}
                style={{ marginBottom: "55px", size: "small" }}
              >
                {" "}
              </TextField>
            </div>
            <div
              className="add_group_leaders"
              style={{ padding: "0px 100px 0px 100px" }}
            >
              <h6 style={{ color: "#05728f" }}> Assign Group Leader(s) </h6>
              <AddGroupLeader
                participants={leaders}
                setParticipants={setLeaders}
                users={props.users}
              />
            </div>
            <div
              className="add_group_participant"
              style={{ padding: "0px 100px 0px 100px", marginTop: "55px" }}
            >
              <h6 style={{ color: "#05728f" }}> Invite People </h6>
              <AddGroupParticipant
                participants={participants}
                setParticipants={setParticipants}
                users={props.users}
              />
            </div>
            {savingGroup ? (
              <div
                className="spinner-border text-success"
                role="status"
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "1em",
                  marginBottom: "1em",
                }}
              >
                <span className="sr-only" style={{}}>
                  Saving...
                </span>
              </div>
            ) : (
              ""
            )}
            {saveError !== null && saveError !== "null" ? (
              <div
                className=""
                style={{ textAlign: "center", marginTop: "2em", color: "red" }}
              >
                {saveError}
              </div>
            ) : (
              ""
            )}
            <div
              className="create_new_group_button"
              style={{
                display: "flex",
                padding: "0px 95px 0px 95px",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "3em",
                marginTop: "2.5em",
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleSaveGroup}
                //fullWidth={true}
                style={{
                  backgroundColor: "#05728f",
                  color: "#fff",
                  fontWeight: "bold",
                  height: "45px",
                  width: "10em",
                  border: "2px solid",
                  borderRadius: 20,
                  borderColor: "#05728f",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                }}
              >
                Save
              </Button>
              <Button
                autoFocus
                onClick={handleClose}
                variant="outlined"
                color="inherit"
                //fullWidth={true}
                style={{
                  color: "#05728f",
                  fontWeight: "bold",
                  height: "45px",
                  width: "10em",
                  border: "2px solid",
                  borderRadius: 20,
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}
