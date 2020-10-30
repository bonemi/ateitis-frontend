import React, { createContext, useContext, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

const LoadingContext = createContext({
  loading: false,
  setLoading: () => {},
});

export function useLoading() {
  const { loading, setLoading } = useContext(LoadingContext);
  return [loading, setLoading];
}

export function useLoadingEffect(loading) {
  const [, setLoading] = useLoading();
  useEffect(() => {
    setLoading(loading);
  });
}

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function Loading() {
  const { loading } = useContext(LoadingContext);
  return (
    loading && (
      <div className="spinner-container">
        <Spinner animation="border" role="status" variant="light">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  );
}
