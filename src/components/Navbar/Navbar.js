import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Drawer } from 'antd';
import { 
  MenuOutlined, 
  UserOutlined, 
  ProjectOutlined, 
  TeamOutlined, 
  SettingOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';

const { Header } = Layout;

const Navbar = ({ userName, userRole, onMenuClick, onLogout, userAvatar }) => {
  // Estado para controlar la visibilidad del drawer
  const [visible, setVisible] = useState(false);

  // Funciones para mostrar y ocultar el drawer
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // Configuración de los elementos del menú
  const menuItems = [
    {
      key: 'proyectos',
      icon: <ProjectOutlined />,
      label: 'Proyectos',
    },
    {
      key: 'beneficiarios',
      icon: <TeamOutlined />,
      label: 'Beneficiarios',
    },
  ];

  // Agregar opciones de usuario según el rol
  if (userRole === 'super' || userRole === 'admin') {
    menuItems.push({
      key: 'usuarios',
      icon: <TeamOutlined />,
      label: 'Usuarios',
      children: userRole === 'super' ? [
        { key: 'usuariosActivos', label: 'Usuarios Activos' },
        { key: 'usuariosInactivos', label: 'Usuarios Inactivos' },
      ] : [
        { key: 'verUsuarios', label: 'Ver Usuarios' },
      ],
    });
  }

  // Manejar el clic en los elementos del menú
  const handleMenuClick = ({ key }) => {
    onMenuClick(key);
    onClose();
  };

  // Configuración del menú de usuario
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => onMenuClick("perfil")}>
        Mi Perfil
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  // Renderizado del componente
  return (
    <Header style={{ padding: 0, background: '#001529' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 16px' }}>
        {/* Botón de menú para dispositivos móviles */}
        <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} style={{ color: 'white', fontSize: '20px' }} />
        {/* Dropdown del perfil de usuario */}
        <Dropdown overlay={userMenu} placement="bottomRight">
          <span style={{ color: 'white', cursor: 'pointer' }}>
            <Avatar src={userAvatar} icon={<UserOutlined />} style={{ marginRight: '8px' }} />
            <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>
              {userName}
            </span>
          </span>
        </Dropdown>
      </div>
      {/* Drawer para el menú en dispositivos móviles */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
          items={menuItems}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;