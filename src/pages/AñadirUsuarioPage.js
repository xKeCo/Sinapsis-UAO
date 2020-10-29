import React, { useContext } from "react";
import AñadirUsuario from "../components/AñadirUsuario";
import NavegationBar from "../components/NavegationBar";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.css";
import { AuthContext } from "../components/Auth";
import { Redirect } from "react-router-dom";

function AñadirUsuarioPage() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/" />;
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
