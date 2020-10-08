import React from "react";
import NavbarMenu from "../components/navbar";
import logo from "../images/logo-ateitis.png";
import NosotrosBlock from "../components/nosotros-block";
import { graphql } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import ServiciosBlock from "../components/servicios-block";
import ClientesBlock from "../components/clientes-block";
import ContactoBlock from "../components/contacto-block";
import SocialBlock from "../components/social-block";
import SEO from "../components/seo";

export default function ServiciosPage({ data }) {
  return (
    <div id="servicios-page">
      <SEO title="Servicios" />
      <a className="academy-link hvr-radial-out" href="/academy">
        <span>¿QUERÉS CONOCER NUESTRA ACADEMY?</span>
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
      ></NavbarMenu>
      <Container>
        <Row>
          <Col>
            <NosotrosBlock></NosotrosBlock>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <ServiciosBlock></ServiciosBlock>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          <ClientesBlock></ClientesBlock>
        </Row>
      </Container>

      <Container fluid className="seccion-contacto mt-4">
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
    allWpMenu(filter: { slug: { glob: "menu-servicios" } }) {
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
