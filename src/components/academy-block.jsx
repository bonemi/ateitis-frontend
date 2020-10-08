import React, { Fragment } from "react";
import { useStaticQuery, graphql } from "gatsby";
import BotonModal from "./boton-modal";
import Titulo from "./titulo";
import Parrafo from "./parrafo";
import { Col, Container, Row } from "react-bootstrap";
import Certificaciones from "./certificaciones";
import CursosBlock from "./cursos-block";

export default function AcademyBlock() {
  const data = useStaticQuery(pageQuery);
  const contenido = data.allWpPage.edges[0].node;

  return (
    <Fragment>
      <Row className="mb-4 mt-4">
        <Col>
          <Titulo id="academy" data={contenido.title}></Titulo>
        </Col>
      </Row>

      {contenido.acfAcademy.descripcion && (
        <Row className="mb-4 mt-4">
          <Col>
            <Parrafo data={contenido.acfAcademy.descripcion}></Parrafo>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}

const pageQuery = graphql`
  query AcademyBlockQuery {
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
    allWpPage(filter: { slug: { eq: "academy" } }) {
      edges {
        node {
          id
          title
          slug
          acfAcademy {
            descripcion
            fieldGroupName
          }
        }
      }
    }
  }
`;
