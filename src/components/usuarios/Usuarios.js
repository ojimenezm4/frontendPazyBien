import React, { useState, useEffect, useCallback } from "react";
import { Avatar, List, Input, Button, Modal } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import Signin from "../signin/Signin"; // Importar el componente Signin

const { confirm } = Modal;

const Usuarios = ({ activos, rol }) => {
  const position = "bottom";
  const align = "center";
  const pageSize = 5;
  const [searchText, setSearchText] = useState("");
  const [usuarios, guardarUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredData = usuarios
    .filter((item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item) => (rol === "super" ? true : item.rol !== "super")) // Filtrar usuarios según el rol del usuario logueado
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Ordenar por fecha de creación descendente

  const consultarAPI = useCallback(async () => {
    try {
      const ruta = activos ? "/usuarios" : "/usuarios/inactivos";
      const usuariosConsulta = await clienteAxios.get(ruta);
      guardarUsuarios(usuariosConsulta.data);
    } catch (error) {
      console.error("Error al consultar la API", error);
    }
  }, [activos]);

  useEffect(() => {
    consultarAPI();
  }, [consultarAPI]);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const eliminarUsuario = async (id) => {
    try {
      await clienteAxios.delete(`/usuarios/${id}`);
      consultarAPI();
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  const restaurarUsuario = async (id) => {
    try {
      await clienteAxios.put(`/usuarios/${id}`, { activo: true });
      consultarAPI();
    } catch (error) {
      console.error("Error al restaurar el usuario", error);
    }
  };

  const showConfirm = (id, nombre) => {
    const action = activos ? "eliminar" : "restaurar";
    const title = `¿Estás seguro de ${action} a ${nombre}?`;
    const content = activos
      ? "Esta acción no se puede deshacer."
      : "El usuario será restaurado.";

    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      okText: "Sí",
      okType: activos ? "danger" : "primary",
      cancelText: "No",
      onOk() {
        if (activos) {
          eliminarUsuario(id);
        } else {
          restaurarUsuario(id);
        }
      },
      onCancel() {
        console.log("Cancelado");
      },
      centered: true,
      width: 400,
      maskClosable: true,
      bodyStyle: { display: "flex", justifyContent: "center" },
      cancelButtonProps: {
        style: { marginRight: "30%", marginBottom: "20px", marginTop: "10px" },
      },
      okButtonProps: {
        style: { marginRight: "30%", marginInlineStart: "0px" },
      },
    });
  };

  return (
    <>
      <Input.Search
        placeholder="Buscar por nombre"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {activos && ["admin", "super"].includes(rol) && (
        <Button
          type="primary"
          onClick={showModal}
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
        >
          Crear Nuevo usuario
        </Button>
      )}
      <List
        pagination={{
          position,
          align,
          total: filteredData.length,
          pageSize: pageSize,
          hideOnSinglePage: true,
        }}
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type={activos ? "danger" : "primary"}
                icon={activos ? <DeleteOutlined /> : <UndoOutlined />}
                onClick={() => showConfirm(item._id, item.nombre)}
              >
                {activos ? "Eliminar" : "Restaurar"}
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                item.fotoPerfil ? (
                  <Avatar
                    src={`${clienteAxios.defaults.baseURL}/uploads/${item.fotoPerfil}`}
                  />
                ) : (
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.nombre}`}
                  />
                )
              }
              title={item.nombre}
              description={`Email: ${item.email}, Rol: ${item.rol}`}
            />
          </List.Item>
        )}
      />
      <Signin
        visible={modalVisible}
        onCancel={hideModal}
        rol={rol}
        onUserCreated={consultarAPI} // Pasar la función consultarAPI como prop
      />
    </>
  );
};

export default Usuarios;
