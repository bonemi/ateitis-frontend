import { gql } from "@apollo/client";

const GET_PAYMENT_GATEWAYS = gql`
  query GET_PAYMENTS_GATEWAY {
    paymentGateways {
        edges {
          node {
            title
            id
            description
            icon
          }
        }
      }
  }
`;

export default GET_PAYMENT_GATEWAYS;
