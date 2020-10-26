import React from "react";
import "../styles/styles.css";
import ReactDOM from "react-dom";

const Modal = (props) => {
  if (!props.isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal__container">{props.children}</div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
