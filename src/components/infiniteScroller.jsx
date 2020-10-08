import React from "react";
import Img from "gatsby-image";
import styled, { keyframes } from "styled-components";

const slide = props => keyframes`
0% {
transform: translate3d(0, 0, 0);
}
100% {
transform: translate3d(${props.width}, 0, 0); /* The image width */
}
`;

const StyledInfiniteScroller = styled.div`
  width: 100%;
  overflow: hidden;
`;

const StyledInfiniteScrollerImagen = styled.div`
  height: ${props => props.height};
  width: 10000px; /* The image width times 3 */
  animation: ${props => slide(props)} 50s linear infinite;
`;

export default function InfiniteScroller({ imagen }) {
  if (!imagen) return null;
  const width = imagen.localFile.childImageSharp.original.width;
  const height = imagen.localFile.childImageSharp.original.height;

  return (
    <StyledInfiniteScroller className="infinite-scroller">
      <StyledInfiniteScrollerImagen
        width={`-${width}px`}
        height={`${height}px`}
        className="imagen"
        style={{
          backgroundRepeat: "repeat-x",
          backgroundImage: `url(${imagen.sourceUrl})`,
          backgroundPositionY: "center",
        }}
      >
        {/* <Img fixed={imagen}></Img> */}
      </StyledInfiniteScrollerImagen>
    </StyledInfiniteScroller>
  );
}
