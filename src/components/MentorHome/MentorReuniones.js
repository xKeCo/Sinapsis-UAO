import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// Conexion con Firebase Database
import { database } from "../../firebase/client";
// Componentes Utilizados
import Loader from "../Loader";
import Avatar from "../Avatar";
import { AuthContext } from "../Auth";
// Material UI Components
import { IconButton, Button, Tooltip, Zoom } from "@material-ui/core";
import AddAlarmIcon from "@material-ui/icons/AddAlarm";

function MentorReuniones() {
  const [reuniones, setReuniones] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    getReuniones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Funcion para obtener todas las reuniones que tiene el mentor
  const getReuniones = async () => {
    try {
      await database
        .collection("reuniones")
        .where("mentorID", "==", userData.uID)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          setLoading(true);

          querysnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });

          setReuniones(docs);

          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  return (
    <div>
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
              {reuniones.length === 0 ? (
                <div className="SinNovedades_container">
                  <div className="full-width">
                    <div className="SinNovedades-details">
                      <div className="accordion-icon_container">
                        <h6 className="sinReuniones-h6">No hay reuniones programadas.</h6>

                        <Link to={`/revisar`}>
                          <Tooltip
                            title="Crear reunion"
                            arrow
                            TransitionComponent={Zoom}
                            placement="right"
                          >
                            <IconButton className="addboxicon_container">
                              <AddAlarmIcon className="addboxicon" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {reuniones.map((novedad) => {
                    return (
                      <div className="Novedades_container" key={novedad.id}>
                        <div className="Novedades-details_container">
                          <div className="Novedades-details_containerr">
                            <Avatar
                              src={novedad.avatarMentor}
                              alt={"Avatar"}
                              className="Novedades-Avatar_container"
                            />
                            <div className="Novedades-details-emprendedor">
                              <div className="">
                                <div>
                                  <span className="novedades-name ">{novedad.nomReunion}</span>
                                </div>
                                <span className="novedades-otherText-emprendedor">
                                  con {novedad.userUsername}
                                </span>
                              </div>
                              <div className="ml-5 novedades-fecha-reunion">
                                <span className=" novedades-otherText-emprendedor-reunion">
                                  Fecha
                                  <br />
                                  {novedad.fechaReunion}
                                </span>
                              </div>
                              <div className="ml-4 novedades-fecha-reunion">
                                <span className=" novedades-otherText-emprendedor-reunion">
                                  Hora <br />
                                  {novedad.horaReunion}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="Novedades-button_container">
                          <Link
                            to={`/actividad/${novedad.id}`}
                            className="text-decoration-none text-dark"
                          >
                            <Tooltip title="Ver" arrow TransitionComponent={Zoom} placement="right">
                              <Button
                                variant="contained"
                                color="primary"
                                className="Novedades-button"
                              >
                                Ir
                              </Button>
                            </Tooltip>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MentorReuniones;
