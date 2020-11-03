import React, { useContext } from "react";
import EmprendedorActividades from "./EmprendedorActividades";
import EmprendedorReuniones from "./EmprendedorReuniones";
import HeadInfo from "./HeadInfo";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../Auth";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const EmprendedorHome = () => {
  const { userData } = useContext(AuthContext);

  // const [expanded, setExpanded] = React.useState(false);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {userData.ruta === "Soñar" && (
        <List className="ml-3">
          <ListItemIcon className="mt-3">
            <CloseIcon onClose={toggleDrawer("right", false)} />
          </ListItemIcon>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller “Ser Emprendedor”"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller Perfil competencias en Emprendimiento"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller para descubrimiento/ideación"} />
            </ListItem>
          </Link>
          {/* <Calendar /> */}
        </List>
      )}

      {userData.ruta === "Pensar" && (
        <List className="ml-3">
          <ListItemIcon className="mt-3">
            <CloseIcon onClose={toggleDrawer("right", false)} />
          </ListItemIcon>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller modelo de negocio (1)"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText
                primary={"Taller de validacion del modelo y proyectos de negocio (costos y precio)"}
              />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller de presentaciones efectivas"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller de creatividad e innovación"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller de liderazgo para la innovación"} />
            </ListItem>
          </Link>
          {/* <Calendar /> */}
        </List>
      )}

      {userData.ruta === "Testear" && (
        <List className="ml-3">
          <ListItemIcon className="mt-3">
            <CloseIcon onClose={toggleDrawer("right", false)} />
          </ListItemIcon>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller BMG (2)"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller Gestión contable e impuestos 1"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller de Prototipado"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller Estrategia Financiera 1"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller Planificación general y plan de negocios"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller Derecho de negocios"} />
            </ListItem>
          </Link>
          {/* <Calendar /> */}
        </List>
      )}

      {userData.ruta === "Arrancar" && (
        <List className="ml-3">
          <ListItemIcon className="mt-3">
            <CloseIcon onClose={toggleDrawer("right", false)} />
          </ListItemIcon>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller Técnicas de Ventas"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller Marketing y comercio digital"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller Gestión contable e impuestos 2"} />
            </ListItem>
          </Link>
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemText primary={"Taller Estrategia Financiera 2"} />
            </ListItem>
          </Link>
          {/* <Calendar /> */}
        </List>
      )}
    </div>
  );

  return (
    <>
      <div className="Home">
        <div className="AdminHome_container-emprendedor">
          <div className="accordion-container-emprendedor">
            <HeadInfo />

            <Accordion
              defaultExpanded={true}
              // expanded={expanded === "panel1"}
              // onChange={handleChange("panel1")}
              className="mt-2"
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="ml-1 mb-2 font-weight-bold">Actividades</h3>
              </AccordionSummary>
              <AccordionDetails>
                <EmprendedorActividades />
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
                <EmprendedorReuniones />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="calendario-prueba-emprendedor">
            <Calendar />
            <div className="HomeButton-container mt-4 mb-5">
              <Link to="/">
                <Button
                  variant="contained"
                  className="HomeButton1 mr-2"
                  color="primary"
                  // endIcon={<AddIcon />}
                >
                  Herramientas
                </Button>
              </Link>

              <React.Fragment key={"right"}>
                <Button
                  onClick={toggleDrawer("right", true)}
                  variant="contained"
                  className="HomeButton2 ml-2"
                  color="primary"
                >
                  Talleres
                </Button>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  {list("right")}
                </Drawer>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmprendedorHome;
