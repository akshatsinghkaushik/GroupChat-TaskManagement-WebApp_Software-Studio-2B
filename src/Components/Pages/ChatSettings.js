import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./ChatSettings.scss";
import { Backdrop, Fade, Button, TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../services/firebase";
import SHA1 from "../../services/sha1";

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
    padding: "0",
    borderRadius: "10px",
    boxShadow:
      "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
    overflow: "auto",
    maxHeight: "100%",
  },
}));

export default function ChatSettings(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [savingGroup, setSavingGroup] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");

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

      if (!props.groups.has(groupID)) {
        const ref = db.ref(`groups/`);

        const child = ref.child(props.groupId);
        child.once("value", function (snapshot) {
          ref.child(groupID).set(snapshot.val());
          child.remove();
        });

        const users = new Map();
        db.ref(`groups/${groupID}/members`).on("value", (snapshot) => {
          snapshot.forEach((snap) => {
            users.set(snap.key, snap.val());
          });
        });
        console.log(users);
        for (const [key] of users.entries()) {
          const usersRef = db.ref(`users/${key}/groups/`);
          const usersChild = usersRef.child(props.groupId);
          usersChild.once("value", function (snapshot) {
            usersRef.child(groupID).set(snapshot.val());
            console.log(groupID);
            console.log(props.groupId);
            console.log(snapshot.val());
            usersChild.remove();
          });
        }

        db.ref("groups/" + groupID).update({
          name: groupName,
          description: groupDesc,
          id: groupID,
        });

        setSavingGroup(false);
        setOpen(false);
      } else {
        setSaveError("Group Name exists");
      }
    } catch (error) {
      setSaveError(error);
    }
  };

  return (
    <div id="chat-settings-container">
      <div className="chat-settings">
        <Button onClick={handleOpen}>
          <FontAwesomeIcon icon={faCog} />
        </Button>
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
            <div className="new_group_header">
              <h2 className="header">Update Group Settings</h2>
            </div>
            <div className="new_group_details">
              <h6 className="update_details_headers">Update Group Name: </h6>
              <TextField
                className="new_group_name"
                onChange={handleNameChange}
              ></TextField>
              <h6 className="update_details_headers">
                {" "}
                Update Group Description:
              </h6>
              <TextField
                className="new_group_description"
                onChange={handleDescChange}
                fullWidth={true}
              ></TextField>
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
                <span className="sr-only">Saving...</span>
              </div>
            ) : (
              ""
            )}
            {saveError !== null && saveError !== "null" ? (
              <div
                className=""
                style={{ textAlign: "center", marginTop: "2em" }}
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
                marginBottom: "1em",
                marginTop: "2.5em",
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleSaveGroup}
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
                Cancel
              </Button>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}
