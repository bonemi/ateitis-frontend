import { gql } from "@apollo/client";

const APPLY_COUPON_MUTATION = gql`
  mutation APPLY_COUPON_MUTATION($input: ApplyCouponInput!) {
    applyCoupon(input: $input) {
      cart {
        contents {
          nodes {
            key
            product {
              id
              productId
              ... on SimpleProduct {
                id
                price
              }
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              galleryImages {
                nodes {
                  id
                  sourceUrl
                  srcSet
                  altText
                  title
                }
              }
            }
            variation {
              id
              variationId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              attributes {
                nodes {
                  id
                  name
                  value
                }
              }
            }
            quantity
            total
            subtotal
            subtotalTax
          }
        }
        appliedCoupons {
          nodes {
            id
            code
            description
            couponId
            discountType
            amount
            dateExpiry
            products {
              nodes {
                id
              }
            }
            productCategories {
              nodes {
                id
              }
            }
          }
        }
        subtotal
        subtotalTax
        shippingTax
        shippingTotal
        total
        totalTax
        feeTax
        feeTotal
        discountTax
        discountTotal
      }
    }
  }
`;

export default APPLY_COUPON_MUTATION;
