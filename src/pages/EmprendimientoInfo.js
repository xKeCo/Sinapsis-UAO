import React, { useEffect, useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
// Conexion con la base de datos
import { database } from "../firebase/client";
// Estilos CSS
import "bootstrap/dist/css/bootstrap.css";
// Componentes utilizados
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
import LoaderBottom from "../components/LoaderBottom";

// Material UI
import {
  TextField,
  Button,
  Breadcrumbs,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
// Material UI Icons
import {
  // Add as AddIcon,
  NavigateNext as NavigateNextIcon,
  ExitToApp as ExitToAppIcon,
  MoreHoriz as MoreHorizIcon,
  AddCircle as AddCircleIcon,
  PlaylistAdd as PlaylistAddIcon,
  Close as CloseIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from "@material-ui/icons/";
import { green, red, orange } from "@material-ui/core/colors";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "300px",
  },
});

const EmprendimientosInfo = (props) => {
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Emprendimiento";
    getDataEmprendimientos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Traer los datos del emprendimiento
  const getDataEmprendimientos = async () => {
    try {
      const res = await database.collection("proyectos").doc(id).get();

      setData(res.data());

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="ml-3">
        <ListItemIcon className="mt-3">
          <CloseIcon onClose={toggleDrawer("left", false)} />
        </ListItemIcon>

        <Link to={`/crearActividad/${id}`} className="nav-item text-decoration-none items-dropdown">
          <ListItem className="sideMenu-Item-emprendedor">
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Crear Actividad"} />
          </ListItem>
        </Link>

        <Link to="/" className="nav-item text-decoration-none items-dropdown">
          <ListItem className="sideMenu-Item-emprendedor">
            <ListItemIcon>
              <PlaylistAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Crear nuevo reporte"} />
          </ListItem>
        </Link>
        {/* <Link to="/" className="nav-item text-decoration-none items-dropdown">
          <ListItem className="sideMenu-Item-emprendedor">
            <ListItemText primary={"Resultados del autodiagnóstico"} />
          </ListItem>
        </Link> */}
      </List>
    </div>
  );
  // Drawer - Menu desplazable END

  if (!userData) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavegationBar />
      <div className="BreadCrumbs-container ">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/home" className="text-decoration-none text-black-50">
            Inicio
          </Link>
          <Link
            color="inherit"
            to={`/perfil/${Data.uID}`}
            className="text-decoration-none text-black-50"
          >
            Perfil del emprendedor
          </Link>
          <Link
            color="inherit"
            to={`/emprendimientos/${Data.uID}`}
            className="text-decoration-none text-black-50"
          >
            Emprendimientos
          </Link>
          <Typography color="textPrimary">Informaci&oacute;n del emprendimiento</Typography>
        </Breadcrumbs>
      </div>
      {Loading ? (
        <div>
          <LoaderBottom />
        </div>
      ) : (
        <>
          {Errors ? (
            <h3>Ocurri&oacute; un error.</h3>
          ) : (
            <>
              <div className="Home">
                <div className="EmprendimientoInfo_container ">
                  <h3 className="text-center font-weight-bold mb-4">
                    Informaci&oacute;n del emprendimiento <br />(
                    {Data.estado === "activo" && (
                      <FiberManualRecordIcon style={{ color: green[500] }} />
                    )}
                    {Data.estado === "ausente" && (
                      <FiberManualRecordIcon style={{ color: orange[500] }} />
                    )}
                    {Data.estado === "inactivo" && (
                      <FiberManualRecordIcon style={{ color: red[500] }} />
                    )}
                    )
                  </h3>

                  <div className="w-100">
                    <TextField
                      label="Nombre de la iniciativa"
                      type="text"
                      name="nombreIniciativa"
                      multiline
                      disabled
                      value={Data.nombreIniciativa}
                      // onChange={handleInput}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className=" w-100 mt-3">
                    <TextField
                      label="Descripci&oacute;n de la iniciativa"
                      type="text"
                      name="descIniciativa"
                      multiline
                      disabled
                      value={Data.descIniciativa}
                      // onChange={handleInput}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="w-100 EmprendimientoInfo-subDetails_container">
                    <div className="w-100 EmprendimientoInfo-subDetails_container">
                      <div className="mt-3 datos">
                        <TextField
                          label="Tipo de emprendimiento"
                          type="text"
                          name="tipoEmprendimiento"
                          multiline
                          disabled
                          value={Data.tipoEmprendimiento}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="mt-3 datos">
                        <TextField
                          label="Tipo de econom&iacute;a"
                          type="text"
                          name="tipoEconomia"
                          multiline
                          disabled
                          value={Data.tipoEconomia}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-100 EmprendimientoInfo-subDetails_container">
                      <div className="mt-3 datos">
                        <TextField
                          label="Sector de la econom&iacute;a"
                          type="text"
                          name="tipoEmprendimiento"
                          multiline
                          disabled
                          value={Data.tipoEmprendimiento}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="mt-3 datos">
                        <TextField
                          label="Etapa actual"
                          type="text"
                          name="tipoEmprendimiento"
                          multiline
                          disabled
                          value={Data.ruta}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-100 EmprendimientoInfo-subDetails_container">
                    <div className="mt-3 datos">
                      <TextField
                        label="Emprendedor"
                        type="text"
                        name="username"
                        multiline
                        disabled
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
                        disabled
                        value={Data.mentor}
                        // onChange={handleInput}
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-100 mt-3">
                    <React.Fragment key={"left"}>
                      <div className="FirstLogin_button_container ml-3 mr-3 mt-4">
                        <div>
                          <Button
                            variant="contained"
                            className="button-0"
                            color="primary"
                            endIcon={<MoreHorizIcon />}
                            onClick={toggleDrawer("left", true)}
                          >
                            Acciones
                          </Button>
                        </div>
                        <Drawer
                          anchor={"left"}
                          open={state["left"]}
                          onClose={toggleDrawer("left", false)}
                        >
                          {list("left")}
                        </Drawer>
                      </div>
                    </React.Fragment>
                    <div className="EmprendimientoInfo-Button-volver mt-4 mb-5 ">
                      <Link
                        to={`/emprendimientos/${Data.uID}`}
                        className=" text-decoration-none items-dropdown"
                      >
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
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EmprendimientosInfo;
