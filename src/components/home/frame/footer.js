import React from 'react';

function Footer() {
  return (
    <footer className="page-footer font-small blue" style={{ backgroundColor: '#343a40', color: '#fff' }}>
      {/* Social buttons */}
      <div className="bg-primary">
        <div className="container">
          {/* Grid row */}
          <div className="row py-4 d-flex align-items-center">
            {/* Grid column */}
            <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
              <h6 className="mb-0">Síguenos en nuestras redes sociales</h6>
            </div>
            {/* Grid column */}
            <div className="col-md-6 col-lg-7 text-center text-md-right">
              <a
                className="text-white mx-2"
                href="https://www.facebook.com/GuatemalaPazyBien"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                className="text-white mx-2"
                href="https://www.youtube.com/channel/UCI5fKlbayi8hQGOGroqbOhQ/videos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube"></i>
              </a>
              <a
                className="text-white mx-2"
                href="https://www.ivoox.com/podcast-asociacion-paz-bien_sq_f1472067_1.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="roadcast"
              >
                <i className="bi bi-broadcast"></i>
              </a>
              <a
                className="text-white mx-2"
                href="https://twitter.com/tucuentasguatem"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
