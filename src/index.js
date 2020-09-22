import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./global.css";
import App from "./routes/App";

const container = document.getElementById("app");

ReactDOM.render(<App />, container);
