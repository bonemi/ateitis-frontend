import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingComponentOverlay({ fullscreen = false }) {
  if (fullscreen) {
    return (
      <div className="loading-component-overlay fullscreen">
        <Spinner animation="border" role="status" variant="dark">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className="loading-component-overlay">
      <Spinner animation="border" role="status" variant="dark">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}
