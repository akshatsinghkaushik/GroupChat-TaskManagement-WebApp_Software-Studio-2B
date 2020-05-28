import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { auth } from "./services/firebase";

import Navbar from "./Components/Navbar";
// import Home from "./Components/Pages/Home";
// import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Chat from "./Components/Pages/Chat";
import Taskboard from "./Components/Pages/Taskboard";
import Profile from "./Components/Pages/Profile";
import "./App.scss";

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/chat" />
        )
      }
    />
  );
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <div className="App">
        <Router basename="/">
          <Navbar authenticated={this.state.authenticated} />
          <Switch>
            <PrivateRoute
              path="/chat"
              authenticated={this.state.authenticated}
              component={Chat}
            />
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={Login}
            />
            <PrivateRoute
              path="/profile"
              authenticated={this.state.authenticated}
              component={Profile}
            />
            <PrivateRoute
              path="/taskboard"
              authenticated={this.state.authenticated}
              component={Taskboard}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
