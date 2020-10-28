import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Link } from "react-router-dom";
import SinapsisLoginRegister from "../images/SinapsisUAO.png";
// import SinapsisColor from "../images/SinapsisColor.png";
import SinapsisBlanco from "../images/SinapsisBlanco.png";
// import GoogleIcon from "../components/buttons/icons/GoogleIcon";
// import GoogleButton from "../components/buttons/GoogleButton";
import { Redirect } from "react-router-dom";
import "../pages/styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  //   loginWithGoogle,
  onAuthStateChanged,
} from "../firebase/client";

export default function LoginRegister({ match }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  // const handleClickGoogle = () => {
  //   loginWithGoogle()
  //     .then(setUser)
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  if (user) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <div className="LoginRegister">
        <div className="LoginRegister-form">
          <div>
            <img src={SinapsisBlanco} alt="Sinapsis UAO" className="LoginRegister-form-logo" />
          </div>

          {match.path === "/" ? <Login /> : <Register />}

          <div className="LoginRegister-links-question">
            {match.path === "/" ? (
              <span>
                ¿No tienes cuenta?
                <Link to="/registro" className="LoginRegister-form-question-link">
                  {" "}
                  <strong>Reg&iacute;strate</strong>{" "}
                </Link>
              </span>
            ) : (
              <span>
                ¿Ya tienes cuenta?
                <Link to="/" className="LoginRegister-form-question-link">
                  <strong> Inicia sesi&oacute;n</strong>
                </Link>
              </span>
            )}
          </div>
          {/* <div className="GoogleButton-Container mt-4">
            {user === null && (
              <GoogleButton onClick={handleClickGoogle}>
                <GoogleIcon width={36} height={36}></GoogleIcon>
              </GoogleButton>
            )}
          </div> */}
          <div className="LoginRegister-form-links">
            {/* <Link className="LoginRegister-form-links-link" to="/">
              Términos y condiciones
            </Link> */}
            <a
              className="LoginRegister-form-links-link"
              href="http://www.uao.edu.co/sites/default/files/resoluciones/Resolucion-586-de-2018.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pol&iacute;tica de tratamiento de Datos Personales
            </a>
            <a
              className="LoginRegister-form-links-link"
              href="https://www.uao.edu.co/la-universidad/documentos-institucionales"
              target="_blank"
              rel="noopener noreferrer"
            >
              Transparencia y Acceso a la información P&uacute;blica
            </a>
            <br />
            <br />
            <a
              href="https://abstractcode.co/"
              className="LoginRegister-form-links-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              © 2020 Abstract Code.
            </a>
          </div>
        </div>
        <div className="LoginRegister-content">
          <img src={SinapsisLoginRegister} alt="Imagen" className="LoginRegister-content-image" />
        </div>
      </div>
    </>
  );
}
