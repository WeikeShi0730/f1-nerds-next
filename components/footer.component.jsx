import Image from "next/image";

const Footer = () => {
  return (
    <div className="m-6 mt-12">
      <div className="text-xs md:text-sm text-center">
        Create by{" "}
        <a
          className="flex justify-center items-center "
          href="https://www.linkedin.com/in/weike-shi/"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ Weike Shi
          <Image
            src="/icons8-linkedin-24.png"
            alt="linkedin"
            width={20}
            height={20}
          />
        </a>
      </div>
      <div className="text-xs md:text-sm">
        <a
          className="flex justify-center items-center "
          href="https://github.com/WeikeShi0730/f1-nerds-next"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ Github
          <Image
            src="/icons8-github-24.png"
            alt="github"
            width={20}
            height={20}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
