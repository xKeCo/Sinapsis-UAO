// import React, { useState, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import {
//   TextField,
//   // FormControl, InputLabel, Select, MenuItem, Snackbar
// } from "@material-ui/core";
// import "bootstrap/dist/css/bootstrap.css";
// import "./styles/styles.css";
// // import firebaseConfig from "../firebase/client";
// // import { database } from "../firebase/client";
// import { AuthContext } from "./Auth";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     height: "100%",
//   },
//   backButton: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

// function getSteps() {
//   return [
//     "Información adicional del Emprendedor",
//     "Create an ad group",
//     "Create an ad",
//     "Sisas",
//     "Nonas",
//     "Vos Decis",
//   ];
// }

// export default function HorizontalLabelPositionBelowStepper() {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const steps = getSteps();
//   // const { userData, setUserData } = useContext(AuthContext);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = (user) => {
//     setActiveStep(0);
//   };

//   const getStepContent = (stepIndex) => {
//     switch (stepIndex) {
//       case 0:
//         return (
//           <>
//             <div>
//               <h3>Informaci&oacute;n adicional</h3>
//               <TextField
//                 id="standard-basic"
//                 className="MuiFormLabel-root "
//                 label="Dirección"
//                 // variant="filled"
//                 type="text"
//                 name="direccion"
//                 required
//                 autoComplete="off"
//                 inputProps={{
//                   maxLength: 35,
//                 }}
//                 // onChange={handleInput}
//               />
//               <TextField
//                 id="standard-basic"
//                 className="MuiFormLabel-root mt-4"
//                 label="Telefono"
//                 // variant="filled"
//                 type="tel"
//                 name="telefono"
//                 required
//                 // onChange={handleInput}
//               />
//               <TextField
//                 id="standard-basic"
//                 className="MuiFormLabel-root mt-4"
//                 label="Dirección"
//                 // variant="filled"
//                 type="text"
//                 name="direccion"
//                 required
//                 autoComplete="off"
//                 inputProps={{
//                   maxLength: 35,
//                 }}
//                 // onChange={handleInput}
//               />
//             </div>
//           </>
//         );
//       case 1:
//         return (
//           <>
//             <div>
//               <h3>What is an ad group anyways?</h3>
//               <TextField
//                 id="standard-basic"
//                 className="MuiFormLabel-root "
//                 label="Nombre"
//                 // variant="filled"
//                 type="text"
//                 name="sisas"
//                 required
//                 autoComplete="off"
//                 inputProps={{
//                   maxLength: 35,
//                 }}
//                 // onChange={handleInput}
//               />
//             </div>
//           </>
//         );
//       case 2:
//         return "This is the bit I really care about!";
//       case 3:
//         return "Sisas";
//       case 4:
//         return "Nonas";
//       case 5:
//         return "Vos decis";
//       default:
//         return "Unknown stepIndex";
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <div>
//             <Typography className={classes.instructions}>All steps completed</Typography>
//             <Button onClick={handleReset}>Reset</Button>
//           </div>
//         ) : (
//           <div className="todo_encuesta_container">
//             <div className="encuesta_container">
//               <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
//               <div className="encuesta_buttons_container mt-4">
//                 <Button
//                   disabled={activeStep === 0}
//                   onClick={handleBack}
//                   className={classes.backButton}
//                 >
//                   Atr&aacute;s
//                 </Button>
//                 <Button variant="contained" color="primary" onClick={handleNext}>
//                   {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { Component } from "react";
import InfoAdi from "./InfoAdi";
import InfoProyecto from "./InfoProyecto";
import FirstLoginEmprendedor from "./FirstLoginEmprendedor";
import Confirmacion from "./Confirmacion";

export class autoDiagnostico extends Component {
  state = {
    step: 0,
    modalIsOpen: false,
    cedula: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    vinculoUni: "",
    programa: "",
    genero: "",
    nacimiento: "",
    conocioSinapsis: "",
    nombreIniciativa: "",
    descIniciativa: "",
    prinSolucion: "",
    prinUsuario: "",
    valIniciaiva: "",
    MetodoValIniciaiva: "",
  };

  // Next Step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
    window.scrollTo({
      top: 0,
    });
  };
  // Prev Step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
    window.scrollTo({
      top: 0,
    });
  };

  // Modal
  handleOpenModal = (e) => {
    this.setState({ modalIsOpen: true });
  };
  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false });
  };

  // handleChange Inputs

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
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
    } = this.state;

    const values = {
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
    };

    switch (step) {
      case 0:
        return <FirstLoginEmprendedor nextStep={this.nextStep} />;
      case 1:
        return (
          <InfoAdi nextStep={this.nextStep} handleChange={this.handleChange} values={values} />
        );
      case 2:
        return (
          <InfoProyecto
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirmacion
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            onOpenModal={this.handleOpenModal}
            onCloseModal={this.handleCloseModal}
            modalIsOpen={this.state.modalIsOpen}
          />
        );

      // case 4:
      //   return <Hecho />;

      default:
        return "Ni idea";
    }
  }
}

export default autoDiagnostico;
