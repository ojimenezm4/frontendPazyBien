import React from 'react';


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
      <div className="container">
        <a className="navbar-brand" href="#">Fundación Paz y Bien</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
          aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav mr-auto smooth-scroll">
            <li className="nav-item">
              <a className="nav-link" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#aboutus">Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contacto</a>
            </li>
          </ul>
          <ul className="navbar-nav nav-flex-icons">
            <li>
              <a className="fb-ic ml-0" href="https://www.facebook.com/GuatemalaPazyBien" target="_blank">
                <i className="fa fa-facebook white-text mr-4"></i>
              </a>
            </li>
            <li>
              <a className="tw-ic" href="https://www.youtube.com/channel/UCI5fKlbayi8hQGOGroqbOhQ/videos" target="_blank">
                <i className="fa fa-youtube-play white-text mr-4"></i>
              </a>
            </li>
            <li>
              <a className="gplus-ic" href="https://www.ivoox.com/podcast-asociacion-paz-bien_sq_f1472067_1.html" target="_blank">
                <i className="fa fa-podcast white-text mr-4"></i>
              </a>
            </li>
            <li>
              <a className="li-ic" href="https://twitter.com/tucuentasguatem" target="_blank">
                <i className="fa fa-twitter white-text mr-4"></i>
              </a>
            </li>
            <li>
              <a className="li-ic white-text" href="#">Ingresar</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
