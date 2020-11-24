import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Conexión Base de datos
import { database } from "../../firebase/client";
// Material UI Components
import { Button, Tooltip, Zoom } from "@material-ui/core";
// Componentes Utilizados
import Loader from "../Loader";
import Avatar from "../Avatar";
import AdminActividades from "./AdminActividades";

function AdminHomeContainer() {
  const [novedades, setNovedades] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);

  useEffect(() => {
    getNovedades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para traer los emprendedores que acaban de hacer el autodiagnóstico
  const getNovedades = async () => {
    try {
      await database
        .collection("users")
        .where("ruta_asignada", "==", false)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          setLoading(true);

          querysnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });

          setNovedades(docs);

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
              {novedades.length === 0 ? (
                <div className="SinNovedades_container">
                  <div className="full-width">
                    <div className="SinNovedades-details">
                      <h6>No hay novedades. </h6>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {novedades.length > 0 ? (
                    <>
                      {novedades.map((novedad) => {
                        return (
                          <React.Fragment key={novedad.id}>
                            <div className="Novedades_container">
                              <div className="Novedades-details_container">
                                <Link
                                  to={`/perfil/${novedad.id}`}
                                  className="text-decoration-none text-dark"
                                >
                                  <div className="Novedades-details_containerr">
                                    <Avatar
                                      src={novedad.avatar}
                                      alt={"Avatar"}
                                      className="Novedades-Avatar_container"
                                    />
                                    <div className="Novedades-details">
                                      <span className="novedades-name">{novedad.username}</span> se
                                      ha registrado.{" "}
                                      <span className="novedades-otherText">
                                        Revisa su autodiagn&oacute;stico.
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                              <div className="Novedades-button_container">
                                <Link
                                  to={`/revisar/${novedad.id}`}
                                  className="text-decoration-none text-dark"
                                >
                                  <Tooltip
                                    title="Revisar"
                                    arrow
                                    TransitionComponent={Zoom}
                                    placement="right"
                                  >
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      className="Novedades-button"
                                    >
                                      Revisar
                                    </Button>
                                  </Tooltip>
                                </Link>
                              </div>
                            </div>
                            <AdminActividades />
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AdminHomeContainer;
