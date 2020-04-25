import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Icon from "../img/icon.png";
import { logout } from "../helpers/auth";

class Navbar extends Component {
  render() {
    // console.log(window.location.pathname === "/teams-ui/chat")
    // if (window.location.pathname === "/teams-ui/login"
    //   || window.location.pathname === "/teams-ui") {
    return (
      <div id="navbar">
        <div className="nav">
          <img src={Icon} alt="Chat Bubble"></img>
          <div>Chat App</div>
        </div>

        <div className="links">
          <ul>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            {!this.props.authenticated ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              ""
            )}
            {this.props.authenticated ? (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            ) : (
              ""
            )}
            {this.props.authenticated ? (
              <li>
                <Link to="/login" onClick={logout}>
                  SignOut
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
