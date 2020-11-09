import React, { Component } from "react";
// Material UI
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
// Estilos CSS
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

export class InfoAdi extends Component {
  // Next Step
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <>
        <div className="todo_encuesta_container">
          <h3>Informaci&oacute;n adicional del usuario</h3>
          <div className="encuesta_container">
            <TextField
              id="standard-basic"
              label="C&eacute;dula"
              type="number"
              name="cedula"
              required
              multiline
              autoComplete="off"
              inputProps={{
                maxLength: 11,
              }}
              onChange={handleChange("cedula")}
              defaultValue={values.cedula}
              helperText="Ingrese su número de identificación sin ningun tipo de caracter especial, gracias :)"
              placeholder="Ej. 11111111111"
            />
            <TextField
              id="standard-basic"
              className=" MuiFormLabel-root mt-3"
              label="Tel&eacute;fono"
              type="tel"
              name="telefono"
              multiline
              placeholder="Ej. 3132645894"
              required
              autoComplete="off"
              inputProps={{
                maxLength: 10,
              }}
              onChange={handleChange("telefono")}
              defaultValue={values.telefono}
            />
            <TextField
              id="standard-basic"
              className="MuiFormLabel-root mt-3"
              noValidate
              label="Fecha de nacimiento"
              type="date"
              name="nacimiento"
              required
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange("nacimiento")}
              defaultValue={values.nacimiento}
            />
            <FormControl className="MuiFormLabel-root mt-3">
              <InputLabel id="demo-simple-select-filled-label">G&eacute;nero</InputLabel>
              <Select
                labelid="demo-simple-select-outlined-label"
                id="demo-mutiple-name"
                label="genero"
                name="genero"
                required
                defaultValue={values.genero}
                onChange={handleChange("genero")}
              >
                <MenuItem value={"Masculino"}>Masculino</MenuItem>
                <MenuItem value={"Femenino"}>Femenino</MenuItem>
                <MenuItem value={"Bigenero"}>Big&eacute;nero</MenuItem>
                <MenuItem value={"Sin genero"}>Sin g&eacute;nero</MenuItem>
                <MenuItem value={"Prefiero no decir"}>Prefiero no decir</MenuItem>
                <MenuItem value={"Otro"}>Otro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              className="MuiFormLabel-root mt-3"
              label="Ciudad"
              type="text"
              name="ciudad"
              required
              multiline
              autoComplete="off"
              onChange={handleChange("ciudad")}
              defaultValue={values.ciudad}
            />
            <TextField
              id="standard-basic"
              className="MuiFormLabel-root mt-3"
              label="Direcci&oacute;n"
              type="text"
              name="direccion"
              required
              multiline
              autoComplete="off"
              helperText="Ingrese la direccion de su residencia con todos los caracteres necesarios, Tranquilo! Tu información esta a salvo ;)"
              placeholder="Ej. Calle 1 # 1-11"
              onChange={handleChange("direccion")}
              defaultValue={values.direccion}
            />
            <FormControl className="MuiFormLabel-root mt-3">
              <InputLabel id="demo-simple-select-filled-label">
                V&iacute;nculo con la universidad
              </InputLabel>
              <Select
                labelid="demo-simple-select-outlined-label"
                id="demo-mutiple-name"
                label="vinculoUni"
                name="vinculoUni"
                required
                defaultValue={values.vinculoUni}
                onChange={handleChange("vinculoUni")}
              >
                <MenuItem value={"Pregrado"}>Pregrado</MenuItem>
                <MenuItem value={"PostGrado"}>PostGrado</MenuItem>
                <MenuItem value={"Egresado"}>Egresado</MenuItem>
                <MenuItem value={"Colaborador"}>Colaborador</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="standard-basic"
              className="MuiFormLabel-root mt-3"
              label="Programa acad&eacute;mico"
              type="text"
              name="programa"
              // multiline
              autoComplete="off"
              placeholder="Ej. Ing. Informatica"
              helperText="Ingrese el programa academico al que pertenece, si lo desea, es un campo Opcional :)"
              onChange={handleChange("programa")}
              defaultValue={values.programa}
            />

            <div className="encuesta_buttons_container mt-3 mb-3">
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
export default InfoAdi;
