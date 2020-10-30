/**
 * External dependencies.
 */
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { AppProvider } from "../components/context/AppContext";
import "../sass/index.scss";
import "../sass/page-base.scss";
import { client } from "./apolloClient";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { Loading, LoadingProvider } from "../components/context/LoadingContext";

/**
 * Internal dependencies.
 */

/**
 * Root Element which is a wrapper to the app.
 *
 * @param {Object} element App element.
 *
 * @return {*}
 */
export const wrapRootElement = ({ element }) => (
  <AppProvider>
    <ToastProvider>
      <LoadingProvider>
        <Loading />
        <ApolloProvider client={client}>{element}</ApolloProvider>
      </LoadingProvider>
    </ToastProvider>
  </AppProvider>
);
