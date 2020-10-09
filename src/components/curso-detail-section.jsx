import React from "react";
import { Col, Row } from "react-bootstrap";

export default function CursoDetailSection({ img, title, body }) {
  return (
    <div className="curso-detail-section">
      <div className="title">
        <img src={img} alt={title} />
        <span>{title}</span>
      </div>
      <div className="body" dangerouslySetInnerHTML={{ __html: body }}></div>
    </div>
  );
}
