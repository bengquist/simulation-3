import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Form extends Component {
  state = {
    title: "",
    imageUrl: "",
    content: ""
  };

  submitPost = e => {
    e.preventDefault();
    const { title, imageUrl, content } = this.state;
    axios
      .post(`/api/post/${this.props.userID}`, { title, imageUrl, content })
      .then(() => this.props.history.push("/dashboard"));
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={event => this.submitPost(event)}>
        <h1>New Post</h1>
        <p>Title</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="title"
          type="text"
        />
        <div
          style={{
            backgroundImage: `url(${this.state.imageUrl})`,
            width: "400px",
            height: "400px"
          }}
          className="image"
        />
        <p>Image URL</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="imageUrl"
          type="text"
        />
        <p>Content</p>
        <input
          onChange={event => this.inputHandler(event)}
          name="content"
          type="text"
        />
        <button>Post</button>
      </form>
    );
  }
}

export default connect(state => state)(Form);
