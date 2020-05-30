import React, { memo, useState, useEffect } from "react";
import "./AddSubGroup.scss";
import {
  useInputValue,
  useParticipants,
} from "../Participant-Components/Participants-custom-hooks";
import AddParticipant from "../Participant-Components/AddParticipant";
import ParticipantList from "../Participant-Components/ParticipantList";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SHA1 from "../../services/sha1";
import { db } from "../../services/firebase";
import { Typography } from "@material-ui/core";

const AddSubGroupParticipant = memo((props) => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const {
    //participants,
    addParticipants,
    checkParticipants,
    removeParticipants,
  } = useParticipants(props);
  const clearInputAndAddParticipant = (_) => {
    const memberExists = () => {
      let userEx = false;
      let uid = null;

      for (let [k, v] of props.groupMembers) {
        if (
          v.displayName === inputValue ||
          props.users.get(k).email === inputValue
        ) {
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
    addParticipants(inputValue, memberExists());
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

const AddSubGroupLeader = memo((props) => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const {
    //participants,
    addParticipants,
    checkParticipants,
    removeParticipants,
  } = useParticipants(props);
  const clearInputAndAddParticipant = (_) => {
    const memberExists = () => {
      let userEx = false;
      let uid = null;

      for (let [k, v] of props.groupMembers) {
        if (
          v.displayName === inputValue ||
          props.users.get(k).email === inputValue
        ) {
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
    addParticipants(inputValue, memberExists());
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

export default function AddSubGroup(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [savingGroup, setSavingGroup] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [subgroupName, setSubGroupName] = useState("");
  const [subgroupDesc, setSubGroupDesc] = useState("");

  const [participants, setParticipants] = useState([]);
  const [leaders, setLeaders] = useState([]);

  const [subGroups, setSubgroups] = useState(new Map());
  const [members, setMembers] = useState(new Map());

  function membersExistInGroup() {
    let allExists = true;
    for (let i = 0; i < participants.length; i++) {
      if (!members.has(participants[i].uid)) {
        allExists = false;
      }
    }
    return allExists;
  }

  useEffect(() => {
    try {
      db.ref(`groups/${props.selectedGroupID}/subGroups`).on(
        "value",
        (snapshot) => {
          let groups_temp = new Map();
          snapshot.forEach((snap) => {
            groups_temp.set(snap.key, snap.val());
          });
          setSubgroups(groups_temp);
        }
      );
    } catch (error) {
      setSaveError(error.message);
    }
    try {
      db.ref(`groups/${props.selectedGroupID}/members`).on(
        "value",
        (snapshot) => {
          let members_temp = new Map();
          snapshot.forEach((snap) => {
            members_temp.set(snap.key, snap.val());
          });
          setMembers(members_temp);
        }
      );
    } catch (error) {
      setSaveError(error.message);
    }
    return () => {
      db.ref("subGroups").off("value");
      db.ref("members").off("value");
    };
  }, [props.selectedGroupID]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setSubGroupName(event.target.value);
  };

  const handleDescChange = (event) => {
    setSubGroupDesc(event.target.value);
  };

  const handleSaveSubGroup = (event) => {
    setSavingGroup(true);
    setSaveError(null);

    try {
      let groupID = props.selectedGroupID;
      let subgroupID = SHA1.hash(subgroupName);

      if (!subGroups.has(subgroupID)) {
        if (membersExistInGroup()) {
          db.ref(`groups/${groupID}/subGroups/` + subgroupID).update({
            name: subgroupName,
            description: subgroupDesc,
            id: subgroupID,
          });

          for (let i = 0; i < participants.length; ++i) {
            if (
              participants[i].registered === true &&
              participants[i].checked === true
            ) {
              let displayName = props.users.get(participants[i].uid).name;

              if (props.users.get(participants[i].uid).name === undefined) {
                displayName = props.users.get(participants[i].uid).email;
              }

              db.ref(
                `groups/${groupID}/subGroups/${subgroupID}/members/${participants[i].uid}`
              ).update({
                displayName: displayName,
                groupAccess: "member",
              });

              db.ref(
                `users/${participants[i].uid}/groups/${groupID}/subGroups/${subgroupID}`
              ).update({
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
              db.ref(
                `groups/${groupID}/subGroups/${subgroupID}/members/${leaders[i].uid}`
              ).update({
                displayName: displayName,
                groupAccess: "leader",
              });
              db.ref(
                `users/${leaders[i].uid}/groups/${groupID}/subGroups/${subgroupID}`
              ).update({
                displayName: displayName,
                groupAccess: "leader",
              });
            }
          }

          setSavingGroup(false);
          setOpen(false);
          setParticipants([]);
          setLeaders([]);
        } else {
          setSavingGroup(false);
          setSaveError("User(s) is not part of " + props.selecteGroupName);
        }
      } else {
        setSavingGroup(false);
        setSaveError("Subgroup exists");
      }
    } catch (error) {
      setSaveError(error);
    }
  };

  return (
    <div>
      <div className="addSubGroup">
        <button type="button" onClick={handleOpen} className="primary-button">
          <Typography>Create new subgroup</Typography>
        </button>
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
                  padding: "1em 3.1em 0em 3.1em",
                }}
              >
                {" "}
                Create Subgroup
              </h2>
              <h6
                style={{
                  color: "#fff",
                  borderBottom: "1px solid #05728f",
                  padding: "0em 6.3em 1em 6.3em",
                }}
              >
                {" "}
                {props.selecteGroupName}
              </h6>
            </div>
            <div
              className="new_group_details"
              style={{ padding: "0px 100px 0px 100px" }}
            >
              <h6 style={{ color: "#05728f", marginTop: "50px" }}>
                {" "}
                Subgroup Name{" "}
              </h6>
              <TextField
                className="group_name"
                id="outlined-basic"
                inputProps={{ style: { fontSize: 20 } }}
                onChange={handleNameChange}
                style={{ size: "small" }}
              >
                {" "}
              </TextField>
              <h6 style={{ color: "#05728f", marginTop: "40px" }}>
                {" "}
                Subgroup Description{" "}
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
              <h6 style={{ color: "#05728f" }}> Assign Subgroup Leader(s) </h6>
              <AddSubGroupLeader
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
              <AddSubGroupParticipant
                participants={participants}
                setParticipants={setParticipants}
                users={props.users}
                groupMembers={props.groupMembers}
                participants_test={props.participants}
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
              className="create_new_subgroup_button"
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
                onClick={handleSaveSubGroup}
                color="inherit"
                style={{
                  backgroundColor: "#05728f",
                  color: "#fff",
                  fontWeight: "bold",
                  height: "45px",
                  width: "10em",
                  marginLeft: "auto",
                  marginRight: "auto",
                  border: "2px solid",
                  borderRadius: 20,
                  borderColor: "#05728f",
                  justifyContent: "center",
                }}
              >
                Create
              </Button>
              <Button
                autoFocus
                onClick={handleClose}
                variant="outlined"
                color="inherit"
                fullWidth={true}
                style={{
                  color: "#05728f",
                  fontWeight: "bold",
                  height: "45px",
                  width: "10em",
                  marginLeft: "auto",
                  marginRight: "auto",
                  border: "2px solid",
                  borderRadius: 20,
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

//export default AddSubGroup;
