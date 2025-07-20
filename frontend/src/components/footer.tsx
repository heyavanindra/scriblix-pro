import {
  IconBrand4chan,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <div className="relative w-full bg-main overflow-hidden">
      {/* Background Image */}
      <img
        src="/arc-footer.svg"
        alt=""
        className="w-full max-w-[1950px] mx-auto"
      />

      {/* Centered Content */}
      <div className="absolute inset-1 flex flex-col items-center justify-center max-lg:justify-end px-4 lg:py-8 max-md:gap-y-1 md:gap-y-6">
        <h2 className="text-white font-semibold text-sm sm:text-2xl md:text-4xl text-center">
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
    </div>
  );
};

export default Footer;
