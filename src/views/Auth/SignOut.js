import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

import { Row } from 'antd';

class SignOut extends Component {
  componentDidMount() {
    this.props.signout(); // automatic signout on load of /signout route component
  }

  render() {
    return <Row >
      <div>See you later, aligator!</div>
    </Row>


  }
}

export default connect(null, actions)(SignOut);
