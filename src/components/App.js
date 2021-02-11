import React from "react";
import MyHeader from "./Header";
import "./App.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  getBreadcrumb = () => {
    return window.location.pathname.replace("/", "");
  };

  render() {
    const { collapsed } = this.state;

    return (
      <>
        <Layout style={{ minHeight: "100vh" }}>
          {this.props.authenticated ? (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  Dashboard
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                  Automation
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                  Files
                </Menu.Item>
              </Menu>
            </Sider>
          ) : (
              ""
            )}
          <Layout className="site-layout">
            <MyHeader style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              {this.props.authenticated ? (
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>
                    <Link to="/">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{this.getBreadcrumb()}</Breadcrumb.Item>
                </Breadcrumb>
              ) : (
                  ""
                )}
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(App);
