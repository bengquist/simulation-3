import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class Dashboard extends Component {
  state = {
    search: "",
    myPosts: true,
    posts: []
  };

  componentDidMount() {
    this.getPosts();
  }

  inputHandler = e => {
    this.setState({ search: e.target.value });
  };

  getPosts = () => {
    axios
      .get(
        `/api/posts/${this.props.userID}/${this.state.myPosts}/?search=${
          this.state.search
        }`
      )
      .then(posts => this.setState({ posts: posts.data, search: "" }));
  };

  render() {
    const posts = this.state.posts.map((post, i) => {
      return (
        <Link to={`/post/${post.postid}`} key={i}>
          <p>{post.title}</p>
          <p>{post.username}</p>
          <img src={post.profile_img} alt="profileImg" />
        </Link>
      );
    });

    return (
      <div>
        <div>
          <input
            value={this.state.search}
            onChange={event => this.inputHandler(event)}
            name="search"
            type="text"
          />
          <button>Search</button>
          <button>Reset</button>
          <input
            onChange={() =>
              this.setState({ myPosts: !this.state.myPosts }, () =>
                this.getPosts()
              )
            }
            id="myPosts"
            type="checkbox"
            checked={this.state.myPosts}
          />
          <label htmlFor="myPosts">My Posts</label>
        </div>
        {posts}
      </div>
    );
  }
}

export default connect(state => state)(Dashboard);
