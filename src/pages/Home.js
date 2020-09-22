import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./styles/Home.css";
import "bootstrap/dist/css/bootstrap.css";
import NavegationBar from "../components/NavegationBar";

export default function Home() {
  useEffect(() => {
    document.title = "Sinapsis UAO - Home";
  }, []);

  return (
    <>
      <NavegationBar />
    </>
  );
}
