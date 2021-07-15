import { graphql } from "gatsby";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BooleanParam, NumberParam, useQueryParam } from "use-query-params";
import AcademyBlock from "../components/academy-block";
import Carrito from "../components/carrito";
import ContactoBlock from "../components/contacto-block";
import CursosBlock from "../components/cursos-block";
import NavbarMenu from "../components/navbar";
import SEO from "../components/seo";
import SocialBlock from "../components/social-block";
import escribinosImg from "../images/escribinos-academy.png";
import logo from "../images/logo-ateitis-academy.png";
import StickyImg from "../images/landing-page-computer.png";
import flagUsa from "../images/flag-usa.png";
export default function AcademyPage({ data }) {
  const language = "es";

  const handleCloseCarrito = () => {
    setShowCarrito(undefined);
    setCartStep(undefined);
  };
  const handleShowCarrito = () => {
    setShowCarrito(true);
    setCartStep(1);
  };
  const [showCarrito, setShowCarrito] = useQueryParam("carrito", BooleanParam);
  const [cartStep, setCartStep] = useQueryParam("step", NumberParam);

  return (
    <div id="academy-page">
      <SEO title="Academy" />

      <a className="servicios-link hvr-radial-out" href="/servicios">
        <span>¿QUERÉS CONOCER NUESTROS SERVICIOS?</span>
      </a>
      <a className="languageSelectorPages" href="/en/academy">
        <img src={flagUsa} alt="" />
        <span>ENGLISH SITE</span>
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
        language={language}
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
                  <AcademyBlock language={language}></AcademyBlock>
                </Col>
              </Row>
            </Container>

            <Container>
              <Row className="mb-4 mt-4">
                <Col>
                  <CursosBlock language={language}></CursosBlock>
                </Col>
              </Row>
            </Container>
          </div>
          <Container fluid className="escribinos-container">
            <Row className="justify-content-end">
              <img src={escribinosImg} alt="Escribinos" className="img-fluid" />
            </Row>
          </Container>
        </div>
        <Container fluid className="seccion-contacto academy mt-4">
          <Row>
            <ContactoBlock language={language}></ContactoBlock>
          </Row>
          <Row className="py-3">
            <SocialBlock></SocialBlock>
          </Row>
        </Container>
        {showCarrito && (
          <Carrito
            show={showCarrito}
            handleCloseCarrito={handleCloseCarrito}
            handleShowCarrito={handleShowCarrito}
            setCartStep={setCartStep}
            cartStep={cartStep}
            language={language}
          />
        )}
      </div>
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
