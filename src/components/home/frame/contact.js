import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container">
        {/* Heading */}
        <h2 className="mb-5 text-center fw-bold">Contacto</h2>

        {/* Grid row */}
        <div className="row g-4 align-items-center">
          {/* Form column */}
          <div className="col-lg-6">
            <div className="d-flex flex-column gap-3">
              <a
                href="https://www.google.com/maps/dir//Centro+Clinico+Paz+Y+Bien+JHM4%2BM2M+Quezaltepeque/@14.634211,-89.4449567,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8f624a5d5b5ef741:0x7bd8a9f30c6d2eb!2m2!1d-89.4449567!2d14.634211?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D"
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-geo-alt me-2"></i> Google Maps
              </a>
              <a
                href="https://www.waze.com/es/live-map/directions/paz-y-bien-ca-10-quezaltepeque?to=place.w.177340562.1773143479.2507574"
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-car-front me-2"></i> Waze
              </a>
              <a href="tel:+50278239999" className="btn btn-primary btn-lg">
                <i className="bi bi-telephone me-2"></i> +502 7823-9999
              </a>
              <a href="mailto:comunicacionguate@pazbien.org" className="btn btn-primary btn-lg">
                <i className="bi bi-envelope me-2"></i> comunicacionguate@pazbien.org
              </a>
            </div>
          </div>
          {/* /.Form column */}

          {/* Info column */}
          <div className="col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="row text-center">
                  {/* Grid column */}
                  <div className="col-md-6 mb-3">
                    <p className="mb-1">
                      <i className="bi bi-geo-alt-fill text-primary" style={{ fontSize: '2rem' }}></i>
                    </p>
                    <p className="fw-bold">Quezaltepeque, Chiquimula</p>
                    <p className="text-muted">4ª. Calle 1-10, zona 2, Barrio la Concordia</p>
                  </div>
                  {/* Grid column */}
                  <div className="col-md-6 mb-3">
                    <p className="mb-1">
                      <i className="bi bi-clock-fill text-primary" style={{ fontSize: '2rem' }}></i>
                    </p>
                    <p className="fw-bold">Lunes a Viernes</p>
                    <p className='text-muted'>8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.Info column */}
        </div>
        {/* /.Grid row */}
      </div>
    </section>
  );
};

export default Contact;
