import React, { Component } from "react";
// Material UI Components
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
// Estilos CSS
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

export class InfoProyecto extends Component {
  // Next Step
  continue = (e) => {
    this.props.nextStep();
  };
  // Prev Step
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const NextPage = (e) => {
      e.preventDefault();
      if (
        values.conocioSinapsis !== "" &&
        values.nombreIniciativa !== "" &&
        values.descIniciativa !== "" &&
        values.prinSolucion !== "" &&
        values.prinUsuario !== "" &&
        values.MetodoValIniciaiva !== ""
      ) {
        this.continue();
      } else {
        return null;
      }
    };

    return (
      <>
        <div className="todo_encuesta_container">
          <h3>Informaci&oacute;n del proyecto</h3>
          <div className="encuesta_container">
            <FormControl component="fieldset" className="MuiFormLabel-root mt-3">
              <FormLabel id="demo-simple-select-filled-label">
                Como se entero del programa Sinapsis UAO
              </FormLabel>
              <RadioGroup
                label="conocioSinapsis"
                name="conocioSinapsis"
                row
                labelid="demo-simple-select-outlined-label"
                id="demo-mutiple-name"
                value={values.conocioSinapsis}
                onChange={handleChange("conocioSinapsis")}
                required
              >
                <FormControlLabel
                  value={"Medios masivos"}
                  label="Medios masivos"
                  control={<Radio />}
                />
                <FormControlLabel value={"Referido"} label="Referido" control={<Radio />} />
                <FormControlLabel
                  value={"Pagina web"}
                  label="P&aacute;gina web"
                  control={<Radio />}
                />
                <FormControlLabel
                  value={"Correo institucional"}
                  label="Correo institucional"
                  control={<Radio />}
                />
                <FormControlLabel value={"Otro"} label="Otro" control={<Radio />} />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Nombre de la iniciativa"
              type="text"
              name="nombreIniciativa"
              required
              autoComplete="off"
              inputProps={{
                maxLength: 80,
              }}
              onChange={handleChange("nombreIniciativa")}
              defaultValue={values.nombreIniciativa}
              multiline
              helperText={`${values.nombreIniciativa.length} / 80 caracteres`}
            />

            <TextField
              className="MuiFormLabel-root mt-4"
              noValidate
              label="Descripci&oacute;n sobre la inciativa"
              type="text"
              name="descIniciativa"
              required
              multiline
              defaultValue={values.descIniciativa}
              onChange={handleChange("descIniciativa")}
              inputProps={{
                maxLength: 250,
              }}
              helperText={`${values.descIniciativa.length} / 250 caracteres`}
            />

            <TextField
              className="MuiFormLabel-root mt-4"
              noValidate
              label="Principal problema que soluciona"
              type="text"
              name="prinSolucion"
              required
              multiline
              inputProps={{
                maxLength: 80,
              }}
              defaultValue={values.prinSolucion}
              onChange={handleChange("prinSolucion")}
              helperText={`${values.prinSolucion.length} / 80 caracteres`}
            />

            <TextField
              className="MuiFormLabel-root mt-4"
              noValidate
              label="Principal cliente o usuario"
              type="text"
              name="prinUsuario"
              required
              multiline
              inputProps={{
                maxLength: 80,
              }}
              defaultValue={values.prinUsuario}
              onChange={handleChange("prinUsuario")}
              helperText={`${values.prinUsuario.length} / 80 caracteres`}
            />

            <TextField
              className="MuiFormLabel-root mt-4"
              noValidate
              label="Validaciones que ha realizado"
              type="text"
              name="valIniciaiva"
              required
              multiline
              inputProps={{
                maxLength: 150,
              }}
              defaultValue={values.valIniciaiva}
              onChange={handleChange("valIniciaiva")}
              helperText={`${values.valIniciaiva.length} / 150 caracteres`}
            />

            <FormControl component="fieldset" className="MuiFormLabel-root mt-4">
              <FormLabel id="demo-simple-select-filled-label">
                Instrumentos que ha utilizado para las validaciones
              </FormLabel>
              <RadioGroup
                label="MetodoValIniciaiva"
                name="MetodoValIniciaiva"
                row
                labelid="demo-simple-select-outlined-label"
                id="demo-mutiple-name"
                value={values.MetodoValIniciaiva}
                onChange={handleChange("MetodoValIniciaiva")}
              >
                <FormControlLabel value={"Ninguno"} label="Ninguno" control={<Radio />} />
                <FormControlLabel value={"Entrevista"} label="Entrevista" control={<Radio />} />
                <FormControlLabel value={"Encuesta"} label="Encuesta" control={<Radio />} />
                <FormControlLabel value={"Grupo Focal"} label="Grupo Focal" control={<Radio />} />
                <FormControlLabel value={"Otro"} label="Otro" control={<Radio />} />
              </RadioGroup>
            </FormControl>

            <div className="encuesta_buttons_container mt-3">
              <Button variant="contained" color="primary" style={styles.button} onClick={this.back}>
                Atr&aacute;s
              </Button>

              <Button variant="contained" color="primary" style={styles.button} onClick={NextPage}>
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
