import { gql } from "@apollo/client";

const GET_CURRENT_CURRENCY = gql`
  query GET_CURRENT_CURRENCY {
    woocsCurrentCurrency
  }
`;

export default GET_CURRENT_CURRENCY;
