import dayjs from "dayjs";
import "dayjs/locale/es";
import Img from "gatsby-image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import bulbImg from "../images/bulb.png";
import calendarImg from "../images/calendar.png";
import cartImg from "../images/cart.png";
import clockImg from "../images/clock.png";
import cogImg from "../images/cog.png";
import tagImg from "../images/tag.png";
import { convertHtmlToText } from "../utils/functions";
import { toTitleCase } from "../utils/string-utils";
import translations from "../utils/translations";
import AddToCartButton from "./add-to-cart-button";

var utc = require("dayjs/plugin/utc"); // dependent on utc plugin
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

export default function CursoCard({ curso, language }) {
  if (language === "en") {
    dayjs.locale("en"); // use Spanish locale globally
    dayjs.tz.setDefault("UTC");
  } else {
    dayjs.locale("es"); // use Spanish locale globally
    dayjs.tz.setDefault("America/Argentina/Buenos_Aires");
  }

  // console.log(curso);
  const fechaDeInicio = curso.acfCursos[language]["fechaDeInicio" + toTitleCase(language)];
  const fechaHora = curso.acfCursos[language]["fechaHora" + toTitleCase(language)];
  const metodologia = curso.acfCursos[language]["metodologia" + toTitleCase(language)];
  const modalidadDeClases =
    curso.acfCursos[language]["modalidadDeClases" + toTitleCase(language)];
  const precioFormasDePago =
    curso.acfCursos[language]["precioFormasDePago" + toTitleCase(language)];
  const profesor = curso.acfCursos[language]["profesor" + toTitleCase(language)];
  const temario = curso.acfCursos[language]["temario" + toTitleCase(language)];
  const descripcion = curso.acfCursos[language]["descripcion" + toTitleCase(language)];
  const duracion = curso.acfCursos[language]["duracion" + toTitleCase(language)];
  const titulo = curso.acfCursos[language]["titulo" + toTitleCase(language)];
  const slug = curso.acfCursos[language]["slug" + toTitleCase(language)];

  const { price } = curso;

  const formattedPrice = convertHtmlToText(price);

  const fechaInicioString =
    language === "en" ? "[Starts] MMMM, DD [of] YYYY" : "[Inicia el] DD [de] MMMM [de] YYYY";
  let fechaDeInicioFormatted = dayjs(fechaDeInicio).format(fechaInicioString);

  if (language === "en")
    fechaDeInicioFormatted = dayjs(fechaDeInicio).format("[Starts] MMMM, DD [of] YYYY");

  const fotoProfesor = curso.acfCursos[language]["fotoProfesor" + toTitleCase(language)]
    ? curso.acfCursos[language]["fotoProfesor" + toTitleCase(language)].localFile
        .childImageSharp.fluid
    : null;
  const imagenCurso = curso.image ? curso.image.localFile.childImageSharp.fluid : null;
  return (
    <div className="curso-card">
      <div className="header">
        {fotoProfesor ? (
          <Img fluid={fotoProfesor} imgStyle={{ objectFit: "contain" }}></Img>
        ) : null}
        {imagenCurso ? (
          <Img fluid={imagenCurso} imgStyle={{ objectFit: "contain" }}></Img>
        ) : null}
      </div>
      <div className="title">
        <h3>{titulo}</h3>
      </div>
      <div className="body">
        <div className="body-item">
          <img src={bulbImg} alt="Profesor" />
          <span>{profesor}</span>
        </div>

        <div className="body-item">
          <img src={cogImg} alt="Modalidad de Clases" />
          <span>{modalidadDeClases}</span>
        </div>
        <div className="body-item">
          <img src={calendarImg} alt="Fecha de Inicio" />
          <span>{fechaDeInicioFormatted}</span>
        </div>
        <div className="body-item">
          <img src={clockImg} alt="Duración" />
          <span>{duracion}</span>
        </div>
        {price && (
          <div className="body-item">
            <img src={tagImg} alt="Precio" />
            <span>{formattedPrice}</span>
          </div>
        )}
      </div>
      <Row className="cta">
        <Col sm={12} lg={6} className="mb-2">
          <a href={`academy/${slug}`} className="btn btn-primary">
            {translations.seeMore[language]}
          </a>
        </Col>
        <Col sm={12} lg={6} className="mb-2">
          {price ? (
            <AddToCartButton
              product={curso}
              caption={translations.addToCart[language]}
              language={language}
            ></AddToCartButton>
          ) : (
            <a href="#contacto" className="btn btn-dark mb-2 ">
              <span>
                CONSULTAR <img src={cartImg}></img>
              </span>
            </a>
          )}
        </Col>
      </Row>
    </div>
  );
}
