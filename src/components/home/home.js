import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import Beneficiarios from "../beneficiarios/Beneficiarios";
import Proyectos from "../proyectos/Proyectos";

const { Header, Content, Footer } = Layout;

const Items = [
  { key: "1", label: "Proyectos", component: <Proyectos /> },
  { key: "2", label: "Beneficiarios", component: <Beneficiarios /> },
];

const Home = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {Items.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content
        style={{
          padding: "3em 2em 2em 2em ",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {Items.find((item) => item.key === selectedKey)?.component}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Proyectos Paz y Bien ©{new Date().getFullYear()} Created by Gigagenios
      </Footer>
    </Layout>
  );
};

export default Home;
