import {
  IconBrand4chan,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-main overflow-hidden lg:h-70">
      {/* Background Image */}
      <img
        src="/footer.svg"
        alt=""
        className="w-full max-w-[1950px] mx-auto"
      />

      {/* Centered Content */}
      <div className="absolute max-lg:top-1/2 lg:top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-y-4">
        <h2 className="text-white font-semibold text-lg sm:text-2xl md:text-4xl text-center">
          @Blog by Pepe Yz
        </h2>
        <div className="flex gap-x-4 text-white ">
          <IconBrandX className="w-3 h-3" />
          <IconBrandLinkedin className="w-3 h-3" />
          <IconBrand4chan className="w-3 h-3" />
          <IconBrandInstagram className="w-3 h-3" />
          <IconBrandGithub className="w-3 h-3" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
