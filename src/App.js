import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
// import Home from "./Components/Pages/Home";
// import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import ForgotPw from "./Components/Pages/ForgotPw";
import Chat from "./Components/Pages/Chat";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/forgot-password">
              <ForgotPw />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
