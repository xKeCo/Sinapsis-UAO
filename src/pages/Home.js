import React, { useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import "./styles/Home.css";
import "bootstrap/dist/css/bootstrap.css";
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
import { Redirect } from "react-router-dom";

export default function Home() {
  const { currentUser, userData } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Sinapsis UAO - Home";
  }, []);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavegationBar />

      {userData && userData.rol === "emprendedor" && (
        <div>
          <h1>Holis emprendedor</h1>
        </div>
      )}
      {userData && userData.rol === "admin" && (
        <div>
          <h1>Holis admin</h1>
        </div>
      )}
      {userData && userData.rol === "mentor" && (
        <div>
          <h1>Holis mentor</h1>
        </div>
      )}
    </>
  );
}
