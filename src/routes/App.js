import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Componentes para saber el usuario de la sesion actual
import { AuthProvider } from "../components/Auth";
// Paginas
import Home from "../pages/Home";
import LoginRegister from "../pages/LoginRegister";
import AñadirUsuarioPage from "../pages/AñadirUsuarioPage";
import PageNotFound from "../pages/PageNotFound";
import RevisarAutodiagnostico from "../pages/RevisarAutodiagnostico";
import PerfilUsuario from "../pages/PerfilUsuario";
import CrearActividadPage from "../pages/CrearActividadPage";
import ActividadInfo from "../pages/ActividadInfo";
import ReporteEtapa from "../pages/ReporteEtapa";
import EmprendimientosPage from "../pages/EmprendimientosPage";
import EmprendimientoInfo from "../pages/EmprendimientoInfo";
import CrearEmprendimiento from "../pages/CrearEmprendimiento";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={LoginRegister} />
          <Route exact path="/registro" component={LoginRegister} />
          <Route exact path="/añadir" component={AñadirUsuarioPage} />
          <Route exact path="/revisar/:id" component={RevisarAutodiagnostico} />
          <Route exact path="/perfil/:id" component={PerfilUsuario} />
          <Route exact path="/emprendimientos/:id" component={EmprendimientosPage} />
          <Route exact path="/emprendimientoInfo/:id" component={EmprendimientoInfo} />
          <Route exact path="/crearEmprendimiento/:id" component={CrearEmprendimiento} />
          <Route exact path="/actividad/:id" component={ActividadInfo} />
          <Route exact path="/reporte/:id" component={ReporteEtapa} />
          <Route exact path="/crearActividad/:id" component={CrearActividadPage} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}
