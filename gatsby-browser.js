/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "./src/sass/index.scss";
import "./src/sass/page-base.scss";

import React from "react";
import { client } from "./src/context/ApolloContext";
import { ApolloProvider } from "@apollo/client";

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
