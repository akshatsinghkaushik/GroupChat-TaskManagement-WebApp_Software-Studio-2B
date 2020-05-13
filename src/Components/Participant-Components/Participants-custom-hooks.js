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

export const useParticipants = (initialValue = []) => {
  const [participants, setParticipants] = useState(initialValue);

  return {
    participants: participants,
    addParticipants: (text) => {
      if (text !== "") {
        setParticipants(
          participants.concat({
            text,
            checked: false,
          })
        );
      }
    },
    checkParticipants: (idx) => {
      setParticipants(
        participants.map((participant, index) => {
          if (idx === index) {
            participant.checked = !participant.checked;
          }

          return participant;
        })
      );
    },
    removeParticipants: (idx) => {
      setParticipants(
        participants.filter((participant, index) => idx !== index)
      );
    },
  };
};
