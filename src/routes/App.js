import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginRegister from "../pages/LoginRegister";
import PageNotFound from "../pages/PageNotFound";
import { AuthProvider } from "../components/Auth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={LoginRegister} />
          <Route exact path="/register" component={LoginRegister} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}
