import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import "./Login.scss";

class Login extends Component {
  state = {
    showForgot: false,
  };
  onLogin = () => {
    document.getElementById("container").classList.remove("right-panel-active");
    setTimeout(() => {
      this.setState({ showForgot: false });
    }, 500);
  };
  onRegister = () => {
    document.getElementById("container").classList.add("right-panel-active");
    this.setState({ showForgot: false });
  };
  onForgot = () => {
    document.getElementById("container").classList.add("right-panel-active");
    this.setState({ showForgot: true });
  };
  render() {
    return (
      <div id="login">
        <div className="bg" />
        <div id="container" className="login-container">
          {!this.state.showForgot ? (
            <div className="form-container sign-up-container">
              <h1>Sign Up</h1>
              <div className="input-wrap">
                <TextField
                  required
                  id="standard-required"
                  label="Username"
                  defaultValue=""
                />
                <TextField
                  required
                  id="standard-required"
                  label="Email"
                  defaultValue=""
                />
                <TextField
                  required
                  id="standard-required"
                  label="Password"
                  type="password"
                  defaultValue=""
                />
                <button className="ghost">Register</button>
              </div>
            </div>
          ) : (
            <div className="form-container sign-up-container forgot">
              <h1>Forgot Password</h1>
              <div className="input-wrap">
                <TextField
                  required
                  id="standard-required"
                  label="Email"
                  defaultValue=""
                />
                <TextField
                  required
                  id="standard-required"
                  label="New Password"
                  type="password"
                  defaultValue=""
                />
                <button className="ghost">Change password</button>
              </div>
            </div>
          )}

          <div className="form-container sign-in-container">
            <h1>Sign In</h1>
            <div className="input-wrap">
              <TextField
                required
                id="standard-required"
                label="Email"
                defaultValue=""
              />
              <TextField
                required
                id="standard-required"
                label="Password"
                type="password"
                defaultValue=""
              />
              <span onClick={this.onForgot}>Forgot Password?</span>
              <button className="ghost">Login</button>
            </div>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>
                  {this.state.showForgot
                    ? "Remembered password?"
                    : "Already have an account?"}
                </h1>
                <button onClick={this.onLogin} className="ghost">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Don't have an account?</h1>
                <button onClick={this.onRegister} className="ghost">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
