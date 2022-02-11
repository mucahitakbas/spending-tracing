import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingUp from "./components/SingUp";
import { Layout, Menu } from "antd";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}></Menu>
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
              <Route element={<PrivateRoute />}>
                <Route path="/categories" element={<Categories />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/records" element={<Records />} />
              </Route>

              <Route path="/register" element={<SingUp />} />
              <Route path="/login" element={<Login />} />
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
