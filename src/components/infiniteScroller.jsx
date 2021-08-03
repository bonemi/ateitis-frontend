import React from "react";
// import Img from "gatsby-image";
// import styled, { keyframes } from "styled-components";

// const StyledInfiniteScroller = styled.div`
//   width: 100%;
//   overflow: hidden;
// `;

// const StyledInfiniteScrollerImagen = styled.div`
//   height: ${props => props.height};
//   width: 10000px; /* The image width times 3 */
//   animation: ${props => slide(props)} 50s linear infinite;
//   -webkit-animation: ${props => slide(props)} 50s linear infinite;
// `;

export default function InfiniteScroller() {
  //   if (!imagen) return null;
  //   const width = imagen.localFile.childImageSharp.original.width;
  //   const height = imagen.localFile.childImageSharp.original.height;

  return (
    <div className="container-slider">
      <div className="sliding-background"></div>
    </div>
  );
}
