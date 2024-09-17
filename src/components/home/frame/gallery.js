import React from 'react';
function Gallery() {
  return (
    <section id="gallery" style={{ padding: '4rem 0' }}>
      <div className="container">
        <h2 className="font-weight-bold text-center mb-5 text-primary">Trabajo Social</h2>
  
        <div className="row">
          {/* Carousel Column */}
          <div className="col-md-6 mb-4">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
              {/* Indicators */}
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              {/* Slides */}
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="https://pazbienguatemala.org/wp-content/uploads/2022/05/Trabajo-Social-1-1024x683.jpg" className="d-block w-100" alt="Trabajo Social 1" />
                </div>
                <div className="carousel-item">
                  <img src="https://pazbienguatemala.org/wp-content/uploads/2022/05/Trabajo-Social-4-scaled.jpg" className="d-block w-100" alt="Trabajo Social 2" />
                </div>
                <div className="carousel-item">
                  <img src="https://pazbienguatemala.org/wp-content/uploads/2022/05/Trabajo-Social-2-scaled.jpg" className="d-block w-100" alt="Trabajo Social 3" />
                </div>
              </div>
              {/* Controls */}
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
  
          {/* Text Column */}
          <div className="col-md-6 mb-4 d-flex flex-column justify-content-center">
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="text-muted mb-3">
                <span className="badge bg-success">8,250 personas beneficiadas</span>
              </h6>
              <p className="text-muted mb-3">
                En Paz y Bien, seguimos apoyando a las personas más vulnerables que acuden a nuestras instalaciones en busca de ayuda. Nuestro compromiso se manifiesta a través de programas que ofrecen desde alimentos hasta atención médica. Muchas de estas personas llegan con lo mínimo, a veces solo con el pasaje, e incluso sin haber desayunado.
              </p>
              <p className="text-muted">
                Es en estos momentos cuando nuestro lema se hace realidad, y nuestra trabajadora social, con dedicación y empatía, escucha sus necesidades y les brinda el apoyo necesario.
              </p>
              {/* <a className="btn btn-primary btn-md" href="#">Leer más</a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



export default Gallery;
