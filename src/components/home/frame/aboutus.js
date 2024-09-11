import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Asegúrate de importar Bootstrap

function AboutUs() {
  return (
    <section id="aboutus" style={{ backgroundColor: '#f8f9fa', padding: '4rem 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="p-4 bg-white rounded shadow-sm">
              <h3 className="font-weight-bold text-primary mb-3">Misión</h3>
              <p className="text-muted">
                Mejorar la calidad de vida de las personas con discapacidad intelectual, menores, mayores y grupos de exclusión social, y beneficiarios de las actuaciones de cooperación internacional, teniendo siempre como principio y fin a las personas receptoras de nuestros servicios.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-4 bg-white rounded shadow-sm">
              <h3 className="font-weight-bold text-primary mb-3">Visión</h3>
              <p className="text-muted">
                Acompañar a las personas en su ciclo vital, acometiendo el futuro con proyectos de mejora continua e inclusión social, y teniendo siempre las prestaciones de servicios que se vayan etiquetando por su excelencia. Estar a disposición permanente de abordar nuevas demandas sociales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
