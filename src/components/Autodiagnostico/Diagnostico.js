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
    nacimiento: new Date(),
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
