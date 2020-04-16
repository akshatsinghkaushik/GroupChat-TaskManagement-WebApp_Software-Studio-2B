import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import "./Login.scss";

class Login extends Component {
  state = {
    vw: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  }
  onLogin = () => {
    document.getElementById('container').classList.remove("right-panel-active");
  }
  onRegister = () => {
    document.getElementById('container').classList.add("right-panel-active");
  }
  render() {
    return (
      <div id="login">
        {this.state.vw > 768 ? <div className="bg" /> : null}

        <div id="container" className="login-container">
          <div className="form-container sign-up-container">
            <h1>Sign Up</h1>
            <div className="input-wrap">
              <TextField required id="standard-required" label="Username" defaultValue="" />
              <TextField required id="standard-required" label="Email" defaultValue="" />
              <TextField required id="standard-required" label="Password" type="password" defaultValue="" />
              <button className="ghost">Register</button>
            </div>
          </div>
          <div className="form-container sign-in-container">
            <h1>Sign In</h1>
            <div className="input-wrap">
              <TextField required id="standard-required" label="Email" defaultValue="" />
              <TextField required id="standard-required" label="Password" type="password" defaultValue="" />
              <Link to="/forgot-password">Forgot Password?</Link>
              <button className="ghost">Login</button>
            </div>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Already have an account?</h1>
                <button onClick={this.onLogin} className="ghost">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Don't have an account?</h1>
                <button onClick={this.onRegister} className="ghost">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
};

export default Login;
