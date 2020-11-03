import React, { useEffect, useState, useContext } from "react";
// Conseguir datos de usuario actual
import { AuthContext } from "./Auth";
// Redirección del usuario
import { Redirect } from "react-router-dom";
// Conexión con firebase
import firebaseConfig from "../firebase/client";
// Componente Loader
import Loader from "./Loader";
// Estilos
import "bootstrap/dist/css/bootstrap.css";
// MATERIAL UI
import { TextField } from "@material-ui/core";

export default function Login() {
  const [form, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Sinapsis UAO - Inicio de sesión";
  }, []);

  // Función para saber lo que el ususario escribe
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Función que envia los datos a Firebase
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    document.querySelectorAll("input").forEach((input) => (input.disabled = true));
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .catch((err) => {
        if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
          setErrors({
            incorrect: true,
          });
          setLoading(false);
        } else {
          setErrors({
            unexpected: true,
          });
          setLoading(false);
        }
      });
    document.querySelectorAll("input").forEach((input) => (input.disabled = false));
    setLoading(true);
  };

  // Función para redirigir al home si hay un usuario conectado
  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <div className="LoginRegister-Container-grid">
        <h1 className="text-center font-weight-bold mt-3">Inicia Sesión</h1>
        <form onSubmit={handleSubmit} className="login-grid">
          <TextField
            id="outlined-basic "
            className="txtField MuiOutlinedInput-notchedOutline MuiFormLabel-root"
            label="Correo institucional"
            variant="outlined"
            name="email"
            required
            onChange={handleInput}
          />

          <TextField
            id="outlined-basic "
            className="txtField"
            label="Contraseña"
            variant="outlined"
            type="password"
            name="password"
            required
            inputProps={{
              maxLength: 12,
            }}
            onChange={handleInput}
          />
          <input type="submit" className="LoginRegister-form-button" value="Inicar Sesión" />
        </form>
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="LoginRegister__error">
            <span>
              <ul>
                {errors.incorrect && (
                  <li className="LoginRegister__errors--li">
                    El correo o la contraseña es incorrecto.
                  </li>
                )}
                {errors.unexpected && (
                  <li className="LoginRegister__errors--li">
                    Ocurri&oacute; un error al enviar la informaci&oacute;n. Por favor intenta de
                    nuevo.
                  </li>
                )}
              </ul>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
