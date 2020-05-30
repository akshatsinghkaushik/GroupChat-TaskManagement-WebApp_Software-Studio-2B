import "date-fns";

import React, { useState } from "react";
import "./TaskSidebar.scss";
import TaskDelete from "../TaskDelete/TaskDelete";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const TaskSidebar = ({ columnId, taskDetails, close }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log("taskdetails is ", taskDetails);
  const handleDateChange = (date) => {
    console.log("date is ", date);
    setSelectedDate(date);
  };
  return (
    <div className="sidebar">
      <TaskDelete columnId={columnId} taskDetails={taskDetails} close={close} />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default TaskSidebar;
