import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingUp from "./components/SingUp";
import { Layout, Menu } from "antd";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import Logout from "./components/Logout";
import AppHeader from "./components/AppHeader";

const { Content, Footer } = Layout;
function App() {
  return (
    <Layout>
      <AppHeader />
      <Content
        className="site-layout"
        style={{ padding: "40px", marginTop: 64 }}
      >
        
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/categories" element={<Categories />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/records" element={<Records />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<SingUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
     
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Spending Tracing @ Mücahit Akbaş 2022
      </Footer>
    </Layout>
  );
}

export default App;
