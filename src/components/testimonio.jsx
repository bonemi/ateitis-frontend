import React, { Fragment } from "react";
import { Col } from "react-bootstrap";
import Img from "gatsby-image";

export default function Testimonio({ cliente, carousel }) {
  const nombre = cliente.title;
  const { puestoCliente, texto } = cliente.acfClientesSatisfechos;
  const imagen =
    cliente.acfClientesSatisfechos.fotoCliente.localFile.childImageSharp.fixed;

  const extraClass = carousel ? "" : "col-lg-6 col-xl-3 ";

  return (
    <Fragment>
      <Col className={`testimonio my-3 ${extraClass}`}>
        <div className="burbuja">
          <div className="texto">{texto}</div>
          <div className="datos">
            <div className="nombre">{nombre}</div>
            <div className="puesto">{puestoCliente}</div>
          </div>
        </div>
        <div className="foto">
          <Img fixed={imagen}></Img>
          <div className="estrella"></div>
        </div>
      </Col>
    </Fragment>
  );
}
