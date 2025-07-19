import { useState } from "react";
import cn from "../utils/cn";
import {   IconX } from "@tabler/icons-react";

type NavbarProps = {
  className?: string;
};

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = ({ className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={cn(
        "fixed w-full bg-main px-4 md:px-12 py-4 flex items-center justify-between z-50",
        className
      )}
    >
      {/* Left: Hamburger */}
      <div className="z-50">
        <img src="/hamburger.svg" 
          className="cursor-pointer text-black w-5 h-5"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Center: Blog Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-primary-text text-2xl md:text-4xl font-bold font-body">
          Blog
        </h1>
      </div>

      {/* Right: Search + Subscribe */}
      <div className="flex gap-x-5 z-50">
        <button className="bg-accent px-4 font-bold font-body rounded-full">
          Subscribe
        </button>
        <img src='/search.svg' className="w-5 h-5" alt="" />
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-main flex flex-col items-center justify-center gap-6 text-primary-text text-xl z-60 ${
          isOpen ? "translate-x-0" : "-translate-x-[100%]"
        } transition-all duration-300 ease-linear`}
      >
        <div className="fixed top-4 left-4 p-5">
          <IconX
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
          />
        </div>
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="hover:underline"
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
