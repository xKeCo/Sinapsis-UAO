import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Home from "../pages/Home";
import LoginRegister from "../pages/LoginRegister";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/contacto" component={Contact} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} /> */}
        <Route exact path="/Login" component={LoginRegister} />
        <Route exact path="/Register" component={LoginRegister} />
      </Switch>
      {/* </Layout> */}
    </BrowserRouter>
  );
}
