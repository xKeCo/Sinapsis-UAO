import React, { useState, useEffect } from "react";
// Links
import { Link } from "react-router-dom";
// Material UI
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MuiAlert from "@material-ui/lab/Alert";
// Componente Loader
import Loader from "../Loader";

// import firebaseConfig from "../firebase/client";
// import { database } from "../firebase/client";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AnadirUsuario() {
  const [open, setOpen] = useState(false);
  const [form, setValues] = useState({
    username: "",
    email: "",
  });
  const [
    loading,
    // setLoading
  ] = useState(false);
  const [
    errors,
    // setErrors
  ] = useState({});
  const [rol, setRol] = useState("");

  useEffect(() => {
    document.title = "Sinapsis UAO - Añadir Usuario";
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleInputRol = (event) => {
    setRol(event.target.value);
  };
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setErrors({});
  //   setLoading(true);
  //   document.querySelectorAll("input").forEach((input) => (input.disabled = true));
  //   if (form.password === form.confirmPassword) {
  //     firebaseConfig
  //       .auth()
  //       .createUserWithEmailAndPassword(form.email, form.password)
  //       .then((userCredentials) => {
  //         return userCredentials.user.updateProfile({
  //           displayName: form.nombre,
  //         });
  //       })
  //       .catch((err) => {
  //         if (err.code === "auth/email-already-in-use") {
  //           setErrors({
  //             email: true,
  //           });
  //           setLoading(false);
  //         } else {
  //           setErrors({
  //             unexpected: true,
  //           });
  //           setLoading(false);
  //         }
  //       });
  //     setLoading(true);
  //   } else {
  //     setErrors({
  //       password: true,
  //     });
  //   }
  //   document.querySelectorAll("input").forEach((input) => (input.disabled = false));
  //   setLoading(false);
  // };

  return (
    <div>
      <h3 className="text-center mt-4 font-weight-bold">Añadir Usuario</h3>
      <form className="datos-proyecto_container ">
        <TextField
          id="standard-basic"
          className="AñadirUsuario-Button mt-3"
          label="Nombre del Usuario"
          type="text"
          name="nombre"
          required
          multiline
          autoComplete="off"
          inputProps={{
            maxLength: 30,
          }}
          onChange={handleInput}
          placeholder="Ej. Pepito Antonio Perez Sarama"
        />
        <TextField
          id="standard-basic"
          className="AñadirUsuario-Button mt-3"
          label="Correo institucional"
          type="email"
          name="email"
          multiline
          required
          autoComplete="off"
          onChange={handleInput}
          placeholder="Ej. pepito.perez@uao.edu.co"
        />

        <FormControl className="MuiFormLabel-root mt-3">
          <InputLabel id="demo-simple-select-filled-label">Rol del usuario</InputLabel>
          <Select
            name="rol"
            labelid="demo-simple-select-outlined-label"
            id="demo-mutiple-name"
            label="Rol"
            onChange={handleInputRol}
            value={rol}
            required
            className="datos-proyecto mt-3"
          >
            <MenuItem value={"admin"}>Administrador</MenuItem>
            <MenuItem value={"mentor"}>Mentor</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="standard-basic"
          className="AñadirUsuario-Button mt-3"
          label="Contraseña del usuario"
          type="password"
          name="password"
          required
          autoComplete="off"
          onChange={handleInput}
        />
        <TextField
          id="standard-basic"
          className="AñadirUsuario-Button mt-3"
          label="Confirmar contraseña"
          type="password"
          name="confirmPassword"
          // multiline
          required
          autoComplete="off"
          onChange={handleInput}
        />
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Se ha añadido el usuario!
          </Alert>
        </Snackbar>
        <div className="FirstLogin_button_container mt-4">
          <div>
            <Button
              type="input"
              variant="contained"
              color="primary"
              className="AñadirUsuario-input mt-4"
              // onClick={handleSubmit}
            >
              Añadir
            </Button>
          </div>
        </div>
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
                <li className="LoginRegister__errors--li text-danger">
                  Las contraseñas no coinciden.
                </li>
              )}
              {errors.email && (
                <li className="LoginRegister__errors--li text-danger">
                  Este correo institucional ya se encuentra registrado.
                </li>
              )}
              {errors.unexpected && (
                <li className="LoginRegister__errors--li text-danger">
                  Ocurri&oacute; un error al enviar la informaci&oacute;n. Por favor intentelo
                  nuevamente.
                </li>
              )}
            </ul>
          </span>
        </div>
      )}
      <div className="Button-volver mb-5 ">
        <Link to="/home">
          <Button
            variant="contained"
            color="secondary"
            className="button-2"
            startIcon={<ExitToAppIcon />}
          >
            Volver
          </Button>
        </Link>
      </div>
    </div>
  );
}
