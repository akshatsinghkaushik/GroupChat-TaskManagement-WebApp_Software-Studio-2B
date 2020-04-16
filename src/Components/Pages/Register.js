import React, { Component } from "react";
import "./Login.scss";

class Register extends Component {
  render() {
    return (
      <div id="login">
        <div id="container" className="login-container">
          <div className="form-container sign-up-container">
            <h1>Sign Up</h1>
          </div>
          <div className="form-container sign-in-container">
            <h1>Sign In</h1>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Already have an account?</h1>
                <button className="ghost">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Don't have an account?</h1>
                <button className="ghost">Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Register;
