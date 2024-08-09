import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Spin,
  List,
  Input,
  Collapse,
  Modal,
  Form,
  DatePicker,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import VerBeneficiario from "../beneficiarios/VerBeneficiario";
import moment from "moment";

const { Panel } = Collapse;

const VerProyecto = ({ proyecto, onBack }) => {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editInitialValue, setEditInitialValue] = useState(null);
  const [allPersonas, setAllPersonas] = useState([]);
  const [searchModalText, setSearchModalText] = useState("");
  const [filteredPersonas, setFilteredPersonas] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const ids = proyecto.personas ? proyecto.personas.join(",") : "";
        const response = await clienteAxios.get(`/personasids?ids=${ids}`);
        setBeneficiarios(response.data);
      } catch (error) {
        console.error("Error al obtener los beneficiarios", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllPersonas = async () => {
      try {
        const response = await clienteAxios.get("/personas");
        setAllPersonas(response.data);
      } catch (error) {
        console.error("Error al obtener todas las personas", error);
      }
    };

    if (proyecto.personas && proyecto.personas.length > 0) {
      fetchBeneficiarios();
    } else {
      setLoading(false);
    }
    fetchAllPersonas();
  }, [proyecto.personas]);

  useEffect(() => {
    setFilteredPersonas(
      allPersonas.filter((persona) =>
        persona.nombre.toLowerCase().includes(searchModalText.toLowerCase())
      )
    );
  }, [searchModalText, allPersonas]);

  const eliminarBeneficiarioDelProyecto = async (personaId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el beneficiario del proyecto, pero no de la base de datos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedPersonas = proyecto.personas.filter(
            (id) => id !== personaId
          );
          await clienteAxios.put(`/proyectos/${proyecto._id}`, {
            personas: updatedPersonas,
          });
          setBeneficiarios(
            beneficiarios.filter((persona) => persona._id !== personaId)
          );
          Swal.fire(
            "Eliminado",
            "El beneficiario ha sido eliminado del proyecto.",
            "success"
          );
        } catch (error) {
          console.error(
            "Error al eliminar el beneficiario del proyecto",
            error
          );
          Swal.fire(
            "Error",
            "No se pudo eliminar el beneficiario del proyecto",
            "error"
          );
        }
      }
    });
  };

  const agregarBeneficiarioAlProyecto = async (personaId) => {
    if (proyecto.personas.includes(personaId)) {
      Swal.fire({
        icon: "warning",
        title: "Beneficiario ya existe",
        text: "Este beneficiario ya está en el proyecto.",
      });
      return;
    }

    try {
      const updatedPersonas = [...proyecto.personas, personaId];
      await clienteAxios.put(`/proyectos/${proyecto._id}`, {
        personas: updatedPersonas,
      });
      const newPersona = allPersonas.find(
        (persona) => persona._id === personaId
      );
      setBeneficiarios([...beneficiarios, newPersona]);
      message.success("Beneficiario agregado correctamente");
      setModalVisible(false);
    } catch (error) {
      console.error("Error al agregar el beneficiario al proyecto", error);
      message.error("Error al agregar el beneficiario al proyecto");
    }
  };

  const verBeneficiario = (persona) => {
    setSelectedPersona(persona);
  };

  const filteredBeneficiarios = beneficiarios.filter((item) =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const showEditModal = (field, initialValue) => {
    setEditField(field);
    setEditInitialValue(initialValue);
    form.setFieldsValue({
      [field]:
        field === "fechaInicio" || field === "fechaFin"
          ? moment(initialValue)
          : initialValue,
    });
    setEditModalVisible(true);
  };

  const hideEditModal = () => {
    setEditField(null);
    setEditInitialValue(null);
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleEditFinish = async (values) => {
    try {
      if (values.fechaInicio) {
        values.fechaInicio = values.fechaInicio.toISOString();
      }
      if (values.fechaFin) {
        values.fechaFin = values.fechaFin.toISOString();
      }
      await clienteAxios.put(`/proyectos/${proyecto._id}`, values);
      message.success("Información actualizada correctamente");
      hideEditModal();
    } catch (error) {
      console.error("Error al actualizar la información", error);
      message.error("Error al actualizar la información");
    }
  };

  if (selectedPersona) {
    return (
      <VerBeneficiario
        persona={selectedPersona}
        onBack={() => setSelectedPersona(null)}
      />
    );
  }

  return (
    <>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{ marginBottom: 16 }}
      >
        Atrás
      </Button>
      <Card
        title="Detalles del Proyecto"
        style={{ width: "auto", margin: "auto" }}
      >
        <p>
          <strong>Nombre:</strong> {proyecto.nombre}{" "}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal("nombre", proyecto.nombre)}
          />
        </p>
        <p>
          <strong>Fecha de Inicio:</strong>{" "}
          {proyecto.fechaInicio
            ? moment(proyecto.fechaInicio).format("DD-MM-YYYY")
            : "No especificado"}{" "}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal("fechaInicio", proyecto.fechaInicio)}
          />
        </p>
        <p>
          <strong>Fecha de Fin:</strong>{" "}
          {proyecto.fechaFin
            ? moment(proyecto.fechaFin).format("DD-MM-YYYY")
            : "No especificado"}{" "}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal("fechaFin", proyecto.fechaFin)}
          />
        </p>
        <p>
          <strong>Área de Cobertura:</strong> {proyecto.areaCobertura}{" "}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() =>
              showEditModal("areaCobertura", proyecto.areaCobertura)
            }
          />
        </p>
        <Collapse>
          <Panel
            header={`Actividades Realizadas: ${
              proyecto.actividades ? proyecto.actividades.length : 0
            }`}
            key="1"
          >
            <p>
              {proyecto.actividades
                ? proyecto.actividades.join(", ")
                : "No especificado"}
            </p>
          </Panel>
          <Panel header={`Beneficiarios: ${beneficiarios.length}`} key="2">
            <Input.Search
              placeholder="Buscar beneficiario"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: 16, // Mueve el margen al contenedor para que el botón quede centrado
              }}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setModalVisible(true)}
                style={{ whiteSpace: "nowrap", width: "150px" }}
              >
                Agregar
              </Button>
            </div>

            {loading ? (
              <Spin />
            ) : (
              <List
                pagination={{
                  pageSize: 5,
                }}
                dataSource={filteredBeneficiarios}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => verBeneficiario(item)}
                      />,
                      <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          eliminarBeneficiarioDelProyecto(item._id)
                        }
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      title={item.nombre}
                      description={`Teléfono: ${item.telefono}`}
                    />
                  </List.Item>
                )}
              />
            )}
          </Panel>
        </Collapse>
      </Card>
      <Modal
        visible={modalVisible}
        title="Agregar Beneficiario"
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Input.Search
          placeholder="Buscar beneficiario"
          onChange={(e) => setSearchModalText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <List
          dataSource={filteredPersonas}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => agregarBeneficiarioAlProyecto(item._id)}
                >
                  Agregar
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.nombre}
                description={`Teléfono: ${item.telefono}`}
              />
            </List.Item>
          )}
        />
      </Modal>
      <Modal
        visible={editModalVisible}
        title={`Editar ${
          editField
            ? editField.charAt(0).toUpperCase() + editField.slice(1)
            : ""
        }`}
        onCancel={hideEditModal}
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} onFinish={handleEditFinish} layout="vertical">
          {editField === "fechaInicio" || editField === "fechaFin" ? (
            <Form.Item
              name={editField}
              label={
                editField
                  ? editField.charAt(0).toUpperCase() + editField.slice(1)
                  : ""
              }
              rules={[
                {
                  required: true,
                  message: `Por favor ingrese ${editField}`,
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          ) : (
            <Form.Item
              name={editField}
              label={
                editField
                  ? editField.charAt(0).toUpperCase() + editField.slice(1)
                  : ""
              }
              rules={[
                {
                  required: true,
                  message: `Por favor ingrese ${editField}`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default VerProyecto;
