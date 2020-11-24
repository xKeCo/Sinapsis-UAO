import React, { Component } from "react";
// Material UI
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
// Estilos CSS
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";

export class InfoAdi extends Component {
  // Next Step
  continue = (e) => {
    // e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const fechaHoy = new Date();

    const NextPage = (e) => {
      e.preventDefault();
      if (
        values.cedula !== "" &&
        values.telefono !== "" &&
        values.genero !== "" &&
        values.ciudad !== "" &&
        values.direccion !== "" &&
        values.vinculoUni !== ""
      ) {
        this.continue();
      } else {
        return null;
      }
    };

    return (
      <>
        <div className="todo_encuesta_container">
          <h3>Informaci&oacute;n adicional del usuario</h3>
          <div className="encuesta_container">
            <TextField
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
            <div className="mt-4">
              <p className="mb-0 ">Fecha de nacimiento</p>
              <input
                id="date"
                label="Fecha de nacimiento"
                name="nacimiento"
                className="MuiFormLabel-root mr-2"
                type="date"
                min={`${fechaHoy.getFullYear() - 80}-01-01`}
                max={`${fechaHoy.getFullYear() - 15}-${
                  fechaHoy.getMonth() + 1
                }-${fechaHoy.getDate()}`}
                defaultValue={values.nacimiento}
                onChange={handleChange("nacimiento")}
              />
            </div>
            <FormControl className="MuiFormLabel-root mt-3">
              <InputLabel id="demo-simple-select-filled-label">G&eacute;nero</InputLabel>
              <Select
                labelid="demo-simple-select-outlined-label"
                id="demo-mutiple-name"
                label="genero"
                name="genero"
                required
                value={values.genero}
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
                value={values.vinculoUni}
                onChange={handleChange("vinculoUni")}
              >
                <MenuItem value={"Pregrado"}>Pregrado</MenuItem>
                <MenuItem value={"PostGrado"}>PostGrado</MenuItem>
                <MenuItem value={"Egresado"}>Egresado</MenuItem>
                <MenuItem value={"Colaborador"}>Colaborador</MenuItem>
              </Select>
            </FormControl>

            {values.vinculoUni === "Pregrado" && (
              <TextField
                className="MuiFormLabel-root mt-3"
                label="Programa acad&eacute;mico"
                type="text"
                name="programa"
                required
                autoComplete="off"
                placeholder="Ej. Ing. Informatica"
                helperText="Ingrese el programa academico al que pertenece, si lo desea, es un campo Opcional :)"
                onChange={handleChange("programa")}
                defaultValue={values.programa}
              />
            )}

            <div className="encuesta_buttons_container mt-3 mb-3">
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
export default InfoAdi;
