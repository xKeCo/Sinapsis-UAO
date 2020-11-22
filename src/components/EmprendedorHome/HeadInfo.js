import React, { useContext, useEffect, useState } from "react";
// Estilos CSS
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// Componentes utilizados
import { AuthContext } from "../../components/Auth";
import { database } from "../../firebase/client";

function HeadInfo() {
  const { userData } = useContext(AuthContext);
  const [actividades, setActividades] = useState([]);
  const [actividadesHechas, setActividadesHechas] = useState([]);

  useEffect(() => {
    getActividadesPendientes();
    getActividadesHechas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para traer las actividades relacionadas con el usuario
  const getActividadesPendientes = async () => {
    try {
      await database
        .collection("actividades")
        .where("userID", "==", userData.uID)
        .where("ActHecho", "==", false)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          querysnapshot.forEach((doc) => {
            docs.push({ id: doc.id });
          });

          setActividades(docs);
        });
    } catch (error) {}
  };

  // Función para traer las actividades relacionadas con el usuario
  const getActividadesHechas = async () => {
    try {
      await database
        .collection("actividades")
        .where("userID", "==", userData.uID)
        .where("ActHecho", "==", true)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          querysnapshot.forEach((doc) => {
            docs.push({ id: doc.id });
          });

          setActividadesHechas(docs);
        });
    } catch (error) {}
  };

  return (
    <div className="head_container ">
      <div className="head-ruta_container">
        <div>
          <span className="ml-3">Etapa Actual:</span> <br />
          <h3 className="mb-3 ml-3 mr-3 font-weight-bold">{userData.etapa}</h3>
        </div>
      </div>
      <div className="head-activitiesReport_container">
        <div className="head-activity">
          <h1 className="mr-2 mb-3 h1-headInfo">{actividadesHechas.length}</h1>
          <span>Actividades completas</span>
        </div>
        <div className="head-activity">
          <h1 className="mr-2 mb-3 h1-headInfo">{actividades.length}</h1>
          <span>Actividades pendientes</span>
        </div>
      </div>
    </div>
  );
}

export default HeadInfo;
