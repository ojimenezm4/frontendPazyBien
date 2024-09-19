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
  Pagination,
  Form,
  Input,
  Upload,
  Select,
  Space,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UndoOutlined,
  UnorderedListOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import Signin from "../signin/Signin";
import SearchBar from "../Searchbar/SearchBar";
import styled from "styled-components";
import Swal from 'sweetalert2';



const { confirm } = Modal;
const { TabPane } = Tabs;
const { Title } = Typography;

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

const GreenButton = styled(Button)`
  background-color: blue;  // Un tono de verde
  border-color: #4CAF50;
  color: white;

  &:hover, &:focus {
    background-color: #45a049;  // Un verde un poco más oscuro para el hover
    border-color: #45a049;
  }
`;


const Usuarios = ({ activos, rol }) => {
  const [searchText, setSearchText] = useState("");
  const [usuarios, guardarUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileList, setFileList] = useState([]);
  const pageSize = 6;

  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);

  const showEditModal = (user) => {
    setSelectedUser(user); // Actualiza el usuario seleccionado
    setEditModalVisible(true); // Muestra el modal
  };

  useEffect(() => {
    if (selectedUser && editModalVisible) {
      form.setFieldsValue({
        nombre: selectedUser.nombre,
        email: selectedUser.email,
        rol: selectedUser.rol,
      });
    }
  }, [selectedUser, editModalVisible, form]);

  const filteredData = usuarios
    .filter((item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item) => (rol === "super" ? true : item.rol !== "super"))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const hideEditModal = () => {
    setEditModalVisible(false);
    setFileList([]);
  };

    // Obtener la lista de usuarios
    const cargarUsuarios = useCallback(async () => {
      try {
        const response = await clienteAxios.get(activos ? "/usuarios" : "/usuarios/inactivos");
        guardarUsuarios(response.data);
      } catch (error) {
        console.error("Error al consultar la API", error);
      }
    }, [activos]);
  
    useEffect(() => {
      cargarUsuarios();
    }, [cargarUsuarios]);

  // Ejemplo de función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    try {
      const response = await clienteAxios.delete(`/usuarios/${id}`);
      Swal.fire({
        title: 'Eliminado!',
        text: response.data.message,
        icon: 'success'
      }).then(result => {
        if (result.isConfirmed) {
          cargarUsuarios(); // Recargar la lista de usuarios después de la eliminación
        }
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error'
      });
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
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Función para manejar la edición de usuario
  const handleEditUser = async (values) => {
    try {
      console.log("Enviando datos al servidor:", values);
      const formData = new FormData();
      formData.append("nombre", values.nombre);
      formData.append("email", values.email);
      formData.append("rol", values.rol);
      if (fileList.length > 0) {
        formData.append("fotoPerfil", fileList[0].originFileObj);
      }
  
      const response = await clienteAxios.put(`/usuarios/${selectedUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Respuesta de la API después de actualizar:", response);
      consultarAPI(); // Actualiza la lista de usuarios
      hideEditModal();
    } catch (error) {
      console.error("Error al editar el usuario:", error.response || error);
    }
  };
  

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  

  return (
    <>
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

      <SearchBar
        placeholder="Buscar usuario"
        onChange={(e) => setSearchText(e.target.value)}
      />

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
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            renderItem={(item) => (
              <List.Item>
                <StyledCard
                  title={item.nombre}
                  extra={
                    <Space size={16}>
                      <Tooltip title="Editar Usuario">
                      <GreenButton
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(item)}
                        
                      >
                        Editar
                        </GreenButton>
                      </Tooltip>
                      <Tooltip title={activos ? "Eliminar Usuario" : "Restaurar Usuario"}>
                        <StyledButton
                          type={activos ? "danger" : "primary"}
                          icon={activos ? <DeleteOutlined /> : <UndoOutlined />}
                          onClick={() => showConfirm(item._id, item.nombre)}
                        >
                          {activos ? "Eliminar" : "Restaurar"}
                        </StyledButton>
                      </Tooltip>
                    </Space>
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

      <Signin
        visible={modalVisible}
        onCancel={hideModal}
        rol={rol}
        onUserCreated={consultarAPI}
      />

      {/* Modal para editar usuario */}
      <Modal
  visible={editModalVisible}
  onCancel={hideEditModal}
  onOk={() => form.submit()} // Esto debería estar bien si la referencia a `form` es correcta
  title={`Editar Usuario: ${selectedUser?.nombre}`}
  centered
      >
        <Form
        form={form}
        key={selectedUser ? selectedUser._id : 'form'}
        onFinish={handleEditUser}
        initialValues={{
          nombre: selectedUser?.nombre,
          email: selectedUser?.email,
          rol: selectedUser?.rol,
        }}
        >
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Por favor ingresa el nombre del usuario' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Por favor ingresa el email del usuario' }]}>
            <Input />
          </Form.Item>
          <Form.Item
                name="rol"
                label="Rol"
                rules={[{ required: true, message: 'Por favor selecciona un rol' }]}
              >
                <Select
                  placeholder="Selecciona un rol"
                  allowClear
                >
                  <Select.Option value="super">Super</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="usuario">Usuario</Select.Option>
                </Select>
              </Form.Item>

          <Form.Item label="Foto de perfil">
            <Upload
              listType="picture"
              maxCount={1}
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Subir Foto</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Usuarios;
