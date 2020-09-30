import React from "react";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Avatar({ alt, src, text }) {
  return (
    <div className="avatar-Container ">
      <img className="Avatar" src={src} alt={alt} title={alt} />
      {text && <span className="Avatar-Name">{text}</span>}
    </div>
  );
}
