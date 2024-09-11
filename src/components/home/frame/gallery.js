import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';

function Gallery() {
  return (
    <section id="gallery">
      {/* Heading */}
      <h2 className="mb-3 font-weight-bold text-center">Trabajo Social</h2>

      {/* Grid row */}
      <div className="row">
        {/* Grid column for carousel */}
        <div className="col-md-6 mb-4">
          {/* Carousel Wrapper */}
          <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li data-target="#carousel-example-1z" data-slide-to="0" className="active"></li>
              <li data-target="#carousel-example-1z" data-slide-to="1"></li>
              <li data-target="#carousel-example-1z" data-slide-to="2"></li>
            </ol>
            {/* Slides */}
            <div className="carousel-inner z-depth-1-half" role="listbox">
              {/* First slide */}
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="https://pazbienguatemala.org/wp-content/uploads/2022/05/Trabajo-Social-1-1024x683.jpg"
                  alt="First slide"
                />
              </div>
              {/* Second slide */}
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://pazbienguatemala.org/wp-content/uploads/2022/05/Trabajo-Social-4-scaled.jpg"
                  alt="Second slide"
                />
              </div>
              {/* Third slide */}
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://pazbienguatemala.org/wp-content/uploads/2022/05/Trabajo-Social-2-scaled.jpg"
                  alt="Third slide"
                />
              </div>
            </div>
            {/* Controls */}
            <a
              className="carousel-control-prev"
              href="#carousel-example-1z"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel-example-1z"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          {/* Carousel Wrapper */}
        </div>
        {/* Grid column for text */}
        <div className="col-md-6 mb-4">
          <div className="col-md-6">
            {/* Excerpt */}
            <span className="teal-text">
              <h6 className="pb-1">
                <i className="fa fa-heart"></i>
                <strong> 8,250 personas beneficiadas</strong>
              </h6>
            </span>
            <p>
              En Paz y Bien, seguimos apoyando a las personas más vulnerables que acuden a nuestras instalaciones en busca de ayuda. Nuestro compromiso se manifiesta a través de programas que ofrecen desde alimentos hasta atención médica. Muchas de estas personas llegan con lo mínimo, a veces solo con el pasaje, e incluso sin haber desayunado.
            </p>
            <p>
              Es en estos momentos cuando nuestro lema se hace realidad, y nuestra trabajadora social, con dedicación y empatía, escucha sus necesidades y les brinda el apoyo necesario.
            </p>
            {/* <a className="btn btn-primary btn-md">Read more</a> */}
          </div>
        </div>
      </div>
      {/* Grid row */}
    </section>
  );
}

export default Gallery;
