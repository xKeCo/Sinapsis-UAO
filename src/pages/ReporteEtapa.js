import React, { useState, useContext, useEffect } from "react";
import {
  Link,
  Redirect,
  // useHistory,
} from "react-router-dom";
// Conexión con la base de datos
// import firebaseConfig from "../firebase/client";
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
  // Divider,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Box,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
// Material UI Icons
import {
  NavigateNext as NavigateNextIcon,
  ExitToApp as ExitToAppIcon,
  // Publish as PublishIcon,
  // Close as CloseIcon,
  // Send as SendIcon,
  // CheckCircle as CheckCircleIcon,
  // Cancel as CancelIcon,
} from "@material-ui/icons";

// Estilos CSS
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  //  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import Avatar from "../components/Avatar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
    width: "100%",
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 300 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#9a66a8",
  },
}))(LinearProgress);

export default function ReporteEtapa(props) {
  const [
    loading,
    // , setLoading
  ] = useState(false);
  const [
    errors,
    // , setErrors
  ] = useState(null);
  const [
    open,
    // , setOpen
  ] = useState(false);
  const { userData } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [Data, setData] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [actividadesHechas, setActividadesHechas] = useState([]);

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Reporte";
    getActividadesPendientes();
    getActividadesCompletadas();
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Cerrar los Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  // Función para traer las actividades relacionadas con el usuario
  const getUser = async () => {
    try {
      const res = await database.collection("users").doc(id).get();
      setData(res.data());
    } catch (error) {}
  };

  // Función para traer las actividades relacionadas con el usuario
  const getActividadesPendientes = async () => {
    try {
      await database
        .collection("actividades")
        .where("userID", "==", id)
        .where("ActHecho", "==", false)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          querysnapshot.forEach((doc) => {
            docs.push({ id: doc.id });
          });

          setActividades(docs);
        });
    } catch (error) {}
  };

  const getActividadesCompletadas = async () => {
    try {
      await database
        .collection("actividades")
        .where("userID", "==", id)
        .where("ActCompletada", "==", true)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          querysnapshot.forEach((doc) => {
            docs.push({ id: doc.id });
          });

          setActividadesHechas(docs);
        });
    } catch (error) {}
  };

  let now = 0;

  if (actividadesHechas.length === 0) {
    now = 0;
  } else {
    now = Math.round((actividadesHechas.length / actividades.length) * 100);
  }

  function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <h3 variant="caption" component="div" color="textSecondary">
            {actividadesHechas.length} de {actividades.length}
          </h3>
        </Box>
      </Box>
    );
  }

  // const history = useHistory();

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
                  <Link
                    color="inherit"
                    to={`/perfil/${id}`}
                    className="text-decoration-none text-black-50"
                  >
                    Perfil del emprendedor
                  </Link>
                  <Typography color="textPrimary">Reporte de etapa</Typography>
                </Breadcrumbs>
              </div>
              <div className="">
                <Avatar src={Data.avatar} alt={"Avatar"} text={Data.username} />
              </div>
              <div className="Home">
                <h3 className="font-weight-bold mt-2 mb-2">Progreso de etapa</h3>
                <div className="EmprendimientoInfo_container">
                  <div className="w-100 text-center LinearProgressEtapa">
                    <BorderLinearProgress variant="determinate" value={now} />
                    <h3 className="font-weight-bold mt-3">{`${now}%`}</h3>
                  </div>

                  <div className="Reporte-ActivitiesInfo_container">
                    <h3 className="font-weight-bold mt-2 mb-4">Progreso de Actividades</h3>
                    <CircularProgressWithLabel value={now} size={"150px"} />
                  </div>
                </div>
              </div>
              <div className="Button-volver mt-4 mb-5 ">
                <Link to={`/perfil/${id}`} className=" text-decoration-none items-dropdown">
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

                {/* Alertas */}
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success">
                    Actividad entregada!
                  </Alert>
                </Snackbar>
                {/* Dialogo para marcar como completo */}
                <Dialog
                  open={openDialog}
                  onClose={() => setOpenDialog(false)}
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
                    <Button onClick={() => {}} color="secondary">
                      Marcar como completada
                    </Button>
                    <Button onClick={() => setOpenDialog(false)} color="primary" autoFocus>
                      Cancelar
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
