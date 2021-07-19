import React, { Fragment, useRef, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { v4 } from "uuid";
import { convertHtmlToText } from "../utils/functions";
import { toTitleCase } from "../utils/string-utils";
import translations from "../utils/translations";
let inputTimeOut = setTimeout(() => {}, 500);

function CarritoItem({ item, updateCart, removeItemsFromCart, language }) {
  const { quantity, total, subtotal, key } = item;
  const { id, productId, name, description, price, image } = item.product;
  const [qty, setQty] = useState(quantity);

  const title = item.product.acfCursos[language]["titulo" + toTitleCase(language)];

  // To make SetTimoutWork: https://github.com/facebook/react/issues/14010#issuecomment-433788147
  const qtyRef = useRef(qty);
  qtyRef.current = qty;

  const formattedPrice = convertHtmlToText(price);

  function deleteItemFromCart() {
    removeItemsFromCart({
      variables: {
        input: {
          clientMutationId: v4(),
          keys: key,
        },
      },
    });
  }

  function updateQuantity(newQty) {
    if (qty + newQty <= 0) {
      return;
    }

    window.clearTimeout(inputTimeOut);

    setQty(qty + newQty);

    inputTimeOut = setTimeout(() => {
      // console.log("update: " + qtyRef.current);
      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: [
              {
                key: key,
                quantity: qtyRef.current,
              },
            ],
          },
        },
      });
    }, 1000);
  }

  return (
    <Fragment>
      <Row className="carrito-item">
        <Col sm={12} md={3}>
          <Image src={image.sourceUrl} fluid />
        </Col>
        <Col sm={12} md={6} className="descripcion">
          <div className="item-title">{title}</div>
          <div className="item-price">{formattedPrice}</div>
        </Col>

        <Col sm={12} md={3} className="subtotal">
          <Row>
            <Col className="botonera">
              <Button size="sm" variant="outline-warning" onClick={() => updateQuantity(-1)}>
                -
              </Button>
              <Button size="sm" variant="outline-warning" disabled>
                {qty}
              </Button>
              <Button size="sm" variant="outline-warning" onClick={() => updateQuantity(1)}>
                +
              </Button>
              <Button size="sm" variant="outline-warning" onClick={deleteItemFromCart}>
                {translations.cart.delete[language]}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5> {total}</h5>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
}

export default CarritoItem;
