import React from "react";
import "./App.css";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const { Content, Sider } = Layout;


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
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline">
              {this.props.authenticated ? (<>

                <Menu.Item key="0" icon={<HomeOutlined />} defaultSelectedKeys={['1']}>
                  <Link to="/">Home</Link>
                </Menu.Item>

                <Menu.Item key="1" icon={<PieChartOutlined />} defaultSelectedKeys={['1']}>
                  <Link to="/websocket">Dashboard</Link>
                </Menu.Item>


                {/* <Menu.Item key="3" icon={<DesktopOutlined />}>
                  <Link to="/exchangeInfo">ExchangeInfo</Link>
                </Menu.Item> */}

                <Menu.Item key="2" icon={< LogoutOutlined />}>
                  <Link to="/signout">SignOut</Link>
                </Menu.Item>


              </>
              ) : (<Menu.Item key="9" icon={<LoginOutlined />}>
                <Link to="/signin">  Sign In</Link>

              </Menu.Item>
                )}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            {/* <MyHeader style={{ padding: 0 }} /> */}
            <Content style={{ margin: "0 16px" }}>
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
