import React, { useEffect, useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.css";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../firebase/client";
import Loader from "./Loader";

export default function Login() {
  const [form, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Sinapsis UAO - Inicio de sesión";
  }, []);

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    document.querySelectorAll("input").forEach((input) => (input.disabled = true));
    if (form.password === form.confirmPassword) {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((userCredentials) => {
          return userCredentials.user.updateProfile({
            displayName: form.name,
          });
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            setErrors({
              email: true,
            });
          } else {
            setErrors({
              unexpected: true,
            });
          }
        });
    } else {
      setErrors({
        password: true,
      });
    }
    document.querySelectorAll("input").forEach((input) => (input.disabled = false));
    setLoading(false);
  };

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <div className="LoginRegister-Container-grid">
        <h1 className="text-center font-weight-bold ">Dale vida a tu idea de negocio!</h1>
        <form onSubmit={handleSubmit} className="register-grid">
          <TextField
            id="outlined-basic "
            className="txtField MuiOutlinedInput-notchedOutline MuiFormLabel-root"
            label="Nombre Completo"
            name="name"
            variant="outlined"
            inputProps={{
              maxLength: 35,
            }}
            required
            onChange={handleInput}
          />

          <TextField
            id="outlined-basic "
            className="txtField MuiOutlinedInput-notchedOutline MuiFormLabel-root"
            label="Correo institucional"
            variant="outlined"
            type="email"
            name="email"
            required
            onChange={handleInput}
          />

          <TextField
            id="outlined-basic "
            className="txtField MuiOutlinedInput-notchedOutline MuiFormLabel-root"
            label="Contraseña"
            type="password"
            name="password"
            variant="outlined"
            inputProps={{
              maxLength: 12,
            }}
            required
            onChange={handleInput}
          />

          <TextField
            id="outlined-basic "
            className="txtField MuiOutlinedInput-notchedOutline MuiFormLabel-root"
            label="Confirmar contraseña"
            variant="outlined"
            type="password"
            name="confirmPassword"
            inputProps={{
              maxLength: 12,
            }}
            required
            onChange={handleInput}
          />
          <input
            type="submit"
            className="LoginRegister-form-button register-grid-division"
            value="Registrarse"
          />
        </form>
        {loading && <Loader />}
        <div className="login-register__errors">
          <span>
            <ul>
              {errors.password && (
                <li className="login-register__errors--li">Las contraseñas no coinciden.</li>
              )}
              {errors.email && (
                <li className="login-register__errors--li">
                  Este correo institucional ya se encuentra registrado.
                </li>
              )}
              {errors.unexpected && (
                <li className="login-register__errors--li">
                  Ocurri&oacute; un error al enviar la informaci&oacute;n. Por favor intentelo
                  nuevamente.
                </li>
              )}
            </ul>
          </span>
        </div>
      </div>
    </>
  );
}
