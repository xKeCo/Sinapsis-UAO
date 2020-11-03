import React from "react";
import AdminHomeContainer from "./AdminHomeContainer";
import Searchbar from "./Searchbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TableContainer,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AdminEmprendedoresAsignado from "../MentorHome/MentorEmprendedoresAsignado";

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
                <AdminHomeContainer />
              </AccordionDetails>
            </Accordion>
            <div className="HomeButton-container mt-5 mb-5">
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
            </div>
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
