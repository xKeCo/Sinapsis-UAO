import React from "react";
import { Link } from "react-router-dom";
// Estilos CSS
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// GIF Importado
import GIF from "../images/404GIF";

export default function Home() {
  return (
    <React.Fragment>
      <div className="container">
        <div className="imgNotFound-container">
          <GIF />
        </div>
        <div className="details-container">
          <h3>Pagina no encontrada!</h3>
          <Link to="/" className="text-decoration-none text-light btn btn-danger mt-3">
            Volver al inicio
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
