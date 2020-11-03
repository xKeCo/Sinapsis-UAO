import React from "react";
// Estilos
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// Material UI
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export default function Hecho() {
  return (
    <>
      <div className="FirstLogin_container">
        <div className="success_container">
          <CheckCircleIcon className="circle_confirm_icon mb-3" />
          <div>
            <h1 className="FirstLogin_header">¡Gracias por realizar tu autodiagn&oacute;stico!</h1>
            <h3 className="FirstLogin_detail">
              El equipo de Sinapsis UAO analizar&aacute; tu iniciativa y recibir&aacute;s un correo
              con futuras instrucciones.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
