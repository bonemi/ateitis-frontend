import { useMutation } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { v4 } from "uuid";
import CHECKOUT_MUTATION from "../mutations/checkout";
import { createCheckoutData } from "../utils/functions";
import validateAndSanitizeCheckoutForm from "../validator/checkout";
import CheckoutError from "./checkout-error/index";
import countryList from "./country-list";
import LoadingComponentOverlay from "./loading-component-overlay";
import OrderSuccess from "./order-success/index";
import PaymentMethods from "./payment-method-gateways";

const gutter = 2;
const gutter_m = 4;
const gutter_l = 5;

export function CarritoStep2({
  setCartStep,
  setMoneda,
  moneda,
  monedas,
  changeCurrency,
  cart,
  setCart,
  loading,
}) {
  const monedasOptions = monedas.map(x => {
    return {
      value: x.name,
      label: x.name,
    };
  });

  const initialState = {
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    createAccount: false,
    username: "",
    password: "",
    customerNote: "",
    paymentMethod: "",
    errors: null,
  };

  const [input, setInput] = useState(initialState);
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  //revisar si la linea de abajo iba o no
  //const { cart, setCart } = useContext(AppContext);

  // Checkout or CreateOrder Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData,
    },
    onCompleted: () => {
      console.warn("completed CHECKOUT_MUTATION");
      //   refetch();
    },
    onError: error => {
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleFormSubmit = event => {
    console.log("handle form submit");
    console.log(input);
    event.preventDefault();
    const result = validateAndSanitizeCheckoutForm(input);
    console.log(result);
    if (!result.isValid) {
      setInput({ ...input, errors: result.errors });

      let error = "";

      for (let index = 0; index < Object.keys(result.errors).length; index++) {
        const element = Object.keys(result.errors)[index];
        error += result.errors[element] + "\n";
      }
      alert("Hay un error con tus datos, por favor revisalos. " + "\n" + error);
      return;
    }
    const checkOutData = createCheckoutData(input);
    setOrderData(checkOutData);
    setRequestError(null);
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleOnChange = event => {
    /*if ("createAccount" === event.target.name) {
      const newState = { ...input, [event.target.name]: !input.createAccount };
      setInput(newState);
    } else {*/
    console.log("handlechange");
    const newState = { ...input, [event.target.name]: event.target.value };
    setInput(newState);
    //}
  };

  useEffect(() => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      /* eslint-disable */
      //console.log("checkkkout");
      checkout();
    }
  }, [orderData]);

  return (
    <>
      {loading && <LoadingComponentOverlay />}
      {cart ? (
        <Fragment>
          <Modal.Header
            closeButton
            className={`carrito-modal-header`}
            closeButton
          >
            <Modal.Title>DETALLE DE FACTURACIÓN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form onSubmit={handleFormSubmit}>
                <div className="carrito-step-2">
                  <Row className={`mb-${gutter}`}>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        required
                        type="text"
                        placeholder="NOMBRE*"
                        name="firstName"
                        //value={input.firstName}
                        onChange={handleOnChange}
                      />
                    </Col>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        required
                        type="text"
                        placeholder="APELLIDO*"
                        name="lastName"
                        //value={input.lastName}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>
                  <Row className={`mb-${gutter}`}>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        required
                        type="text"
                        placeholder="NOMBRE DE LA EMPRESA*"
                        name="company"
                        value={input.company}
                        onChange={handleOnChange}
                      />
                    </Col>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      {/* <Form.Label>PAÍS</Form.Label> */}
                      <Form.Control
                        as="select"
                        name="country"
                        value={input.country}
                        onChange={handleOnChange}
                      >
                        <option value="">SELECCIONÁ TU PAÍS...</option>
                        {countryList.length &&
                          countryList.map((country, index) => (
                            <option
                              key={`${country}-${index}`}
                              value={country.code}
                            >
                              {country.name}
                            </option>
                          ))}
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row className={`mb-${gutter}`}>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        required
                        type="text"
                        placeholder="PROVINCIA/REGIÓN*"
                        name="state"
                        value={input.state}
                        onChange={handleOnChange}
                      />
                    </Col>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        required
                        type="text"
                        placeholder="LOCALIDAD/CIUDAD*"
                        name="city"
                        value={input.city}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>
                  <Row className={`mb-${gutter}`}>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        required
                        type="text"
                        placeholder="DIRECCIÓN DE LA CALLE*"
                        name="address1"
                        value={input.address1}
                        onChange={handleOnChange}
                      />
                    </Col>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        type="text"
                        placeholder="NÚMERO DE CASA/APARTAMENTO"
                        name="address2"
                        value={input.address2}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>
                  <Row className={`mb-${gutter}`}>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        type="text"
                        placeholder="CÓDIGO POSTAL"
                        name="postcode"
                        value={input.postcode}
                        onChange={handleOnChange}
                      />
                    </Col>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        required
                        type="tel"
                        placeholder="TELÉFONO*"
                        name="phone"
                        value={input.phone}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>
                  <Row className={`mb-${gutter_l}`}>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Control
                        required
                        type="email"
                        placeholder="E-MAIL*"
                        name="email"
                        value={input.email}
                        onChange={handleOnChange}
                      />
                    </Col>
                    <Col sm={12} md={6} className={`mb-${gutter}`}>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>INFORMACIÓN ADICIONAL</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="customerNote"
                          value={input.customerNote}
                          onChange={handleOnChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className={`mb-${gutter}`}>
                    <Col>
                      <div className="carrito-modal-body">
                        <div className="seleccion-moneda">
                          <div className="label">SELECCIONA TU MONEDA</div>
                          <Select
                            className="flex-select"
                            value={moneda}
                            options={monedasOptions}
                            onChange={val => {
                              changeCurrency({
                                variables: {
                                  input: {
                                    clientMutationId: v4(),
                                    newCurrency: val.value,
                                  },
                                },
                              });
                              setMoneda(val);
                            }}
                          ></Select>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className={`mb-${gutter_l} total`}>
                    <Col sm={12} md={8}>
                      <h5>TOTAL:</h5>
                    </Col>
                    <Col sm={12} md={4}>
                      <h5>{cart.total}</h5>
                    </Col>
                  </Row>
                  <div className="metodo-pago">
                    <Row>
                      <Col sm={12} md={12} className={`mb-${gutter}`}>
                        <p>Elije tu método de pago</p>
                      </Col>
                    </Row>
                  </div>
                  {/*<Row className={`mb-${gutter_m}`}>
                    <Col sm={12} md={12}>
                      <Form.Check
                        type="radio"
                        label="TRANSFERENCIA"
                        value="bacs"
                        name="paymentMethod"
                        id="formHorizontalRadios1"
                        onChange={handleOnChange}
                        className={`mb-${gutter}`}
                      />
                      <Form.Check
                        type="radio"
                        label="PAYPAL"
                        value="paypal"
                        name="paymentMethod"
                        id="formHorizontalRadios2"
                        onChange={handleOnChange}
                        className={`mb-${gutter}`}
                      />
                      <Form.Check
                        type="radio"
                        label="PAGÁ CON TARJETAS DE CRÉDITO O DÉBITO"
                        value="woo-mercado-pago-basic"
                        name="paymentMethod"
                        id="formHorizontalRadios3"
                        onChange={handleOnChange}
                        className={`mb-${gutter}`}
                      />
                    </Col>
                  </Row>*/}
                  <Row className={`mb-${gutter_m}`}>
                    <Col sm={12} md={12}>
                      <PaymentMethods
                        handleOnChange={handleOnChange}
                        moneda={moneda}
                      />
                    </Col>
                  </Row>
                  <Row className={`mb-${gutter_m} finalizar-compra`}>
                    <Col sm={12} md={12}>
                      <Button type="submit" size="lg">
                        INICIAR COMPRA
                      </Button>
                    </Col>
                  </Row>
                  {/* Checkout Loading*/}
                  {checkoutLoading && <p>Procesando...</p>}
                  {requestError && (
                    <CheckoutError requestError={requestError} />
                  )}
                </div>
              </Form>
            </Container>
          </Modal.Body>
        </Fragment>
      ) : (
        ""
      )}

      {/*Show message if Order Success*/}
      <OrderSuccess response={checkoutResponse} />
    </>
  );
}
