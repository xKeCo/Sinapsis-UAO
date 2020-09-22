import React, { useEffect } from "react";
import EmailIcon from "../images/email.svg";
import PasswordIcon from "../images/password.svg";

export default function Login() {
  useEffect(() => {
    document.title = "Sinapsis UAO - Inicio de sesión";
  }, []);

  return (
    <>
      <div className="LoginRegister-Container-grid">
        <h1>Inicia Sesión</h1>
        <form className="login-grid">
          <label className="LoginRegister-form-label">
            <img src={EmailIcon} alt="E" className="LoginRegister-form-label-icon" />
            <input
              type="email"
              name="email"
              placeholder="Correo Estudiantil"
              className="LoginRegister-form-input"
              required
            />
          </label>
          <label className="LoginRegister-form-label">
            <img src={PasswordIcon} alt="P" className="LoginRegister-form-label-icon" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="LoginRegister-form-input"
              required
            />
          </label>
          <input type="submit" className="LoginRegister-form-button" value="Inicar Sesión" />
        </form>
      </div>
    </>
  );
}
