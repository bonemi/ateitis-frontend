import React from "react";
import { Helmet } from "react-helmet";
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
import flagUsa from "../images/flag-usa.png";
import ScrollArrow from "../components/ui/scroll-arrow";

export default function ServiciosPage({ data, location }) {
  const language = "es";
 
  return (
    <div id="servicios-page">
       <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11421382917"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11421382917');
          `}
        </script>
      </Helmet>
      <SEO title="Servicios" />
      <ScrollArrow />
      <a className="academy-link hvr-radial-out" href="/academy">
        <span>¿QUERÉS CONOCER NUESTRA ACADEMY?</span>
      </a>
      <a className="languageSelectorPages" href="/en/services">
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
      <NavbarMenu language={language}></NavbarMenu>

      <div className="main-section-wrapper">
        {/* <div className="cable"></div> */}
        <div className="main-section">
          <div className="sticky-sidebar">
            <img src={StickyImg} alt="Sticky Image" />
          </div>
          <div className="main-section-content">
            <Container>
              <Row>
                <Col>
                  <NosotrosBlock
                    data={{
                      nosotrosPage: data.nosotrosPage,
                      allWpNosotrosItem: data.allWpNosotrosItem,
                    }}
                    language={language}
                  ></NosotrosBlock>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col>
                  <ServiciosBlock
                    data={{
                      serviciosPage: data.serviciosPage,
                      allWpServiciosItem: data.allWpServiciosItem,
                    }}
                    language={language}
                  ></ServiciosBlock>
                </Col>
              </Row>
            </Container>
            <Container></Container>
          </div>
        </div>
        <Container fluid>
          <Row>
            <ClientesBlock
              data={{ clientes: data.clientesSatisfechos }}
              language={language}
            ></ClientesBlock>
          </Row>
        </Container>

        <Container fluid className="seccion-contacto mt-4">
          <Row>
            <ContactoBlock language={language}></ContactoBlock>
          </Row>
          <Row className="py-3">
            <SocialBlock></SocialBlock>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export const dataQuery = graphql`
  query {
    nosotrosPage: allWpPage(
      filter: { slug: { glob: "*nosotros*" }, language: { slug: { eq: "es" } } }
    ) {
      edges {
        node {
          title
          slug
          acfNosotros {
            descripcion
            fieldGroupName
          }
        }
      }
    }
    allWpNosotrosItem(filter: { language: { slug: { eq: "es" } } }) {
      edges {
        node {
          id
          title
          acfNosotrosListado {
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
                  fixed(width: 100) {
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
    allWpServiciosItem(filter: { language: { slug: { eq: "es" } } }) {
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
    serviciosPage: allWpPage(
      filter: { slug: { glob: "*servicios*" }, language: { slug: { eq: "es" } } }
    ) {
      edges {
        node {
          title
          slug
          acfServicios {
            descripcion
            fieldGroupName
          }
        }
      }
    }
    clientesSatisfechos: allWpClientSatisfecho(filter: { language: { slug: { eq: "es" } } }) {
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
