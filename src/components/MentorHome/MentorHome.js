import React from "react";
import MentorNovedades from "./MentorNovedades";
import MentorReuniones from "./MentorReuniones";
import MentorEmprendedoresAsignado from "./MentorEmprendedoresAsignado";
import Searchbar from "../AdminHome/Searchbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Accordion, AccordionSummary, AccordionDetails, TableContainer } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

// import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const AdminHome = () => {
  const classes = useStyles();

  return (
    <>
      <div className="AdminHome">
        <div className="AdminHome_container">
          <div className="calendario-prueba">
            <Calendar />
          </div>
          <div className="accordion-container">
            {/* <h3 className="ml-1 mb-2 font-weight-bold">Búsqueda</h3> */}
            <Searchbar />
            <Accordion defaultExpanded={true} className="mt-2">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="ml-1 mb-2 font-weight-bold">Novedades</h3>
              </AccordionSummary>
              <AccordionDetails>
                <MentorNovedades />
              </AccordionDetails>
            </Accordion>
            <Accordion
              // expanded={expanded === "panel2"}
              // onChange={handleChange("panel2")}
              className="mt-2"
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="ml-1 mb-2 font-weight-bold">Reuniones</h3>
              </AccordionSummary>
              <AccordionDetails>
                <MentorReuniones />
              </AccordionDetails>
            </Accordion>

            <div className="HomeButton-container-mentor mt-5 mb-5">
              {/* <h3 className="ml-1 mb-2 font-weight-bold">Mis emprendedores</h3> */}
              <Accordion defaultExpanded={true} className="mt-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h3 className="ml-1 mb-2 font-weight-bold">Mis emprendedores</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.root}>
                    <TableContainer>
                      <div className="table-emprendedores_container">
                        <MentorEmprendedoresAsignado />
                      </div>
                    </TableContainer>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
