import React, { memo } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const AddParticipant = memo((props) => (
  <Paper style={{ margin: 0, padding: 10 }}>
    <Grid container>
      <Grid xs={10} md={10} item style={{ paddingRight: 16 }}>
        <TextField
          placeholder="Add Participants Here"
          value={props.inputValue}
          onChange={props.onInputChange}
          onKeyPress={props.onInputKeyPress}
          fullWidth
        />
      </Grid>
      <Grid xs={2} md={1} item>
        <Button fullWidth variant="outlined" onClick={props.onButtonClick}>
          <PersonAddIcon />
        </Button>
      </Grid>
    </Grid>
  </Paper>
));

export default AddParticipant;
