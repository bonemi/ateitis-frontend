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
import AddToCartButton from "./add-to-cart-button";

var utc = require("dayjs/plugin/utc"); // dependent on utc plugin
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("es"); // use Spanish locale globally
dayjs.tz.setDefault("America/Argentina/Buenos_Aires");

export default function CursoCard({ curso }) {
  const {
    duracion,
    fechaDeInicio,
    metodologia,
    modalidadDeClases,
    orientacion,
    precioFormasDePago,
    profesor,
    temario,
  } = curso.acfCursos;

  const { slug, price } = curso;

  const formattedPrice = convertHtmlToText(price);

  let fechaDeInicioFormatted = dayjs(fechaDeInicio).format(
    "[Inicia el] DD [de] MMMM [de] YYYY"
  );

  const fotoProfesor = curso.acfCursos.fotoProfesor
    ? curso.acfCursos.fotoProfesor.localFile.childImageSharp.fluid
    : null;
  const imagenCurso = curso.image
    ? curso.image.localFile.childImageSharp.fluid
    : null;
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
        <h3>{curso.name}</h3>
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
          <a href={`/academy/${slug}`} className="btn btn-primary">
            VER MÁS
          </a>
        </Col>
        <Col sm={12} lg={6} className="mb-2">
          {price ? (
            <AddToCartButton
              product={curso}
              caption="COMPRAR"
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
