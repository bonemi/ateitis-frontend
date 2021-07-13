import React, { Fragment } from "react";
import { useStaticQuery, graphql } from "gatsby";
import BotonModal from "./boton-modal";
import Titulo from "./titulo";
import Parrafo from "./parrafo";
import { Col, Container, Row } from "react-bootstrap";
import cableImg from "../images/cable.png";

export default function NosotrosBlock({ data, language }) {
  console.log(data);
  const contenido = data.nosotrosPage.edges[0].node;
  data.allWpNosotrosItem.edges.sort((a, b) =>
    a.node.acfNosotrosListado.orden > b.node.acfNosotrosListado.orden ? 1 : -1
  );

  return (
    <Fragment>
      <Row className="my-5">
        {/* Contenido "estatico" (WP pages) */}
        <Col>
          <Titulo
            id={language === "en" ? "aboutus" : "nosotros"}
            data={contenido.title}
          ></Titulo>
          {/* <div className="cable">
            <img src={cableImg} alt="Cable" />
          </div> */}
        </Col>
      </Row>
      {contenido.acfNosotros.descripcion && (
        <Row className="mb-4 mt-4  mx-xl-5">
          <Col>
            <Parrafo data={contenido.acfNosotros.descripcion}></Parrafo>
          </Col>
        </Row>
      )}
      <Row className="mb-4 mt-4 mx-xl-5">
        {data.allWpNosotrosItem.edges.map(item => (
          <Col md={6} lg={4} key={item.node.id} className="mb-3 mt-3">
            <BotonModal
              mostrarFooter={true}
              iconoEnBody={true}
              data={item}
              key={item.node.id}
              nodeName="acfNosotrosListado"
            ></BotonModal>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
}
