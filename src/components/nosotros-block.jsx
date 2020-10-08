import React, { Fragment } from "react";
import { useStaticQuery, graphql } from "gatsby";
import BotonModal from "./boton-modal";
import Titulo from "./titulo";
import Parrafo from "./parrafo";
import { Col, Container, Row } from "react-bootstrap";

export default function NosotrosBlock() {
  const data = useStaticQuery(pageQuery);
  const contenido = data.allWpPage.edges[0].node;
  data.allWpNosotrosItem.edges.sort((a, b) =>
    a.node.acfNosotrosListado.orden > b.node.acfNosotrosListado.orden ? 1 : -1
  );
  return (
    <Fragment>
      <Row className="my-5">
        {/* Contenido "estatico" (WP pages) */}
        <Col>
          <Titulo id="nosotros" data={contenido.title}></Titulo>
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

const pageQuery = graphql`
  query pageQuery {
    allWpNosotrosItem {
      edges {
        node {
          id
          title
          acfNosotrosListado {
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
                  fixed(width: 100) {
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
    allWpPage(filter: { slug: { glob: "*nosotros*" } }) {
      edges {
        node {
          title
          slug
          acfNosotros {
            descripcion
            fieldGroupName
          }
        }
      }
    }
  }
`;
