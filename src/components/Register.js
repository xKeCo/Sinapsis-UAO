import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// Estilos
import "bootstrap/dist/css/bootstrap.css";
import { AuthContext } from "./Auth";
// Conexión con la base de datos
import firebaseConfig from "../firebase/client";
// Componente Utilizadps
import Loader from "./Loader";
// Material UI Components
import { TextField } from "@material-ui/core";

export default function Login() {
  const [form, setValues] = useState({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Sinapsis UAO - Registro";
  }, []);

  // Función para saber lo que el usuario escribe
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Función que envia los datos a Firebase
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.email.trim()) {
      setErrors({
        emailTrim: true,
      });
      return null;
    }
    setErrors({});
    setLoading(true);
    document.querySelectorAll("input").forEach((input) => (input.disabled = true));
    if (form.password === form.confirmPassword) {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(`${form.email}@uao.edu.co`, form.password)
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
            className="txtField MuiOutlinedInput-notchedOutline MuiFormLabel-root"
            label="Nombre de usuario UAO"
            variant="outlined"
            type="text"
            name="email"
            required
            multiline
            onChange={handleInput}
          />

          <TextField
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
                {errors.emailTrim && (
                  <li className="LoginRegister__errors--li">
                    El nombre de usuario no debe tener espacios.
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
