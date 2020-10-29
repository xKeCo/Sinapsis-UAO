import React from "react";
import AdminHomeContainer from "../components/AdminHomeContainer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Accordion, AccordionSummary, AccordionDetails, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <>
      <div className="AdminHome">
        <div className="AdminHome_container">
          <div className="calendario-prueba">
            <Calendar />
          </div>
          <div className="accordion-container">
            <Accordion defaultExpanded={true}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="ml-3 mb-2 font-weight-bold">Novedades</h3>
              </AccordionSummary>
              <AccordionDetails>
                <AdminHomeContainer />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="HomeButton-container mt-5">
            <Link to="/añadir">
              <Button
                variant="contained"
                className="HomeButton1 mr-2"
                color="primary"
                endIcon={<AddIcon />}
              >
                Añadir un nuevo usuario
              </Button>
            </Link>
            {/* <Button variant="contained" className="HomeButton2 ml-2" color="primary">
              Agregar administrador
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
