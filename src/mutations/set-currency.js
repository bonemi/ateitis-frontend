import { gql } from "@apollo/client";

/**
 * Set Currency
 *
 * This query updates the currency used in the session.
 */
const SET_CURRENCY = gql`
  mutation($input: SetCurrencyInput!) {
    setCurrency(input: $input) {
      newCurrency
    }
  }
`;

export default SET_CURRENCY;
