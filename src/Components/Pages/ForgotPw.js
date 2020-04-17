import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import "./ForgotPw.scss";

class Login extends Component {
  state = {
    vw: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  };
  render() {
    return (
      <div id="forgotpw">
        {this.state.vw > 768 ? <div className="bg" /> : null}

        <div id="container" className="login-container">
          <div className="form-container sign-up-container">
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

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Remembered password?</h1>
                <Link to="/teams-ui">
                  <button className="ghost">Sign In</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
