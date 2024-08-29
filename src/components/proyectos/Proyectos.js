import React, { useState, useEffect } from "react";
import {
  List,
  Button,
  message,
  Modal,
  Input,
  Form,
  Select,
  Row,
  Col,
  Tabs,
  Card,
  Tooltip,
  Typography,
  Space,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import VerProyecto from "./VerProyecto";
import moment from "moment";
import styled from "styled-components";
import SearchBar from "../Searchbar/SearchBar";

const { Option } = Select;
const { TabPane } = Tabs;
const { Title } = Typography;	

// Estilos personalizados
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
    with: 100%;
    margin-bottom: 16px;
  }
`;

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [personas, setPersonas] = useState([]);
  const [form] = Form.useForm();

  // Filtrar proyectos basado en la búsqueda
  const filteredData = proyectos.filter((item) =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  // Consultar proyectos desde la API
  const consultarAPI = async () => {
    try {
      const proyectosConsulta = await clienteAxios.get("/proyectos");
      setProyectos(proyectosConsulta.data);
    } catch (error) {
      console.error("Error al consultar la API", error);
      message.error("No se pudieron cargar los proyectos");
    }
  };

  // Consultar personas desde la API
  const consultarPersonas = async () => {
    try {
      const personasConsulta = await clienteAxios.get("/personas");
      setPersonas(personasConsulta.data);
    } catch (error) {
      console.error("Error al consultar la API", error);
      message.error("No se pudieron cargar los beneficiarios");
    }
  };

  useEffect(() => {
    consultarAPI();
    consultarPersonas();
  }, []);

  // Confirmar eliminación de proyecto
  const confirmarEliminacion = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de eliminar este proyecto?",
      content: "Esta acción no se puede deshacer.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await clienteAxios.put(`/eliminar/${id}`);
          message.success("Proyecto eliminado correctamente");
          consultarAPI();
        } catch (error) {
          console.error("Error al eliminar el proyecto", error);
          message.error("No se pudo eliminar el proyecto");
        }
      },
    });
  };

  // Crear nuevo proyecto
  const handleCreateProyecto = async (values) => {
    try {
      await clienteAxios.post("/proyectos", values);
      message.success("Proyecto creado correctamente");
      consultarAPI();
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error al crear el proyecto", error);
      message.error("No se pudo crear el proyecto");
    }
  };

  // Validar fechas
  const validateDates = (_, value) => {
    const startDate = form.getFieldValue("fechaInicio");
    if (value && startDate && moment(value).isSameOrBefore(startDate, "day")) {
      return Promise.reject(new Error("La fecha de fin debe ser posterior a la fecha de inicio"));
    }
    return Promise.resolve();
  };

  // Renderizar la vista principal si no hay proyecto seleccionado
  if (!selectedProyecto) {
    return (
      <>
        <ResponsiveRow justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <ResponsiveCol>
            <Title level={4}>Proyectos: {proyectos.length}</Title>
          </ResponsiveCol>
          <ResponsiveCol style={{ textAlign: "right" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Nuevo proyecto
            </Button>
          </ResponsiveCol>
        </ResponsiveRow>

        <SearchBar
          placeholder="Buscar proyecto"
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
                          onClick={() => setSelectedProyecto(item)}
                        />
                      </Tooltip>
                      <Tooltip title="Eliminar Proyecto">
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
                  <p>Inicio: {moment(item.fechaInicio).format("DD/MM/YYYY")}</p>
                  <p>Fin: {moment(item.fechaFin).format("DD/MM/YYYY")}</p>
                  <p>Área: {item.areaCobertura}</p>
                </StyledCard>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>

        {/* Modal para crear nuevo proyecto */}
        <Modal
          visible={modalVisible}
          title="Crear nuevo proyecto"
          onCancel={() => setModalVisible(false)}
          footer={[
            <Space>
              <Button key="cancel" onClick={() => setModalVisible(false)}>
                Cancelar
              </Button>,
              <Button key="submit" type="primary" onClick={() => form.submit()}>
                Crear
              </Button>,
            </Space>
          ]}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateProyecto}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="nombre"
                  label="Nombre"
                  rules={[{ required: true, message: "Ingrese el nombre del proyecto" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="fechaInicio"
                  label="Fecha de Inicio"
                  rules={[{ required: true, message: "Seleccione la fecha de inicio" }]}
                >
                  <Input type="date" />
                </Form.Item>
                <Form.Item
                  name="fechaFin"
                  label="Fecha de Fin"
                  rules={[
                    { required: true, message: "Seleccione la fecha de fin" },
                    { validator: validateDates },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="areaCobertura"
                  label="Área de Cobertura"
                  rules={[{ required: true, message: "Ingrese el área de cobertura" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="actividades"
                  label="Actividades"
                  rules={[{ required: true, message: "Ingrese al menos una actividad" }]}
                >
                  <Select mode="tags" placeholder="Ingrese las actividades"></Select>
                </Form.Item>
                <Form.Item name="personas" label="Beneficiarios">
                  <Select
                    mode="multiple"
                    placeholder="Seleccione beneficiarios"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {personas.map((persona) => (
                      <Option key={persona._id} value={persona._id}>
                        {persona.nombre}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }

  // Renderizar la vista de detalle del proyecto seleccionado
  return (
    <VerProyecto
      proyecto={selectedProyecto}
      onBack={() => setSelectedProyecto(null)}
    />
  );
};

export default Proyectos;
