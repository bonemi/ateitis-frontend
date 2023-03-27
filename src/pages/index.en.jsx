import { graphql, Link } from "gatsby";
import React from "react";
import MainAnimation from "../components/main-animation.jsx";
import SEO from "../components/seo";
import logoAcademy from "../images/logo-ateitis-academy.png";
import logo from "../images/logo-ateitis.png";
import flagSpain from "../images/flag-spain.png";
import Img from "gatsby-image";

export default function IndexPage({ data }) {
  const language = "en";
  // console.log(data);
  /* Cargar los menues de wordpress, via grapqhl page query */
  const serviciosLink = data.menu.edges[0].node.menuItems.nodes.find(x =>
    x.url.includes("servicios-de-seguridad-informatica-ciberseguridad")
  );
  const academyLink = data.menu.edges[0].node.menuItems.nodes.find(x =>
    x.url.includes("academy")
  );

  return (
    <div id="index">
      <SEO title="Home" />
      <div className="background">
        <div className="bg-img bg-decals"></div>
        <div className="bg-img bg-computer">
          <MainAnimation />
        </div>
        <div className="circle"></div>
      </div>
      <a className="languageSelector" href="/">
        <img src={flagSpain} alt="" />
        <span>SITIO EN ESPAÑOL</span>
      </a>

      <div className="nav-container">
        <nav className="left">
          <div className="imgWrapper">
            <Img
              fluid={data.getLogoAteitis.childImageSharp.fluid}
              alt="Ateitis Logo"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <Link to="services">Our Services</Link>
        </nav>
        <nav className="right">
          <div className="imgWrapper">
            <Img
              fluid={data.getLogoAcademy.childImageSharp.fluid}
              alt="Ateitis Logo"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <Link to="academy">Our Academy</Link>
        </nav>
      </div>
    </div>
  );
}

export const menuQuery = graphql`
  query {
    menu: allWpMenu(filter: { slug: { glob: "*landing-page*" } }) {
      edges {
        node {
          slug
          name
          menuItems {
            nodes {
              label
              url
            }
          }
        }
      }
    }
    getLogoAteitis: file(relativePath: { eq: "logo-ateitis.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    getLogoAcademy: file(relativePath: { eq: "logo-ateitis-academy.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
