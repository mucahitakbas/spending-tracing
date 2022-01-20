import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingUp from "./components/SingUp";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "40px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <BrowserRouter>
            <Routes>
              <Route
                path="/register"
                element={<SingUp />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Spending Tracing @ Mücahit Akbaş 2022
      </Footer>
    </Layout>
  );
}

export default App;
