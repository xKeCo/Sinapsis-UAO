import React from "react";
import { CircularProgress } from "@material-ui/core/";
import "../components/styles/styles.css";

export default function Loader() {
  return (
    <div className="Loader">
      <CircularProgress size="40px" />
    </div>
  );
}
