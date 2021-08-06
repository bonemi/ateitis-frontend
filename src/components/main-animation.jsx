import React from "react";
import Animated from "../images/animation.svg";

import styled from "styled-components";

const StyledMainAnimation = styled.div`
  /* width: 80%; */
  /* height: 80%; */
  /* display: flex; */
  /* align-items: end; */
  /* margin: auto; */
  /* margin-top: 11em; */
`;

function MainAnimation() {
  return (
    // <StyledMainAnimation>
    <object type="image/svg+xml" data={Animated} className="svg" alt="Intro main page welcome">
      svg-animation
    </object>
    // </StyledMainAnimation>
  );
}
export default MainAnimation;
