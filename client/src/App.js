import React, { Component } from 'react';
import AuthButton from "./components/AuthButton";


class App extends Component {
  state = {
    userID: "",
    accessToken: ""
  };

  handleAuth = event => {
    event.preventDefault();
    var queryURL = "https://github.com/login/oauth/authorize?client_id=e52b2491623d91b826f2&state=active";
    Window.location=queryURL;
  };
  
  
  render() {
    return (
      <div>
        <h1>Lets Dev</h1>
        <AuthButton
          onClick={this.handleAuth}
          className="subbtn"
        >
          Login
        </AuthButton>
      </div>
    );
  }
}

export default App;
