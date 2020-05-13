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

const ParticipantListItem = memo((props) => (
  <ListItem divider={props.divider} style={{ margin: -12 }}>
    <Checkbox
      onClick={props.onCheckBoxToggle}
      checked={props.checked}
      disableRipple
    />
    <PersonIcon style={{ color: "#05728f", paddingRight: 5 }} />
    <ListItemText primary={props.text} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete Participant" onClick={props.onButtonClick}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
));

export default ParticipantListItem;
