import { graphql } from "gatsby";
import Img from "gatsby-image";
import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BooleanParam, NumberParam, useQueryParam } from "use-query-params";
import AddToCartButton from "../components/add-to-cart-button";
import Carrito from "../components/carrito";
import ContactoBlock from "../components/contacto-block";
import { AppContext } from "../components/context/AppContext";
import CursoDetailSection from "../components/curso-detail-section";
import NavbarMenu from "../components/navbar";
import SEO from "../components/seo";
import SocialBlock from "../components/social-block";
import clockImg from "../images/clock-white.png";
import cogImg from "../images/cog-white.png";
import directionsImg from "../images/directions-white.png";
import escribinosImg from "../images/escribinos-academy.png";
import escribinosImgEn from "../images/escribinos-academy-en.png";
import listImg from "../images/list-white.png";
import logo from "../images/logo-ateitis-academy.png";
import tagImg from "../images/tag-white.png";
import flagUsa from "../images/flag-usa.png";
import menu from "../utils/menu";
import { toTitleCase } from "../utils/string-utils";
import translations from "../utils/translations";
import ScrollArrow from "../components/ui/scroll-arrow";

export default function CursoDetail({ data, pageContext }) {
  const { slug, language, localizedSlug, acfCursos } = pageContext;
  console.log(pageContext);
  console.log(data);
  // console.log(language);
  const handleCloseCarrito = () => {
    setShowCarrito(undefined);
    setCartStep(undefined);
  };
  const handleShowCarrito = () => {
    setShowCarrito(true);
    setCartStep(1);
  };
  const [showCarrito, setShowCarrito] = useQueryParam(
    translations.cart.cart[language],
    BooleanParam
  );
  const [cartStep, setCartStep] = useQueryParam("step", NumberParam);

  const { id, productId, name, description, image, price } = data.wpProduct;

  const fechaDeInicio =
    data.wpProduct.acfCursos[language]["fechaDeInicio" + toTitleCase(language)];
  const fechaHora = data.wpProduct.acfCursos[language]["fechaHora" + toTitleCase(language)];
  const metodologia =
    data.wpProduct.acfCursos[language]["metodologia" + toTitleCase(language)];
  const precioFormasDePago =
    data.wpProduct.acfCursos[language]["precioFormasDePago" + toTitleCase(language)];
  const profesor = data.wpProduct.acfCursos[language]["profesor" + toTitleCase(language)];
  const temario = data.wpProduct.acfCursos[language]["temario" + toTitleCase(language)];
  const descripcion =
    data.wpProduct.acfCursos[language]["descripcion" + toTitleCase(language)];

  const orientacion =
    data.wpProduct.acfCursos[language]["orientacion" + toTitleCase(language)];

  const titulo = data.wpProduct.acfCursos[language]["titulo" + toTitleCase(language)];

  const categoria = data.wpProduct.productCategories.nodes[0];
  const serviciosLink = language === "en" ? "/en/services" : "/servicios";

  const slugEn = data.wpProduct.acfCursos.en.slugEn;
  const slugEs = data.wpProduct.acfCursos.es.slugEs;
  // console.log(language);
  // console.log(slugEn);
  // console.log(slugEs);
  // console.log(localizedSlug);
  return (
    <div id="academy-page">
      <SEO title="Academy" />
      <ScrollArrow />
      <a className="servicios-link hvr-radial-out" href={serviciosLink}>
        <span>{translations.knowOurServices[language]}</span>
      </a>
      {language === "es" ? (
        <a className="languageSelectorPages" href={`/en/academy/${slugEn}`}>
          <img src={flagUsa} alt="" />
          <span>ENGLISH SITE</span>
        </a>
      ) : (
        <a className="languageSelectorPages" href={`/academy/${slugEs}`}>
          <img src={flagUsa} alt="" />
          <span>SITIO EN ESPAÑOL</span>
        </a>
      )}
      <Row noGutters className="logo-container">
        <Col>
          <div className="logo">
            <img src={logo} alt="Ateitis Logo" />
          </div>
        </Col>
      </Row>
      <NavbarMenu language={language} section="academy"></NavbarMenu>

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
              <h2>{categoria.acfCategoria[language]}</h2>
            </div>
            <h3>{titulo}</h3>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ position: "relative" }}>
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
              title={titulo}
              body={descripcion}
            ></CursoDetailSection>
            <CursoDetailSection
              img={listImg}
              title={translations.coursesDetail.topics[language]}
              body={temario}
            ></CursoDetailSection>
          </Col>
          <Col md={12} lg={6} className="d-flex flex-column">
            <CursoDetailSection
              img={cogImg}
              title={translations.coursesDetail.methodology[language]}
              body={metodologia}
            ></CursoDetailSection>
            <CursoDetailSection
              img={clockImg}
              title={translations.coursesDetail.dateTime[language]}
              body={fechaHora}
            ></CursoDetailSection>
            <CursoDetailSection
              img={directionsImg}
              title={translations.coursesDetail.orientation[language]}
              body={orientacion}
            ></CursoDetailSection>
            <CursoDetailSection
              img={tagImg}
              title={translations.coursesDetail.priceAndPaymentMethod[language]}
              body={`<strong>${translations.price[language]} </strong> ${price} <br/> <br/> ${precioFormasDePago}`}
            ></CursoDetailSection>
          </Col>
        </Row>
        <Row className="text-center my-4">
          <Col className="d-none d-lg-flex"></Col>
          <Col>
            <AddToCartButton
              product={data.wpProduct}
              caption={translations.addToCart[language]}
              language={language}
            ></AddToCartButton>
          </Col>
          <Col className="d-none d-lg-flex"></Col>
        </Row>
      </Container>
      <Container fluid className="escribinos-container">
        <Row className="justify-content-end">
          <img
            src={language == "es" ? escribinosImg : escribinosImgEn}
            alt="Escribinos"
            className="img-fluid"
          />
        </Row>
      </Container>
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
  );
}

export const menuQuery = graphql`
  query($slug: String!) {
    wpProduct(slug: { eq: $slug }) {
      id
      productId
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
          acfCategoria {
            es
            en
          }

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
        es {
          fechaDeInicioEs
          fechaHoraEs
          metodologiaEs
          orientacionEs
          precioFormasDePagoEs
          profesorEs
          temarioEs
          descripcionEs
          tituloEs
          slugEs
        }
        en {
          fechaDeInicioEn
          fechaHoraEn
          metodologiaEn
          orientacionEn
          precioFormasDePagoEn
          profesorEn
          temarioEn
          descripcionEn
          tituloEn
          slugEn
        }
      }
    }
  }
`;
