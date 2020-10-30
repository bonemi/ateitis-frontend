import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { v4 } from "uuid";
import cartImg from "../images/cart.png";
import ADD_TO_CART from "../mutations/add-to-cart";
import GET_CART from "../queries/get-cart";
import { AppContext } from "./context/AppContext";

export default function AddToCartButton({ product, caption, className }) {
  const { addToast, removeAllToasts } = useToasts();
  const { cart, setCart } = useContext(AppContext);
  const { name, productId } = product;

  // Get Cart Data.
  const [getCart, { loading, data }] = useLazyQuery(GET_CART, {
    // notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    onCompleted: () => {
      const updatedCart = data;
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));
      setCart(updatedCart.cart);
    },
    onError: error => {
      console.log(error);
    },
  });

  /* Agregar articulo al carrito */
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: {
        clientMutationId: v4(),
        productId: product.productId,
      },
    },
    onCompleted: () => {
      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      addToast(
        <div className="toast-content">
          <div>{`El producto ${name} se ha agregado al carrito.`}</div>
          <div>
            <Button href="?carrito=1" variant="outline-dark">
              Ver Carrito
            </Button>
          </div>
        </div>,
        {
          appearance: "success",
          autoDismiss: true,
        }
      );
      getCart();
    },

    onError: error => {
      addToast("No se pudo agregar el producto al carrito.", {
        appearance: "error",
        autoDismiss: true,
      });
    },
  });

  if (addToCartLoading)
    return (
      <Button
        variant="dark"
        disabled
        className={`add-to-cart-button  ${className}`}
      >
        <Spinner
          as="span"
          animation="border"
          role="status"
          variant="light"
          size="sm"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
        {caption} <img src={cartImg}></img>
      </Button>
    );
  return (
    <Button
      onClick={addToCart}
      variant="dark"
      className={`add-to-cart-button ${className}`}
    >
      <span></span>
      <span>{caption} </span>
      <img src={cartImg}></img>
    </Button>
  );
}
