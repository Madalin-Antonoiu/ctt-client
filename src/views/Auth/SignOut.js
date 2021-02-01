import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

class SignOut extends Component {
  componentDidMount() {
    this.props.signout(); // automatic signout on load of /signout route component
  }

  render() {
    return <div>See you later, aligator!</div>;
  }
}

export default connect(null, actions)(SignOut);
