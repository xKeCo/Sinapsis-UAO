import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
// Conexión con la base de datos
import firebaseConfig from "../firebase/client";
import { database } from "../firebase/client";
// Componentes Utilizados
import NavegationBar from "../components/NavegationBar";
import LoaderBottom from "../components/LoaderBottom";
import { AuthContext } from "../components/Auth";
// Material UI Components
import {
  // TextField,
  Button,
  Breadcrumbs,
  Typography,
  Snackbar,
  Divider,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
// Material UI Icons
import {
  NavigateNext as NavigateNextIcon,
  ExitToApp as ExitToAppIcon,
  Publish as PublishIcon,
  // Close as CloseIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@material-ui/icons";

// Estilos CSS
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

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

export default function ActividadInfo(props) {
  const classes = useStyles();
  // const [selectedDate, setSelectedDate] = useState(`${new Date()}`);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  // const [fileUrl, setFileUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openActIncomplete, setOpenActIncomplete] = useState(false);
  const [openActComplete, setOpenComplete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogComplete, setOpenDialogComplete] = useState(false);
  const [form, setValues] = useState({
    file: "",
  });
  const history = useHistory();
  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Crear actividad";
    getActividadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Conseguir informacion del emprendedor a revisar
  const getActividadData = async () => {
    try {
      setLoading(true);
      const res = await database.collection("actividades").doc(id).get();

      setData(res.data());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  // Funcion para enviar los dato
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
    const fileName = form.file.name;
    let refArchivo;
    if (form.file) {
      setLoading(true);
      const storageRef = firebaseConfig.storage().ref("actividades");
      const fileRef = storageRef.child(form.fileName);
      await fileRef.put(form.file);
      refArchivo = await fileRef.getDownloadURL();
      console.log("Enviado");
      try {
        await database.collection("actividades").doc(id).set(
          {
            actFileName: fileName,
            archivoActURL: refArchivo,
            ActHecho: true,
          },
          { merge: true }
        );
        setLoading(false);
        setOpen(true);
        setTimeout(() => {
          history.push("/home");
        }, 600);
      } catch (error) {
        setLoading(false);
        setErrors(error);
      }
    } else {
      setOpenError(true);
      return null;
    }
  };

  // Funcion para marcar como incompleto una actividad
  const handleIncompleteActivity = async () => {
    try {
      await database.collection("actividades").doc(id).set(
        {
          ActHecho: false,
        },
        { merge: true }
      );
      setLoading(false);
      setOpenActIncomplete(true);
      setTimeout(() => {
        history.push("/home");
      }, 600);
      // setValues({ file: "" });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  // Funcion para marcar como incompleto una actividad
  const handleCompleteActivity = async () => {
    try {
      await database.collection("actividades").doc(id).set(
        {
          ActCompletada: true,
          ActHecho: false,
        },
        { merge: true }
      );
      setLoading(false);
      setOpenComplete(true);
      setTimeout(() => {
        history.push("/home");
      }, 600);
      // setValues({ file: "" });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  // Cerrar los Snackbar
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
                  <Typography color="textPrimary">Informaci&oacute;n de la actividad</Typography>
                </Breadcrumbs>
              </div>
              <div className="Home-Actividad-Info_container">
                <div className="actividades-info_container">
                  <div className="actividades-info-details_container">
                    <h3 className="mt-4 font-weight-bold">{Data.nomActividad}</h3>
                    <h6 className="mt-4 font-weight-bold">
                      Fecha de entrega:
                      <span> {Data.fechaEntregaAct}</span>
                    </h6>
                    <Divider />
                    <div className="overflow-wrap">
                      <p className="mt-3 font-weight-normal">{Data.descActividad}</p>
                    </div>
                    {/* {Data.archivoURL !== null && ( */}
                    <div className="mb-3">
                      <a href={Data.archivoURL} target="_blank" rel="noopener noreferrer">
                        <i aria-hidden="true">{Data.fileName}</i>
                      </a>
                    </div>
                    {/* )} */}
                    <Divider />
                    {/* <h4 className="mt-3 font-weight-bold">Comentarios de la actividad</h4>
                    <div className="actividades-info-comments_container">
                      <Avatar src={userData.avatar} />
                      <TextField
                        className="ml-2 actividades-info-comments"
                        label="Escribe un comentario"
                        variant="filled"
                        size="small"
                        disabled
                      />
                    </div> */}
                  </div>

                  {Data.mentorID === userData.uID ? (
                    <div className="actividades-enviar_container">
                      <div className="actividades-enviar-details_container">
                        <h5>
                          Entrega de <br />
                          <span className="text-capitalize">{Data.userUsername}</span>
                        </h5>
                        <div>
                          <a href={Data.archivoActURL} target="_blank" rel="noopener noreferrer">
                            <i aria-hidden="true">{Data.actFileName}</i>
                          </a>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: green[500] }}
                            className="w-100 mt-2 text-white"
                            endIcon={<CheckCircleIcon />}
                            onClick={() => setOpenDialogComplete(true)}
                          >
                            Marcar como completado
                          </Button>
                          <Button
                            variant="contained"
                            color="default"
                            style={{ backgroundColor: red[500] }}
                            className="w-100 mt-2 text-white"
                            endIcon={<CancelIcon />}
                            onClick={() => setOpenDialog(true)}
                          >
                            Marcar como incompleto
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="actividades-enviar_container">
                      <div className="actividades-enviar-details_container">
                        <h5>Tu entrega</h5>
                        <div className="actividades-enviar-buttons_container">
                          <p className="mb-0">{form.file.name || ""}</p>
                          <input
                            accept="media_type"
                            name="file"
                            className={classes.input}
                            // className="inputAct ml-2 mr-2 mt-3"
                            id="contained-button-file"
                            type="file"
                            onChange={handleInputFile}
                          />
                          <label className="labelButton" htmlFor="contained-button-file">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              className="w-100"
                              endIcon={<PublishIcon />}
                            >
                              Subir archivo
                            </Button>
                          </label>
                          <Button
                            variant="contained"
                            color="default"
                            className="w-100 mt-1 text-white"
                            endIcon={<SendIcon />}
                            onClick={handleSubmit}
                            style={{ backgroundColor: green[500] }}
                          >
                            Enviar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="Button-volver mt-4 mb-5 ">
                  <Link to={`/home`} className=" text-decoration-none items-dropdown">
                    <Button
                      variant="contained"
                      color="secondary"
                      className="button-2"
                      startIcon={<ExitToAppIcon />}
                    >
                      Volver
                    </Button>
                  </Link>

                  {/* Alertas */}
                  <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                      Actividad entregada!
                    </Alert>
                  </Snackbar>
                  <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                      Debe agregar un archivo!
                    </Alert>
                  </Snackbar>
                  <Snackbar open={openActIncomplete} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                      Se le ha asignado la actividad de nuevo al emprendedor!
                    </Alert>
                  </Snackbar>
                  <Snackbar open={openActComplete} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                      Se ha marcado la actividad como completada!
                    </Alert>
                  </Snackbar>

                  {/* Dialogo para marcar como incompleto */}
                  <Dialog
                    open={openDialog}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"¿Desea marcar como incompleta esta actividad?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Una vez marcada como incompleta se le mostrara de nuevo la informacion de la
                        actividad al emprendedor asignado. ¿Esta seguro?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleIncompleteActivity} color="secondary">
                        Marcar como incompleta
                      </Button>
                      <Button onClick={() => setOpenDialog(false)} color="primary" autoFocus>
                        Cancelar
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* Dialogo para marcar como completo */}
                  <Dialog
                    open={openDialogComplete}
                    onClose={() => setOpenDialogComplete(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"¿Desea marcar como completada esta actividad?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Una vez marcada como completa no se podra actualizar. ¿Esta seguro?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCompleteActivity} color="secondary">
                        Marcar como completada
                      </Button>
                      <Button
                        onClick={() => setOpenDialogComplete(false)}
                        color="primary"
                        autoFocus
                      >
                        Cancelar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
