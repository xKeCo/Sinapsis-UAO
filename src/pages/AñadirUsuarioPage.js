import React, { useContext } from "react";
import AñadirUsuario from "../components/AdminHome/AñadirUsuario";
import NavegationBar from "../components/NavegationBar";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.css";
import { AuthContext } from "../components/Auth";
import { Redirect } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

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
