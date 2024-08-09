import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  message,
  Row,
  Col,
  Image,
  Avatar,
  DatePicker,
  List,
  Spin,
} from "antd";
import { EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import moment from "moment";

const VerBeneficiario = ({ persona, onBack }) => {
  const [currentPersona, setCurrentPersona] = useState(persona);
  const [editField, setEditField] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  const showEditModal = (field) => {
    setEditField(field);
    if (field === "fechaNacimiento") {
      form.setFieldsValue({ [field]: moment(currentPersona[field]) });
    } else {
      form.setFieldsValue({ [field]: currentPersona[field] });
    }
    setModalVisible(true);
  };

  const hideEditModal = () => {
    setEditField(null);
    setModalVisible(false);
    form.resetFields();
  };

  const handleEditFinish = async (values) => {
    try {
      if (values.fechaNacimiento) {
        values.fechaNacimiento = values.fechaNacimiento.toISOString();
      }
      await clienteAxios.put(`/personas/${currentPersona._id}`, values);
      message.success("Información actualizada correctamente");
      setCurrentPersona({ ...currentPersona, ...values });
      hideEditModal();
    } catch (error) {
      console.error("Error al actualizar la información", error);
      message.error("Error al actualizar la información");
    }
  };

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await clienteAxios.get(
          `/proyectos/beneficiario/${currentPersona._id}`
        );
        setProyectos(response.data);
      } catch (error) {
        console.error("Error al obtener los proyectos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, [currentPersona._id]);

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
        title="Detalles del Beneficiario"
        style={{ width: "auto", margin: "auto" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            {currentPersona.imagen ? (
              <Image
                width={200}
                src={`${clienteAxios.defaults.baseURL}/uploads/${currentPersona.imagen}`}
              />
            ) : (
              <Avatar
                size={200}
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${currentPersona.nombre}`}
              />
            )}
            <p>
              <strong>Nombre:</strong> {currentPersona.nombre}{" "}
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showEditModal("nombre")}
              />
            </p>
            <p>
              <strong>CUI:</strong> {currentPersona.cui}{" "}
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showEditModal("cui")}
              />
            </p>
          </Col>
          <Col xs={24} md={16}>
            <p>
              <strong>Padre:</strong> {currentPersona.padre}{" "}
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showEditModal("padre")}
              />
            </p>
            <p>
              <strong>Madre:</strong> {currentPersona.madre}{" "}
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showEditModal("madre")}
              />
            </p>
            <p>
              <strong>Teléfono:</strong> {currentPersona.telefono}{" "}
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showEditModal("telefono")}
              />
            </p>
            <p>
              <strong>Teléfono de Contacto:</strong>{" "}
              {currentPersona.telefonoContacto}{" "}
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showEditModal("telefonoContacto")}
              />
            </p>
            <p>
              <strong>Dirección:</strong> {currentPersona.direccion}{" "}
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showEditModal("direccion")}
              />
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong>{" "}
              {new Date(currentPersona.fechaNacimiento).toLocaleDateString()}{" "}
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showEditModal("fechaNacimiento")}
              />
            </p>
            <p>
              <strong>Proyectos Asociados:</strong>
              {loading ? (
                <Spin />
              ) : (
                <List
                  dataSource={proyectos}
                  renderItem={(proyecto) => (
                    <List.Item>{proyecto.nombre}</List.Item>
                  )}
                />
              )}
            </p>
          </Col>
        </Row>
      </Card>

      <Modal
        visible={modalVisible}
        onCancel={hideEditModal}
        onOk={() => form.submit()}
        title={`Editar ${
          editField
            ? editField.charAt(0).toUpperCase() + editField.slice(1)
            : ""
        }`}
        okText="Guardar"
        cancelText="Cancelar"
        okButtonProps={{ style: { width: "100px" } }}
        cancelButtonProps={{ style: { width: "100px" } }}
      >
        <Form form={form} onFinish={handleEditFinish} layout="vertical">
          {editField === "fechaNacimiento" ? (
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
                { required: true, message: `Por favor ingrese ${editField}` },
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

export default VerBeneficiario;
