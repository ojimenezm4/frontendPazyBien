import React from 'react';

function AboutUs() {
  return (
    <section id="aboutus" style={{ backgroundColor: '#d8d8d8', position: 'relative' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="p-4">
              <h3 className="font-weight-bold text-dark">Misión</h3>
              <p>Mejorar la calidad de vida de las personas con discapacidad intelectual, menores, mayores y grupos de exclusión social, y beneficiarios de las actuaciones de cooperación internacional, teniendo siempre como principio y fin a las personas receptoras de nuestros servicios.</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-4">
              <h3 className="font-weight-bold text-dark">Visión</h3>
              <p>Acompañar a las personas en su ciclo vital, acometiendo el futuro con proyectos de mejora continua e inclusión social, y teniendo siempre las prestaciones de servicios que se vayan etiquetando por su excelencia. Estar a disposición permanente de abordar nuevas demandas sociales.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
