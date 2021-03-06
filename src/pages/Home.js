import React, { useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
// Estilos CSS
// import "./styles/Home.css";
import "bootstrap/dist/css/bootstrap.css";
// Componentes utilizados
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
import Diagnostico from "../components/Autodiagnostico/Diagnostico";
import Hecho from "../components/Autodiagnostico/Hecho";
import AdminHome from "../components/AdminHome/AdminHome";
import EmprendedorHome from "../components/EmprendedorHome/EmprendedorHome";
import MentorHome from "../components/MentorHome/MentorHome";

export default function Home() {
  const { currentUser, userData } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Sinapsis UAO - Inicio";
  }, []);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavegationBar />

      {userData && userData.rol === "emprendedor" && userData.form_complete === false && (
        <Diagnostico />
      )}

      {userData &&
        userData.rol === "emprendedor" &&
        userData.form_complete &&
        !userData.ruta_asignada && <Hecho />}

      {userData && userData.rol === "emprendedor" && userData.ruta_asignada && (
        <>
          <div className="BreadCrumbs-container ">
            <h3 className="font-weight-bold text-center">Inicio</h3>
          </div>
          <EmprendedorHome />
        </>
      )}
      {userData && userData.rol === "admin" && (
        <>
          <div className="BreadCrumbs-container text-center">
            <h3 className="font-weight-bold">Inicio</h3>
          </div>
          <AdminHome />
        </>
      )}
      {userData && userData.rol === "mentor" && (
        <>
          <div className="BreadCrumbs-container text-center">
            <h3 className="font-weight-bold">Inicio</h3>
          </div>
          <MentorHome />
        </>
      )}
    </>
  );
}
