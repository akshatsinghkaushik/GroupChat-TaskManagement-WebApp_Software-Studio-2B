import React, { Component } from "react";
// import { BrowserRouter as Router, NavLink } from "react-router-dom";
import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar">
        <div className="nav">
          <img src="/favicon.ico" alt="icon"></img>
          <div>Chat App</div>
        </div>

        <div className="links">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/chat">Chat</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default Navbar;
