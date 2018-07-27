import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  state = {
    title: "",
    image: "",
    content: "",
    username: "",
    profileImg: ""
  };

  componentDidMount() {
    axios.get(`/api/post/${this.props.match.params.postid}`).then(post => {
      const { description, image, profile_img, title, username } = post.data[0];

      this.setState({
        content: description,
        image,
        profileImg: profile_img,
        title,
        username
      });
    });
  }

  render() {
    const { title, image, content, username, profileImg } = this.state;
    console.log(this.state.title, image, content, username, profileImg);

    return (
      <div>
        <p>{title}</p>
        <img src={image} alt="image" />
        <p>{content}</p>
        <p>{username}</p>
        <img src={profileImg} alt="profileImg" />
      </div>
    );
  }
}
