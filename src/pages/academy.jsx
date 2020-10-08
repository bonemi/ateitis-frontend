// import "../sass/academy.scss";
import React from "react";

//to make graphql queries
import { graphql } from "gatsby";
import SEO from "../components/seo";
import logo from "../images/logo-ateitis-academy.png";
import { Col, Container, Row } from "react-bootstrap";
import NavbarMenu from "../components/navbar";
import AcademyBlock from "../components/academy-block";
import SocialBlock from "../components/social-block";
import ContactoBlock from "../components/contacto-block";
import escribinosImg from "../images/escribinos-academy.png";
import CursosBlock from "../components/cursos-block";
export default function AcademyPage({ data }) {
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

      <Container>
        <Row>
          <Col>
            <AcademyBlock></AcademyBlock>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="mb-4 mt-4">
          <Col>
            <CursosBlock></CursosBlock>
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
  query {
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
  }
`;
