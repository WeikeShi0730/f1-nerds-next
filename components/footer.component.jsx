import { SiLinkedin, SiGithub, SiTwitter } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";

const Footer = () => {
  return (
    <div className="m-6 mt-12">
      <div className="text-xs md:text-sm text-center">Created by</div>
      <div className="text-xs md:text-sm flex justify-center items-center gap-x-1">
        <a
          href="https://weike-shi.vercel.app/"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ <span className="hover:underline">Weike Shi</span>
        </a>
        <CgWebsite />
      </div>
      <div className="text-xs md:text-sm flex justify-center items-center gap-x-1">
        <a
          href="https://www.linkedin.com/in/weike-shi/"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ <span className="hover:underline">LinkedIn</span>
        </a>
        <SiLinkedin />
      </div>
      <div className="text-xs md:text-sm flex justify-center items-center gap-x-1">
        <a
          href="https://github.com/WeikeShi0730/worldle"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ <span className="hover:underline">Github</span>
        </a>
        <SiGithub />
      </div>
      <div className="text-xs md:text-sm text-center flex justify-center items-center gap-x-1">
        <a
          href="https://twitter.com/vicshi97"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ <span className="hover:underline">Twitter</span>
        </a>
        <SiTwitter />
      </div>
    </div>
  );
};

export default Footer;
