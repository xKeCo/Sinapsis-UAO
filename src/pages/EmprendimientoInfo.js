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
  // Add as AddIcon,
  NavigateNext as NavigateNextIcon,
  ExitToApp as ExitToAppIcon,
  MoreHoriz as MoreHorizIcon,
} from "@material-ui/icons/";
// import { green, red, orange } from "@material-ui/core/colors";

const EmprendimientosInfo = (props) => {
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Emprendimiento";
    getDataEmprendimientos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataEmprendimientos = async () => {
    try {
      const res = await database.collection("proyectos").doc(id).get();

      console.log(res.data());
      setData(res.data());

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
      <div className="BreadCrumbs-container ">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/home" className="text-decoration-none text-black-50">
            Inicio
          </Link>
          <Link
            color="inherit"
            to={`/perfil/${Data.uID}`}
            className="text-decoration-none text-black-50"
          >
            Perfil del emprendedor
          </Link>
          <Link
            color="inherit"
            to={`/emprendimientos/${Data.uID}`}
            className="text-decoration-none text-black-50"
          >
            Emprendimientos
          </Link>
          <Typography color="textPrimary">Informaci&oacute;n del emprendimiento</Typography>
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
              <h1>hola</h1>
            </>
          )}
        </>
      )}
      <div className="FirstLogin_button_container ml-3 mr-3 mt-4">
        <div>
          {/* <Link to="/home" className=" text-decoration-none items-dropdown"> */}
          <Button
            type="input"
            variant="contained"
            className="button-0"
            color="primary"
            endIcon={<MoreHorizIcon />}
          >
            Acciones
          </Button>
          {/* </Link> */}
        </div>
      </div>
      <div className="Button-volver mt-4 mb-5 ">
        <Link to={`/emprendimientos/${Data.uID}`} className=" text-decoration-none items-dropdown">
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

export default EmprendimientosInfo;
