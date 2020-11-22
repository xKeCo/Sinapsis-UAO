import React, { useEffect, useContext, useState } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
// Conexion con la base de datos
import { database } from "../firebase/client";
// Estilos CSS
import "bootstrap/dist/css/bootstrap.css";
// Componentes utilizados
import NavegationBar from "../components/NavegationBar";
import { AuthContext } from "../components/Auth";
import LoaderBottom from "../components/LoaderBottom";

// Material UI
import {
  TextField,
  Button,
  Breadcrumbs,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// import Autocomplete from "@material-ui/lab/Autocomplete";

// Material UI Icons
import {
  // Add as AddIcon,
  NavigateNext as NavigateNextIcon,
  ExitToApp as ExitToAppIcon,
  MoreHoriz as MoreHorizIcon,
  AddCircle as AddCircleIcon,
  PlaylistAdd as PlaylistAddIcon,
  Close as CloseIcon,
  FiberManualRecord as FiberManualRecordIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons/";
import { green, red, orange } from "@material-ui/core/colors";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "300px",
  },
});

const EmprendimientosInfo = (props) => {
  const { userData } = useContext(AuthContext);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Errors, setErrors] = useState(null);
  const [form, setValues] = useState({
    nomEmprendimiento: "",
    descEmprendimiento: "",
    prinSolucion: "",
    prinUsuario: "",
  });
  const [etapa, setEtapa] = useState("");
  const [estado, setEstado] = useState("");
  const [tipoEmprendimiento, setTipoEmprendimiento] = useState("");
  const [tipoEconomia, setTipoEconomia] = useState("");
  const [sectorEconomia, setSectorEconomia] = useState("");
  const [open, setOpen] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  // const [DataMentor, setDataMentor] = useState([]);
  // const [mentor, setMentor] = useState("");
  // const [inputValue, setInputValue] = useState("");

  // id del emprendimiento seleccionado
  const id = props.match.params.id;

  useEffect(() => {
    document.title = "Sinapsis UAO - Emprendimiento";
    getDataEmprendimientos();
    // getDataMentor();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Traer los datos del emprendimiento
  const getDataEmprendimientos = async () => {
    try {
      await database
        .collection("emprendimientos")
        .doc(id)
        .onSnapshot((doc) => {
          setLoading(true);

          setData(doc.data());

          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setErrors(error);
    }
  };

  const classes = useStyles();

  const history = useHistory();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // Funcion para eliminar los datos del emprendimiento
  const handleDeleteEmprendimiento = (e) => {
    e.preventDefault();
    database.collection("emprendimientos").doc(id).delete();
    history.push(`/emprendimientos/${Data.uID}`);
  };

  // Drawer - Menu desplazable
  // Funciones para el Drawer
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="ml-3">
        <ListItemIcon className="mt-3">
          <CloseIcon onClose={toggleDrawer("left", false)} />
        </ListItemIcon>

        {Data.estado === "activo" && (
          <Link
            to={`/crearActividad/${Data.uID}`}
            className="nav-item text-decoration-none items-dropdown"
          >
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Crear Actividad"} />
            </ListItem>
          </Link>
        )}
        {Data.estado === "activo" && (
          <Link to="/" className="nav-item text-decoration-none items-dropdown">
            <ListItem className="sideMenu-Item-emprendedor">
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Crear nuevo reporte"} />
            </ListItem>
          </Link>
        )}

        <ListItem className="sideMenu-Item-emprendedor">
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Modificar la información del emprendimiento"}
            onClick={() => setOpenModificar(true)}
          />
        </ListItem>

        <ListItem className="sideMenu-Item-emprendedor " onClick={() => setOpen(true)}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={"Eliminar emprendimiento"} />
        </ListItem>
      </List>
    </div>
  );
  // Drawer - Menu desplazable END

  // Conseguir los datos del mentor
  // const getDataMentor = async () => {
  //   try {
  //     await database
  //       .collection("users")
  //       .where("rol", "!=", "emprendedor")
  //       .onSnapshot((querysnapshot) => {
  //         const docs = [];

  //         querysnapshot.forEach((doc) => {
  //           docs.push({ ...doc.data(), id: doc.id });
  //         });

  //         setDataMentor(docs);
  //       });
  //   } catch (error) {
  //     setErrors(error);
  //   }
  // };

  // Conseguir todos los mentores registrados para ponerlos en el AutoComplete
  // const MentoresRegistrados = DataMentor.map((mentor) => {
  //   return mentor.username;
  // });

  // Función para saber lo que el usuario escribe
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Establecer el valor que se eligio en la casilla de etapa
  const handleInputEtapa = (event) => {
    setEtapa(event.target.value);
  };

  // Establecer el valor que se eligio en la casilla de estado
  const handleInputEstado = (event) => {
    setEstado(event.target.value);
  };

  // Establecer el valor que se eligio en la casilla de Tipo de emprendimiento
  const handleInputTipoEmprendimiento = (event) => {
    setTipoEmprendimiento(event.target.value);
  };

  // Establecer el valor que se eligio en la casilla de Tipo de economia
  const handleInputTipoEconomia = (event) => {
    setTipoEconomia(event.target.value);
  };

  // Establecer el valor que se eligio en la casilla de Sector de la economia
  const handleInputSectorEconomia = (event) => {
    setSectorEconomia(event.target.value);
  };

  // Funcion para actualizar los datos
  const handleUpdateEmprendimiento = async (e) => {
    e.preventDefault();
    if (
      form.nomEmprendimiento !== "" ||
      form.descEmprendimiento !== "" ||
      form.prinSolucion !== "" ||
      form.prinUsuario !== "" ||
      estado !== "" ||
      etapa !== "" ||
      tipoEmprendimiento !== "" ||
      tipoEconomia !== "" ||
      sectorEconomia !== ""
    ) {
      setOpenModificar(false);
      const username = Data.username;
      const uID = Data.uID;
      try {
        await database
          .collection("emprendimientos")
          .doc(id)
          .update({
            nombreEmprendimiento: form.nomEmprendimiento || Data.nombreEmprendimiento,
            descEmprendimiento: form.descEmprendimiento || Data.descEmprendimiento,
            prinSolucion: form.prinSolucion || Data.prinSolucion,
            prinUsuario: form.prinUsuario || Data.prinUsuario,
            estado: estado || Data.estado,
            etapa: etapa || Data.etapa,
            tipoEmprendimiento: tipoEmprendimiento || Data.tipoEmprendimiento,
            tipoEconomia: tipoEconomia || Data.tipoEconomia,
            sectorEconomia: sectorEconomia || Data.sectorEconomia,
            mentor: Data.mentor,
            uID: uID,
            username: username,
          });
        // setLoading(true);
        setOpenNotification(true);
      } catch (error) {
        setLoading(false);
        setErrors(error);
      }
    } else {
      setOpenModificar(false);
    }
  };

  if (!userData) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavegationBar />
      <div className="BreadCrumbs-container ">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to="/home" className="text-decoration-none text-black-50">
            Inicio
          </Link>
          <Link
            color="inherit"
            to={`/perfil/${Data.uID}`}
            className="text-decoration-none text-black-50"
          >
            Perfil del emprendedor
          </Link>
          <Link
            color="inherit"
            to={`/emprendimientos/${Data.uID}`}
            className="text-decoration-none text-black-50"
          >
            Emprendimientos
          </Link>
          <Typography color="textPrimary">Informaci&oacute;n del emprendimiento</Typography>
        </Breadcrumbs>
      </div>
      {Loading ? (
        <div>
          <LoaderBottom />
        </div>
      ) : (
        <>
          {Errors ? (
            <h3>Ocurri&oacute; un error.</h3>
          ) : (
            <>
              <div className="Home">
                <div className="EmprendimientoInfo_container ">
                  <h3 className="text-center font-weight-bold mb-4">
                    Informaci&oacute;n del emprendimiento <br />(
                    {Data.estado === "activo" && (
                      <FiberManualRecordIcon style={{ color: green[500] }} />
                    )}
                    {Data.estado === "ausente" && (
                      <FiberManualRecordIcon style={{ color: orange[500] }} />
                    )}
                    {Data.estado === "inactivo" && (
                      <FiberManualRecordIcon style={{ color: red[500] }} />
                    )}
                    )
                  </h3>

                  <div className="w-100">
                    <TextField
                      label="Nombre del emprendimiento"
                      type="text"
                      name="nombreEmprendimiento"
                      multiline
                      disabled
                      value={Data.nombreEmprendimiento}
                      // onChange={handleInput}
                      inputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className=" w-100 mt-3">
                    <TextField
                      label="Descripci&oacute;n del emprendimiento"
                      type="text"
                      name="descEmprendimiento"
                      multiline
                      disabled
                      value={Data.descEmprendimiento}
                      // onChange={handleInput}
                      inputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className=" w-100 mt-3">
                    <TextField
                      label="Principal problema que soluciona"
                      type="text"
                      name="prinSolucion"
                      multiline
                      disabled
                      value={Data.prinSolucion}
                      // onChange={handleInput}
                      inputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className=" w-100 mt-3">
                    <TextField
                      label="Principal cliente o usuario"
                      type="text"
                      name="prinUsuario"
                      multiline
                      disabled
                      value={Data.prinUsuario}
                      // onChange={handleInput}
                      inputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className="w-100 EmprendimientoInfo-subDetails_container">
                    <div className="w-100 EmprendimientoInfo-subDetails_container">
                      <div className="mt-3 datos">
                        <TextField
                          label="Tipo de emprendimiento"
                          type="text"
                          name="tipoEmprendimiento"
                          multiline
                          disabled
                          value={Data.tipoEmprendimiento}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </div>
                      <div className="mt-3 datos">
                        <TextField
                          label="Tipo de econom&iacute;a"
                          type="text"
                          name="tipoEconomia"
                          multiline
                          disabled
                          value={Data.tipoEconomia}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </div>
                    </div>
                    <div className="w-100 EmprendimientoInfo-subDetails_container">
                      <div className="mt-3 datos">
                        <TextField
                          label="Sector de la econom&iacute;a"
                          type="text"
                          name="sectorEconomia"
                          multiline
                          disabled
                          value={Data.sectorEconomia}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </div>
                      <div className="mt-3 datos">
                        <TextField
                          label="Etapa actual"
                          type="text"
                          name="tipoEmprendimiento"
                          multiline
                          disabled
                          value={Data.etapa}
                          // onChange={handleInput}
                          inputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-100 EmprendimientoInfo-subDetails_container">
                    <div className="mt-3 datos">
                      <TextField
                        label="Emprendedor"
                        type="text"
                        name="username"
                        multiline
                        disabled
                        value={Data.username}
                        // onChange={handleInput}
                        inputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>
                    <div className="mt-3 datos">
                      <TextField
                        label="Mentor asignado"
                        type="text"
                        name="mentor"
                        multiline
                        disabled
                        value={Data.mentor}
                        // onChange={handleInput}
                        inputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>
                  </div>
                  <div className="w-100 mt-3">
                    {userData.rol !== "emprendedor" && (
                      <React.Fragment key={"left"}>
                        <div className="FirstLogin_button_container ml-3 mr-3 mt-4">
                          <div>
                            <Button
                              variant="contained"
                              className="button-0"
                              color="primary"
                              endIcon={<MoreHorizIcon />}
                              onClick={toggleDrawer("left", true)}
                            >
                              Acciones
                            </Button>
                          </div>
                          <Drawer
                            anchor={"left"}
                            open={state["left"]}
                            onClose={toggleDrawer("left", false)}
                          >
                            {list("left")}
                          </Drawer>
                        </div>
                      </React.Fragment>
                    )}
                    <div className="EmprendimientoInfo-Button-volver mt-4 mb-5 ">
                      <Link
                        to={`/emprendimientos/${Data.uID}`}
                        className=" text-decoration-none items-dropdown"
                      >
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
                </div>
              </div>
              {/* Dialogo de eliminar */}
              <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"¿Desea eliminar este emprendimiento?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Si elimina este emprendimiento se perderá toda la información y no se podrá
                    recuperar. ¿Esta seguro?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteEmprendimiento} color="secondary">
                    Eliminar
                  </Button>
                  <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                    Cancelar
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Dialogo para modificar */}

              <Dialog
                open={openModificar}
                onClose={() => setOpenModificar(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth={true}
              >
                <DialogTitle id="alert-dialog-title">
                  {"Actualice la información de este emprendimiento!"}
                </DialogTitle>
                <DialogContent>
                  <div className="w-100">
                    <TextField
                      label="Nombre del emprendimiento"
                      type="text"
                      name="nomEmprendimiento"
                      required
                      multiline
                      autoComplete="off"
                      defaultValue={Data.nombreEmprendimiento}
                      onChange={handleInput}
                      inputProps={{
                        maxLength: 80,
                      }}
                      // placeholder="Ej. "
                      helperText={`${form.nomEmprendimiento.length} / 80 caracteres`}
                    />
                  </div>
                  <div className=" w-100 mt-3">
                    <TextField
                      label="Descripci&oacute;n del emprendimiento"
                      type="text"
                      name="descEmprendimiento"
                      multiline
                      defaultValue={Data.descEmprendimiento}
                      onChange={handleInput}
                      inputProps={{
                        maxLength: 250,
                      }}
                      // placeholder="Ej. "
                      helperText={`${form.descEmprendimiento.length} / 250 caracteres`}
                    />
                  </div>
                  <div className=" w-100 mt-3">
                    <TextField
                      label="Principal problema que soluciona"
                      type="text"
                      name="prinSolucion"
                      multiline
                      defaultValue={Data.prinSolucion}
                      onChange={handleInput}
                      inputProps={{
                        maxLength: 80,
                      }}
                      // placeholder="Ej. "
                      helperText={`${form.prinSolucion.length} / 80 caracteres`}
                    />
                  </div>
                  <div className=" w-100 mt-3">
                    <TextField
                      label="Principal cliente o usuario"
                      type="text"
                      name="prinUsuario"
                      multiline
                      defaultValue={Data.prinUsuario}
                      onChange={handleInput}
                      inputProps={{
                        maxLength: 80,
                      }}
                      // placeholder="Ej. "
                      helperText={`${form.prinUsuario.length} / 80 caracteres`}
                    />
                  </div>
                  <div className="w-100 EmprendimientoInfo-subDetails_container">
                    <div className="w-100 EmprendimientoInfo-subDetails_container">
                      <div className="mt-3 datos">
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
                            defaultValue={Data.tipoEmprendimiento}
                            required
                          >
                            <MenuItem value={"Dinámico"}>Din&aacute;mico</MenuItem>
                            <MenuItem value={"Alto impacto"}>Alto impacto</MenuItem>
                          </Select>
                        </FormControl>
                      </div>

                      <div className="mt-3 datos">
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
                            defaultValue={Data.tipoEconomia}
                            required
                          >
                            <MenuItem value={"Digital"}>Digital</MenuItem>
                            <MenuItem value={"Creativo y Cultural"}>Creativo y Cultural</MenuItem>
                            <MenuItem value={"Verde"}>Verde</MenuItem>
                            <MenuItem value={"Social y solidario"}>Social y solidario</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    <div className="w-100 EmprendimientoInfo-subDetails_container">
                      <div className="mt-3 datos">
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
                            defaultValue={Data.sectorEconomia}
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
                      </div>

                      <div className="mt-3 datos">
                        <FormControl className="MuiFormLabel-root mt-3">
                          <InputLabel id="demo-simple-select-filled-label">Etapa</InputLabel>
                          <Select
                            name="etapa"
                            labelid="demo-simple-select-outlined-label"
                            id="demo-mutiple-name"
                            label="genero"
                            onChange={handleInputEtapa}
                            defaultValue={Data.etapa}
                            required
                            className="datos-proyecto mt-3"
                          >
                            <MenuItem value={"Soñar"}>Soñar</MenuItem>
                            <MenuItem value={"Pensar"}>Pensar</MenuItem>
                            <MenuItem value={"Testear"}>Testear</MenuItem>
                            <MenuItem value={"Arrancar"}>Arrancar</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 EmprendimientoInfo-subDetails_container mt-3">
                    {/* <div className="mt-3 datos">
                      <Autocomplete
                        options={MentoresRegistrados}
                        name="mentor"
                        // value={mentor}
                        defaultValue={Data.mentor}
                        autoComplete={false}
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
                            className="datos-proyecto "
                            label="Mentor asignado"
                            name="mentor"
                          />
                        )}
                      />
                    </div> */}
                    <div className="mt-3 datos">
                      <FormControl className="MuiFormLabel-root ">
                        <InputLabel id="demo-simple-select-filled-label">Estado</InputLabel>
                        <Select
                          name="estado"
                          labelid="demo-simple-select-outlined-label"
                          id="demo-mutiple-name"
                          label="Estado"
                          onChange={handleInputEstado}
                          defaultValue={Data.estado}
                          required
                          className="datos-proyecto mt-3"
                        >
                          <MenuItem value={"activo"}>Activo</MenuItem>
                          <MenuItem value={"ausente"}>Ausente</MenuItem>
                          <MenuItem value={"inactivo"}>Inactivo</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={handleUpdateEmprendimiento}>
                    Actualizar
                  </Button>
                  <Button onClick={() => setOpenModificar(false)} color="primary" autoFocus>
                    Cancelar
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar
                open={openNotification}
                autoHideDuration={2000}
                onClose={() => setOpenNotification(false)}
              >
                <Alert onClose={() => setOpenNotification(false)} severity="success">
                  Datos actualizados!
                </Alert>
              </Snackbar>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EmprendimientosInfo;
