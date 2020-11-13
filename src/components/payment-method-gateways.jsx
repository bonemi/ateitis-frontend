import React from "react";

import { Form, Spinner } from "react-bootstrap";
import GET_PAYMENT_GATEWAYS from "../queries/get-payment-gateways";
import { useQuery } from "@apollo/client";

import styled from "styled-components";
import paypalLogo from "../images/logo-paypal.png";
import mercadopagoLogo from "../images/logo-mercadopago.png";

const Uppercase = styled.div`
  text-transform: uppercase;
`;

export default function PaymentMethods({ handleOnChange, moneda }) {
  const { loading, error, data } = useQuery(GET_PAYMENT_GATEWAYS);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return `Error cargando métodos de pago! ${error.message}`;

  //filter the known payment gateways
  const pesosPayments = data.paymentGateways.edges.filter(
    payment => payment.node.id !== "paypal"
  );
  const dolarPayments = data.paymentGateways.edges.filter(
    payment => payment.node.id !== "woo-mercado-pago-basic"
  );


  let monedaPesos = moneda.value === "ARS" ? true : false; 

  //if pesos is the currency set the right array to loop
  let paymentArray;
  if (monedaPesos) {
    paymentArray = pesosPayments;
  } else {
    paymentArray = dolarPayments;
  }

  const gutter = 2;

  return (
    <Uppercase>
      {paymentArray.map(payment => (
        <div
          className={`d-flex align-items-center mb-${gutter}`}
          key={payment.node.id}
        >
          <Form.Check
            type="radio"
            label={payment.node.title}
            value={payment.node.id}
            name="paymentMethod"
            id="formHorizontalRadios1"
            onChange={handleOnChange}
            className={`mr-4`}
          />
          {payment.node.id === "paypal" ? (
            <img src={paypalLogo} style={{ maxHeight: "16px" }} alt="Paypal" />
          ) : null}
          {payment.node.id === "woo-mercado-pago-basic" ? (
            <img
              src={mercadopagoLogo}
              style={{ maxWidth: "52px" }}
              alt="Mercado Pago"
            />
          ) : null}
        </div>
      ))}
    </Uppercase>
  );
}
