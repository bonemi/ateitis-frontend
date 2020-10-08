import React from "react";

export default function Parrafo({ data }) {
  return (
    <div className="parrafo" dangerouslySetInnerHTML={{ __html: data }}></div>
  );
}
