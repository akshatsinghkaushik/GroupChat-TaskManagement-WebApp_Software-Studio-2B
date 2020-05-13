import React, { memo } from "react";
import { List, Paper } from "@material-ui/core";

import ParticipantListItem from "./ParticipantListItem";

const ParticipantList = memo((props) => (
  <>
    {props.items.length > 0 && (
      <Paper style={{ margin: 10 }}>
        <List style={{ overflow: "visible" }}>
          {props.items.map((participant, idx) => (
            <ParticipantListItem
              {...participant}
              key={`ParticipantItem.${idx}`}
              divider={idx !== props.items.length - 1}
              onButtonClick={() => props.onItemRemove(idx)}
              onCheckBoxToggle={() => props.onItemCheck(idx)}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default ParticipantList;
