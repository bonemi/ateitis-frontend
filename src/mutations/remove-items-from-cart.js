import { gql } from "@apollo/client";

const REMOVE_ITEMS_FROM_CART = gql`
  mutation REMOVE_ITEMS_FROM_CART($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cartItems {
        quantity
      }
    }
  }
`;

export default REMOVE_ITEMS_FROM_CART;
