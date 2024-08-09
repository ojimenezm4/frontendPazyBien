import React, { useState, useEffect } from "react";
import {
  Card,
  Image,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Spin,
} from "antd";
import {
  EditOutlined,
  UploadOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import clienteAxios from "../../config/axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const EditModal = ({
  visible,
  onCancel,
  onFinish,
  initialValue,
  field,
  handleUploadChange,
  fileList,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ [field]: initialValue });
  }, [initialValue, form, field]);

  const renderFormContent = () => {
    if (field === "password") {
      return (
        <>
          <Form.Item
            name="currentPassword"
            label="Contraseña Actual"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la contraseña actual",
              },
            ]}
          >
            <Input.Password
              placeholder="Ingrese la contraseña actual"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Nueva Contraseña"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la nueva contraseña",
              },
            ]}
          >
            <Input.Password
              placeholder="Ingrese la nueva contraseña"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label="Confirmar Nueva Contraseña"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Por favor confirme la nueva contraseña",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contraseñas no coinciden")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirme la nueva contraseña"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </>
      );
    } else if (field === "fotoPerfil") {
      return (
        <Form.Item
          name="fotoPerfil"
          label="Foto de Perfil"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
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
      );
    } else {
      return (
        <Form.Item
          name={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          rules={[{ required: true, message: `Por favor ingrese ${field}` }]}
        >
          <Input />
        </Form.Item>
      );
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => form.submit()}
      title={`Actualizar ${field}`}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            form.resetFields();
            onCancel();
          }}
          style={{ width: "80px" }}
        >
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          style={{ width: "80px" }}
        >
          Ok
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={(values) => {
          onFinish(values);
          form.resetFields();
        }}
      >
        {renderFormContent()}
      </Form>
    </Modal>
  );
};

const MiPerfil = ({ onBack }) => {
  const [perfil, setPerfil] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editField, setEditField] = useState("");
  const [editInitialValue, setEditInitialValue] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const idUsuario = decodedToken.id;
          const respuesta = await clienteAxios.get(`/usuarios/${idUsuario}`);
          setPerfil(respuesta.data);
          if (respuesta.data.fotoPerfil) {
            setFileList([
              {
                uid: "-1",
                name: respuesta.data.fotoPerfil,
                status: "done",
                url: `${clienteAxios.defaults.baseURL}/uploads/${respuesta.data.fotoPerfil}`,
              },
            ]);
          }
        }
      } catch (error) {
        console.error("Error al obtener el perfil del usuario", error);
      }
    };

    obtenerPerfil();
  }, []);

  const showEditModal = (field, initialValue) => {
    setEditField(field);
    setEditInitialValue(initialValue);
    setEditModalVisible(true);
  };

  const hideEditModal = () => {
    setEditModalVisible(false);
    setEditField("");
    setEditInitialValue("");
  };

  const handleEditFinish = async (values) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const idUsuario = decodedToken.id;

        const formData = new FormData();
        formData.append(editField, values[editField]);

        if (
          editField === "fotoPerfil" &&
          fileList.length > 0 &&
          fileList[0].originFileObj
        ) {
          formData.append("fotoPerfil", fileList[0].originFileObj);
        }

        if (editField === "password") {
          formData.append("currentPassword", values.currentPassword);
          formData.append("newPassword", values.newPassword);
        }

        const response = await clienteAxios.put(
          `/usuarios/${idUsuario}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setPerfil(response.data);

        Swal.fire("Perfil actualizado", "", "success");
        hideEditModal();
      }
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
      message.error(
        "Error al actualizar el perfil, revise la contraseña anterior "
      );
      Swal.fire(
        "Error al actualizar el perfil, revise la contraseña anterior",
        "",
        "error"
      );
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  if (!perfil) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
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
      <Card title="Mi Perfil" style={{ width: "auto", margin: "auto" }}>
        {perfil.fotoPerfil && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Image
              width={200}
              src={`${clienteAxios.defaults.baseURL}/uploads/${perfil.fotoPerfil}`}
            />
          </div>
        )}
        <p>
          <strong>Nombre:</strong> {perfil.nombre}{" "}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal("nombre", perfil.nombre)}
          />
        </p>
        <p>
          <strong>Email:</strong> {perfil.email}{" "}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal("email", perfil.email)}
          />
        </p>
        <p>
          <strong>Rol:</strong> {perfil.rol}
        </p>
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal("password", "")}
          >
            Cambiar Contraseña
          </Button>
        </div>
        <div>
          <Button
            type="link"
            icon={<UploadOutlined />}
            onClick={() => showEditModal("fotoPerfil", fileList)}
          >
            Cambiar Foto
          </Button>
        </div>
      </Card>

      <EditModal
        visible={editModalVisible}
        onCancel={hideEditModal}
        onFinish={handleEditFinish}
        initialValue={editInitialValue}
        field={editField}
        handleUploadChange={handleUploadChange}
        fileList={fileList}
      />
    </>
  );
};

export default MiPerfil;
