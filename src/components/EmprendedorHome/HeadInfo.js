import React, { useContext, useEffect, useState } from "react";
// Estilos CSS
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// Componentes utilizados
import { AuthContext } from "../../components/Auth";
import { database } from "../../firebase/client";
// import { Link } from "react-router-dom";

function HeadInfo() {
  const { userData } = useContext(AuthContext);
  const [actividades, setActividades] = useState([]);
  const [actividadesHechas, setActividadesHechas] = useState([]);
  const [actividadesEnviadas, setActividadesEnviadas] = useState([]);
  const [emprendimientos, setEmprendimientos] = useState([]);

  useEffect(() => {
    getActividadesPendientes();
    getActividadesEnviadas();
    getActividadesCompletadas();
    getDataEmprendimiento();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataEmprendimiento = async () => {
    try {
      const res = await database
        .collection("emprendimientos")
        .where("uID", "==", userData.uID)
        .where("estado", "==", "activo")
        .get();
      const docs = [];
      res.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      setEmprendimientos(docs[0]);
    } catch (error) {}
  };

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
  const getActividadesCompletadas = async () => {
    try {
      await database
        .collection("actividades")
        .where("userID", "==", userData.uID)
        .where("ActCompletada", "==", true)
        .onSnapshot((querysnapshot) => {
          const docs = [];

          querysnapshot.forEach((doc) => {
            docs.push({ id: doc.id });
          });

          setActividadesHechas(docs);
        });
    } catch (error) {}
  };

  // Función para traer las actividades relacionadas con el usuario
  const getActividadesEnviadas = async () => {
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

          setActividadesEnviadas(docs);
        });
    } catch (error) {}
  };

  return (
    <div className="head_container ">
      <div className="head-ruta_container">
        {/* <Link to="/etapaInfo" className="text-decoration-none text-dark"> */}
        <div>
          <span className="ml-3">Etapa Actual:</span> <br />
          <h3 className="mb-3 ml-3 mr-3 font-weight-bold">{emprendimientos.etapa}</h3>
        </div>
        {/* </Link> */}
      </div>
      <div className="head-activitiesReport_container">
        <div className="head-activity">
          <h1 className="mr-2 mb-3 h1-headInfo">{actividadesHechas.length}</h1>
          <span>Actividades completas</span>
        </div>
        <div className="head-activity">
          <h1 className="mr-2 mb-3 h1-headInfo">{actividadesEnviadas.length}</h1>
          <span>Actividades enviadas</span>
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
