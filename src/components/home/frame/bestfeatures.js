import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';

function BestFeatures() {
  return (
    <section id="best-features" className="text-center">
      {/* Heading */}
      {/* <h2 className="mb-5">Best Features</h2> */}

      {/* Grid row */}
      <div className="row d-flex justify-content-center mb-4">
        {/* Grid column */}
        <div className="col-md-8">
          {/* Description */}
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi voluptate hic provident nulla repellat
              facere esse molestiae ipsa labore porro minima quam quaerat rem, natus repudiandae debitis est
              sit pariatur.</p> */}
        </div>
        {/* Grid column */}
      </div>
      {/* Grid row */}

      {/* Grid row */}
      <div className="row">
        {/* Grid column */}
        <div className="col-md-3 mb-1">
          <i className="fa fa-universal-access fa-3x blue-text"></i>
          <h4 className="my-4">Discapacidad Intelectual</h4>
        </div>
        {/* Grid column */}

        {/* Grid column */}
        <div className="col-md-3 mb-1">
          <i className="fa fa-child fa-3x blue-text"></i>
          <h4 className="my-4">Infancia y Juventud</h4>
        </div>
        {/* Grid column */}

        {/* Grid column */}
        <div className="col-md-3 mb-1">
          <i className="fa fa-user-md fa-3x blue-text"></i>
          <h4 className="my-4">Formación y Empleo</h4>
        </div>
        {/* Grid column */}

        {/* Grid column */}
        <div className="col-md-3 mb-1">
          <i className="fa fa-globe fa-3x blue-text"></i>
          <h4 className="my-4">Cooperación Internacional</h4>
        </div>
        {/* Grid column */}
      </div>
      {/* Grid row */}
    </section>
  );
}

export default BestFeatures;
