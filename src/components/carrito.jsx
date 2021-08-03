import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { graphql, useStaticQuery } from "gatsby";
import React, { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { v4 } from "uuid";
import APPLY_COUPON_MUTATION from "../mutations/apply-coupon";
import REMOVE_COUPONS_MUTATION from "../mutations/remove-coupon";
import REMOVE_ITEMS_FROM_CART from "../mutations/remove-items-from-cart";
import SET_CURRENCY from "../mutations/set-currency";
import UPDATE_CART from "../mutations/update-cart";
import GET_CART from "../queries/get-cart";
import GET_CURRENT_CURRENCY from "../queries/get-current-currency";
import { CarritoStep1 } from "./carrito-step-1";
import { CarritoStep2 } from "./carrito-step-2";
import { AppContext } from "./context/AppContext";
import LoadingComponentOverlay from "./loading-component-overlay";

export default function Carrito({
  language,
  show,
  handleCloseCarrito,
  cartStep,
  setCartStep,
}) {
  const monedasData = useStaticQuery(monedasQuery);
  const { moneda, setMoneda } = useContext(AppContext);

  const monedas = monedasData.wp.woocsCurrencies;
  const monedaDefault = monedasData.wp.woocsDefaultCurrency;

  const { cart, setCart } = useContext(AppContext);
  console.log(cart);
  const { addToast, removeAllToasts } = useToasts();

  const [
    getCurrentCurrency,
    { currencyLoading, currencyData, currencyRefetch },
  ] = useLazyQuery(GET_CURRENT_CURRENCY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    onCompleted: newMoneda => {
      setMoneda({
        label: newMoneda.woocsCurrentCurrency,
        value: newMoneda.woocsCurrentCurrency,
      });
    },
  });

  useEffect(() => {
    // console.log("mount");
    const currentCurrency = getCurrentCurrency();
  }, []);

  /* GET CART DATA */
  const { loading, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      console.log("GET CART REFETCH FUNCTION START");
      console.log(data);
      const updatedCart = data.cart;
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      console.log(updatedCart);
      console.log("Carrito Fetched");
    },
    onError: error => {
      console.log(error);
    },
  });

  /* UPDATE CART QUANTITY*/
  const [
    updateCart,
    { data: updateCartRes, loading: updateCartLoading, error: updateCardError },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      console.log("CART UPDATED");
      refetch();
    },
    onError: error => {
      console.log(error);
    },
  });

  /* REMOVE ITEM FROM CART */
  const [
    removeItemsFromCart,
    { data: deleteFromCartRes, loading: deletFromCartLoading, error: deleteFromCartError },
  ] = useMutation(REMOVE_ITEMS_FROM_CART, {
    onCompleted: data => {
      // console.log(`Se elimino: `, data);
      refetch();
    },
    onError: error => {
      // console.log(error);
    },
  });

  /* CHANGE CURRENCY */
  const [changeCurrency] = useMutation(SET_CURRENCY, {
    onCompleted: data => {
      console.log("Se cambio la moneda a: ");
      console.log(data.setCurrency.newCurrency);
      console.log(data);

      // TODO: PLEASE PLEASE PLEASE FIND OUT WHY YOU NEED TO EXECUTE TWO TIMES GET_QUERY TO GET SUBTOTAL UPDATED
      setTimeout(() => {
        console.log("refecth");
        refetch();
        setTimeout(() => {
          console.log("refecth");
          refetch();
        }, 1000);
      }, 1000);
    },

    onError: error => {
      console.log(error);
    },
  });

  /* APPLY COUPON */

  const [
    applyCoupon,
    { data: applyCouponRes, loading: applyCouponLoading, error: applyCouponError },
  ] = useMutation(APPLY_COUPON_MUTATION, {
    onCompleted: data => {
      //   console.log(`Carrito Luego del cupon: : `, data.applyCoupon.cart);

      setCart(data.applyCoupon.cart);
      //   refetch();
    },
    onError: error => {
      console.log(error);
    },
  });

  /* REMOVE ALL COUPONS */
  const [
    removeAllCoupons,
    { data: removeCouponRes, loading: removeCouponLoading, error: removeCouponError },
  ] = useMutation(REMOVE_COUPONS_MUTATION, {
    onCompleted: data => {
      setCart(data.removeCoupons.cart);
    },
    onError: error => {
      console.log(error);
    },
  });

  if (!cart && loading) {
    return <LoadingComponentOverlay fullscreen />;
  }

  if (cartStep === 2) {
    return (
      <Modal show={show} onHide={handleCloseCarrito} centered size="lg">
        <CarritoStep2
          setCartStep={setCartStep}
          monedas={monedas}
          moneda={moneda}
          setMoneda={setMoneda}
          cart={cart}
          setCart={setCart}
          updateCart={updateCart}
          removeItemsFromCart={removeItemsFromCart}
          changeCurrency={changeCurrency}
          loading={updateCartLoading || loading}
          language={language}
        ></CarritoStep2>
      </Modal>
    );
  } else {
    return (
      <Modal show={show} onHide={handleCloseCarrito} centered size="lg">
        <CarritoStep1
          setCartStep={setCartStep}
          monedas={monedas}
          moneda={moneda}
          applyCoupon={applyCoupon}
          removeAllCoupons={removeAllCoupons}
          applyCouponLoading={applyCouponLoading}
          removeCouponLoading={removeCouponLoading}
          setMoneda={setMoneda}
          cart={cart}
          setCart={setCart}
          updateCart={updateCart}
          removeItemsFromCart={removeItemsFromCart}
          changeCurrency={changeCurrency}
          loading={updateCartLoading || loading || removeCouponLoading || applyCouponLoading}
          language={language}
        ></CarritoStep1>
      </Modal>
    );
  }
}

export const monedasQuery = graphql`
  query {
    wp {
      woocsCurrencies {
        description
        # flag
        # hide_cents
        # is_etalon
        name
        pos
        rate
        symbol
      }
      woocsDefaultCurrency
      woocsCurrentCurrency
    }
  }
`;
