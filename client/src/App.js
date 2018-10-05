import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar name="Craig Melville" username="acekreations" />
          <div className="uk-container uk-container-xsmall">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile/:username" component={Profile} />
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
