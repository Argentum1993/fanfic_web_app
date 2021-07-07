import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './componets/Navigation'
import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from "./componets/Login";
import Registration from "./componets/Registration";

import Start from "./componets/onboarding/Start";



function App() {
  return (
      <div className="App">
          <Switch>
              <Route exact path="/sign-up" component={Registration} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/start" component={Start}/>
              <Route component={Navigation}/>
          </Switch>
      </div>
  );
}

export default App;
