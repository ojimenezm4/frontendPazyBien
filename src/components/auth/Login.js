import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import { jwtDecode } from "jwt-decode"; // Importar correctamente como una exportación nombrada
import "./Login.css";
import logo from "../../img/pazybien.png";

function Login() {
  const [credenciales, guardarCredenciales] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await clienteAxios.post("/login", credenciales);
      const { token } = respuesta.data;
      const decodedToken = jwtDecode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(decodedToken));

      message.success(`Bienvenido, ${decodedToken.nombre}`);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        message.error(error.response?.data?.mensaje || "Error al iniciar sesión");
      } else {
        message.error("Hubo un error");
      }
    }
  };

  const leerDatos = (e) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2>Inicio de sesión</h2>
        <form onSubmit={iniciarSesion}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={credenciales.email}
              onChange={leerDatos}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <Input.Password
              id="password"
              name="password"
              value={credenciales.password}
              onChange={leerDatos}
              required
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="form-group">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
