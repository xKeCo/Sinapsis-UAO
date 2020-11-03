import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../firebase/client";
import Loader from "./Loader";

// Material UI
import { TextField } from "@material-ui/core";
// Material UI End

export default function Login() {
  const [form, setValues] = useState({
    username: "",
    email: "",
  });
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
            displayName: form.nombre,
          });
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            setErrors({
              email: true,
            });
            setLoading(false);
          } else {
            setErrors({
              unexpected: true,
            });
            setLoading(false);
          }
        });
      setLoading(true);
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
            variant="outlined"
            type="text"
            name="nombre"
            required
            multiline
            autoComplete="off"
            inputProps={{
              maxLength: 30,
            }}
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
            multiline
            onChange={handleInput}
          />

          <TextField
            id="outlined-basic "
            className="txtField MuiOutlinedInput-notchedOutline MuiFormLabel-root"
            autoComplete="off"
            label="Contraseña"
            type="password"
            name="password"
            variant="outlined"
            required
            onChange={handleInput}
            inputProps={{
              maxLength: 12,
            }}
          />
          <TextField
            id="outlined-basic "
            className="txtField MuiOutlinedInput-notchedOutline MuiFormLabel-root"
            label="Confirmar contraseña"
            variant="outlined"
            type="password"
            autoComplete="off"
            name="confirmPassword"
            inputProps={{
              maxLength: 12,
            }}
            required
            onChange={handleInput}
          />
          <input
            type="submit"
            className="LoginRegister-form-button register-grid-division mt-3 "
            value="Registrarse"
          />
        </form>
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="login-register__errors">
            <span>
              <ul>
                {errors.password && (
                  <li className="LoginRegister__errors--li">Las contraseñas no coinciden.</li>
                )}
                {errors.email && (
                  <li className="LoginRegister__errors--li">
                    Este correo institucional ya se encuentra registrado.
                  </li>
                )}
                {errors.unexpected && (
                  <li className="LoginRegister__errors--li">
                    Ocurri&oacute; un error al enviar la informaci&oacute;n. Por favor intentelo
                    nuevamente.
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
