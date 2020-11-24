import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// Conexion con Firebase Database
import { database } from "../../firebase/client";
// Componentes Utilizados
import Loader from "../Loader";
import Avatar from "../Avatar";
import { AuthContext } from "../Auth";
// Material UI Components
import { Tooltip, Zoom } from "@material-ui/core";

function AdminActividades() {
  const [novedades, setNovedades] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    getNovedades();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Funcion para obtener todas las actividades que han entregado
  const getNovedades = async () => {
    try {
      await database
        .collection("actividades")
        .where("mentorID", "==", userData.uID)
        .where("ActHecho", "==", true)
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
              {novedades.map((novedad) => {
                return (
                  <div className="Novedades_container" key={novedad.id}>
                    <Link
                      to={`/actividad/${novedad.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <Tooltip title="Ver" arrow TransitionComponent={Zoom} placement="right">
                        <div className="Novedades-details_container">
                          <div className="Novedades-details_containerr">
                            <Avatar
                              src={novedad.userAvatar}
                              alt={"Avatar"}
                              className="Novedades-Avatar_container"
                            />
                            <div className="Novedades-details">
                              <span className="novedades-name">{novedad.userUsername}</span> ha
                              entregado la actividad:{" "}
                              <span className="novedades-otherTex">"{novedad.nomActividad}"</span>
                            </div>
                          </div>
                        </div>
                      </Tooltip>
                    </Link>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AdminActividades;
