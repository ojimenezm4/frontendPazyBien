import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  Button,
  message,
  Modal,
  Form,
  Input,
  Upload,
  Tabs,
  Card,
  Tooltip,
  Typography,
  Space,
  Row,
  Col
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import VerBeneficiario from "./VerBeneficiario";
import Swal from "sweetalert2";
import SearchBar from "../Searchbar/SearchBar";
import styled from "styled-components";

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

const Beneficiarios = () => {
  // Estados para manejar la búsqueda, lista de beneficiarios, modal y subida de archivos
  const [searchText, setSearchText] = useState("");
  const [personas, guardarPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  // Filtrar beneficiarios basados en el texto de búsqueda
  const filteredData = personas.filter((item) =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  // Función para obtener la lista de beneficiarios desde la API
  const consultarAPI = async () => {
    try {
      const personasConsulta = await clienteAxios.get("/personas");
      guardarPersonas(personasConsulta.data);
    } catch (error) {
      console.error("Error al consultar la API", error);
    }
  };

  // Efecto para cargar los beneficiarios al montar el componente
  useEffect(() => {
    consultarAPI();
  }, []);

  // Función para ver los detalles de un beneficiario
  const verBeneficiario = (persona) => {
    setSelectedPersona(persona);
  };

  // Función para confirmar y ejecutar la eliminación de un beneficiario
  const confirmarEliminacion = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await clienteAxios.put(`/personas/${id}/eliminar`);
          message.success("Persona eliminada correctamente");
          consultarAPI();
        } catch (error) {
          console.error("Error al eliminar la persona", error);
          message.error("Error al eliminar la persona");
        }
      }
    });
  };

  // Función para crear un nuevo beneficiario
  const handleCreateBeneficiario = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    if (fileList.length > 0) {
      formData.append("imagen", fileList[0].originFileObj);
    }

    try {
      await clienteAxios.post("/personas", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Beneficiario creado correctamente");
      consultarAPI();
      setModalVisible(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Error al crear el beneficiario", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear el beneficiario",
        text: error.response?.data?.mensaje || "Error desconocido",
      });
    }
  };

  // Función para manejar cambios en la subida de archivos
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Renderizar el componente VerBeneficiario si se ha seleccionado una persona
  if (selectedPersona) {
    return (
      <VerBeneficiario
        persona={selectedPersona}
        onBack={() => setSelectedPersona(null)}
        consultarAPI={consultarAPI}
      />
    );
  }

  return (
    <>
      {/* Encabezado con título y botón para crear nuevo beneficiario */}
      <ResponsiveRow justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <ResponsiveCol>
          <Title level={4}>Beneficiarios: {personas.length}</Title>
        </ResponsiveCol>
        <ResponsiveCol style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Nuevo beneficiario
          </Button>
        </ResponsiveCol>
      </ResponsiveRow>

      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar beneficiario"
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Tabs para mostrar la lista de beneficiarios */}
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined />
               Lista de Beneficiarios
            </span>
          }
          key="1"
        >
          {/* Lista de beneficiarios */}
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}
            dataSource={filteredData}
            renderItem={(item) => (
              <List.Item>
                <StyledCard
                  title={item.nombre}
                  extra={
                    <>
                      <Tooltip title="Ver Detalles">
                        <Button
                          type="link"
                          icon={<EyeOutlined />}
                          onClick={() => verBeneficiario(item)}
                        />
                      </Tooltip>
                      <Tooltip title="Eliminar Beneficiario">
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => confirmarEliminacion(item._id)}
                        />
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    size={64}
                    src={
                      item.imagen
                        ? `${clienteAxios.defaults.baseURL}/uploads/${item.imagen}`
                        : `https://api.dicebear.com/7.x/miniavs/svg?seed=${item.nombre}`
                    }
                    style={{ marginBottom: 16 }}
                  />
                  <p>CUI: {item.cui}</p>
                  <p>Teléfono: {item.telefono}</p>
                  <p>Dirección: {item.direccion}</p>
                </StyledCard>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>

      {/* Modal para crear nuevo beneficiario */}
      <Modal
        visible={modalVisible}
        title="Ingresar nuevo beneficiario"
        onCancel={() => setModalVisible(false)}
        footer={[
          <Space>
            <Button key="cancel" onClick={() => setModalVisible(false)}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Guardar
            </Button>
          </Space>
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateBeneficiario}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nombre"
                label="Nombre"
                rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="cui"
                label="CUI"
                rules={[{ required: true, message: "Por favor ingrese el CUI" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="padre" label="Padre">
                <Input />
              </Form.Item>
              <Form.Item name="madre" label="Madre">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="telefono" label="Teléfono">
                <Input />
              </Form.Item>
              <Form.Item
                name="telefonoContacto"
                label="Teléfono de Contacto"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el teléfono de contacto",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="direccion"
                label="Dirección"
                rules={[
                  { required: true, message: "Por favor ingrese la dirección" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fechaNacimiento"
                label="Fecha de Nacimiento"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la fecha de nacimiento",
                  },
                ]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="imagen" label="Imagen">
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Subir Imagen</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Beneficiarios;