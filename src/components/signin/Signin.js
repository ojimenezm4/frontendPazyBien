import React, { useState } from "react";
import { Modal, Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const { Option } = Select;

const Signin = ({ visible, onCancel, rol, onUserCreated }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("fotoPerfil", fileList[0].originFileObj);
    }

    try {
      const response = await clienteAxios.post("/signin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      form.resetFields();
      setFileList([]);
      Swal.fire({
        title: "Usuario creado exitosamente",
        text: `Nombre: ${response.data.nombre}\nEmail: ${response.data.email}\nRol: ${response.data.rol}`,
        icon: "success",
      });
      onCancel();
      onUserCreated();
    } catch (error) {
      console.error("Error al crear la cuenta", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensaje
      ) {
        message.error(error.response.data.mensaje);
      } else {
        message.error("Hubo un error al crear la cuenta");
      }
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const rolesOptions =
    rol === "super" ? ["super", "admin", "usuario"] : ["admin", "usuario"];

  return (
    <Modal
      title="Crear una nueva cuenta"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Crear
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el correo electrónico",
            },
            { type: "email", message: "Por favor ingrese un correo válido" },
          ]}
        >
          <Input placeholder="Correo Electrónico" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: true, message: "Por favor ingrese la contraseña" },
          ]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirmar Contraseña"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Por favor confirme la contraseña" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirmar Contraseña" />
        </Form.Item>
        <Form.Item
          name="rol"
          label="Rol"
          rules={[{ required: true, message: "Por favor seleccione un rol" }]}
        >
          <Select placeholder="Selecciona un rol">
            {rolesOptions.map((role) => (
              <Option key={role} value={role}>
                {role}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="fotoPerfil" label="Foto de Perfil">
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
            fileList={fileList}
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Subir Foto</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Signin;
