import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginRegister from "../pages/LoginRegister";
import AñadirUsuarioPage from "../pages/AñadirUsuarioPage";
import PageNotFound from "../pages/PageNotFound";
import RevisarAutodiagnostico from "../pages/RevisarAutodiagnostico";
import PerfilUsuario from "../pages/PerfilUsuario";
import { AuthProvider } from "../components/Auth";

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
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}
