import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { Col, Container, Row } from "react-bootstrap";
import CursoCard from "./curso-card";
import { Fragment } from "react";
import Titulo from "./titulo";

export default function CursosBlock() {
  const data = useStaticQuery(pageQuery);
  const categorias = data.allWpProductCategory.edges;
  return (
    <Fragment>
      <Row className="mb-4 mt-4 ">
        <Col>
          <Titulo id="cursos" data="Cursos" showInicial={true}></Titulo>
        </Col>
      </Row>

      <div className="curso-selection">
        {categorias.reverse().map(cat => (
          <Container key={cat.node.id}>
            <Row>
              <Col className="my-5 curso-selection-category">
                <Img
                  fluid={cat.node.image.localFile.childImageSharp.fluid}
                ></Img>
                <h2>{cat.node.name}</h2>
              </Col>
            </Row>
            <Row className="px-0 px-md-4">
              {cat.node.products.nodes.map(prod => (
                <Col key={prod.id} sm={12} lg={6} className="px-0 px-xl-4 my-4">
                  <CursoCard curso={prod} key={prod.id}></CursoCard>
                </Col>
              ))}
            </Row>
          </Container>
        ))}
      </div>
    </Fragment>
  );
}

const pageQuery = graphql`
  query CursosBlock {
    allWpProductCategory(
      filter: {
        name: { ne: "Sin categorizar" }
        products: { nodes: { elemMatch: { status: { eq: "publish" } } } }
      }
    ) {
      edges {
        node {
          id
          name
          image {
            id
            sourceUrl
            localFile {
              id
              childImageSharp {
                id
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          products {
            nodes {
              id
              productId
              name
              slug
              onSale
              image {
                id
                sourceUrl
                localFile {
                  id
                  childImageSharp {
                    id
                    fluid {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
              ... on WpSimpleProduct {
                id
                price
              }
              acfCursos {
                duracion
                fechaDeInicio
                fechaHora
                fieldGroupName
                metodologia
                modalidadDeClases
                orientacion
                precioFormasDePago
                profesor
                temario
                fotoProfesor {
                  id
                  sourceUrl
                  localFile {
                    id
                    childImageSharp {
                      id
                      fluid {
                        ...GatsbyImageSharpFluid_noBase64
                      }
                    }
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
