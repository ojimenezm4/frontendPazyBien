import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  List,
  Button,
  Modal,
  Tabs,
  Card,
  Tooltip,
  Typography,
  Row,
  Col,
  Pagination
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import Signin from "../signin/Signin";
import SearchBar from "../Searchbar/SearchBar";
import styled from "styled-components";

const { confirm } = Modal;
const { TabPane } = Tabs;
const { Title } = Typography;

// Estilos personalizados para los componentes
const StyledCard = styled(Card)`
  margin-bottom: 16px;
  .ant-card-head-title {
    font-weight: bold;
  }
`;

const ResponsiveRow = styled(Row)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ResponsiveCol = styled(Col)`
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

// Estilo personalizado para el botón de eliminar/restaurar usuario
const StyledButton = styled(Button)`
  &.ant-btn-danger {
    background-color: #ff4d4f;
    border-color: #ff4d4f;
    color: white;

    &:hover, &:focus {
      background-color: #ff7875;
      border-color: #ff7875;
      color: white;
    }
  }

  &.ant-btn-primary {
    &:hover, &:focus {
      background-color: #40a9ff;
      border-color: #40a9ff;
    }
  }
`;

// Estilo personalizado para la paginación
const StyledPagination = styled(Pagination)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  .ant-pagination-item,
  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
  }

  .ant-pagination-options {
    display: flex;
    align-items: center;
    margin-left: 16px;
  }

  .ant-pagination-options-quick-jumper {
    display: flex;
    align-items: center;

    input {
      margin: 0 8px;
    }
  }
`;

// Componente principal de Usuarios
const Usuarios = ({ activos, rol }) => {
  // Estados para manejar la búsqueda, lista de usuarios, modal y paginación
  const [searchText, setSearchText] = useState("");
  const [usuarios, guardarUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Número de usuarios por página

  // Filtrar y ordenar la lista de usuarios
  const filteredData = usuarios
    .filter((item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item) => (rol === "super" ? true : item.rol !== "super"))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Función para consultar la API y obtener la lista de usuarios
  const consultarAPI = useCallback(async () => {
    try {
      const ruta = activos ? "/usuarios" : "/usuarios/inactivos";
      const usuariosConsulta = await clienteAxios.get(ruta);
      guardarUsuarios(usuariosConsulta.data);
    } catch (error) {
      console.error("Error al consultar la API", error);
    }
  }, [activos]);

  // Efecto para cargar los usuarios al montar el componente
  useEffect(() => {
    consultarAPI();
  }, [consultarAPI]);

  // Funciones para manejar la visibilidad del modal
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    try {
      await clienteAxios.delete(`/usuarios/${id}`);
      consultarAPI();
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  // Función para restaurar un usuario
  const restaurarUsuario = async (id) => {
    try {
      await clienteAxios.put(`/usuarios/${id}`, { activo: true });
      consultarAPI();
    } catch (error) {
      console.error("Error al restaurar el usuario", error);
    }
  };

  // Función para mostrar el modal de confirmación
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
    });
  };

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Encabezado con título y botón para crear nuevo usuario */}
      <ResponsiveRow justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <ResponsiveCol>
          <Title level={4}>Usuarios: {filteredData.length}</Title>
        </ResponsiveCol>
        <ResponsiveCol style={{ textAlign: "right" }}>
          {activos && ["admin", "super"].includes(rol) && (
            <Button
              type="primary"
              onClick={showModal}
              icon={<PlusOutlined />}
            >
              Crear Nuevo usuario
            </Button>
          )}
        </ResponsiveCol>
      </ResponsiveRow>

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar usuario"
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Tabs para mostrar la lista de usuarios */}
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined />
              Lista
            </span>
          }
          key="1"
        >
          {/* Lista de usuarios */}
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            renderItem={(item) => (
              <List.Item>
                <StyledCard
                  title={item.nombre}
                  extra={
                    <Tooltip title={activos ? "Eliminar Usuario" : "Restaurar Usuario"}>
                      <StyledButton
                        type={activos ? "danger" : "primary"}
                        icon={activos ? <DeleteOutlined /> : <UndoOutlined />}
                        onClick={() => showConfirm(item._id, item.nombre)}
                      >
                        {activos ? "Eliminar" : "Restaurar"}
                      </StyledButton>
                    </Tooltip>
                  }
                >
                  <Avatar
                    size={64}
                    src={
                      item.fotoPerfil
                        ? `${clienteAxios.defaults.baseURL}/uploads/${item.fotoPerfil}`
                        : `https://api.dicebear.com/7.x/miniavs/svg?seed=${item.nombre}`
                    }
                    style={{ marginBottom: 16 }}
                  />
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Rol:</strong> {item.rol}</p>
                  <p><strong>Creado:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                </StyledCard>
              </List.Item>
            )}
          />
          {/* Paginación */}
          <StyledPagination
            current={currentPage}
            total={filteredData.length}
            pageSize={pageSize}
            showSizeChanger={false}
            showQuickJumper={false}
            onChange={handlePageChange}
            size="small"
          />
        </TabPane>
      </Tabs>

      {/* Modal para crear nuevo usuario */}
      <Signin
        visible={modalVisible}
        onCancel={hideModal}
        rol={rol}
        onUserCreated={consultarAPI}
      />
    </>
  );
};

export default Usuarios;