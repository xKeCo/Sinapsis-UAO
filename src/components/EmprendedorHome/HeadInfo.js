import React, { useContext } from "react";
// Estilos CSS
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// Componentes utilizados
import { AuthContext } from "../../components/Auth";

function HeadInfo() {
  const { userData } = useContext(AuthContext);

  return (
    <div className="head_container ">
      <div className="head-ruta_container">
        <div>
          <span className="ml-3">Etapa Actual:</span> <br />
          <h3 className="mb-3 ml-3 mr-3 font-weight-bold">{userData.ruta}</h3>
        </div>
      </div>
      <div className="head-activitiesReport_container">
        <div className="head-activity">
          <h1 className="mr-2 mb-3 h1-headInfo">0</h1>
          <span>Actividades completas</span>
        </div>
        <div className="head-activity">
          <h1 className="mr-2 mb-3 h1-headInfo">0</h1>
          <span>Actividades pendientes</span>
        </div>
      </div>
    </div>
  );
}

export default HeadInfo;
