import React, { useContext } from "react";

import Modal from "./Modal";
import { database } from "../../firebase/client";
import { AuthContext } from "../Auth";

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
        await database.collection("users").doc(userData.uID).update({ form_complete: true });
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
          <button onClick={handleChangeForm} className="btn btn-danger mr-3">
            Confirmar y continuar
          </button>
          <button onClick={props.onClose} className="btn btn-primary">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Dialogo;
