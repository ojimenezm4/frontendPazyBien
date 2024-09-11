import React from 'react';
import backgroundImage from '../../../img/background_A.jpg';  // Ajusta la ruta de la imagen si es necesario

function Header() {
  const headerStyle = {
    position: 'relative',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Ajusta la opacidad según tus necesidades
    zIndex: 1  // Coloca la superposición sobre la imagen
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,  // Coloca el contenido sobre la superposición
    color: 'white'
  };

  return (
    <header style={headerStyle}>
      {/* Máscara oscura */}
      <div style={overlayStyle}></div>

      {/* Contenido */}
      <div className="container d-flex align-items-center justify-content-center h-100">
        <div style={contentStyle} className="text-center">
          <h2 className="display-4 font-weight-bold pt-1 mb-2">
            Asociación Paz y Bien Guatemala
          </h2>
          <hr className="hr-light" />
          <h4 className="my-4">Creando sonrisas, creando ilusiones</h4>
          <a
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L7WKSVH63AWQQ"
            className="btn btn-outline-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donar <i className="bi bi-paypal ml-2"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
