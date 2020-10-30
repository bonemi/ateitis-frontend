import { graphql, Link } from "gatsby";
import React from "react";
import MainAnimation from "../components/main-animation.jsx";
import SEO from "../components/seo";
import logoAcademy from "../images/logo-ateitis-academy.png";
import logo from "../images/logo-ateitis.png";

export default function IndexPage({ data }) {
  /* Cargar los menues de wordpress, via grapqhl page query */
  const serviciosLink = data.allWpMenu.edges[0].node.menuItems.nodes.find(x =>
    x.url.includes("servicios")
  );
  const academyLink = data.allWpMenu.edges[0].node.menuItems.nodes.find(x =>
    x.url.includes("academy")
  );

  return (
    <div id="index">
      <SEO title="Inicio" />
      <div className="background">
        <div className="bg-img bg-decals"></div>
        <div className="bg-img bg-computer">
          <MainAnimation />
        </div>
        <div className="circle"></div>
      </div>
      <div className="nav-container">
        <nav className="left">
          <img src={logo} alt="Ateitis Logo" />
          <Link to={serviciosLink.url}>{serviciosLink.label}</Link>
        </nav>
        <nav className="right">
          <img src={logoAcademy} alt="Ateitis AcademyLogo" />
          <Link to={academyLink.url}>{academyLink.label}</Link>
        </nav>
      </div>
    </div>
  );
}

export const menuQuery = graphql`
  query {
    allWpMenu(filter: { slug: { glob: "*landing-page*" } }) {
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
  }
`;
