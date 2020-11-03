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
import StickyImg from "../images/landing-page-computer.png";

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

      <div className="main-section-wrapper">
        <div className="main-section">
          <div className="sticky-sidebar">
            <img src={StickyImg} alt="Sticky Image" />
          </div>
          <div className="main-section-content">
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
            <Container></Container>
          </div>
        </div>
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
