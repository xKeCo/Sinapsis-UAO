import React, { useEffect, useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import "./styles/Home.css";
import "bootstrap/dist/css/bootstrap.css";
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
import { Redirect } from "react-router-dom";
import { database } from "../firebase/client";
import Loader from "../components/Loader";
import { TextField, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function RevisarAutodiagnostico(props) {
  const { currentUser } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [DataMentor, setDataMentor] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Autodiagnostico";
    getData();
    getDataMentor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await database.collection("proyectos").where("uID", "==", id).get();
      const docs = [];

      res.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      setData(docs[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  const getDataMentor = async () => {
    try {
      await database
        .collection("users")
        .where("rol", "==", "mentor")
        .onSnapshot((querysnapshot) => {
          const docs = [];

          setLoading(true);

          querysnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });

          setDataMentor(docs);

          setLoading(false);

          console.log(docs);
        });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };
  const MentoresRegistrados = DataMentor.map((mentor) => {
    return mentor.username;
  });

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavegationBar />
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {Errors ? (
            <h1>Ocurrio un errorsito</h1>
          ) : (
            <>
              {
                <>
                  <div className="todo-revisarautodiagnostico_container">
                    <h3 className="text-center mt-3">Datos del proyecto</h3>
                    <div className="datos-proyecto_container mt-3">
                      <List disablePadding>
                        <ListItem>
                          <ListItemText
                            primary="Como se entero del programa Sinapsis UAO"
                            secondary={Data.conocioSinapsis}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Nombre de la iniciativa"
                            secondary={Data.nombreIniciativa}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Descripción sobre la inciativa"
                            secondary={Data.descIniciativa}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Principal necesidad o problema que soluciona"
                            secondary={Data.prinSolucion}
                          />
                        </ListItem>
                        <Divider />
                      </List>

                      <List disablePadding>
                        <ListItem>
                          <ListItemText
                            primary="Principal cliente o usuario"
                            secondary={Data.prinUsuario}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Mencione las validaciones que ha realizado"
                            secondary={Data.valIniciaiva}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Instrumentos que ha utilizado para las validaciones"
                            secondary={Data.MetodoValIniciaiva}
                          />
                        </ListItem>
                        <Divider />
                      </List>
                    </div>
                    <h3 className="text-center mt-3">Asiganción del mentor y ruta</h3>
                    <div className="datos-proyecto_container mt-3">
                      <Autocomplete
                        multiple
                        size="small"
                        options={MentoresRegistrados}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="standard-basic"
                            className="datos-proyecto mt-3"
                            label="Asignar mentor"
                            multiline
                          />
                        )}
                      />

                      <Autocomplete
                        size="small"
                        options={Rutas.map((option) => option.ruta)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="standard-basic"
                            className="datos-proyecto mt-3"
                            label="Asignar ruta"
                            multiline
                          />
                        )}
                      />
                    </div>
                  </div>
                </>
              }
            </>
          )}
        </>
      )}
    </>
  );
}
const Rutas = [{ ruta: "Soñar" }, { ruta: "Pensar" }, { ruta: "Testear" }, { ruta: "Arrancar" }];
