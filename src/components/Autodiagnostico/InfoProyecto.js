import React, { Component } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  // Snackbar,
} from "@material-ui/core";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

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
    const { values, handleChange } = this.props;
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
                row
                labelid="demo-simple-select-outlined-label"
                id="demo-mutiple-name"
                defaultValue={values.conocioSinapsis}
                onChange={handleChange("conocioSinapsis")}
                label="conocioSinapsis"
                name="conocioSinapsis"
                required
              >
                <FormControlLabel
                  value={"Medios masivos"}
                  label="Medios masivos"
                  control={<Radio />}
                />
                <FormControlLabel value={"Referido"} label="Referido" control={<Radio />} />
                <FormControlLabel value={"Pagina web"} label="Pagina web" control={<Radio />} />
                <FormControlLabel
                  value={"Correo institucional"}
                  label="Correo institucional"
                  control={<Radio />}
                />
                <FormControlLabel value={"Otro"} label="Otro" control={<Radio />} />
              </RadioGroup>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Nombre de la iniciativa"
              type="text"
              name="nombreIniciativa"
              required
              autoComplete="off"
              inputProps={{
                maxLength: 41,
              }}
              onChange={handleChange("nombreIniciativa")}
              defaultValue={values.nombreIniciativa}
              multiline
            />
            <TextField
              id="standard-basic"
              className="MuiFormLabel-root mt-4"
              noValidate
              label="Descripción sobre la inciativa"
              type="text"
              name="descIniciativa"
              required
              helperText="Maximo 250 caracteres"
              multiline
              defaultValue={values.descIniciativa}
              onChange={handleChange("descIniciativa")}
              inputProps={{
                maxLength: 41,
              }}
            />
            <TextField
              id="standard-basic"
              className="MuiFormLabel-root mt-4"
              noValidate
              label="Principal problema que soluciona"
              type="text"
              name="prinSolucion"
              required
              multiline
              inputProps={{
                maxLength: 41,
              }}
              defaultValue={values.prinSolucion}
              onChange={handleChange("prinSolucion")}
            />
            <TextField
              id="standard-basic"
              className="MuiFormLabel-root mt-4"
              noValidate
              label="Principal cliente o usuario"
              type="text"
              name="prinUsuario"
              required
              multiline
              inputProps={{
                maxLength: 41,
              }}
              defaultValue={values.prinUsuario}
              onChange={handleChange("prinUsuario")}
            />
            <TextField
              id="standard-basic"
              className="MuiFormLabel-root mt-4"
              noValidate
              label="Validaciones que ha realizado"
              type="text"
              name="valIniciaiva"
              required
              multiline
              inputProps={{
                maxLength: 41,
              }}
              defaultValue={values.valIniciaiva}
              onChange={handleChange("valIniciaiva")}
            />
            <FormControl component="fieldset" className="MuiFormLabel-root mt-4">
              <FormLabel id="demo-simple-select-filled-label">
                Instrumentos que ha utilizado para las validaciones
              </FormLabel>
              <RadioGroup
                row
                labelid="demo-simple-select-outlined-label"
                id="demo-mutiple-name"
                defaultValue={values.MetodoValIniciaiva}
                onChange={handleChange("MetodoValIniciaiva")}
                label="MetodoValIniciaiva"
                name="MetodoValIniciaiva"
                // required
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
