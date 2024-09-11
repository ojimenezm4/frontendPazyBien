import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
function MissionVision() {
  return (
    <section id="mission-vision" style={{ backgroundColor: '#d8d8d8', position: 'relative' }}>
      <div className="container">
        <h2 className="font-weight-bold text-center mb-5">Coordinación de Programas y Proyectos</h2>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <p>En Paz y Bien nos dedicamos a mejorar la atención de las personas más necesitadas en el departamento de Chiquimula. Con este objetivo en mente, hemos creado la Oficina de Coordinación de Programas y Proyectos, la cual trabaja en estrecha colaboración con diversas entidades locales e internacionales. Actualmente, mantenemos convenios con las municipalidades de San Jacinto y Camotán, además de tener presencia activa en los municipios de Jocotán, Ipala, Esquipulas, Olopa y Concepción Las Minas.</p>
            <p>Gracias a nuestras alianzas con cooperantes internacionales, como las agencias de cooperación de la Administración Española, y en coordinación con nuestra oficina de Proyectos de Paz y Bien ONGD en España, hemos logrado expandir nuestro impacto en la región.</p>
          </div>
          <div className="col-lg-6 mb-4">
            <img src="https://pazbienguatemala.org/wp-content/uploads/2022/05/Coordinacion-de-Proyectos-2-e1652774016200-scaled.jpg" className="img-fluid rounded" alt="Coordinación de Programas y Proyectos" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVision;
