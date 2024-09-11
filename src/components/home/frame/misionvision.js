import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Asegúrate de importar Bootstrap

function MissionVision() {
  return (
    <section id="mission-vision" style={{ backgroundColor: '#f8f9fa', padding: '4rem 0' }}>
      <div className="container">
        <h2 className="font-weight-bold text-center mb-5 text-primary">Coordinación de Programas y Proyectos</h2>
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <p className="text-muted mb-4">
                En Paz y Bien nos dedicamos a mejorar la atención de las personas más necesitadas en el departamento de Chiquimula. Con este objetivo en mente, hemos creado la Oficina de Coordinación de Programas y Proyectos, la cual trabaja en estrecha colaboración con diversas entidades locales e internacionales. Actualmente, mantenemos convenios con las municipalidades de San Jacinto y Camotán, además de tener presencia activa en los municipios de Jocotán, Ipala, Esquipulas, Olopa y Concepción Las Minas.
              </p>
              <p className="text-muted">
                Gracias a nuestras alianzas con cooperantes internacionales, como las agencias de cooperación de la Administración Española, y en coordinación con nuestra oficina de Proyectos de Paz y Bien ONGD en España, hemos logrado expandir nuestro impacto en la región.
              </p>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <img
              src="https://pazbienguatemala.org/wp-content/uploads/2022/05/Coordinacion-de-Proyectos-2-e1652774016200-scaled.jpg"
              className="img-fluid rounded shadow-sm"
              alt="Coordinación de Programas y Proyectos"
              style={{ maxHeight: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVision;
