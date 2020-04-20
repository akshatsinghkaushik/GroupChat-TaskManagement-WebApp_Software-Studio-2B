import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./Navbar.scss";
import Icon from "../img/icon.png";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar">
        <div className="nav">
          <img src={Icon} alt="Chat Bubble"></img>
          <div>Chat App test</div>
        </div>

        <div className="links">
          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul> */}
        </div>
      </div>
    );
  }
}

export default Navbar;
