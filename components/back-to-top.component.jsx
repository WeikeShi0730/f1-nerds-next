import React, { useState, useEffect } from "react";
import Image from "next/image";

const BackToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(false);
  const handleScroll = () => {
    const position = window.pageYOffset >= window.innerHeight / 4;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 ">
      <button onClick={handleClick}>
        <div
          className={`relative w-10 h-10 animate-bounce ${
            scrollPosition ? "" : "hidden"
          }`}
        >
          <Image
            src="/back-to-top.png"
            alt="back to top button"
            layout="fill"
          />
        </div>
      </button>
    </div>
  );
};

export default BackToTop;
