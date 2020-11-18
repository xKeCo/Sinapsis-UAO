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
  // Button,
  Breadcrumbs,
  Typography,
  //  Snackbar,
  Divider,
} from "@material-ui/core";
// import MuiAlert from "@material-ui/lab/Alert";
// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
// Material UI Icons
import { NavigateNext as NavigateNextIcon } from "@material-ui/icons";

// Estilos CSS
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// Material UI Styles
// import { makeStyles } from "@material-ui/core/styles";
import Avatar from "../components/Avatar";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: "none",
//   },
//   buttonsContainer: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "1.5rem",
//     marginBottom: "2rem",
//     alignItems: "center",
//   },
// }));

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

export default function ActividadInfo(props) {
  // const classes = useStyles();;
  // const [selectedDate, setSelectedDate] = useState(`${new Date()}`);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  // const [fileUrl, setFileUrl] = useState(null);
  // const [open, setOpen] = useState(false);

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

  // Función para saber lo que el usuario escribe
  // const handleInput = (event) => {
  //   setValues({
  //     ...form,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // Funcion para saber la fecha que selecciona el usuario
  // const handleDateChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };

  // const onChangeFile = async (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = firebaseConfig.storage().ref();
  //   const fileRef = storageRef.child(file.name);
  //   await fileRef.put(file);

  //   setFileUrl(await fileRef.getDownloadURL());
  // };

  // Función que envia los datos a Firebase
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const userUsername = Data.username;
  //   const userAvatar = Data.avatar;
  //   try {
  //     await database.collection("actividades").doc().set(
  //       {
  //         ActHecho: false,
  //         fechaEntregaAct: selectedDate,
  //         mentorUsername: userData.username,
  //         mentorID: userData.uID,
  //         avatarMentor: userData.avatar,
  //         nomActividad: form.nomActividad,
  //         descActividad: form.descActividad,
  //         userID: id,
  //         userUsername: userUsername,
  //         userAvatar: userAvatar,
  //         archivo: fileUrl,
  //       },
  //       { merge: true }
  //     );
  //     setOpen(true);
  //   } catch (error) {
  //     setLoading(false);
  //     setErrors(error);
  //   }
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

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
                  <Typography color="textPrimary">Actividad</Typography>
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
                    {/* {Data.archivo !== null && ( */}
                    <div className="mb-3">
                      <a href={Data.archivo} target="_blank" rel="noopener noreferrer">
                        <i aria-hidden="true">{Data.archivo}</i>
                      </a>
                    </div>
                    {/* )} */}
                    <Divider />
                    <h4 className="mt-3 font-weight-bold">Comentarios de la actividad</h4>
                    <div className="actividades-info-comments_container">
                      <Avatar src={Data.userAvatar} />
                      <TextField
                        className="ml-2 actividades-info-comments"
                        label="Escribe un comentario"
                        variant="filled"
                        size="small"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
