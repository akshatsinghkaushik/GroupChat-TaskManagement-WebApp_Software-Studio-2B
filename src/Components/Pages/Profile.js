import React, { Component } from "react";
import "./Profile.scss";

import { db } from "../../services/firebase";
import { auth } from "../../services/firebase";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      email: null,
      username: null,
      readError: null,
      writeError: null,
    };
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ readError: null });

    try {
      db.ref(`users/${this.state.user.uid}`).once("value", (snapshot) => {
        this.setState({
          email: snapshot.val().email,
          username: snapshot.val().name ? snapshot.val().name : null,
        });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  render() {
    return (
      <div id="profile">
        <div className="content-wrap">
          <div className="name-icon">D</div>
          <h1>
            Welcome,{" "}
            {this.state.username != null
              ? this.state.username
              : this.state.email}
          </h1>
          <h2>Manage your information to make Chat App work better for you</h2>
          <div className="card">
            <div className="inner-heading">Profile</div>
            <div className="info">
              <h3>PHOTO</h3>
              <div className="content">
                <h4>Add a photo to personalise your account</h4>
              </div>
              <div className="icon">
                D
                <div className="photo">
                  <svg
                    data-v-d223ba98=""
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="camera"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="svg-inline--fa fa-camera fa-w-16"
                    style={{ fontSize: "17px" }}
                  >
                    <path
                      data-v-d223ba98=""
                      fill="currentColor"
                      d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
                      className=""
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="info">
              <h3>EMAIL</h3>
              <div className="content">{this.state.email}</div>
              <div className="popup">
                <svg
                  data-v-d223ba98=""
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="pen"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-pen fa-w-16"
                >
                  <path
                    data-v-d223ba98=""
                    fill="currentColor"
                    d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
                    className=""
                  ></path>
                </svg>
              </div>
            </div>
            <div className="info">
              <h3>USERNAME</h3>
              <div className="content">
                {this.state.username != null
                  ? this.state.username
                  : this.state.email}
              </div>
              <div className="popup">
                <svg
                  data-v-d223ba98=""
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="pen"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-pen fa-w-16"
                >
                  <path
                    data-v-d223ba98=""
                    fill="currentColor"
                    d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
                    className=""
                  ></path>
                </svg>
              </div>
            </div>
            <div className="info" style={{ borderBottom: "none" }}>
              <h3>PASSWORD</h3>
              <div className="content" type="password">
                ************
              </div>
              <div className="popup">
                <svg
                  style={{ width: "20px", fontSize: "20px", height: "20px" }}
                  data-v-d223ba98=""
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="svg-inline--fa fa-arrow-right fa-w-14"
                >
                  <path
                    data-v-d223ba98=""
                    fill="currentColor"
                    d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                    className=""
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
