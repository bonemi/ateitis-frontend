import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { Col, Container, Row } from "react-bootstrap";
import CursoCard from "./curso-card";
import { Fragment } from "react";
import Titulo from "./titulo";
import translations from "../utils/translations";

export default function CursosBlock({ language }) {
  const data = useStaticQuery(pageQuery);
  const categorias = data.allWpProductCategory.edges;
  const sortedCategories = categorias.sort((a, b) =>
    a.node.acfCategoria.orden > b.node.acfCategoria.orden ? 1 : -1
  );
  return (
    <Fragment>
      <Row className="mb-4 mt-4 ">
        <Col>
          <Titulo
            id={translations.courses[language].toLowerCase()}
            data={translations.courses[language]}
            showInicial={true}
          ></Titulo>
        </Col>
      </Row>

      <div className="curso-selection">
        {sortedCategories.map(cat => (
          <Container key={cat.node.id}>
            <Row>
              <Col className="my-5 curso-selection-category">
                <Img
                  fluid={
                    cat.node?.image?.localFile
                      ? cat.node.image.localFile.childImageSharp.fluid
                      : null
                  }
                ></Img>
                <h2>{cat.node.acfCategoria[language]}</h2>
              </Col>
            </Row>
            <Row className="px-0">
              {cat.node.products.nodes.map(prod => (
                <Col key={prod.id} sm={12} lg={6} className="px-0 px-md-2 px-lg-4 my-4">
                  <CursoCard language={language} curso={prod} key={prod.id}></CursoCard>
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
          acfCategoria {
            orden
            en
            es
          }
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
                es {
                  duracionEs
                  fechaDeInicioEs
                  fechaHoraEs
                  fieldGroupName
                  metodologiaEs
                  modalidadDeClasesEs
                  orientacionEs
                  precioFormasDePagoEs
                  profesorEs
                  temarioEs
                  tituloEs
                  slugEs
                  fotoProfesorEs {
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
                en {
                  duracionEn
                  fechaDeInicioEn
                  fechaHoraEn
                  fieldGroupName
                  metodologiaEn
                  modalidadDeClasesEn
                  orientacionEn
                  precioFormasDePagoEn
                  profesorEn
                  temarioEn
                  tituloEn
                  slugEn
                  fotoProfesorEn {
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
  }
`;
