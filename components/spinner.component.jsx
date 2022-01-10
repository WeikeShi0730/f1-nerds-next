import React from "react";
import Image from "next/image";

const Spinner = () => {
  const rand = Math.floor(Math.random() * 10);
  let spinner;
  if (rand < 3) {
    spinner = <Image src="/tireRed.png" alt="red tire" layout="fill" />;
  } else if (rand < 6) {
    spinner = <Image src="/tireYellow.png" alt="yellow tire" layout="fill" />;
  } else {
    spinner = <Image src="/tireWhite.png" alt="white tire" layout="fill" />;
  }
  return (
    <div className="absolute z-10 left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <div className="animate-spin h-24 w-24">{spinner}</div>
    </div>
  );
};

export default Spinner;
