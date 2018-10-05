import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar name="Craig Melville" />
          <div className="uk-container uk-container-xsmall">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
