import { SiLinkedin, SiGithub, SiTwitter } from "react-icons/si";

const Footer = () => {
  return (
    <div className="m-6 mt-12">
      <div className="text-xs md:text-sm text-center">
        Create by
        <a
          className="flex justify-center items-center gap-x-1"
          href="https://www.linkedin.com/in/weike-shi/"
          rel="noopener noreferrer"
          target="_blank"
        >
          @Weike Shi
          <SiLinkedin />
        </a>
      </div>
      <div className="text-xs md:text-sm">
        <a
          className="flex justify-center items-center gap-x-1"
          href="https://github.com/WeikeShi0730/f1-nerds-next"
          rel="noopener noreferrer"
          target="_blank"
        >
          @Github
          <SiGithub />
        </a>
      </div>
      <div className="text-xs md:text-sm">
        <a
          className="flex justify-center items-center gap-x-1"
          href="https://twitter.com/vicshi97"
          rel="noopener noreferrer"
          target="_blank"
        >
          @Twitter
          <SiTwitter />
        </a>
      </div>
    </div>
  );
};

export default Footer;
