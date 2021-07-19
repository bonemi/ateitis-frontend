import React, { Fragment } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { Col } from "react-bootstrap";

export default function ContactoLista({ data, nodeName }) {
  if (!data) return null;
  let iconos = [];
  for (let index = 1; index <= 4; index++) {
    if (data[nodeName][`icono${index}`]) {
      const obj = {};
      obj.icon = data[nodeName][`icono${index}`];
      if (data[nodeName][`urlIcono${index}`]) obj.url = data[nodeName][`urlIcono${index}`];
      iconos.push(obj);
    }
  }

  const contenido = data[nodeName].listaContactos;

  if (!contenido) {
    return null;
  }

  // console.log(contenido);

  return (
    <div className="contacto-lista-container">
      <div className="header">
        {iconos.map(icono =>
          icono.url ? (
            <a href={icono.url} target="_blank " rel="noreferrer" key={icono.icon.id}>
              <Img
                fixed={icono.icon.localFile.childImageSharp.fixed}
                key={icono.icon.id}
              ></Img>
            </a>
          ) : (
            <Img fixed={icono.icon.localFile.childImageSharp.fixed} key={icono.icon.id}></Img>
          )
        )}
      </div>
      <div className="contenido" dangerouslySetInnerHTML={{ __html: toATag(contenido) }}></div>
    </div>
  );
}

/* Reemplaza mails y numeros de telefono a enlaces clickeables */
function toATag(str) {
  //   // mails
  //   const mailRegex = /([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4})/gi;
  //   let a = str.replace(mailRegex, "<a href='mailto:$1'>$1</a>");

  //   // Telefonos
  //   const telRegex = /(\+\d{2,4}[\d\-\s]+)/gm;
  //   const b = a.replace(telRegex, "<a href='tel:$1'>$1</a>");
  //   const c = b.replace(/tel:(.+)'/gm, x => x.replace(" ", "").replace("-", ""));
  //   return c;
  return str;
}
