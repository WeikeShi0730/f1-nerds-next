import { useState, useEffect } from "react";
import Image from "next/image";

const BackToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(false);
  let timer = null;
  const handleScroll = () => {
    const position = window.pageYOffset >= window.innerHeight / 6;
    setScrollPosition(position);

    clearTimeout(timer);
    timer = setTimeout(() => {
      setScrollPosition(() => false);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button onClick={handleClick}>
        <div
          className={`relative w-10 h-10 transition-all duration-200 ease-in-out ${
            scrollPosition || "opacity-0"
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
