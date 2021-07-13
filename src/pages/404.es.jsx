import React from "react";

export default function NotFound404() {
  const language = "es";

  return (
    <div className="page-wrap d-flex flex-row align-items-center vh-100 vw-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">La página solicitada no existe.</div>
            <a href="https://www.ateitiscorp.com" className="btn btn-link">
              Volver al sitio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
