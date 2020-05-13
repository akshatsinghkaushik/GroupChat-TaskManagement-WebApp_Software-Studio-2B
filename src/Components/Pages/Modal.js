import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";
import "./Modal.scss";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  useInputValue,
  useParticipants,
} from "../Participant-Components/Participants-custom-hooks";
import AddParticipant from "../Participant-Components/AddParticipant";
import ParticipantList from "../Participant-Components/ParticipantList";

const AddGroupParticipant = memo((props) => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const {
    participants,
    addParticipants,
    checkParticipants,
    removeParticipants,
  } = useParticipants();
  const clearInputAndAddParticipant = (_) => {
    clearInput();
    addParticipants(inputValue);
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
        items={participants}
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
    width: "40%",
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

export default function AnimatedModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                  padding: "80px 100px 30px 100px",
                }}
              >
                {" "}
                New Group
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
                style={{ marginBottom: "55px", size: "small" }}
              >
                {" "}
              </TextField>
            </div>
            <div>
              <h6 style={{ color: "#05728f" }}> Assign Group Leader(s) </h6>
              <AddGroupParticipant />
              <hr />
            </div>
            <div
              className="add_group_participant"
              style={{ padding: "0px 100px 0px 100px" }}
            >
              <h6 style={{ color: "#05728f" }}> Invite People </h6>
              <AddGroupParticipant />
            </div>
            <div
              className="create_new_group_button"
              style={{ Display: "block", padding: "0px 95px 0px 95px" }}
            >
              <Button
                variant="outlined"
                color="inherit"
                fullWidth={true}
                style={{
                  marginTop: "65px",
                  backgroundColor: "#05728f",
                  color: "#fff",
                  fontWeight: "bold",
                  height: "45px",
                  border: "2px solid",
                  borderRadius: 20,
                  borderColor: "#05728f",
                  justifyContent: "center",
                }}
              >
                Create New Group
              </Button>
              <Button
                autoFocus
                onClick={handleClose}
                variant="outlined"
                color="inherit"
                fullWidth={true}
                style={{
                  marginTop: "30px",
                  marginBottom: "60px",
                  color: "#05728f",
                  fontWeight: "bold",
                  height: "45px",
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
