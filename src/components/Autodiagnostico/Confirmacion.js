import React, { Component } from "react";
// Material UI
import {
  Button,
  List,
  ListItem,
  ListItemText,
  // Snackbar,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
// Estilos
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
// Componente Dialogo
import Dialogo from "./Dialogo";

export class InfoProyecto extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {
        cedula,
        direccion,
        ciudad,
        telefono,
        vinculoUni,
        programa,
        genero,
        nacimiento,
        conocioSinapsis,
        nombreIniciativa,
        descIniciativa,
        prinSolucion,
        prinUsuario,
        valIniciaiva,
        MetodoValIniciaiva,
      },
    } = this.props;

    return (
      <>
        <div className="todo_encuesta_container">
          <h3>Confirmar datos</h3>
          <div className="encuesta_container">
            <div className="confirmacion_container">
              <List>
                <ListItem>
                  <ListItemText primary="Cedula" secondary={cedula} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Telefono" secondary={telefono} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Fecha de nacimiento" secondary={nacimiento} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Género" secondary={genero} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Ciudad" secondary={ciudad} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Direccion" secondary={direccion} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Vinculo con la universidad " secondary={vinculoUni} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Programa" secondary={programa} />
                </ListItem>
                <Divider />
              </List>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Como se entero del programa Sinapsis UAO"
                    secondary={conocioSinapsis}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Nombre de la iniciativa" secondary={nombreIniciativa} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Descripción sobre la inciativa"
                    secondary={descIniciativa}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Principal necesidad o problema que soluciona"
                    secondary={prinSolucion}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Principal cliente o usuario" secondary={prinUsuario} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Mencione las validaciones que ha realizado"
                    secondary={valIniciaiva}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Instrumentos que ha utilizado para las validaciones"
                    secondary={MetodoValIniciaiva}
                  />
                </ListItem>
                <Divider />
              </List>
            </div>
            <div className="encuesta_buttons_container mt-3  mb-3">
              <Button variant="contained" color="primary" style={styles.button} onClick={this.back}>
                Atr&aacute;s
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={styles.button}
                onClick={this.props.onOpenModal}
              >
                Confirmar y continuar
              </Button>
              <Dialogo
                isOpen={this.props.modalIsOpen}
                onClose={this.props.onCloseModal}
                continue={this.props.nextStep}
                values={{
                  cedula,
                  direccion,
                  ciudad,
                  telefono,
                  vinculoUni,
                  programa,
                  genero,
                  nacimiento,
                  conocioSinapsis,
                  nombreIniciativa,
                  descIniciativa,
                  prinSolucion,
                  prinUsuario,
                  valIniciaiva,
                  MetodoValIniciaiva,
                }}
              />
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
