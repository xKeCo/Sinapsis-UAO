import React, { useState, useEffect, useContext } from "react";
import { database } from "../../firebase/client";
import Loader from "../Loader";
import { Button, Tooltip, Zoom } from "@material-ui/core";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";

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
              {novedades.length === 0 ? (
                <div className="SinNovedades_container">
                  <div className="full-width">
                    <div className="SinNovedades-details">
                      <h6>No hay novedades.</h6>
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
                              src={novedad.userAvatar}
                              alt={"Avatar"}
                              className="Novedades-Avatar_container"
                            />
                            <div className="Novedades-details">
                              <span className="novedades-name">{novedad.UserUsername}</span> ha
                              entregado la actividad:{" "}
                              <span className="novedades-otherTex">"{novedad.nomActividad}"</span>
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
                                Ver
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

export default MentorNovedades;
