import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';  
import '../home.css'; 

function BestFeatures() {
  return (
    <section id="best-features" className="text-center py-5">
      <div className="row d-flex justify-content-center mb-4">
        <div className="col-md-8">
          <p className="lead">
            Descubre nuestras principales áreas de enfoque y compromiso. Trabajamos arduamente para ofrecer un apoyo integral en diversas áreas.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-4 d-flex flex-column align-items-center">
          <div className="icon-container">
            <i className="bi bi-universal-access"></i>
          </div>
          <h4 className="my-4">Discapacidad Intelectual</h4>
        </div>

        <div className="col-md-3 mb-4 d-flex flex-column align-items-center">
          <div className="icon-container">
            <i className="bi bi-person"></i>
          </div>
          <h4 className="my-4">Infancia y Juventud</h4>
        </div>

        <div className="col-md-3 mb-4 d-flex flex-column align-items-center">
          <div className="icon-container">
            <i className="bi bi-briefcase"></i>
          </div>
          <h4 className="my-4">Formación y Empleo</h4>
        </div>

        <div className="col-md-3 mb-4 d-flex flex-column align-items-center">
          <div className="icon-container">
            <i className="bi bi-globe"></i>
          </div>
          <h4 className="my-4">Cooperación Internacional</h4>
        </div>
      </div>
    </section>
  );
}

export default BestFeatures;
