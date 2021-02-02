import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";

const { Header } = Layout;

class MyHeader extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <>
          <Menu.Item key="2" style={{ float: "right" }}>
            <Link to="/signout">SignOut</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/websocket">Websocket</Link>
          </Menu.Item>
          {/* <Link to="/feature">Feature</Link> */}
        </>
      );
    } else {
      return (
        <>
          {/* <Menu.Item key="4" style={{ float: "right" }}>
            <Link to="/signup">Signup</Link>
          </Menu.Item> */}
          <Menu.Item key="5" style={{ float: "right" }}>
            <Link to="/signin">Signin</Link>
          </Menu.Item>
        </>
      );
    }
  }

  render() {
    return (
      <Header className="header">
        <Menu theme="dark" mode="horizontal">
          {this.renderLinks()}
        </Menu>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(MyHeader);
