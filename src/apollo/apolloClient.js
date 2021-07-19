/**
 * Internal dependencies.
 */
import fetch from "isomorphic-fetch";

import { createHttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { isEmpty } from "lodash";
import decode from "jwt-decode";

// Token expiry check
const isTokenExpired = authToken => {
  const date = new Date(0);
  date.setUTCSeconds(decode(authToken).exp);
  return authToken ? Date.now() - date > 172100 : true;
};

/**
 * Middleware operation
 *
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 * If we have a auth token in localStorage, add it to the GraphQL request as a authorization header.
 */
export const middleware = new ApolloLink((operation, forward) => {
  let headersData = null;

  /**
   * If session data exist in local storage, set value as session header.
   */
  const session = process.browser ? localStorage.getItem("woo-session") : null;

  if (!isEmpty(session)) {
    if (isTokenExpired(session)) {
      localStorage.removeItem("woo-session");
    } else {
      headersData = {
        "woocommerce-session": `Session ${session}`,
      };
    }
  }

  /**
   * If auth token exist in local storage, set value as authorization header.
   */
  const auth = process.browser ? JSON.parse(localStorage.getItem("auth")) : null;
  const token = !isEmpty(auth) ? auth.authToken : null;

  if (!isEmpty(token)) {
    headersData = {
      ...headersData,
      authorization: token ? `Bearer ${token}` : "",
    };
  }

  if (!isEmpty(headersData)) {
    operation.setContext(({ headers = {} }) => ({
      headers: headersData,
    }));
  }

  return forward(operation);
});

/**
 * Afterware operation.
 *
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    /**
     * Check for session header and update session in local storage accordingly.
     */
    const context = operation.getContext();

    const {
      response: { headers },
    } = context;

    const session = headers.get("woocommerce-session");

    // if (response.errors && response.errors[0].message === "Expired token") {
    //   console.log("Token Timeout: Iniciando una nueva sesión.");
    //   localStorage.removeItem("woo-session");
    // }

    if (session) {
      // Remove session data if session destroyed.
      if ("false" === session) {
        localStorage.removeItem("woo-session");

        // Update session new data if changed.
      } else if (localStorage.getItem("woo-session") !== session) {
        localStorage.setItem("woo-session", headers.get("woocommerce-session"));
      }
    }

    return response;
  });
});

export const link = new ApolloLink((operation, forward) => {
  // console.log("Add");
  return forward(operation);
});

export const client = new ApolloClient({
  credentials: "include",
  link: middleware.concat(
    afterware.concat(
      createHttpLink({
        fetch: fetch,
        credentials: "include",
        uri: `${process.env.GATSBY_WORDPRESS_SITE_URL}/graphql`,
      })
    )
  ),
  cache: new InMemoryCache(),
  clientState: {},
});

// export const client = new ApolloClient({
//   //   credentials: "include",
//   link: createHttpLink({
//     fetch: fetch,
//     // credentials: "include",
//     uri: `${process.env.GATSBY_WORDPRESS_SITE_URL}/graphql`,
//   }),
//   cache: new InMemoryCache(),
//   clientState: {},
// });
