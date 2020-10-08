import React, { Fragment } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import InfiniteScroller from "./infiniteScroller";
import Titulo from "./titulo";
import TestimoniosBlock from "./testimonios-block";
import escribinosImg from "../images/escribinos.png";

export default function ClientesBlock() {
  const data = useStaticQuery(pageQuery);
  const clientesSatisfechos = data.allWpClientSatisfecho.edges;
  const clientesImg = data.allWpPage.edges[0].node.acfClientes.imagen;

  return (
    <Fragment>
      <Container className="mb-4 mt-4">
        <Row>
          <Col>
            <Titulo
              id="clientes"
              data="Clientes"
              //   data={contenido.title}
            ></Titulo>
          </Col>
        </Row>
      </Container>

      <Container fluid className="mb-4 mt-4">
        <Row>
          <InfiniteScroller imagen={clientesImg}></InfiniteScroller>
        </Row>
      </Container>

      {/* {contenido.acfServicios.descripcion && (
        <Row className="mb-4 mt-4">
          <Col>
            <Parrafo data={contenido.acfServicios.descripcion}></Parrafo>
          </Col>
        </Row>
      )} */}
      {/* <Row className="mb-4 mt-4">
        {data.allWpServiciosItem.edges.map(item => (
          <Col md={4} key={item.node.id} className="mb-3 mt-3 ">
            <BotonModal
              data={item}
              key={item.node.id}
              nodeName="acfServiciosListado"
            ></BotonModal>
          </Col>
        ))}
      </Row> */}
      <Container fluid className="mt-4 px-5">
        <Row>
          <Col>
            <Titulo
              id="clientes-satisfechos"
              data="Clientes Satisfechos..."
              showInicial={false}
            ></Titulo>
          </Col>
        </Row>
        <Row className="justify-content-around d-none d-lg-flex">
          <TestimoniosBlock
            data={clientesSatisfechos}
            carousel={false}
          ></TestimoniosBlock>
        </Row>
        <Row className="justify-content-around d-lg-none">
          <TestimoniosBlock
            data={clientesSatisfechos}
            carousel={true}
          ></TestimoniosBlock>
        </Row>
      </Container>
      <Container fluid className="escribinos-container">
        <Row className="justify-content-end">
          <img src={escribinosImg} alt="Escribinos" className="img-fluid" />
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
    allWpClientSatisfecho {
      edges {
        node {
          id
          slug
          title
          acfClientesSatisfechos {
            fieldGroupName
            orden
            puestoCliente
            texto
            fotoCliente {
              id
              localFile {
                childImageSharp {
                  fixed(width: 100) {
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
