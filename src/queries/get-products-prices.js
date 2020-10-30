import { gql } from "@apollo/client";

const GET_PRODUCTS_PRICES = gql`
  query GET_PRODUCTS_PRICES($include: [Int]) {
    products(where: { include: $include }) {
      edges {
        node {
          productId
          id
          ... on SimpleProduct {
            price
            onSale
            regularPrice
            salePrice
          }
        }
      }
    }
  }
`;

export default GET_PRODUCTS_PRICES;
