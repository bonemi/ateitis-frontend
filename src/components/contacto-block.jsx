import { graphql, useStaticQuery } from "gatsby";
import React, { Fragment, useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import ContactoLista from "./contacto-lista";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";


export default function ContactoBlock({ action = "" }) {
  const gutter = 4;
  const data = useStaticQuery(contactosQuery);
  const contactosTelefonicos = data.allWpPage.edges.filter(
    x => x.node.slug === "contactos-telefonicos"
  )[0].node;

  const contactosMail = data.allWpPage.edges.filter(
    x => x.node.slug === "contactos-mail"
  )[0].node;

  //code to mutation graphql to wordpress
  const [empresaValue, setEmpresaValue] = useState("");
  const [nombreValue, setNombreValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [whatsappValue, setWhatsappValue] = useState("");
  const [mensajeValue, setMensajeValue] = useState("");
  //end of code

  const [
    createContactMessage,
    { error: error, data: mutation_data, loading: loading },
  ] = useMutation(CONTACT_MUTATION);
  return (
    <Fragment>
      <Col lg={12}>
        <Container className="my-5 px-5" id="contacto">
            <Form          
            className="px-md-5"
            id="form-contact"
            onSubmit={async event => {
              event.preventDefault();
              createContactMessage({
                variables: {
                  clientMutationId: "example",
                  empresa: empresaValue,
                  nombre: nombreValue,
                  email: emailValue,
                  whatsapp: whatsappValue,
                  mensaje: mensajeValue,
                },
              });
            }}
          > 
            <Row>
              <Col sm={12} md={6} className={`mb-${gutter}`}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Empresa*"
                  value={empresaValue}
                  onChange={event => {
                    setEmpresaValue(event.target.value);
                  }}
                />
              </Col>
              <Col sm={12} md={6} className={`mb-${gutter}`}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Tu Nombre*"
                  value={nombreValue}
                  onChange={event => {
                    setNombreValue(event.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} className={`mb-${gutter}`}>
                <Form.Control
                  required
                  type="email"
                  placeholder="E-mail*"
                  value={emailValue}
                  onChange={event => {
                    setEmailValue(event.target.value);
                  }}
                />
              </Col>
              <Col sm={12} md={6} className={`mb-${gutter}`}>
                <Form.Control
                  required
                  type="tel"
                  placeholder="Whatsapp*"
                  value={whatsappValue}
                  onChange={event => {
                    setWhatsappValue(event.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row className={`mb-${gutter}`}>
              <Col>
                <Form.Control
                  as="textarea"
                  type="text"
                  rows="6"
                  required
                  placeholder="Tu Consulta*"
                  value={mensajeValue}
                  onChange={event => {
                    setMensajeValue(event.target.value);
                  }}
                />
              </Col>
            </Row> 
            <Form.Row className={`mb-${gutter}`}>
              <Col className="text-center">
                <Button type="submit">ENVIAR</Button>
              </Col>
            </Form.Row>
          </Form>
          <Row className={`mb-${gutter} px-md-5`}>
            <Col>
            
              {loading && <Alert variant={"primary"}>Enviando...</Alert>}
              {error && (
                <Alert variant={"danger"}>
                  Ocurrió un error, por favor intentá de nuevo...
                </Alert>
              )}
              {mutation_data && 
              <Alert variant={"success"}>
              <style type="text/css">
              {`
                #form-contact {
                  display: none;
                }
              `}
              </style>
              
              Enviado!
              </Alert>

              }
            </Col>
          </Row>
        </Container>
      </Col>

      <Col lg={12}>
        <Container className="px-md-5">
          <Row>
            <Col sm={12} md={6}>
              <ContactoLista
                data={contactosTelefonicos}
                nodeName="acfContactosTelefonicos"
              ></ContactoLista>
            </Col>
            <Col sm={12} md={6}>
              <ContactoLista
                data={contactosMail}
                nodeName="acfContactosMail"
              ></ContactoLista>
            </Col>
          </Row>
        </Container>
      </Col>
    </Fragment>
  );
}

const contactosQuery = graphql`
  query contactosQuery {
    allWpPage(filter: { slug: { glob: "contactos-*" } }) {
      edges {
        node {
          id
          slug
          title
          acfContactosMail {
            urlIcono1
            urlIcono2
            urlIcono3
            urlIcono4
            icono1 {
              id
              sourceUrl
              localFile {
                id
                childImageSharp {
                  fixed(width: 64) {
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
            icono2 {
              id
              sourceUrl
              localFile {
                id
                childImageSharp {
                  fixed(width: 64) {
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
            icono3 {
              id
              sourceUrl
              localFile {
                id
                childImageSharp {
                  fixed(width: 64) {
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
            icono4 {
              id
              sourceUrl
              localFile {
                id
                childImageSharp {
                  fixed(width: 64) {
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
            fieldGroupName
            listaContactos
          }
          acfContactosTelefonicos {
            fieldGroupName
            listaContactos
            urlIcono1
            urlIcono2
            urlIcono3
            urlIcono4
            icono1 {
              id
              sourceUrl
              localFile {
                id
                childImageSharp {
                  fixed(width: 64) {
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
            icono2 {
              id
              sourceUrl
              localFile {
                id
                childImageSharp {
                  fixed(width: 64) {
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
            icono3 {
              id
              sourceUrl
              localFile {
                id
                childImageSharp {
                  fixed(width: 64) {
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
            icono4 {
              id
              sourceUrl
              localFile {
                id
                childImageSharp {
                  fixed(width: 64) {
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

//code to mutation graphql to wordpress

const CONTACT_MUTATION = gql`
  mutation createContactMessageMutation(
    $clientMutationId: String!
    $empresa: String!
    $nombre: String!
    $email: String!
    $whatsapp: String!
    $mensaje: String!
  ) {
    createContactMessage(
      input: {
        clientMutationId: $clientMutationId
        empresa: $empresa
        nombre: $nombre
        email: $email
        whatsapp: $whatsapp
        mensaje: $mensaje
      }
    ) {
      success
      data
    }
  }
`;
//end of code to mutation graphql to wordpress
