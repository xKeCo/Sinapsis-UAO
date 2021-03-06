import React, { useContext } from "react";
// Conexión bases de datos
import { database } from "../../firebase/client";
// Componente Utilizados
import Modal from "./Modal";
import { AuthContext } from "../Auth";
// Estilos CSS
import "bootstrap/dist/css/bootstrap.css";

const Dialogo = (props) => {
  const { userData, setUserData } = useContext(AuthContext);

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
      nombreEmprendimiento,
      descEmprendimiento,
      prinSolucion,
      prinUsuario,
      valEmprendimiento,
      MetodoValEmprendimiento,
    },
  } = props;

  // Añadir datos a la base de datos
  const handleChangeForm = async () => {
    try {
      if (userData.form_complete === false) {
        await database
          .collection("users")
          .doc(userData.uID)
          .set({ form_complete: true, ruta_asignada: false }, { merge: true });
        // await database.collection("users").add({ ruta_asignada: false });
        await database
          .collection("users")
          .doc(userData.uID)
          .set(
            { cedula, direccion, ciudad, telefono, vinculoUni, programa, genero, nacimiento },
            { merge: true }
          );
        await database.collection("emprendimientos").doc().set(
          {
            uID: userData.uID,
            username: userData.username,
            conocioSinapsis,
            nombreEmprendimiento,
            descEmprendimiento,
            prinSolucion,
            prinUsuario,
            valEmprendimiento,
            MetodoValEmprendimiento,
            estado: "activo",
          },
          { merge: true }
        );
      }
      setUserData({ ...userData, form_complete: true });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="DeleteBadgeModal">
        <h1>¿Tus datos son correctos?</h1>
        <p>
          Una vez enviados los datos solo podr&aacute;n ser cambiados por el mentor asignado. Tomate
          tu tiempo :)
        </p>

        <div>
          <button onClick={handleChangeForm} className="btn btn-danger mr-3 mb-3">
            Confirmar y continuar
          </button>
          <button onClick={props.onClose} className="btn btn-primary mb-3">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Dialogo;
