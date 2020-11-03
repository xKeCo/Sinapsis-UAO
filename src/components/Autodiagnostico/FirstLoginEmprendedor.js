import React, { Component } from "react";
// Material UI
import { Button } from "@material-ui/core";
// Estilos
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

export class InfoProyecto extends Component {
  // Next Step
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    return (
      <>
        <div className="FirstLogin_container">
          <div>
            <h1 className="FirstLogin_header">¡Este es el primer paso para tu emprendimiento!</h1>
            <h3 className="FirstLogin_detail">Realiza el autodiagn&oacute;stico</h3>
            <div className="FirstLogin_button_container">
              <Button
                variant="contained"
                color="primary"
                style={styles.button}
                onClick={this.continue}
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const styles = {
  button: { margin: 15 },
};
export default InfoProyecto;
