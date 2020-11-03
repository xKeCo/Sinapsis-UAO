import React, { useState, useEffect, useContext } from "react";
import { database } from "../../firebase/client";
import Loader from "../Loader";
// import { Button, Tooltip, Zoom } from "@material-ui/core";
import Avatar from "../Avatar";
// import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

function MentorNovedades() {
  const [novedades, setNovedades] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    getNovedades();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNovedades = async () => {
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

          setNovedades(docs);

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
            <h3>Ocurrio un error.</h3>
          ) : (
            <>
              {novedades.length === 0 ? (
                <div className="SinNovedades_container">
                  <div className="full-width">
                    <div className="SinNovedades-details">
                      <h6>A&uacute;n no tienes emprendedores asignados.</h6>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {novedades.map((novedad) => {
                    return (
                      <div className="Novedades_container" key={novedad.id}>
                        <div className="Novedades-details_container">
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

export default MentorNovedades;
