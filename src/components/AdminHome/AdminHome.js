import React from "react";
import { Link } from "react-router-dom";
// React Calendar
import Calendar from "react-calendar";
// Estilos CSS
import "react-calendar/dist/Calendar.css";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// Material UI Components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TableContainer,
} from "@material-ui/core";
// Material UI Icons
import { ExpandMore as ExpandMoreIcon, Add as AddIcon } from "@material-ui/icons";
// Componetes Utilizados AdminHome
import AdminEmprendedoresAsignado from "../MentorHome/MentorEmprendedoresAsignado";
import AdminHomeContainer from "./AdminHomeContainer";
// import AdminActividades from "./AdminActividades";
import Searchbar from "./Searchbar";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const AdminHome = () => {
  const classes = useStyles();

  return (
    <>
      <div className="Home">
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
                <AdminHomeContainer />
                {/* <AdminActividades /> */}
              </AccordionDetails>
            </Accordion>
            <div className="HomeButton-container mt-5 mb-5">
              <Link to="/añadir" className=" text-decoration-none items-dropdown">
                <Button
                  variant="contained"
                  className="HomeButton1 mr-2"
                  color="primary"
                  endIcon={<AddIcon />}
                >
                  Añadir un nuevo usuario
                </Button>
              </Link>
            </div>
            <div className="HomeButton-container-mentor mt-5 mb-5">
              <Accordion defaultExpanded={true} className="mt-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h3 className="ml-1 mb-2 font-weight-bold">Mis emprendedores</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.root}>
                    <TableContainer>
                      <div className="table-emprendedores_container">
                        <AdminEmprendedoresAsignado />
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
