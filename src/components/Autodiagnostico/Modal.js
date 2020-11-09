import React from "react";
import ReactDOM from "react-dom";
// Estilos CSS
import "../styles/styles.css";

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
