import React from "react";
import Navbar from "./NavegationBar";

export default function Layout(props) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  );
}
