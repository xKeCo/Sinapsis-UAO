import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
// Componentes Utilizados
import AñadirUsuario from "../components/AdminHome/AñadirUsuario";
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
// Estilos CSS
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.css";
// Material UI Components
import { Breadcrumbs, Typography } from "@material-ui/core";
// Material UI Icons
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

function AñadirUsuarioPage() {
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return <Redirect to="/" />;
  }

  if (userData.rol !== "admin") {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <NavegationBar />
      <div className="BreadCrumbs-container ">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/home" className="text-decoration-none text-black-50">
            Inicio
          </Link>
          <Typography color="textPrimary">Añadir usuario</Typography>
        </Breadcrumbs>
      </div>
      <div>
        <AñadirUsuario />
      </div>
    </>
  );
}

export default AñadirUsuarioPage;
