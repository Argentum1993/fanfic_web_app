import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './componets/Navigation'
import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from "./componets/Login";
import Registration from "./componets/Registration";



function App() {
  return (
      <>
        <Navigation/>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign-up" component={Registration} />
        </Switch>
      </>
  );
}

export default App;
