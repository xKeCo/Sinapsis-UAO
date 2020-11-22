import React, { useEffect, useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
// Estilos CSS
import "bootstrap/dist/css/bootstrap.css";
// Conexion Firebase Database
import { database } from "../firebase/client";
// Componentes utilizados
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
// import Loader from "../components/Loader";
import LoaderBottom from "../components/LoaderBottom";
import Avatar from "../components/Avatar";
// Material UI
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Drawer,
  Breadcrumbs,
  Typography,
} from "@material-ui/core";
// Material UI Icons
import {
  NavigateNext as NavigateNextIcon,
  ExitToApp as ExitToAppIcon,
  Edit as EditIcon,
  MoreHoriz as MoreHorizIcon,
  AddCircle as AddCircleIcon,
  PlaylistAdd as PlaylistAddIcon,
} from "@material-ui/icons/";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
    height: "200px",
  },
});

export default function PerfilUsuario(props) {
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Perfil";
    getDataEmprendedor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Conseguir informacion del emprendedor a revisar
  const getDataEmprendedor = async () => {
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

  // Drawer - Menu desplazable
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false,
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

        {/* <ListItem className="sideMenu-Item-emprendedor">
          <ListItemText primary={""} />
        </ListItem>

        <ListItem className="sideMenu-Item-emprendedor">
          <ListItemText primary={""} />
        </ListItem> */}

        {/* <Link to="/" className="nav-item text-decoration-none items-dropdown">
          <ListItem className="sideMenu-Item-emprendedor">
            <ListItemText primary={"Resultados del autodiagnóstico"} />
          </ListItem>
        </Link> */}
      </List>
    </div>
  );
  // Drawer - Menu desplazable END

  // Funcion para sacar a un usuario que no tiene la sesión activa
  if (!userData) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavegationBar />
      {Loading ? (
        <div>
          <LoaderBottom />
          {/* <Loader /> */}
        </div>
      ) : (
        <>
          {Errors ? (
            <h3>Ocurri&oacute; un error.</h3>
          ) : (
            <>
              {
                <>
                  <div className="BreadCrumbs-container ">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link
                        color="inherit"
                        to="/home"
                        className="text-decoration-none text-black-50"
                      >
                        Inicio
                      </Link>

                      {Data.uID !== userData.uID && (
                        <Typography color="textPrimary">Perfil del emprendedor</Typography>
                      )}
                      {Data.uID === userData.uID && (
                        <Typography color="textPrimary">Mi perfil</Typography>
                      )}
                    </Breadcrumbs>
                  </div>
                  <div className="todo-revisarautodiagnostico_container">
                    <h3 className="text-center mt-4 font-weight-bold mb-4">
                      Perfil del emprendedor
                    </h3>
                    <div className="datos-usuario_container">
                      <div className="UserImage_container">
                        <Avatar
                          src={Data.avatar}
                          alt={"Avatar"}
                          className="User-Avatar_container"
                        />
                        {Data.rol === "emprendedor" && (
                          <div className="FirstLogin_button_container mt-4">
                            <div>
                              <Link
                                to={`/emprendimientos/${id}`}
                                className=" text-decoration-none items-dropdown"
                              >
                                <Button
                                  type="input"
                                  variant="contained"
                                  className="button-1"
                                  color="primary"
                                >
                                  Emprendimientos
                                </Button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="UserInformation_container">
                        <List disablePadding className="RevisarAutodiagnostico-List">
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary="Nombre del emprendedor"
                              secondary={Data.username}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem>
                            <ListItemText primary="Correo del emprendedor" secondary={Data.email} />
                          </ListItem>
                          <Divider />

                          <ListItem>
                            <ListItemText
                              primary="Tel&eacute;fono del emprendedor"
                              secondary={Data.telefono}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem>
                            <ListItemText primary="Ciudad" secondary={Data.ciudad} />
                          </ListItem>
                          <Divider />

                          <ListItem>
                            <ListItemText
                              primary="V&iacute;nculo con la universidad"
                              secondary={Data.vinculoUni}
                            />
                          </ListItem>
                          <Divider />
                        </List>

                        <List disablePadding className="RevisarAutodiagnostico-List">
                          <ListItem>
                            <ListItemText primary="Cedula" secondary={Data.cedula} />
                          </ListItem>

                          <Divider />
                          <ListItem>
                            <ListItemText primary="G&eacute;nero" secondary={Data.genero} />
                          </ListItem>
                          <Divider />
                          <ListItem>
                            <ListItemText
                              primary="Fecha de nacimiento"
                              secondary={Data.nacimiento}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem>
                            <ListItemText primary="Direcci&oacute;n" secondary={Data.direccion} />
                          </ListItem>
                          <Divider />
                          {Data.programa !== "" && (
                            <ListItem>
                              <ListItemText
                                primary="Programa acad&eacute;mico"
                                secondary={Data.programa}
                              />
                            </ListItem>
                          )}
                          {Data.programa !== "" && <Divider />}
                        </List>
                      </div>
                      {Data.rol === "emprendedor" && Data.ruta_asignada && (
                        <>
                          <div className="FirstLogin_button_container ml-3 mr-3 mt-4">
                            <div>
                              <Link to="/home" className=" text-decoration-none items-dropdown">
                                <Button
                                  type="input"
                                  variant="contained"
                                  className="button-0"
                                  color="primary"
                                >
                                  Reporte de etapas
                                </Button>
                              </Link>
                            </div>
                          </div>
                          <div className="FirstLogin_button_container mr-3 ml-3 mt-4">
                            <div>
                              <Link to="/home" className=" text-decoration-none items-dropdown">
                                <Button
                                  type="input"
                                  variant="contained"
                                  className="button-0"
                                  color="primary"
                                >
                                  Actividades
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                      {userData.rol !== "emprendedor" &&
                        Data.ruta_asignada &&
                        Data.uID !== userData.uID && (
                          <React.Fragment key={"bottom"}>
                            <div className="FirstLogin_button_container ml-3 mr-3 mt-4">
                              <div>
                                <Button
                                  variant="contained"
                                  className="button-0"
                                  color="primary"
                                  endIcon={<MoreHorizIcon />}
                                  onClick={toggleDrawer("bottom", true)}
                                >
                                  Acciones
                                </Button>
                              </div>
                            </div>
                            <Drawer
                              anchor={"bottom"}
                              open={state["bottom"]}
                              onClose={toggleDrawer("bottom", false)}
                            >
                              {list("bottom")}
                            </Drawer>
                          </React.Fragment>
                        )}
                      {Data.uID === userData.uID && (
                        <div className="FirstLogin_button_container ml-3 mr-3 mt-4">
                          <div>
                            <Link to="/home" className=" text-decoration-none items-dropdown">
                              <Button
                                variant="contained"
                                className="button-0"
                                color="primary"
                                endIcon={<EditIcon />}
                              >
                                Editar Perfil
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="Button-volver mt-4 mb-5 ">
                      <Link to="/" className=" text-decoration-none items-dropdown">
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
                </>
              }
            </>
          )}
        </>
      )}
    </>
  );
}
