import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  FormControl,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import Select from "react-select";
import { v4 } from "uuid";
import cartImg from "../images/cart.png";
import metodosDePagoImg from "../images/metodos-de-pago.png";
import CarritoItem from "./carrito-item";
import LoadingComponentOverlay from "./loading-component-overlay";

export function CarritoStep1({
  setCartStep,
  monedas,
  cart,
  setCart,
  applyCoupon,
  removeAllCoupons,
  updateCart,
  removeItemsFromCart,
  loading,
  changeCurrency,
  moneda,
  setMoneda,
}) {
  const monedasOptions = monedas.map(x => {
    return {
      value: x.name,
      label: x.name,
    };
  });

  const [appliedCouponCode, setAppliedCouponCode] = useState("");

  if (!cart || !cart.contents) {
    return <div className="empty-cart">El carrito está vacío.</div>;
  }

  const products = cart.contents.nodes;
  const gutter_s = 2;
  const gutter_m = 5;

  async function removeCoupons() {
    await removeAllCoupons({
      variables: {
        input: {
          clientMutationId: v4(),
          codes: cart.appliedCoupons.nodes.map(x => x.code),
        },
      },
    });
  }

  async function removeAndApplyCoupon() {
    if (cart.appliedCoupons.nodes.length > 0) await removeCoupons();

    await applyCoupon({
      variables: {
        input: {
          clientMutationId: v4(),
          code: appliedCouponCode,
        },
      },
    });
    console.log("Cupon aplicado: " + appliedCouponCode);
  }
  //   if (loading) {
  //     return <LoadingComponentOverlay />;
  //   }
  return (
    <Fragment>
      {loading && <LoadingComponentOverlay />}
      <Modal.Header
        className={`mb-${gutter_s} carrito-modal-header`}
        closeButton
      >
        <Modal.Title>
          CARRITO DE COMPRAS <img src={cartImg}></img>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="carrito-modal-body">
        <Container>
          <Row className={`mb-${gutter_m}`}>
            <Col>
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
            </Col>
          </Row>
          <div className="primera-seccion">
            {/* {loading && <LoadingComponentOverlay />} */}
            <Row className={`mb-${gutter_s}`} style={{ color: "#55a0d5" }}>
              <Col sm={12} md={9} className="text-center d-none d-md-block">
                <h5>PRODUCTO</h5>
              </Col>

              <Col sm={12} md={3} className="text-center d-none d-md-block">
                <h5>SUBTOTAL</h5>
              </Col>
            </Row>

            <Row className={`mb-${gutter_m}`}>
              <Col sm={12} md={12}>
                <div className="carrito-listado-de-productos text-center">
                  {products.length === 0 ? (
                    <p>El carrito esta vacío</p>
                  ) : (
                    products.map(item => (
                      <CarritoItem
                        key={item.product.productId}
                        item={item}
                        updateCart={updateCart}
                        removeItemsFromCart={removeItemsFromCart}
                      ></CarritoItem>
                    ))
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <div className="segunda-seccion">
            <div className="subtotal">
              <Row className={`my-${gutter_s}`}>
                <Col xs={12} md={8} className="text-center text-md-left">
                  <h5>SUBTOTAL:</h5>
                </Col>
                <Col xs={12} md={4} className="text-center text-md-right">
                  <h5> {cart.subtotal}</h5>
                </Col>
              </Row>
            </div>
            {cart.appliedCoupons.nodes.length > 0 && (
              <Row className={`my-${gutter_s} subtotal`}>
                <Col xs={12} md={8} className="text-center text-md-left">
                  <h6 className="d-flex align-items-center">
                    DESCUENTO:
                    <Badge variant="success" className="ml-2">
                      {cart.appliedCoupons.nodes[0].description}
                      <button
                        style={{
                          marginLeft: ".25rem",
                          color: "inherit",
                          fontSize: "100%",
                          textShadow: "0 1px 0 rgba(#000, .5)",
                        }}
                        type="button"
                        className="close"
                        aria-label="Close"
                        // onClick={() =>
                        //   removeAllCoupons({
                        //     variables: {
                        //       input: {
                        //         clientMutationId: v4(),
                        //         codes: cart.appliedCoupons.nodes.map(
                        //           x => x.code
                        //         ),
                        //       },
                        //     },
                        //   })
                        // }
                        onClick={removeCoupons}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </Badge>
                  </h6>
                </Col>
                <Col xs={12} md={4} className="text-center text-md-right">
                  <h6> ({cart.discountTotal})</h6>
                </Col>
              </Row>
            )}

            <Row className={`my-${gutter_s}`}>
              <Col sm={12} md={8} className="text-center text-md-left d-flex ">
                <span className="mr-4">¿Tenés un cupón de descuento?</span>
                {/* {cart.appliedCoupons.nodes.length > 0 && ( */}

                {/* )} */}
              </Col>
              <Col sm={12} md={4} className="text-center text-md-right">
                <InputGroup size="sm" className="text-md-right mw-100">
                  <FormControl
                    type="text"
                    value={appliedCouponCode}
                    onChange={e => setAppliedCouponCode(e.target.value)}
                    name="cupon-descuento"
                    id="cupon-descuento"
                  />
                  <InputGroup.Append>
                    <Button
                      style={{ borderColor: "#ced4da" }}
                      variant="outline-secondary"
                      onClick={removeAndApplyCoupon}
                    >
                      Aplicar
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>
          </div>
          <div className="tercera-seccion">
            <div className="textos">
              <Row className={`mb-${gutter_m}`}>
                <Col sm={12} md={8} className="text-center text-md-left">
                  <h5>TOTAL:</h5>
                </Col>
                <Col sm={12} md={4} className="text-center text-md-left">
                  <h5>{cart.total}</h5>
                </Col>
              </Row>
            </div>
          </div>
          <div className="cuarta-seccion">
            <Row className={`mb-${gutter_m}`}>
              <Col sm={0} md={2}></Col>
              <Col sm={12} md={4} className="mb-3">
                <Button block onClick={() => setCartStep(2)} size="lg">
                  INICIAR COMPRA
                </Button>
              </Col>
              <Col sm={12} md={4}>
                <Button
                  block
                  variant="light"
                  size="lg"
                  href="/academy#cursos"
                  className="w-md-100"
                >
                  VER MAS CURSOS
                </Button>
              </Col>
              <Col sm={0} md={2}></Col>
            </Row>
            <Row className={`mb-${gutter_s}`} style={{ textAlign: "center" }}>
              <Col sm={12} md={12}>
                <Image src={metodosDePagoImg} fluid />
              </Col>
            </Row>
          </div>
        </Container>
      </Modal.Body>
    </Fragment>
  );
}
