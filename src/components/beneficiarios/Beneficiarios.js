import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  Input,
  Button,
  message,
  Modal,
  Form,
  Upload,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import VerBeneficiario from "./VerBeneficiario";
import Swal from "sweetalert2";

const Beneficiarios = () => {
  const [searchText, setSearchText] = useState("");
  const [personas, guardarPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const filteredData = personas.filter((item) =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const consultarAPI = async () => {
    try {
      const personasConsulta = await clienteAxios.get("/personas");
      guardarPersonas(personasConsulta.data);
    } catch (error) {
      console.error("Error al consultar la API", error);
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const verBeneficiario = (persona) => {
    setSelectedPersona(persona);
  };

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

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2>Total: {personas.length}</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
          style={{ whiteSpace: "nowrap", width: "200px" }}
        >
          Nuevo beneficiario
        </Button>
      </div>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <Input.Search
          placeholder="Buscar por nombre"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginRight: 16 }}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
      ></div>
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
                onClick={() => verBeneficiario(item)}
              />,
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => confirmarEliminacion(item._id)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                item.imagen ? (
                  <Avatar
                    src={`${clienteAxios.defaults.baseURL}/uploads/${item.imagen}`}
                  />
                ) : (
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.nombre}`}
                  />
                )
              }
              title={item.nombre}
              description={`Dirección: ${item.direccion}, Teléfono: ${item.telefono}`}
            />
          </List.Item>
        )}
      />
      <Modal
        visible={modalVisible}
        title="Ingresar nuevo beneficiario"
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
        <Form form={form} layout="vertical" onFinish={handleCreateBeneficiario}>
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
