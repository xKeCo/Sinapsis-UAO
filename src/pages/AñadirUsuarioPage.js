import React, { useContext } from "react";
import AñadirUsuario from "../components/AdminHome/AñadirUsuario";
import NavegationBar from "../components/NavegationBar";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.css";
import { AuthContext } from "../components/Auth";
import { Redirect } from "react-router-dom";

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
      <div>
        <AñadirUsuario />
      </div>
    </>
  );
}

export default AñadirUsuarioPage;
