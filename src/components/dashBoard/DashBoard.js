import React, { useState, useEffect, useCallback } from "react";
import { Layout, Menu, Button, Avatar, theme, Drawer } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import clienteAxios from "../../config/axios";

import Beneficiarios from "../beneficiarios/Beneficiarios";
import Proyectos from "../proyectos/Proyectos";
import MiPerfil from "../miPerfil/MiPerfil";
import Usuarios from "../usuarios/Usuarios";

const { Header, Content, Footer } = Layout;

const DashBoard = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [userName, setUserName] = useState("");
  const [rol, setRol] = useState("");
  const [rightDrawerVisible, setRightDrawerVisible] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(<Proyectos />);

  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.nombre);
      setRol(decodedToken.rol);

      const fetchProfile = async () => {
        try {
          const response = await clienteAxios.get(
            `/usuarios/${decodedToken.id}`
          );
          setPerfil(response.data);
        } catch (error) {
          console.error("Error al obtener el perfil del usuario", error);
        }
      };

      fetchProfile();

      const currentTime = Math.floor(Date.now() / 1000);
      const timeRemaining = decodedToken.exp - currentTime;

      if (timeRemaining > 0) {
        setTimeout(() => {
          handleLogout();
        }, timeRemaining * 1000);
      } else {
        handleLogout();
      }
    }
  }, [handleLogout]);

  const handleMenuClick = (key) => {
    setSelectedKey(key);
    setShowProfile(false);

    switch (key) {
      case "1":
        setSelectedComponent(<Proyectos />);
        break;
      case "2":
        setSelectedComponent(<Beneficiarios />);
        break;
      case "3":
        setSelectedComponent(<Usuarios activos={true} rol={rol} />);
        break;
      case "4":
        setSelectedComponent(<Usuarios activos={true} rol={rol} />);
        break;
      case "5":
        setSelectedComponent(<Usuarios activos={false} rol={rol} />);
        break;
      default:
        setSelectedComponent(<Proyectos />);
    }
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleBack = () => {
    setShowProfile(false);
  };

  const DrawerItems = [
    ...(rol === "admin"
      ? [
          {
            key: "3",
            label: "Ver Usuarios",
          },
        ]
      : []),
    ...(rol === "super"
      ? [
          {
            key: "4",
            label: "Ver Usuarios Activos",
          },
          {
            key: "5",
            label: "Ver Usuarios Inactivos",
          },
        ]
      : []),
  ];

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
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
            }}
            onClick={() => handleMenuClick("1")}
          >
            Proyectos
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
            }}
            onClick={() => handleMenuClick("2")}
          >
            Beneficiarios
          </Button>
        </div>
        <Button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            width: "100px",
            textAlign: "left",
            paddingRight: 0,
          }}
          onClick={() => setRightDrawerVisible(true)}
          onMouseEnter={(e) => (e.target.style.color = "#1890ff")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Opciones <DownOutlined />
        </Button>
      </Header>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          padding: "10px 20px",
          backgroundColor: "#f0f2f5",
        }}
      >
        {perfil && perfil.fotoPerfil && (
          <Avatar
            size={40}
            src={`${clienteAxios.defaults.baseURL}/uploads/${perfil.fotoPerfil}`}
            style={{ marginRight: 10 }}
          />
        )}
        <span>
          Hola, {userName} ({rol}){" "}
          <Button
            style={{ width: "50px" }}
            type="link"
            icon={<UserOutlined />}
            onClick={handleProfileClick}
          >
            ver mi perfil
          </Button>
        </span>
      </div>
      <Content
        style={{
          padding: "0em 2em 2em 2em ",
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
          {showProfile ? <MiPerfil onBack={handleBack} /> : selectedComponent}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Proyectos Paz y Bien ©{new Date().getFullYear()} Created by Gigagenios
      </Footer>
      <Drawer
        title="Opciones"
        placement="right"
        onClose={() => setRightDrawerVisible(false)}
        open={rightDrawerVisible}
      >
        <Menu onClick={(e) => handleMenuClick(e.key)}>
          {DrawerItems.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
          <Menu.Item key="logout" onClick={handleLogout}>
            Salir
          </Menu.Item>
        </Menu>
      </Drawer>
    </Layout>
  );
};

export default DashBoard;
