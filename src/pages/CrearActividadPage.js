import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
// Conexión con la base de datos
import firebaseConfig from "../firebase/client";
import { database } from "../firebase/client";
// Componentes Utilizados
import NavegationBar from "../components/NavegationBar";
import LoaderBottom from "../components/LoaderBottom";
import { AuthContext } from "../components/Auth";
// Material UI Components
import { TextField, Button, Breadcrumbs, Typography, Snackbar } from "@material-ui/core";
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

export default function CrearActividadPage(props) {
  const classes = useStyles();
  const [form, setValues] = useState({
    nomActividad: "",
    descActividad: "",
    fechaEntregaAct: "",
    file: "",
  });
  const [selectedDate, setSelectedDate] = useState(`${new Date()}`);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Crear actividad";
    getEmprendedor();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Conseguir informacion del emprendedor a revisar
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

  // Funcion para saber la fecha que selecciona el usuario
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    setValues({
      ...form,
      [e.target.name]: file,
      fileName: e.target.files[0].name,
    });
  };

  // Función que envia los datos a Firebase
  const handleSubmit = async (event, e) => {
    event.preventDefault();
    const userUsername = Data.username;
    const userAvatar = Data.avatar;
    let refArchivo;
    if (form.file) {
      setLoading(true);
      const storageRef = firebaseConfig.storage().ref("actividades");
      const fileRef = storageRef.child(form.fileName);
      await fileRef.put(form.file);
      refArchivo = await fileRef.getDownloadURL();
    }

    try {
      await database
        .collection("actividades")
        .doc()
        .set(
          {
            ActHecho: false,
            fechaEntregaAct: selectedDate,
            mentorUsername: userData.username,
            mentorID: userData.uID,
            avatarMentor: userData.avatar,
            nomActividad: form.nomActividad,
            descActividad: form.descActividad,
            userID: id,
            userUsername: userUsername,
            userAvatar: userAvatar,
            archivo: refArchivo || null,
          },
          { merge: true }
        );
      setLoading(false);
      setOpen(true);
      setValues({ nomActividad: "", descActividad: "", fechaEntregaAct: "" });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (!userData) {
    return <Redirect to="/" />;
  }

  if (userData.rol === "emprendedor") {
    return <Redirect to="/home" />;
  }

  const fechaHoy = new Date();

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
                  <Typography color="textPrimary">Crear actividad</Typography>
                </Breadcrumbs>
              </div>
              <h3 className="text-center mt-4 font-weight-bold">Nueva actividad</h3>
              <div className="Home">
                <div className="AdminHome_container">
                  <form onSubmit={handleSubmit} className="crearActividad_container">
                    <TextField
                      label="Nombre de la actividad"
                      type="text"
                      name="nomActividad"
                      required
                      multiline
                      autoComplete="off"
                      value={form.nomActividad}
                      onChange={handleInput}
                      inputProps={{
                        maxLength: 35,
                      }}
                      placeholder="Ej. Realizar el modelo canvas"
                    />
                    <TextField
                      className=" MuiFormLabel-root mt-4"
                      label="Descripci&oacute;n"
                      type="text"
                      name="descActividad"
                      value={form.descActividad}
                      multiline
                      placeholder="Ej. Siga los siguientes pasos para realizar la actividad..."
                      helperText="Max. 250 caracteres"
                      required
                      autoComplete="off"
                      inputProps={{
                        maxLength: 250,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      rows={2}
                      onChange={handleInput}
                    />
                    <div className="buttons-crearActividad mt-3">
                      <div className="selectDate">
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            minDate={`${new Date()}`}
                            className="mr-2"
                            disableToolbar
                            variant="dialog"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Fecha de entrega"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider> */}
                        <p className="mb-0">Fecha de entrega</p>
                        <input
                          id="date"
                          label="Fecha de entrega"
                          name="fechaEntregaAct"
                          className="MuiFormLabel-root mr-2"
                          type="date"
                          min={`${fechaHoy.getFullYear()}-${
                            fechaHoy.getMonth() + 1
                          }-${fechaHoy.getDate()}`}
                          defaultValue={`${fechaHoy.getFullYear()}-${
                            fechaHoy.getMonth() + 1
                          }-${fechaHoy.getDate()}`}
                          // InputLabelProps={{
                          //   shrink: true,
                          // }}
                          onChange={handleDateChange}
                        />
                      </div>
                      <div>
                        <input
                          accept="media_type"
                          name="file"
                          // className={classes.input}
                          className="inputAct ml-2 mr-2 mt-3"
                          id="contained-button-file"
                          type="file"
                          onChange={handleInputFile}
                        />
                        {/* <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            className="ml-2 mr-2 mt-3"
                            endIcon={<PublishIcon />}
                          >
                            Subir archivo
                          </Button>
                        </label> */}
                        {/* <p className="mb-0">{form.file.name}</p> */}
                      </div>
                      <div>
                        <TextField
                          className=" MuiFormLabel-root mt-4 ml-2 mb-1"
                          label="Nombre del emprendedor"
                          type="text"
                          required
                          name="nombreEmprendedor"
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          autoComplete="off"
                          defaultValue={Data.username}
                        />
                      </div>
                    </div>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success">
                        Actividad añadida!
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
                      <Link to={`/perfil/${id}`} className=" text-decoration-none items-dropdown">
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
