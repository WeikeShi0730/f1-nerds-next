import Image from "next/image";

const Spinner = () => {
  const rand = Math.floor(Math.random() * 10);
  let spinner;
  if (rand < 3) {
    spinner = <Image priority src="/tireRed.png" alt="red tire" layout="fill" />;
  } else if (rand < 6) {
    spinner = <Image priority src="/tireYellow.png" alt="yellow tire" layout="fill" />;
  } else {
    spinner = <Image priority src="/tireWhite.png" alt="white tire" layout="fill" />;
  }
  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <div className="relative animate-spin h-24 w-24">{spinner}</div>
    </div>
  );
};

export default Spinner;
