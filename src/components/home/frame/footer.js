import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';

function Footer() {
  return (
    <footer className="page-footer font-small blue">
      {/* Social buttons */}
      <div className="primary-color">
        <div className="container">
          {/* Grid row */}
          <div className="row py-4 d-flex align-items-center">
            {/* Grid column */}
            <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
              <h6 className="mb-0 white-text">Síguenos en nuestras redes sociales</h6>
            </div>
            {/* Grid column */}
            <div className="col-md-6 col-lg-7 text-center text-md-right">
              <a
                className="fb-ic ml-0"
                href="https://www.facebook.com/GuatemalaPazyBien"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook white-text mr-4"> </i>
              </a>
              <a
                className="tw-ic"
                href="https://www.youtube.com/channel/UCI5fKlbayi8hQGOGroqbOhQ/videos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-youtube-play white-text mr-4"> </i>
              </a>
              <a
                className="gplus-ic"
                href="https://www.ivoox.com/podcast-asociacion-paz-bien_sq_f1472067_1.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-podcast white-text mr-4"> </i>
              </a>
              <a
                className="li-ic"
                href="https://twitter.com/tucuentasguatem"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-twitter white-text mr-4"> </i>
              </a>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </div>
      {/* Social buttons */}
      {/* Optional Footer Links */}
      {/* Uncomment and add links if needed */}
      {/* <div className="unique-color-dark pt-0">
        &copy; 2024 Copyright:
        <a href="#"> Gigagenios </a>
      </div> */}
    </footer>
  );
}

export default Footer;
