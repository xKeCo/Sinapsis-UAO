import React from "react";
import {
  TextField,
  Button,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
  Snackbar,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AnadirUsuario() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAddInfo = () => {
    setOpen(true);
  };
  return (
    <div>
      <h3 className="text-center mt-4 font-weight-bold">Añadir Usuario</h3>
      <form className="datos-proyecto_container ">
        <TextField
          id="standard-basic"
          className="AñadirUsuario-Button mt-3"
          label="Nombre del Usuario"
          type="text"
          name="cedula"
          required
          autoComplete="off"
          inputProps={{
            maxLength: 35,
          }}
          placeholder="Ej. Pepito Antonio Perez Sarama"
        />
        <TextField
          id="standard-basic"
          className="AñadirUsuario-Button mt-3"
          label="Correo institucional"
          type="text"
          name="cedula"
          required
          autoComplete="off"
          inputProps={{
            maxLength: 35,
          }}
          placeholder="Ej. pepito.perez@uao.edu.co"
        />
        <TextField
          id="standard-basic"
          className="AñadirUsuario-Button mt-3"
          label="Nombre del Usuario"
          type="text"
          name="cedula"
          required
          autoComplete="off"
          inputProps={{
            maxLength: 35,
          }}
          placeholder="Ej. Pepito Antonio Perez Sarama"
        />
        <TextField
          id="standard-basic"
          className="AñadirUsuario-Button mt-3"
          label="Correo institucional"
          type="text"
          name="cedula"
          required
          autoComplete="off"
          inputProps={{
            maxLength: 35,
          }}
          placeholder="Ej. pepito.perez@uao.edu.co"
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
              onClick={handleAddInfo}
            >
              Asignar
            </Button>
          </div>
        </div>
      </form>
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
