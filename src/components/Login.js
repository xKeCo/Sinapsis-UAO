import React, { useEffect } from "react";
import EmailIcon from "../images/email.svg";
import PasswordIcon from "../images/password.svg";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.css";

export default function Login() {
  useEffect(() => {
    document.title = "Sinapsis UAO - Inicio de sesión";
  }, []);

  return (
    <>
      <div className="LoginRegister-Container-grid">
        <h1 className="text-center font-weight-bold mt-3">Inicia Sesión</h1>
        <form className="login-grid">
          <TextField
            id="outlined-basic "
            className="txtField MuiOutlinedInput-notchedOutline MuiFormLabel-root"
            label="Correo institucional"
            variant="outlined"
            required
          />
          {/* <label className="LoginRegister-form-label">
            <img src={EmailIcon} alt="E" className="LoginRegister-form-label-icon" />
            <input
              type="email"
              name="email"
              placeholder="Correo institucional"
              className="LoginRegister-form-input"
              required
            />
          </label> */}

          <TextField
            id="outlined-basic "
            className="txtField"
            label="Contraseña"
            variant="outlined"
            type="password"
            required
          />
          {/* <label className="LoginRegister-form-label">
            <img src={PasswordIcon} alt="P" className="LoginRegister-form-label-icon" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="LoginRegister-form-input"
              required
            />
          </label> */}
          <input type="submit" className="LoginRegister-form-button" value="Inicar Sesión" />
        </form>
      </div>
    </>
  );
}
