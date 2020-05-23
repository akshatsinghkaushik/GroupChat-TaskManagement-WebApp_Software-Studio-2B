import React, { useEffect } from "react";
import "./Modal.scss";

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Used to close modals on Escape
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <div>
      <div className="modalOverlay" />
      <div className="modalContent">{children}</div>
    </div>
  );
};

export default Modal;
