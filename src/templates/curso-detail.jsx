// import "../sass/academy.scss";
//to make graphql queries
import { graphql } from "gatsby";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ContactoBlock from "../components/contacto-block";
import NavbarMenu from "../components/navbar";
import SEO from "../components/seo";
import SocialBlock from "../components/social-block";
import escribinosImg from "../images/escribinos-academy.png";
import logo from "../images/logo-ateitis-academy.png";
import Img from "gatsby-image";

import cartImg from "../images/cart.png";
import bulbImg from "../images/bulb-white.png";
import clockImg from "../images/clock-white.png";
import cogImg from "../images/cog-white.png";
import tagImg from "../images/tag-white.png";
import directionsImg from "../images/directions-white.png";
import listImg from "../images/list-white.png";
import CursoDetailSection from "../components/curso-detail-section";

export default function CursoDetail({ data, pageContext }) {
  const { slug } = pageContext;
  const { id, name, description, image, price } = data.wpProduct;

  const {
    fechaDeInicio,
    fechaHora,
    metodologia,
    orientacion,
    precioFormasDePago,
    profesor,
    temario,
  } = data.wpProduct.acfCursos;
  const categoria = data.wpProduct.productCategories.nodes[0];

  return (
    <div id="academy-page">
      <SEO title="Academy" />

      <a className="servicios-link hvr-radial-out" href="/servicios">
        <span>¿QUERÉS CONOCER NUESTROS SERVICIOS?</span>
      </a>
      <Row noGutters className="logo-container">
        <Col>
          <div className="logo">
            <img src={logo} alt="Ateitis Logo" />
          </div>
        </Col>
      </Row>
      <NavbarMenu
        menu={data.allWpMenu.edges[0].node.menuItems.nodes}
        section="academy"
      ></NavbarMenu>

      <Container className="curso-details">
        <Row>
          <Col className="my-md-3 my-lg-5 curso-details-title">
            <div className="category">
              {categoria.image && (
                <Img
                  fluid={categoria.image.localFile.childImageSharp.fluid}
                  imgStyle={{ objectFit: "contain" }}
                ></Img>
              )}
              <h2>{categoria.name}</h2>
            </div>
            <h3>{name}</h3>
          </Col>
        </Row>
        <Row
          className="justify-content-center"
          style={{ position: "relative" }}
        >
          {image && (
            <div className="curso-image">
              <Img
                fluid={image.localFile.childImageSharp.fluid}
                imgStyle={{ objectFit: "contain" }}
              ></Img>
            </div>
          )}
          <Col md={12} lg={6} className="d-flex flex-column">
            <CursoDetailSection
              img={cogImg}
              title={name}
              body={description}
            ></CursoDetailSection>
            <CursoDetailSection
              img={listImg}
              title="Temario"
              body={temario}
            ></CursoDetailSection>
          </Col>
          <Col md={12} lg={6} className="d-flex flex-column">
            <CursoDetailSection
              img={cogImg}
              title="Metodología"
              body={metodologia}
            ></CursoDetailSection>
            <CursoDetailSection
              img={clockImg}
              title="Fecha - Horiario"
              body={fechaHora}
            ></CursoDetailSection>
            <CursoDetailSection
              img={directionsImg}
              title="Orientación"
              body={orientacion}
            ></CursoDetailSection>
            <CursoDetailSection
              img={tagImg}
              title="Precio - Formas de Pago"
              body={precioFormasDePago}
            ></CursoDetailSection>
          </Col>
        </Row>
        <Row className="text-center my-4">
          <Col>
            <a href="#contacto" className="btn  btn-lg btn-dark mb-2 ">
              AÑADIR AL <img src={cartImg}></img>
            </a>
          </Col>
        </Row>
      </Container>
      <Container fluid className="escribinos-container">
        <Row className="justify-content-end">
          <img src={escribinosImg} alt="Escribinos" className="img-fluid" />
        </Row>
      </Container>
      <Container fluid className="seccion-contacto academy mt-4">
        <Row>
          <ContactoBlock></ContactoBlock>
        </Row>
        <Row className="py-3">
          <SocialBlock></SocialBlock>
        </Row>
      </Container>
    </div>
  );
}

export const menuQuery = graphql`
  query($slug: String!) {
    allWpMenu(filter: { slug: { glob: "menu-academy" } }) {
      edges {
        node {
          slug
          name
          menuItems {
            nodes {
              id
              label
              url
            }
          }
        }
      }
    }
    wpProduct(slug: { eq: $slug }) {
      id
      name
      description
      image {
        id
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
      productCategories {
        nodes {
          name
          image {
            id
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
      ... on WpSimpleProduct {
        id
        price
      }
      acfCursos {
        fechaDeInicio
        fechaHora
        metodologia
        orientacion
        precioFormasDePago
        profesor
        temario
      }
    }
  }
`;
