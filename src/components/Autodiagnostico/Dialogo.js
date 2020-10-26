import React, { useContext } from "react";

import Modal from "./Modal";
import { database } from "../../firebase/client";
import { AuthContext } from "../Auth";
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
      nombreIniciativa,
      descIniciativa,
      prinSolucion,
      prinUsuario,
      valIniciaiva,
      MetodoValIniciaiva,
    },
  } = props;

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
        await database.collection("proyectos").doc().set(
          {
            uID: userData.uID,
            username: userData.username,
            conocioSinapsis,
            nombreIniciativa,
            descIniciativa,
            prinSolucion,
            prinUsuario,
            valIniciaiva,
            MetodoValIniciaiva,
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
        <p>Una vez enviados los datos ya no se podran cambiar... Tomate tu tiempo :)</p>

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
