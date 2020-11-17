import React, { useEffect, useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
// Conexion con la base de datos
import { database } from "../firebase/client";
// Estilos CSS
import "bootstrap/dist/css/bootstrap.css";
// Componentes utilizados
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
import Loader from "../components/Loader";
// Material UI
import { Button, Breadcrumbs, Typography } from "@material-ui/core";
// Material UI Icons
import {
  Add as AddIcon,
  NavigateNext as NavigateNextIcon,
  ExitToApp as ExitToAppIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from "@material-ui/icons/";
import { green, red, orange } from "@material-ui/core/colors";

const EmprendimientosPage = (props) => {
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Emprendimientos";
    getDataEmprendimientos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataEmprendimientos = async () => {
    try {
      await database
        .collection("proyectos")
        .where("uID", "==", id)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          setLoading(true);

          querysnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });

          setData(docs);

          setLoading(false);
        });
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
      <div className="BreadCrumbs-container ">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/home" className="text-decoration-none text-black-50">
            Inicio
          </Link>
          <Link color="inherit" to={`/perfil/${id}`} className="text-decoration-none text-black-50">
            Perfil del emprendedor
          </Link>
          <Typography color="textPrimary">Emprendimientos</Typography>
        </Breadcrumbs>
      </div>
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
              {Data.map((data) => {
                return (
                  <React.Fragment key={data.id}>
                    <Link
                      to={`/emprendimientoInfo/${data.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="EmprendimientoPage" key={data.id}>
                        <div className="EmprendimientoPage_container">
                          <div className="mr-1">
                            {data.estado === "activo" && (
                              <FiberManualRecordIcon style={{ color: green[500] }} />
                            )}
                            {data.estado === "ausente" && (
                              <FiberManualRecordIcon style={{ color: orange[500] }} />
                            )}
                            {data.estado === "inactivo" && (
                              <FiberManualRecordIcon style={{ color: red[500] }} />
                            )}
                          </div>
                          <div className="EmprendimientoPage-details_container">
                            <div className="Novedades-details">
                              <h5 className="font-weight-bold mb-0">{data.nombreIniciativa}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </React.Fragment>
                );
              })}
            </>
          )}
        </>
      )}
      <div className="FirstLogin_button_container ml-3 mr-3 mt-4">
        <div>
          <Link to="/home" className=" text-decoration-none items-dropdown">
            <Button
              type="input"
              variant="contained"
              className="button-0"
              color="primary"
              endIcon={<AddIcon />}
            >
              Añadir nuevo emprendimiento
            </Button>
          </Link>
        </div>
      </div>
      <div className="Button-volver mt-4 mb-5 ">
        <Link to={`/perfil/${id}`} className=" text-decoration-none items-dropdown">
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
    </>
  );
};

export default EmprendimientosPage;
