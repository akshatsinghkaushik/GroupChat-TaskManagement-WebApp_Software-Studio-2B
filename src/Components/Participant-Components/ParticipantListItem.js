import React, { memo } from "react";
import PersonIcon from "@material-ui/icons/Person";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const ParticipantListItem = memo((props) => {
  let shortenedString;

  if (props.text.length > 10) {
    shortenedString = `${props.text.substring(0, 10)}...`;
  } else {
    shortenedString = props.text;
  }

  return (
    <ListItem divider={props.divider} style={{ margin: -12 }}>
      <Checkbox
        onClick={props.onCheckBoxToggle}
        checked={props.checked}
        style={{ color: "#05728f" }}
      />
      <PersonIcon style={{ color: "#05728f", paddingRight: 5 }} />
      <ListItemText primary={shortenedString} />
      {/*<ListItemText primary="Test" />*/}
      <ListItemText
        primary={props.registered ? "User Found" : "User Not Found"}
        style={props.registered ? { color: "green" } : { color: "red" }}
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete Participant"
          onClick={props.onButtonClick}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

export default ParticipantListItem;
