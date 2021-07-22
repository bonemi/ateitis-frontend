import scrollTo from "gatsby-plugin-smoothscroll";
import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 700) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 700) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  return (
    <FaArrowCircleUp
      className="scrollTop"
      onClick={() => scrollTo("#___gatsby")}
      style={{ height: 40, color: "antiquewhite", display: showScroll ? "flex" : "none" }}
    />
  );
};

export default ScrollArrow;
