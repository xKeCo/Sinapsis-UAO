import React, { useEffect, useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
import { Redirect } from "react-router-dom";
import { database } from "../firebase/client";
import Loader from "../components/Loader";
import { List, ListItem, ListItemText, Divider, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";

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
  }, []);

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

  if (!userData) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavegationBar />
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {Errors ? (
            <h3>Ocurri&oacute; un error.</h3>
          ) : (
            <>
              {
                <>
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
                        <div className="FirstLogin_button_container mt-4">
                          <div>
                            <Link to="/home">
                              <Button
                                type="input"
                                variant="contained"
                                className="button-1"
                                color="primary"
                                // onClick={handleAddInfo}
                              >
                                Emprendimientos
                              </Button>
                            </Link>
                          </div>
                        </div>
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
                      <div className="FirstLogin_button_container ml-3 mr-3 mt-4">
                        <div>
                          <Link to="/home">
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
                          <Link to="/home">
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
                    </div>

                    <div className="Button-volver mt-4 mb-5 ">
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
                </>
              }
            </>
          )}
        </>
      )}
    </>
  );
}
