import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import InfiniteScroller from "./infiniteScroller";
import Titulo from "./titulo";
import TestimoniosBlock from "./testimonios-block";
import escribinosImg from "../images/escribinos.png";
import escribinosImgEn from "../images/escribinos-en.png";
// import escribinosImgEn from "../images/escribinosEn.png";

import translations from "../utils/translations";
import { toTitleCase } from "../utils/string-utils";

export default function ClientesBlock({ language, data }) {
  // const pQuery = useStaticQuery(pageQuery);
  const clientesSatisfechos = data.clientes.edges;
  // const clientesImg = pQuery.allWpPage.edges[0].node.acfClientes.imagen;

  return (
    <Fragment>
      <Container className="mt-4 mb-4">
        <Row>
          <Col>
            <Titulo
              id={translations.clients[language]}
              data={translations.clients[language]}
              //   data={contenido.title}
            ></Titulo>
          </Col>
        </Row>
      </Container>

      <Container fluid className="mt-4 mb-4">
        <Row>
          <InfiniteScroller />
        </Row>
      </Container>

      <Container fluid className="mt-4 px-xl-5 mx-sm-2 mx-md-5">
        <Row>
          <Col>
            <Titulo
              id="clientes-satisfechos"
              data={translations.satisfiedClients[language]}
              showInicial={false}
            ></Titulo>
          </Col>
        </Row>
        <Row className="justify-content-around d-none d-lg-flex">
          <TestimoniosBlock data={clientesSatisfechos} carousel={false}></TestimoniosBlock>
        </Row>
        <Row className="justify-content-around d-lg-none">
          <TestimoniosBlock data={clientesSatisfechos} carousel={true}></TestimoniosBlock>
        </Row>
      </Container>
      <Container fluid className="escribinos-container">
        <Row className="justify-content-end">
          {
            <img
              src={language == "es" ? escribinosImg : escribinosImgEn}
              alt="Escribinos"
              className="img-fluid"
            />
          }
        </Row>
      </Container>
    </Fragment>
  );
}

const pageQuery = graphql`
  query ClientesBlockQuery {
    allWpPage(filter: { slug: { eq: "clientes" } }) {
      edges {
        node {
          title
          slug
          acfClientes {
            imagen {
              sourceUrl
              localFile {
                id
                childImageSharp {
                  id
                  original {
                    width
                    height
                  }
                  fixed(height: 200) {
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
  }
`;
