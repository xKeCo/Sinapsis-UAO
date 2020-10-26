import React from "react";
import AdminHomeContainer from "../components/AdminHomeContainer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

const AdminHome = () => {
  return (
    <div className="AdminHome">
      <div className="AdminHome_container">
        <div className="calendario-prueba">
          <Calendar />
        </div>
        <div>
          <h3 className="ml-3 mb-2">Novedades</h3>
          <AdminHomeContainer />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
