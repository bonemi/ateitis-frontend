import React, { Fragment } from "react";
import { useStaticQuery, graphql } from "gatsby";
import BotonModal from "./boton-modal";
import Titulo from "./titulo";
import Parrafo from "./parrafo";
import { Col, Container, Row } from "react-bootstrap";
import Certificaciones from "./certificaciones";
import CursosBlock from "./cursos-block";

export default function AcademyBlock({ language }) {
  const data = useStaticQuery(pageQuery);

  /* l ser un componente, solo podemos hacer queries estaticas, por eso nos traemos las dos versiones de los idiomas y filtramos por js */
  /* https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/ */
  /* Otra opcion es hacer queries diferentes para cada idioma en diferentes archivos */

  const contenido = data.allWpPage.nodes.find(node => node.language.slug === language);

  return (
    <Fragment>
      <Row className="mb-4 mt-4">
        <Col>
          <Titulo id="academy" data={contenido.title}></Titulo>
        </Col>
      </Row>

      {contenido.acfAcademy.descripcion && (
        <Row className="mb-4 mt-4">
          <Col>
            <Parrafo data={contenido.acfAcademy.descripcion}></Parrafo>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}

const pageQuery = graphql`
  query AcademyBlockQuery {
    allWpPage(filter: { title: { eq: "Academy" } }) {
      nodes {
        id
        title
        slug
        language {
          slug
        }
        acfAcademy {
          descripcion
          fieldGroupName
        }
      }
    }
  }
`;
