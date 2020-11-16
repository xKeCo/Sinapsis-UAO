import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// Conexión con la base de datos
import { database } from "../../firebase/client";
// Material UI
import {
  // Button,
  Tooltip,
  Zoom,
} from "@material-ui/core";
// Importar el usuario actual
import { AuthContext } from "../../components/Auth";
// Componentes Utilizados
import Avatar from "../Avatar";
import Loader from "../Loader";

function EmprendedorActividades() {
  const [actividades, setActividades] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    getActividades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para traer las actividades relacionadas con el usuario
  const getActividades = async () => {
    try {
      await database
        .collection("actividades")
        .where("userID", "==", userData.uID)
        .where("ActHecho", "==", false)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          setLoading(true);

          querysnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });

          setActividades(docs);

          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  return (
    <div className="w-100">
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {Errors ? (
            <h3>Ocurri&oacute; un error</h3>
          ) : (
            <>
              {actividades.length === 0 ? (
                <div className="SinNovedades_container">
                  <div className="full-width">
                    <div className="SinNovedades-details">
                      <h6>No hay acividades por hacer. Yujuu! </h6>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {actividades.map((novedad) => {
                    return (
                      <div className="Novedades_container" key={novedad.id}>
                        <div className="Novedades-details_container">
                          <Link
                            to={`/actividad/${novedad.id}`}
                            className="text-decoration-none text-dark"
                          >
                            <Tooltip
                              title="Ver actividad"
                              arrow
                              TransitionComponent={Zoom}
                              placement="right"
                            >
                              <div className="Novedades-details_containerr">
                                <Avatar
                                  src={novedad.avatarMentor}
                                  alt={"Avatar"}
                                  className="Novedades-Avatar_container"
                                />
                                <div className="Novedades-details-emprendedor">
                                  <div>
                                    <div className="ActNombre-container">
                                      <span className="novedades-name ">
                                        {novedad.nomActividad}
                                      </span>
                                    </div>
                                    <span className="novedades-otherText-mentorName">
                                      Por {novedad.mentorUsername}
                                    </span>
                                  </div>
                                  <div className="mr-3 novedades-fecha">
                                    <span className=" novedades-otherText-emprendedor">
                                      Fecha de entrega
                                      <br />
                                      {novedad.fechaEntregaAct}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Tooltip>
                          </Link>
                        </div>
                        {/* <div className="Novedades-button_container">
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
                                Ver
                              </Button>
                            </Tooltip>
                          </Link>
                        </div> */}
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

export default EmprendedorActividades;
