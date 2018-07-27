import React, { Component } from "react";
import { withRouter } from "react-router";
import Nav from "./components/Nav/Nav";
import routes from "./routes";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.location.pathname !== "/" && <Nav />}
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
