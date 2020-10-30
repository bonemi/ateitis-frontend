import React, { useState, useEffect } from "react";

export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = props => {
  const [cart, setCart] = useState(null);
  const [moneda, setMoneda] = useState({ value: "ARS", label: "ARS" });

  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem("woo-next-cart");
      //cartData = null;
      cartData = null !== cartData ? JSON.parse(cartData) : "";
      setCart(cartData);
    }
  }, []);

  return (
    <AppContext.Provider value={{ cart, setCart, moneda, setMoneda }}>
      {props.children}
    </AppContext.Provider>
  );
};
