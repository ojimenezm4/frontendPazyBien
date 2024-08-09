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
} from "antd";
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import VerProyecto from "./VerProyecto";
import moment from "moment";

const { Option } = Select;

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [personas, setPersonas] = useState([]);
  const [form] = Form.useForm();

  const filteredData = proyectos.filter((item) =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const consultarAPI = async () => {
    try {
      const proyectosConsulta = await clienteAxios.get("/proyectos");
      setProyectos(proyectosConsulta.data);
    } catch (error) {
      console.error("Error al consultar la API", error);
    }
  };

  const consultarPersonas = async () => {
    try {
      const personasConsulta = await clienteAxios.get("/personas");
      setPersonas(personasConsulta.data);
    } catch (error) {
      console.error("Error al consultar la API", error);
    }
  };

  useEffect(() => {
    consultarAPI();
    consultarPersonas();
  }, []);

  const confirmarEliminacion = (id) => {
    Modal.confirm({
      title: "¿Estás seguro?",
      content: "¡No podrás revertir esto!",
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
          message.error("Error al eliminar el proyecto");
        }
      },
    });
  };

  const handleCreateProyecto = async (values) => {
    try {
      await clienteAxios.post("/proyectos", values);
      message.success("Proyecto creado correctamente");
      consultarAPI();
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error al crear el proyecto", error);
      message.error("Error al crear el proyecto");
    }
  };

  if (selectedProyecto) {
    return (
      <VerProyecto
        proyecto={selectedProyecto}
        onBack={() => setSelectedProyecto(null)}
      />
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2>Resumen y estadísitcas: {proyectos.length}</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
          style={{ whiteSpace: "nowrap", width: "150px" }}
        >
          Nuevo proyecto
        </Button>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Input.Search
          placeholder="Buscar por nombre"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginRight: 16 }}
        />
      </div>
      <List
        pagination={{
          position: "bottom",
          align: "center",
          total: filteredData.length,
          pageSize: 5,
          hideOnSinglePage: true,
        }}
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => setSelectedProyecto(item)}
              />,
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => confirmarEliminacion(item._id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.nombre}
              description={`Fecha de inicio: ${moment(item.fechaInicio).format(
                "DD-MM-YY"
              )}, Fecha de fin: ${moment(item.fechaFin).format("DD/MM/YY")}`}
            />
          </List.Item>
        )}
      />
      <Modal
        visible={modalVisible}
        title="Ingresar nuevo proyecto"
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setModalVisible(false)}
            style={{ width: "100px" }}
          >
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            style={{ width: "100px" }}
          >
            Guardar
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateProyecto}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nombre"
                label="Nombre"
                rules={[
                  { required: true, message: "Por favor ingrese el nombre" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fechaInicio"
                label="Fecha de Inicio"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la fecha de inicio",
                  },
                ]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name="fechaFin"
                label="Fecha de Fin"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la fecha de fin",
                  },
                ]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name="areaCobertura"
                label="Área de Cobertura"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el área de cobertura",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="actividades"
                label="Actividades"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese las actividades",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  placeholder="Ingrese las actividades"
                ></Select>
              </Form.Item>
              <Form.Item name="personas" label="Beneficiarios">
                <Select
                  mode="multiple"
                  placeholder="Buscar beneficiarios"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
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
};

export default Proyectos;
