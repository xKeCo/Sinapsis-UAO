import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Link } from "react-router-dom";
import SinapsisLoginRegister from "../images/SinapsisUAO.png";
// import SinapsisColor from "../images/SinapsisColor.png";
import SinapsisBlanco from "../images/SinapsisBlanco.png";
import "../pages/styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function LoginRegister({ match }) {
  return (
    <>
      <div className="LoginRegister">
        <div className="LoginRegister-form">
          <Link to="/">
            <img src={SinapsisBlanco} alt="Sinapsis UAO" className="LoginRegister-form-logo" />
          </Link>

          {match.path === "/Login" ? <Login /> : <Register />}

          <div className="LoginRegister-links-question">
            {match.path === "/Login" ? (
              <span>
                ¿No tienes cuenta?
                <Link to="/Register" className="LoginRegister-form-question-link">
                  {" "}
                  <strong>Regístrate</strong>{" "}
                </Link>
              </span>
            ) : (
              <span>
                ¿Ya tienes cuenta?
                <Link to="/Login" className="LoginRegister-form-question-link">
                  <strong> Inicia sesión</strong>
                </Link>
              </span>
            )}
          </div>
          <div className="LoginRegister-form-links">
            {/* <Link className="LoginRegister-form-links-link" to="/">
              Términos y condiciones
            </Link> */}
            <a
              className="LoginRegister-form-links-link"
              href="http://www.uao.edu.co/sites/default/files/resoluciones/Resolucion-586-de-2018.pdf"
              target="_blank"
            >
              Política de tratamiento de Datos Personales
            </a>
            <a
              className="LoginRegister-form-links-link"
              href="https://www.uao.edu.co/la-universidad/documentos-institucionales"
              target="_blank"
            >
              Transparencia y Acceso a la información Pública
            </a>
            <br />
            <br />
            <span className="LoginRegister-form-links-link">© 2020 Abstract Code.</span>
          </div>
        </div>
        <div className="LoginRegister-content">
          <img src={SinapsisLoginRegister} alt="Imagen" className="LoginRegister-content-image" />
        </div>
      </div>
    </>
  );
}
