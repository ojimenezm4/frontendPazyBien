import axios from "axios";
//configura una variable para el servidor con el que conectar[a axios]
const clienteAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Agregar un interceptor para incluir el token en las solicitudes
clienteAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clienteAxios;
