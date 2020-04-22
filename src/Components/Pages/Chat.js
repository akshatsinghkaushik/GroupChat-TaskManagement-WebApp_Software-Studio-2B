import React, { Component } from "react";
import { db } from "../../services/firebase";
import { auth } from "../../services/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";

import "./Chat.scss";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      users: new Map(),
      content: "",
      readError: null,
      writeError: null,
      loadingChats: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
    try {
      db.ref("users").on("value", (snapshot) => {
        let users = new Map();
        snapshot.forEach((snap) => {
          users.set(snap.key, snap.val());
        });

        this.setState({ users });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <div id="chat" className="container">
        <h1>Chat</h1>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <input
                      type="text"
                      className="search-bar"
                      placeholder="Search"
                    />
                    <span className="input-group-addon">
                      <button type="button">
                        {" "}
                        <FontAwesomeIcon
                          icon={faSearch}
                          aria-hidden="true"
                        />{" "}
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="inbox_chat">
                <div className="chat_list active_chat">
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="group-no"
                      />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        Group 1 <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>Description / Last Message</p>
                    </div>
                  </div>
                </div>
                <div className="chat_list">
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="group-no"
                      />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        Group 2 <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>Description / Last Message </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mesgs" ref={this.myRef}>
              {/* loading indicator */}
              {this.state.loadingChats ? (
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                ""
              )}
              {/* chat area */}
              <div className="msg_history">
                <div className="pb-1 mx-3">
                  Logged in as:{" "}
                  <strong className="text-info">{this.state.user.email}</strong>
                </div>
                <hr />
                {this.state.chats.map((chat) => {
                  return (
                    <div
                      key={chat.timestamp}
                      className={
                        this.state.user.uid === chat.uid
                          ? "outgoing_msg"
                          : "incoming_msg"
                      }
                    >
                      {this.state.user.uid === chat.uid ? (
                        ""
                      ) : (
                        <div className="incoming_msg_img">
                          {" "}
                          <img
                            src="https://ptetutorials.com/images/user-profile.png"
                            alt="sunil"
                          />{" "}
                        </div>
                      )}
                      {this.state.user.uid === chat.uid ? (
                        <div className="sent_msg">
                          <p>{chat.content}</p>
                          <span className="time_date">
                            {this.formatTime(chat.timestamp)}
                          </span>
                        </div>
                      ) : (
                        <div className="received_msg">
                          <div className="received_withd_msg">
                            <div className="name-header">
                              {this.state.users.has(chat.uid)
                                ? this.state.users.get(chat.uid).name ===
                                  undefined
                                  ? this.state.users.get(chat.uid).email
                                  : this.state.users.get(chat.uid).name
                                : "Anonymous"}
                            </div>
                            <p>{chat.content}</p>
                            <span className="time_date">
                              {this.formatTime(chat.timestamp)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <form onSubmit={this.handleSubmit} className="type_msg">
                <div className="input_msg_write">
                  <textarea
                    type="text"
                    placeholder="Type a message"
                    className="form-control write_msg"
                    name="content"
                    onChange={this.handleChange}
                    value={this.state.content}
                  ></textarea>
                  <input />
                  {this.state.error ? (
                    <p className="text-danger">{this.state.error}</p>
                  ) : null}
                  <button className="msg_send_btn" type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
