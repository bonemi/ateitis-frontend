import React, { Fragment } from "react";
import { useStaticQuery, graphql } from "gatsby";
import BotonModal from "./boton-modal";
import Titulo from "./titulo";
import Parrafo from "./parrafo";
import { Col, Container, Row } from "react-bootstrap";
import Certificaciones from "./certificaciones";

export default function ServiciosBlock() {
  const data = useStaticQuery(pageQuery);
  const contenido = data.allWpPage.edges[0].node;
  const certificacionesImg = data.allWpServiciosItem.edges.sort((a, b) =>
    a.node.acfServiciosListado.orden > b.node.acfServiciosListado.orden ? 1 : -1
  );
  return (
    <Fragment>
      <Row className="mb-4 mt-4">
        <Col>
          <Titulo id="servicios" data={contenido.title}></Titulo>
        </Col>
      </Row>

      {contenido.acfServicios.descripcion && (
        <Row className="mb-4 mt-4">
          <Col>
            <Parrafo data={contenido.acfServicios.descripcion}></Parrafo>
          </Col>
        </Row>
      )}
      <Row className="mb-4 mt-4 mx-xl-5">
        {data.allWpServiciosItem.edges.map(item => (
          <Col md={6} lg={4} key={item.node.id} className="mb-3 mt-3">
            <BotonModal
              data={item}
              key={item.node.id}
              nodeName="acfServiciosListado"
            ></BotonModal>
          </Col>
        ))}
      </Row>
      <Row className="mb-4 mt-4">
        <Col>
          <Titulo
            id="certificaciones"
            data="Nuestras certificaciones"
            showInicial={false}
          ></Titulo>
        </Col>
      </Row>
      <Row className="mb-4 mt-4 mx-lg-5">
        <Col className="hvr-bob">
          <Certificaciones></Certificaciones>
        </Col>
      </Row>
    </Fragment>
  );
}

const pageQuery = graphql`
  query ServiciosBlockQuery {
    allWpServiciosItem {
      edges {
        node {
          id
          title
          acfServiciosListado {
            color
            subTitulo
            orden
            texto
            icono {
              sourceUrl
              localFile {
                id
                childImageSharp {
                  id
                  fixed(width: 400) {
                    # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
    allWpPage(filter: { slug: { glob: "*servicios*" } }) {
      edges {
        node {
          title
          slug
          acfServicios {
            descripcion
            fieldGroupName
          }
        }
      }
    }
  }
`;
