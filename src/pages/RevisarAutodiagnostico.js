import React, { useEffect, useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import "./styles/Home.css";
import "bootstrap/dist/css/bootstrap.css";
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
import { Redirect } from "react-router-dom";
import { database } from "../firebase/client";
import Loader from "../components/Loader";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

export default function RevisarAutodiagnostico(props) {
  const { currentUser } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [DataMentor, setDataMentor] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);
  const [ruta, setRuta] = useState("");
  const [mentor, setMentor] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState({
    mentor: "",
    ruta: "",
  });

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
        });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setRuta(event.target.value);
  };

  // const clg = () => {
  //   console.log(mentor);
  //   console.log(ruta);
  // };

  const handleAddInfo = async () => {
    try {
      await database
        .collection("users")
        .doc(id)
        .set({ ruta_asignada: true, ruta: ruta, mentor: mentor }, { merge: true });
      setLoading(true);
    } catch (e) {
      setLoading(false);
      setErrors(e);
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
                    <h3 className="text-center mt-4 font-weight-bold mb-4">Datos del proyecto</h3>
                    <div className="datos-proyecto_container ">
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
                            primary="Descripción sobre la iniciativa"
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
                    <h3 className="text-center mt-4 font-weight-bold">
                      Asiganción del mentor y ruta
                    </h3>
                    <div className="datos-proyecto_container mt-3">
                      <Autocomplete
                        options={MentoresRegistrados}
                        name="mentor"
                        // multiple
                        value={mentor}
                        onChange={(event, newValue) => {
                          setMentor(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
                        }}
                        size="small"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="standard-basic"
                            className="datos-proyecto mt-3"
                            label="Mentor"
                            // multiline
                          />
                        )}
                      />

                      <FormControl className="MuiFormLabel-root mt-3">
                        <InputLabel id="demo-simple-select-filled-label">Ruta</InputLabel>
                        <Select
                          name="ruta"
                          labelid="demo-simple-select-outlined-label"
                          id="demo-mutiple-name"
                          label="genero"
                          onChange={handleInput}
                          value={ruta}
                          required
                        >
                          <MenuItem value={"soñar"}>Soñar</MenuItem>
                          <MenuItem value={"pensar"}>Pensar</MenuItem>
                          <MenuItem value={"testear"}>Testear</MenuItem>
                          <MenuItem value={"arrancar"}>Arrancar</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="FirstLogin_button_container mt-4">
                      <div>
                        <Link to="/home">
                          <Button
                            variant="contained"
                            className="button-1"
                            color="primary"
                            onClick={handleAddInfo}
                          >
                            Asignar
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="Button-volver mb-5 ">
                      <Link to="/home">
                        <Button
                          variant="contained"
                          color="secondary"
                          className="button-2"
                          startIcon={<ExitToAppIcon />}
                        >
                          Volver
                        </Button>
                      </Link>
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
