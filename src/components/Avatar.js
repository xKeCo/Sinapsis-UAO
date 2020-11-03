import React from "react";
// Estilos
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Avatar({ alt, src, text }) {
  return (
    <div className="avatar-Container ">
      <img className="Avatar" src={src} alt="" title={alt} />
      {text && <span className="Avatar-Name">{text}</span>}
    </div>
  );
}
