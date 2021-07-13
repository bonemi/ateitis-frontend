import React from "react";
import translations from "../../utils/translations";

const OrderSuccess = props => {
  const { response, language } = props;

  if (!response) {
    return null;
  }

  const responseData = response.checkout;

  window.location.href = responseData.redirect;

  return (
    <div className="container">
      {"success" === responseData.result ? (
        <div>
          <h2>
            {translations.order.orderNumber[language]}: {responseData.order.orderId}{" "}
          </h2>
          <p>
            {translations.order.status[language]} : {responseData.order.status}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderSuccess;
