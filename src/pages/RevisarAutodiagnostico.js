import React, { useEffect, useContext, useState } from "react";
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
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [DataMentor, setDataMentor] = useState([]);
  const [DataUser, setDataUser] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);
  const [ruta, setRuta] = useState("");
  const [tipoEmprendimiento, setTipoEmprendimiento] = useState("");
  const [tipoEconomia, setTipoEconomia] = useState("");
  const [sectorEconomia, setSectorEconomia] = useState("");
  const [mentor, setMentor] = useState("");
  const [inputValue, setInputValue] = useState("");

  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Autodiagnostico";
    getData();
    getDataMentor();
    getDataUser();
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
  const getDataUser = async () => {
    try {
      setLoading(true);
      const res = await database.collection("users").where("uID", "==", id).get();
      const docs = [];

      res.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      setDataUser(docs[0]);
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
        .where("rol", "!=", "emprendedor")
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

  const handleInputRuta = (event) => {
    setRuta(event.target.value);
  };

  const handleInputTipoEmprendimiento = (event) => {
    setTipoEmprendimiento(event.target.value);
  };

  const handleInputTipoEconomia = (event) => {
    setTipoEconomia(event.target.value);
  };

  const handleInputSectorEconomia = (event) => {
    setSectorEconomia(event.target.value);
  };

  // const clg = () => {
  //   console.log(mentor);
  //   console.log(ruta);
  //   console.log(tipoEconomia);
  //   console.log(tipoEmprendimiento);
  //   console.log(sectorEconomia);
  // };

  const handleAddInfo = async () => {
    try {
      await database
        .collection("users")
        .doc(id)
        .set({ ruta_asignada: true, ruta: ruta, mentor: mentor }, { merge: true });

      await database.collection("proyectos").doc(Data.id).set(
        {
          ruta: ruta,
          mentor: mentor,
          tipoEconomia: tipoEconomia,
          tipoEmprendimiento: tipoEmprendimiento,
          sectorEconomia: sectorEconomia,
        },
        { merge: true }
      );
      setLoading(true);
    } catch (e) {
      setLoading(false);
      setErrors(e);
    }
  };

  const MentoresRegistrados = DataMentor.map((mentor) => {
    return mentor.username;
  });

  if (!userData) {
    return <Redirect to="/" />;
  }

  if (userData.rol !== "admin") {
    return <Redirect to="/home" />;
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
                      <List disablePadding className="RevisarAutodiagnostico-List">
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary="Nombre del emprendedor"
                            secondary={Data.username}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Correo del emprendedor"
                            secondary={DataUser.email}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Telefono del emprendedor"
                            secondary={DataUser.telefono}
                          />
                        </ListItem>
                        <Divider />
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
                      </List>

                      <List disablePadding className="RevisarAutodiagnostico-List">
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
                      Asiganci&oacute;n del mentor y ruta
                    </h3>
                    <form className="datos-proyecto_container mt-3">
                      <FormControl className="MuiFormLabel-root mt-3">
                        <InputLabel id="demo-simple-select-filled-label">
                          Tipo de emprendimiento
                        </InputLabel>
                        <Select
                          name="tipoEmprendimiento"
                          labelid="demo-simple-select-outlined-label"
                          id="demo-mutiple-name"
                          label="genero"
                          className="datos-proyecto mt-3"
                          onChange={handleInputTipoEmprendimiento}
                          value={tipoEmprendimiento}
                          required
                        >
                          <MenuItem value={"Dinámico"}>Din&aacute;mico</MenuItem>
                          <MenuItem value={"Alto impacto"}>Alto impacto</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl className="MuiFormLabel-root mt-3">
                        <InputLabel id="demo-simple-select-filled-label">
                          Tipo de econom&iacute;a
                        </InputLabel>
                        <Select
                          name="tipoEconomia"
                          labelid="demo-simple-select-outlined-label"
                          id="demo-mutiple-name"
                          label="genero"
                          className="datos-proyecto mt-3"
                          onChange={handleInputTipoEconomia}
                          value={tipoEconomia}
                          required
                        >
                          <MenuItem value={"Digital"}>Digital</MenuItem>
                          <MenuItem value={"Creativo y Cultural"}>Creativo y Cultural</MenuItem>
                          <MenuItem value={"Verde"}>Verde</MenuItem>
                          <MenuItem value={"Social y solidario"}>Social y solidario</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl className="MuiFormLabel-root mt-3">
                        <InputLabel id="demo-simple-select-filled-label">
                          Sector de la econom&iacute;a
                        </InputLabel>
                        <Select
                          name="sectorEconomia"
                          labelid="demo-simple-select-outlined-label"
                          id="demo-mutiple-name"
                          label="genero"
                          className="datos-proyecto mt-3"
                          onChange={handleInputSectorEconomia}
                          value={sectorEconomia}
                          required
                        >
                          <MenuItem value={"Agropecuario"}>Agropecuario</MenuItem>
                          <MenuItem value={"Industrial"}>Industrial</MenuItem>
                          <MenuItem value={"Servicios"}>Servicios</MenuItem>
                          <MenuItem value={"Comercio"}>Comercio</MenuItem>
                          <MenuItem value={"Transporte"}>Transporte</MenuItem>
                          <MenuItem value={"Construcción"}>Construcci&oacute;n</MenuItem>
                        </Select>
                      </FormControl>

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
                            name="mentor"
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
                          onChange={handleInputRuta}
                          value={ruta}
                          required
                          className="datos-proyecto mt-3"
                        >
                          <MenuItem value={"Soñar"}>Soñar</MenuItem>
                          <MenuItem value={"Pensar"}>Pensar</MenuItem>
                          <MenuItem value={"Testear"}>Testear</MenuItem>
                          <MenuItem value={"Arrancar"}>Arrancar</MenuItem>
                        </Select>
                      </FormControl>

                      <div className="FirstLogin_button_container mt-4">
                        <div>
                          <Link to="/home">
                            <Button
                              type="input"
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
                    </form>
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
