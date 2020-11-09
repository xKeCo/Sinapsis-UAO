import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// Conexión con Firebase Database
import { database } from "../../firebase/client";
// Componentes Utilizados
import Loader from "../Loader";
import Avatar from "../Avatar";
import { AuthContext } from "../Auth";
// import { Button, Tooltip, Zoom } from "@material-ui/core";
// Estilos CSS
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

function MentorEmprendedoresAsignado() {
  const [emprendedor, setEmprendedor] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    getEmprendedores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Funcion para obtener los emprendedores asignados del mentor
  const getEmprendedores = async () => {
    try {
      await database
        .collection("users")
        .where("mentor", "==", userData.username)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          setLoading(true);

          querysnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });

          setEmprendedor(docs);

          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  return (
    <React.Fragment>
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
              {emprendedor.length === 0 ? (
                <div className="SinNovedades_container">
                  <div className="full-width">
                    <div className="SinNovedades-details">
                      <h6>A&uacute;n no tienes emprendedores asignados.</h6>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {emprendedor.map((novedad) => {
                    return (
                      <div className="Novedades_container" key={novedad.id}>
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
                                <span className="novedades-name">
                                  {novedad.username}
                                  <br />
                                </span>
                                <span className="novedades-otherText-mentor">
                                  Etapa actual:{" "}
                                  <span className="font-weight-bold">{novedad.ruta}</span>
                                </span>
                              </div>
                            </div>
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
    </React.Fragment>
  );
}

export default MentorEmprendedoresAsignado;
