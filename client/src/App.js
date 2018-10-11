import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Landing from "./pages/Landing";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/friends" component={Friends} />
                        <Route
                            exact
                            path="/profile/:username"
                            component={Profile}
                        />
                        <Route component={Landing} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
