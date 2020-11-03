import React from "react";
// import { Link } from "react-router-dom";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import GIF from "../images/404GIF";

export default function Home() {
  return (
    <>
      <div className="container">
        <GIF></GIF>
        <div className="details-container">
          <h3>Pagina no encontrada!</h3>
          <Link to="/" className="text-decoration-none text-light btn btn-danger mt-3">
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
