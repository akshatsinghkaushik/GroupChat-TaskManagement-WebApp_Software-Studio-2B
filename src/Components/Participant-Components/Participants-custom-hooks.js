import { useState } from "react";

export const useInputValue = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue);

  return {
    inputValue,
    changeInput: (event) => setInputValue(event.target.value),
    clearInput: () => setInputValue(""),
    keyInput: (event, callback) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }

      return false;
    },
  };
};

export const useParticipants = (props) => {
  //const [participants, setParticipants] = useState(initialValue);
  let participants = props.participants;

  return {
    //participants: participants,
    addParticipants: (text, regist) => {
      //console.log(regist);
      if (text !== "") {
        props.setParticipants(
          participants.concat({
            text,
            checked: false,
            registered: regist.userExists,
            uid: regist.userID,
          })
        );
      }
    },
    checkParticipants: (idx) => {
      props.setParticipants(
        participants.map((participant, index) => {
          if (idx === index) {
            participant.checked = !participant.checked;
          }

          return participant;
        })
      );
    },
    removeParticipants: (idx) => {
      props.setParticipants(
        participants.filter((participant, index) => idx !== index)
      );
    },
  };
};
