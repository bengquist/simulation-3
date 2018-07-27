import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = props => {
  console.log(props);
  return (
    <div>
      <img src={props.profileImg} alt="profileImg" />
      <Link to="/dashboard">Home</Link>
      <Link to="/new">New Post</Link>
      <p>Logout</p>
    </div>
  );
};

export default connect(state => state)(Nav);
