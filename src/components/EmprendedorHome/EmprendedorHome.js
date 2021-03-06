import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Conexion a la base de datos
import { database } from "../../firebase/client";
// Componentes Utilizados
import EmprendedorActividades from "./EmprendedorActividades";
import EmprendedorReuniones from "./EmprendedorReuniones";
import HeadInfo from "./HeadInfo";
import { AuthContext } from "../Auth";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@material-ui/core";
// Material UI Icons
import { Close as CloseIcon, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
// import AddIcon from "@material-ui/icons/Add";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";

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
  const [emprendimientos, setEmprendimientos] = useState([]);

  useEffect(() => {
    getDataEmprendimiento();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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

  const list = (anchor) => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {emprendimientos.etapa === "Soñar" && (
        <List className="ml-3">
          <ListItemIcon className="mt-3">
            <CloseIcon onClose={toggleDrawer("right", false)} />
          </ListItemIcon>

          <ListItem className="sideMenu-Item-emprendedor">
            <ListItemText
              primary={
                "Estos talleres te permitirán cumplir los objetivos esperados para esta etapa:"
              }
            />
          </ListItem>

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

      {emprendimientos.etapa === "Pensar" && (
        <List className="ml-3">
          <ListItemIcon className="mt-3">
            <CloseIcon onClose={toggleDrawer("right", false)} />
          </ListItemIcon>

          <ListItem className="sideMenu-Item-emprendedor">
            <ListItemText
              primary={
                "Estos talleres te permitirán cumplir los objetivos esperados para esta etapa:"
              }
            />
          </ListItem>

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

      {emprendimientos.etapa === "Testear" && (
        <List className="ml-3">
          <ListItemIcon className="mt-3">
            <CloseIcon onClose={toggleDrawer("right", false)} />
          </ListItemIcon>

          <ListItem className="sideMenu-Item-emprendedor">
            <ListItemText
              primary={
                "Estos talleres te permitirán cumplir los objetivos esperados para esta etapa:"
              }
            />
          </ListItem>

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

      {emprendimientos.etapa === "Arrancar" && (
        <List className="ml-3">
          <ListItemIcon className="mt-3">
            <CloseIcon onClose={toggleDrawer("right", false)} />
          </ListItemIcon>

          <ListItem className="sideMenu-Item-emprendedor">
            <ListItemText
              primary={
                "Estos talleres te permitirán cumplir los objetivos esperados para esta etapa:"
              }
            />
          </ListItem>

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
              <Link to="/" className=" text-decoration-none items-dropdown">
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
