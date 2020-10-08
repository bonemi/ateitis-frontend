import React, { Fragment } from "react";
import { Carousel } from "react-bootstrap";
import Testimonio from "./testimonio";

export default function TestimoniosBlock({ data, carousel = false }) {
  data.sort((a, b) =>
    a.node.acfClientesSatisfechos.orden > b.node.acfClientesSatisfechos.orden
      ? 1
      : -1
  );

  if (carousel) {
    return testimonioCarousel({ data, carousel });
  }
  return (
    <Fragment>
      {data.map(cliente => (
        <Testimonio
          key={cliente.node.id}
          cliente={cliente.node}
          carousel={carousel}
        ></Testimonio>
      ))}
    </Fragment>
  );
}

const testimonioCarousel = function ({ data, carousel }) {
  return (
    <Carousel indicators={false}>
      {data.map(cliente => (
        <Carousel.Item key={`${cliente.node.id}_carousel`}>
          <Testimonio cliente={cliente.node} carousel></Testimonio>
        </Carousel.Item>
      ))}
      {/* <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption> */}
    </Carousel>
  );
};
