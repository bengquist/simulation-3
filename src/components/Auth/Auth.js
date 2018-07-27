import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../../ducks/reducer";
import axios from "axios";

class Auth extends Component {
  state = {
    username: "",
    password: ""
  };

  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  registerHandle = () => {
    axios
      .post("/api/user/register", {
        username: this.state.username,
        password: this.state.password
      })
      .then(user => {
        const { username, userid, profileImg } = user.data;

        this.props.createUser(userid, username, profileImg);
      });

    this.props.history.push("/dashboard");
  };

  loginHandle = () => {
    axios
      .post("/api/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(user => {
        const { username, userid, profile_img } = user.data;

        this.props.createUser(userid, username, profile_img);
      });

    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <div>
          <p>Username:</p>
          <input
            onChange={e => this.inputHandler(e)}
            name="username"
            type="text"
          />
          <p>Password:</p>
          <input
            onChange={e => this.inputHandler(e)}
            name="password"
            type="text"
          />
          <div className="buttons">
            <button onClick={() => this.loginHandle()}>Login</button>
            <button onClick={() => this.registerHandle()}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createUser }
)(Auth);
