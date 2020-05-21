import React, { Component } from "react";
import { db } from "../../services/firebase";
import { auth } from "../../services/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import AnimatedModal from "./Modal";
import "./Chat.scss";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      groups: new Map(),
      selectedGroupID: "",
      selectedGroupName: "",
      users: new Map(),
      content: "",
      readError: null,
      writeError: null,
      loadingChats: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    //const chatArea = this.myRef.current;

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

    let groups_list = new Map();
    try {
      db.ref(`users/${this.state.user.uid}/groups`).on("value", (snapshot) => {
        snapshot.forEach((snap) => {
          groups_list.set(snap.key, snap.val());
        });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }

    try {
      db.ref(`groups`).on("value", (snapshot) => {
        let groups_temp = new Map();
        snapshot.forEach((snap) => {
          if (groups_list.has(snap.key)) {
            groups_temp.set(snap.key, snap.val());
          }
        });
        this.setState({ groups: groups_temp });
        this.setState({
          selectedGroupID: this.state.groups.keys().next().value,
        });

        db.ref(`groups/${this.state.selectedGroupID}/chats`).on(
          "value",
          (snapshot) => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });

            chats.sort(function (a, b) {
              return a.timestamp - b.timestamp;
            });

            this.setState({ chats });
          }
        );
        db.ref(`groups/${this.state.selectedGroupID}/chats`).off("value");
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }
  async componentWillUnmount() {
    db.ref("users").off("value");
    db.ref("chats").off("value");
    db.ref(`users/${this.state.user.uid}/groups`).off("value");
    db.ref(`groups`).off("value");
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleSelectGroup = (event) => {
    if (event.target.id !== "") {
      this.setState({
        selectedGroupID: event.target.id,
        selectedGroupName: this.state.groups.get(event.target.id).name,
      });

      db.ref(`groups/${event.target.id}/chats`).on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });

        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });

        this.setState({ chats });
      });
      db.ref(`groups/${this.state.selectedGroupID}/chats`).off("value");
    } else {
      this.setState({
        selectedGroupID: event.currentTarget.id,
        selectedGroupName: this.state.groups.get(event.currentTarget.id).name,
      });

      db.ref(`groups/${event.currentTarget.id}/chats`).on(
        "value",
        (snapshot) => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });

          chats.sort(function (a, b) {
            return a.timestamp - b.timestamp;
          });

          this.setState({ chats });
        }
      );
      db.ref(`groups/${this.state.selectedGroupID}/chats`).off("value");
    }
  };

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    //const chatArea = this.myRef.current;
    try {
      await db.ref(`groups/${this.state.selectedGroupID}/chats`).push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
      //chatArea.scrollBy(0, chatArea.scrollHeight);
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
      <div id="chat" className="">
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
                {Array.from(this.state.groups.values()).map((result, index) => {
                  return (
                    <div
                      key={index}
                      id={result.id}
                      className={
                        result.id === this.state.selectedGroupID
                          ? "chat_list active_chat"
                          : "chat_list"
                      }
                      onClick={this.handleSelectGroup}
                    >
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
                            {result.name}{" "}
                            <span
                              className="chat_date"
                              style={{ display: "none" }}
                            >
                              Dec 25
                            </span>
                          </h5>
                          <p>{result.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="fab">
                <AnimatedModal
                  className="fab"
                  users={this.state.users}
                  groups={this.state.groups}
                />
              </div>
            </div>
            <div className="mesgs">
              {/*ref={this.myRef}*/}

              {/* chat area */}
              <div className="msg_history">
                <div className="msg-top">
                  {/* Logged in as:{" "}
                  <strong className="text-info">{this.state.user.email}</strong> */}
                  <div className="group_header">
                    <strong className="text-info">
                      {this.state.selectedGroupName
                        ? this.state.selectedGroupName
                        : "Group Name"}
                    </strong>
                  </div>
                  <div className="create_subgroup_btn">
                    <button type="button">
                      {" "}
                      <FontAwesomeIcon icon={faPlus} />{" "}
                    </button>
                  </div>
                </div>

                {/* loading indicator */}
                {this.state.loadingChats ? (
                  <div
                    className="spinner-border text-success"
                    role="status"
                    style={{
                      display: "flex",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "1em",
                      marginBottom: "1em",
                    }}
                  >
                    <span className="sr-only" style={{}}>
                      Loading...
                    </span>
                  </div>
                ) : (
                  <div className="msg-mid">
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
                )}

                <form
                  onKeyDown={this._handleKeyDown}
                  onSubmit={this.handleSubmit}
                  className="type_msg"
                >
                  <textarea
                    type="text"
                    placeholder="Type a message"
                    className="form-control write_msg"
                    name="content"
                    onChange={this.handleChange}
                    value={this.state.content}
                  ></textarea>
                  {this.state.error ? (
                    <p className="text-danger">{this.state.error}</p>
                  ) : null}
                  <button className="msg_send_btn" type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
