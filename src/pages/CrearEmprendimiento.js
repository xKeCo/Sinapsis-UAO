import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
// Conexión con la base de datos
// import firebaseConfig from "../firebase/client";
import { database } from "../firebase/client";
// Componentes Utilizados
import NavegationBar from "../components/NavegationBar";
import LoaderBottom from "../components/LoaderBottom";
import { AuthContext } from "../components/Auth";
// Material UI Components
import {
  TextField,
  Button,
  Breadcrumbs,
  Typography,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
// Material UI Icons
import {
  NavigateNext as NavigateNextIcon,
  // Publish as PublishIcon
} from "@material-ui/icons";

// Estilos CSS
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1.5rem",
    marginBottom: "2rem",
    alignItems: "center",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CrearEmprendimiento(props) {
  const classes = useStyles();
  const [form, setValues] = useState({
    nomEmprendimiento: "",
    descEmprendimiento: "",
    prinSolucion: "",
    prinUsuario: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [etapa, setEtapa] = useState("");
  const [tipoEmprendimiento, setTipoEmprendimiento] = useState("");
  const [tipoEconomia, setTipoEconomia] = useState("");
  const [sectorEconomia, setSectorEconomia] = useState("");
  // const [mentor, setMentor] = useState(null);
  // const [inputValue, setInputValue] = useState("");

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Crear actividad";
    getEmprendedor();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Conseguir informacion del emprendedor
  const getEmprendedor = async () => {
    try {
      setLoading(true);
      const res = await database.collection("users").where("uID", "==", id).get();
      const docs = [];
      res.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      setData(docs[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  // Función para saber lo que el usuario escribe
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Establecer el valor que se eligio en la casilla de etapa
  const handleInputEtapa = (event) => {
    setEtapa(event.target.value);
  };

  // Establecer el valor que se eligio en la casilla de Tipo de emprendimiento
  const handleInputTipoEmprendimiento = (event) => {
    setTipoEmprendimiento(event.target.value);
  };

  // Establecer el valor que se eligio en la casilla de Tipo de economia
  const handleInputTipoEconomia = (event) => {
    setTipoEconomia(event.target.value);
  };

  // Establecer el valor que se eligio en la casilla de Sector de la economia
  const handleInputSectorEconomia = (event) => {
    setSectorEconomia(event.target.value);
  };

  // Función que envia los datos a Firebase
  const handleSubmit = async (event, e) => {
    event.preventDefault();
    const username = Data.username;
    if (
      form.prinSolucion !== "" &&
      form.prinUsuario !== "" &&
      form.nomEmprendimiento !== "" &&
      form.descEmprendimiento !== "" &&
      etapa !== "" &&
      tipoEmprendimiento !== "" &&
      tipoEconomia !== "" &&
      sectorEconomia !== ""
    ) {
      try {
        await database.collection("emprendimientos").doc().set(
          {
            nombreEmprendimiento: form.nomEmprendimiento,
            descEmprendimiento: form.descEmprendimiento,
            prinSolucion: form.prinSolucion,
            prinUsuario: form.prinUsuario,
            estado: "activo",
            etapa: etapa,
            tipoEmprendimiento: tipoEmprendimiento,
            tipoEconomia: tipoEconomia,
            sectorEconomia: sectorEconomia,
            mentor: userData.username,
            uID: id,
            username: username,
          },
          { merge: true }
        );
        setLoading(false);
        setOpen(true);
        setValues({
          nomEmprendimiento: "",
          descEmprendimiento: "",
          prinSolucion: "",
          prinUsuario: "",
        });
        setSectorEconomia("");
        setTipoEconomia("");
        setTipoEmprendimiento("");
        setEtapa("");
      } catch (error) {
        setLoading(false);
        setErrors(error);
      }
    } else {
      setOpenError(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenError(false);
  };

  if (!userData) {
    return <Redirect to="/" />;
  }

  if (userData.rol === "emprendedor") {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <NavegationBar />
      {loading ? (
        <div>
          <LoaderBottom />
        </div>
      ) : (
        <>
          {errors ? (
            <h3>Ocurri&oacute; un error.</h3>
          ) : (
            <>
              <div className="BreadCrumbs-container ">
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  <Link color="inherit" to="/home" className="text-decoration-none text-black-50">
                    Inicio
                  </Link>
                  <Link
                    color="inherit"
                    to={`/perfil/${id}`}
                    className="text-decoration-none text-black-50"
                  >
                    Perfil del emprendedor
                  </Link>
                  <Link
                    color="inherit"
                    to={`/emprendimientos/${id}`}
                    className="text-decoration-none text-black-50"
                  >
                    Emprendimientos
                  </Link>
                  <Typography color="textPrimary">Crear emprendimiento</Typography>
                </Breadcrumbs>
              </div>
              <h3 className="text-center mt-4 font-weight-bold">Nuevo emprendimiento</h3>
              <div className="Home">
                <div className="AdminHome_container">
                  <form onSubmit={handleSubmit} className="crearActividad_container">
                    <div className="w-100">
                      <TextField
                        label="Nombre del emprendimiento"
                        type="text"
                        name="nomEmprendimiento"
                        required
                        multiline
                        autoComplete="off"
                        value={form.nomEmprendimiento}
                        onChange={handleInput}
                        inputProps={{
                          maxLength: 80,
                        }}
                        // placeholder="Ej. "
                        helperText={`${form.nomEmprendimiento.length} / 80 caracteres`}
                      />
                    </div>
                    <div className=" w-100 mt-3">
                      <TextField
                        label="Descripci&oacute;n del emprendimiento"
                        type="text"
                        name="descEmprendimiento"
                        multiline
                        value={form.descEmprendimiento}
                        onChange={handleInput}
                        inputProps={{
                          maxLength: 250,
                        }}
                        // placeholder="Ej. "
                        helperText={`${form.descEmprendimiento.length} / 250 caracteres`}
                      />
                    </div>
                    <div className=" w-100 mt-3">
                      <TextField
                        label="Principal problema que soluciona"
                        type="text"
                        name="prinSolucion"
                        multiline
                        value={form.prinSolucion}
                        onChange={handleInput}
                        inputProps={{
                          maxLength: 80,
                        }}
                        // placeholder="Ej. "
                        helperText={`${form.prinSolucion.length} / 80 caracteres`}
                      />
                    </div>
                    <div className=" w-100 mt-3">
                      <TextField
                        label="Principal cliente o usuario"
                        type="text"
                        name="prinUsuario"
                        multiline
                        value={form.prinUsuario}
                        onChange={handleInput}
                        inputProps={{
                          maxLength: 80,
                        }}
                        // placeholder="Ej. "
                        helperText={`${form.prinUsuario.length} / 80 caracteres`}
                      />
                    </div>
                    <div className="w-100 EmprendimientoInfo-subDetails_container">
                      <div className="w-100 EmprendimientoInfo-subDetails_container">
                        <div className="mt-3 datos">
                          <FormControl className="MuiFormLabel-root mt-3">
                            <InputLabel id="demo-simple-select-filled-label">
                              Tipo de emprendimiento
                            </InputLabel>
                            <Select
                              name="tipoEmprendimiento"
                              labelid="demo-simple-select-outlined-label"
                              id="demo-mutiple-name"
                              label="genero"
                              className="datos-proyecto mt-3"
                              onChange={handleInputTipoEmprendimiento}
                              value={tipoEmprendimiento}
                              required
                            >
                              <MenuItem value={"Dinámico"}>Din&aacute;mico</MenuItem>
                              <MenuItem value={"Alto impacto"}>Alto impacto</MenuItem>
                            </Select>
                          </FormControl>
                        </div>

                        <div className="mt-3 datos">
                          <FormControl className="MuiFormLabel-root mt-3">
                            <InputLabel id="demo-simple-select-filled-label">
                              Tipo de econom&iacute;a
                            </InputLabel>
                            <Select
                              name="tipoEconomia"
                              labelid="demo-simple-select-outlined-label"
                              id="demo-mutiple-name"
                              label="genero"
                              className="datos-proyecto mt-3"
                              onChange={handleInputTipoEconomia}
                              value={tipoEconomia}
                              required
                            >
                              <MenuItem value={"Digital"}>Digital</MenuItem>
                              <MenuItem value={"Creativo y Cultural"}>Creativo y Cultural</MenuItem>
                              <MenuItem value={"Verde"}>Verde</MenuItem>
                              <MenuItem value={"Social y solidario"}>Social y solidario</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>

                      <div className="w-100 EmprendimientoInfo-subDetails_container">
                        <div className="mt-3 datos">
                          <FormControl className="MuiFormLabel-root mt-3">
                            <InputLabel id="demo-simple-select-filled-label">
                              Sector de la econom&iacute;a
                            </InputLabel>
                            <Select
                              name="sectorEconomia"
                              labelid="demo-simple-select-outlined-label"
                              id="demo-mutiple-name"
                              label="genero"
                              className="datos-proyecto mt-3"
                              onChange={handleInputSectorEconomia}
                              value={sectorEconomia}
                              required
                            >
                              <MenuItem value={"Agropecuario"}>Agropecuario</MenuItem>
                              <MenuItem value={"Industrial"}>Industrial</MenuItem>
                              <MenuItem value={"Servicios"}>Servicios</MenuItem>
                              <MenuItem value={"Comercio"}>Comercio</MenuItem>
                              <MenuItem value={"Transporte"}>Transporte</MenuItem>
                              <MenuItem value={"Construcción"}>Construcci&oacute;n</MenuItem>
                            </Select>
                          </FormControl>
                        </div>

                        <div className="mt-3 datos">
                          <FormControl className="MuiFormLabel-root mt-3">
                            <InputLabel id="demo-simple-select-filled-label">Etapa</InputLabel>
                            <Select
                              name="etapa"
                              labelid="demo-simple-select-outlined-label"
                              id="demo-mutiple-name"
                              label="genero"
                              onChange={handleInputEtapa}
                              value={etapa}
                              required
                              className="datos-proyecto mt-3"
                            >
                              <MenuItem value={"Soñar"}>Soñar</MenuItem>
                              <MenuItem value={"Pensar"}>Pensar</MenuItem>
                              <MenuItem value={"Testear"}>Testear</MenuItem>
                              <MenuItem value={"Arrancar"}>Arrancar</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className="w-100 EmprendimientoInfo-subDetails_container mt-3">
                      <div className="mt-3 datos">
                        <TextField
                          label="Emprendedor"
                          type="text"
                          name="username"
                          multiline
                          value={Data.username}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="mt-3 datos">
                        <TextField
                          label="Mentor asignado"
                          type="text"
                          name="mentor"
                          multiline
                          value={Data.mentor}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    </div>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success">
                        Emprendimiento añadido!
                      </Alert>
                    </Snackbar>
                    <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success">
                        Debe asignar todos los datos!
                      </Alert>
                    </Snackbar>
                    <div className={classes.buttonsContainer}>
                      <Button
                        type="submit"
                        className="LoginRegister-form-button agregar-button mr-2 ml-2"
                        value="Cancelar"
                        variant="contained"
                      >
                        Agregar
                      </Button>
                      <Link
                        to={`/emprendimientos/${id}`}
                        className=" text-decoration-none items-dropdown"
                      >
                        <Button
                          className="LoginRegister-form-button  mr-2 ml-2"
                          value="Cancelar"
                          variant="contained"
                          color="secondary"
                        >
                          Cancelar
                        </Button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
