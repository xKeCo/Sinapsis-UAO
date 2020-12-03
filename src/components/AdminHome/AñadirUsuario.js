import React, { useState, useEffect } from "react";
import {
  Link,
  //  useHistory
} from "react-router-dom";
// Material UI Componets
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
// Material UI Icons
import { ExitToApp as ExitToAppIcon } from "@material-ui/icons";
// Componente Utilizados
import Loader from "../Loader";
// Conexion con Firebase Database
// import firebaseConfig from "../../firebase/client";
// import { database } from "../../firebase/client";
// Hash Gravatar
// import md5 from "md5";

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
    //  setLoading
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

  // const history = useHistory();

  return (
    <div>
      <h3 className="text-center mt-4 font-weight-bold">Añadir Usuario</h3>
      <form className="datos-proyecto_container ">
        <TextField
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
          className="AñadirUsuario-Button mt-3"
          label="Contraseña del usuario"
          type="password"
          name="password"
          required
          autoComplete="off"
          onChange={handleInput}
        />
        <TextField
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
              disabled
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
        <Link to="/home" className=" text-decoration-none items-dropdown">
          <Button
            variant="contained"
            color="secondary"
            className="button-2"
            startIcon={<ExitToAppIcon />}
            // onClick={() => {
            //   history.goBack();
            // }}
          >
            Volver
          </Button>
        </Link>
      </div>
    </div>
  );
}
