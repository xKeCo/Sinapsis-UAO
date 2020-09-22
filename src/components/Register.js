import React, { useEffect } from "react";
import EmailIcon from "../images/email.svg";
import PasswordIcon from "../images/password.svg";
import UserIcon from "../images/user.svg";

export default function Login() {
  useEffect(() => {
    document.title = "Sinapsis UAO - Inicio de sesión";
  }, []);

  return (
    <>
      <div className="LoginRegister-Container-grid">
        <h1>Dale vida a tu idea de negocio!</h1>
        <form className="register-grid">
          <label className="LoginRegister-form-label register-grid-division">
            <img src={UserIcon} alt="p" className="LoginRegister-form-label-icon" />
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="LoginRegister-form-input"
              required
              maxLength="30"
            />
          </label>

          <label className="LoginRegister-form-label register-grid-division">
            <img src={EmailIcon} alt="E" className="LoginRegister-form-label-icon" />
            <input
              type="email"
              name="email"
              placeholder="Correo Estudiantil"
              className="LoginRegister-form-input"
              required
            />
          </label>

          <label className="LoginRegister-form-label register-grid-coreccion-icon">
            <img src={PasswordIcon} alt="P" className="LoginRegister-form-label-icon" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="LoginRegister-form-input"
              required
              maxLength="8"
            />
          </label>

          <label className="LoginRegister-form-label register-grid-coreccion-icon">
            <img src={PasswordIcon} alt="PC" className="LoginRegister-form-label-icon" />
            <input
              type="password"
              name="ConfirmPassword"
              placeholder="Confirmar contraseña"
              className="LoginRegister-form-input"
              required
              maxLength="8"
            />
          </label>
          <input
            type="submit"
            className="LoginRegister-form-button register-grid-division"
            value="Registrarse"
          />
        </form>
      </div>
    </>
  );
}
