import React, { useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import "./styles/Home.css";
import "bootstrap/dist/css/bootstrap.css";
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
import { Redirect } from "react-router-dom";
import Diagnostico from "../components/Autodiagnostico/Diagnostico";
import Hecho from "../components/Autodiagnostico/Hecho";
import AdminHome from "../components/AdminHome/AdminHome";
import EmprendedorHome from "../components/EmprendedorHome/EmprendedorHome";
import MentorHome from "../components/MentorHome/MentorHome";

export default function Home() {
  const { currentUser, userData } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Sinapsis UAO - Home";
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

      {userData && userData.rol === "emprendedor" && userData.ruta_asignada && <EmprendedorHome />}
      {userData && userData.rol === "admin" && <AdminHome />}
      {userData && userData.rol === "mentor" && <MentorHome />}
    </>
  );
}
