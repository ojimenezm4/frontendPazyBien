import React from 'react';

function Header() {
  return (
    <header>
      <div id="intro" className="view">
        <div className="mask rgba-black-strong">
          <div className="container-fluid d-flex align-items-center justify-content-center h-100">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-md-10">
                <h2 className="display-4 font-weight-bold white-text pt-1 mb-2">Asociación Paz y Bien Guatemala</h2>
                <hr className="hr-light" />
                <h4 className="white-text my-4">Creando sonrisas, creando ilusiones</h4>
                <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L7WKSVH63AWQQ" className="btn btn-outline-white" target="_blank" rel="noopener noreferrer">Donar<i className="fa fa-paypal ml-2"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
