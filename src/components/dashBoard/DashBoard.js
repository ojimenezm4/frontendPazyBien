import React, { useState, useEffect, useCallback } from "react";
import { Layout, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import clienteAxios from "../../config/axios";

// Importación de componentes
import Navbar from "../Navbar/Navbar";
import Beneficiarios from "../beneficiarios/Beneficiarios";
import Proyectos from "../proyectos/Proyectos";
import MiPerfil from "../miPerfil/MiPerfil";
import Usuarios from "../usuarios/Usuarios";

// Desestructuración de componentes de Layout
const { Content, Footer } = Layout;

const DashBoard = () => {
  // Estados para manejar la información del usuario y el componente seleccionado
  const [userName, setUserName] = useState("");
  const [rol, setRol] = useState("");
  const [perfil, setPerfil] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(<Proyectos />);

  const navigate = useNavigate();

  // Obtención de tokens de tema para estilos consistentes
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Función para manejar el cierre de sesión
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decodificación del token y configuración de estados
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.nombre);
      setRol(decodedToken.rol);

      // Función para obtener el perfil del usuario
      const fetchProfile = async () => {
        try {
          const response = await clienteAxios.get(`/usuarios/${decodedToken.id}`);
          setPerfil(response.data);
        } catch (error) {
          console.error("Error al obtener el perfil del usuario", error);
        }
      };

      fetchProfile();

      // Manejo de la expiración del token
      const currentTime = Math.floor(Date.now() / 1000);
      const timeRemaining = decodedToken.exp - currentTime;

      if (timeRemaining > 0) {
        // Configurar cierre de sesión automático cuando expire el token
        setTimeout(() => {
          handleLogout();
        }, timeRemaining * 1000);
      } else {
        // Si el token ya expiró, cerrar sesión inmediatamente
        handleLogout();
      }
    }
  }, [handleLogout]);

  // Función para manejar los clics en el menú
  const handleMenuClick = (key) => {
    switch (key) {
      case "proyectos":
        setSelectedComponent(<Proyectos />);
        break;
      case "beneficiarios":
        setSelectedComponent(<Beneficiarios />);
        break;
      case "usuariosActivos":
      case "verUsuarios":
        setSelectedComponent(<Usuarios activos={true} rol={rol} />);
        break;
      case "usuariosInactivos":
        setSelectedComponent(<Usuarios activos={false} rol={rol} />);
        break;
      case "perfil":
        setSelectedComponent(<MiPerfil onBack={() => setSelectedComponent(<Proyectos />)} />);
        break;
      default:
        setSelectedComponent(<Proyectos />);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Barra de navegación */}
      <Navbar
        userName={userName}
        userRole={rol}
        onMenuClick={handleMenuClick}
        onLogout={handleLogout}
        userAvatar={perfil && perfil.fotoPerfil ? `${clienteAxios.defaults.baseURL}/uploads/${perfil.fotoPerfil}` : null}
      />
      {/* Contenido principal */}
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
          {selectedComponent}
        </div>
      </Content>
      {/* Pie de página */}
      <Footer style={{ textAlign: 'center' }}>
        Proyectos Paz y Bien ©{new Date().getFullYear()} Created by Gigagenios
      </Footer>
    </Layout>
  );
};

export default DashBoard;