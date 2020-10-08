import React from "react";

export default function Titulo({ data, id, showInicial = true }) {
  if (!showInicial) return TituloSinInicial({ data, id });
  else {
    return TituloConInicial({ data, id });
  }
}

function TituloSinInicial({ data, id }) {
  return (
    <div id={id} className="titulo">
      <div className="resto">{data}</div>
    </div>
  );
}

function TituloConInicial({ data, id }) {
  const inicial = data.substring(0, 1);
  const resto = data.substring(1, data.length);
  return (
    <div id={id} className="titulo">
      <div className="inicial">
        <span>{inicial}</span>
      </div>
      <div className="resto">{resto}</div>
    </div>
  );
}
