import React, { useState, useEffect } from "react";
import { database } from "../firebase/client";
import Loader from "../components/Loader";
import { Button, Tooltip, Zoom } from "@material-ui/core";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";

function AdminHomeContainer() {
  const [novedades, setNovedades] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);

  useEffect(() => {
    getNovedades();
  }, []);

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
            <h1>Ocurrio un errorsito</h1>
          ) : (
            <>
              {novedades.map((novedad) => {
                return (
                  <div key={novedad.id}>
                    <div className="Novedades_container">
                      <div className="Novedades-details_container">
                        <div className="Novedades-details_containerr">
                          <Avatar
                            src={novedad.avatar}
                            alt={"Avatar"}
                            className="Novedades-Avatar_container"
                          />
                          <div className="Novedades-details">
                            <span className="novedades-name">{novedad.username}</span> se ha
                            registrado. Revisalo, asignale un mentor y una ruta.
                          </div>
                        </div>
                      </div>
                      <div className="Novedades-button_container">
                        <Link
                          to={`/check/${novedad.id}`}
                          className="text-decoration-none text-dark"
                        >
                          <Tooltip title="Revisar" arrow TransitionComponent={Zoom}>
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

export default AdminHomeContainer;
