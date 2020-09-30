import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.css";
import Avatar from "../components/Avatar";
import { Dropdown, Navbar } from "react-bootstrap";
import firebaseConfig from "../firebase/client";
import SinapsisColor from "../images/SinapsisColor.png";
import { AuthContext } from "./Auth";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";

// import { Redirect } from "react-router-dom";

export default function NavegationBar(props) {
  const { userData, setUserData } = useContext(AuthContext);

  const logOut = () => {
    firebaseConfig
      .auth()
      .signOut()
      .then(() => {
        setUserData(null);
      });
  };
  // if (!user) {
  //   return <Redirect to="/" />;
  // }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="NavegationBar-Container">
        <Link to="/home" className="nav-item text-decoration-none">
          <img src={SinapsisColor} width="150" height="75" alt="Sinapsis UAO" />
        </Link>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}

        {/* <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse> */}

        {userData && (
          <Dropdown className=" ">
            <Badge color="secondary" variant="dot" className="mr-4">
              <NotificationsIcon />
            </Badge>
            <Dropdown.Toggle className="menu-usuario">
              <Avatar src={userData.avatar} alt={"Avatar"} text={userData.username} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className="dropdown">
                <Link to="/" className="nav-item text-decoration-none items-dropdown">
                  Inicio
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className="dropdown">
                <Link to="/" className="nav-item text-decoration-none items-dropdown">
                  Other thing
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logOut} className="dropdown text-danger">
                Cerrar sesi&oacute;n
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Navbar>
      {props.children}
    </>
  );
}
