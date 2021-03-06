/* eslint-disable no-mixed-operators */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
// Estilos
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.css";
// Componente de avatar
import Avatar from "../components/Avatar";
// React-Bootstrap
import { Dropdown, Navbar } from "react-bootstrap";
// Conexión con la base de datos
import firebaseConfig from "../firebase/client";
// Imagenes
import SinapsisColor from "../images/SinapsisColor.png";
import { AuthContext } from "./Auth";
// Material UI Components
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Tooltip, Zoom } from "@material-ui/core";

export default function NavegationBar(props) {
  const { userData, setUserData } = useContext(AuthContext);
  // Función para cerrar sesión
  const logOut = () => {
    firebaseConfig
      .auth()
      .signOut()
      .then(() => {
        setUserData(null);
      });
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="NavegationBar-Container">
        <Link to="/home" className="nav-item text-decoration-none">
          <img src={SinapsisColor} width="150" height="75" alt="Sinapsis UAO" />
        </Link>

        {userData && userData.rol === "emprendedor" ? (
          <Dropdown alignRight>
            <Badge color="secondary" className="mr-4">
              <NotificationsIcon />
            </Badge>

            <Tooltip title="Menu" arrow TransitionComponent={Zoom} placement="right">
              <Dropdown.Toggle className="menu-usuario" id="dropdown-menu-align-right">
                <Avatar src={userData.avatar} alt={"Avatar"} text={userData.username} />
              </Dropdown.Toggle>
            </Tooltip>

            <Dropdown.Menu>
              {userData.form_complete !== "false" && (
                <Link to="/home" className="nav-item text-decoration-none items-dropdown">
                  <div className="dropdown-1">Inicio</div>
                </Link>
              )}

              {userData.form_complete !== "false" && (
                <Link
                  to={`/perfil/${userData.uID}`}
                  className="nav-item text-decoration-none items-dropdown"
                >
                  <div className="dropdown-1">Perfil</div>
                </Link>
              )}
              {userData.form_complete !== "false" && <Dropdown.Divider />}

              <Dropdown.Item onClick={logOut} className="dropdown text-danger">
                Cerrar sesi&oacute;n
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          userData &&
          userData.rol !== "emprendedor" && (
            <Dropdown alignRight>
              <Badge color="secondary" className="mr-4">
                <NotificationsIcon />
              </Badge>

              <Tooltip title="Menu" arrow TransitionComponent={Zoom} placement="right">
                <Dropdown.Toggle className="menu-usuario" id="dropdown-menu-align-right">
                  <Avatar src={userData.avatar} alt={"Avatar"} text={userData.username} />
                </Dropdown.Toggle>
              </Tooltip>

              <Dropdown.Menu>
                <Link to="/home" className="nav-item text-decoration-none items-dropdown">
                  <div className="dropdown-1">Inicio</div>
                </Link>

                <Link
                  to={`/perfil/${userData.uID}`}
                  className="nav-item text-decoration-none items-dropdown"
                >
                  <div className="dropdown-1">Perfil</div>
                </Link>
                <Dropdown.Divider />

                <Dropdown.Item onClick={logOut} className="dropdown text-danger">
                  Cerrar sesi&oacute;n
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        )}
      </Navbar>
      {props.children}
    </>
  );
}
