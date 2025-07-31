import { useContext, useState } from "react";
import cn from "../utils/cn";
import { IconDashboard, IconHome, IconMessage, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authContext/context";
import Cookies from "js-cookie";
type NavbarProps = {
  className?: string;
};

const navItems = [
  { name: "Home", href: "/", icon :<IconHome></IconHome> },
  { name: "DashBoard", href: "/dashboard",icon:<IconDashboard></IconDashboard> },
  { name: "Contact", href: "/contact", icon:<IconMessage></IconMessage>},
];

const Navbar = ({ className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { authToken, currentUser ,setAuthToken,setUser } = useContext(AuthContext);
const handleLogout = () => {
  Cookies.remove("token")
  setAuthToken?.(null)
  setUser?.(null)
  
}
  return (
    <nav
      className={cn(
        "fixed w-full bg-main/30 backdrop-blur-lg px-4 md:px-12 py-4 flex items-center justify-between z-50",
        className
      )}
    >
      {/* Left: Hamburger */}
      <div className="z-50">
        <img
          src="/hamburger.svg"
          className="cursor-pointer text-black w-10 h-10"
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
      <div className="flex items-center gap-x-5 z-50">
        <div>
          {authToken ? (
            <div className="text-center ">
              Welcome <strong>{currentUser?.username}</strong>
            </div>
          ) : (
            ""
          )}
        </div>
        {authToken ? (
          <button className="bg-accent my-auto cursor-pointer max-lg:hidden px-4 font-bold font-body rounded-full text-primary-text"
          onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link
            to={"/login"}
            className="bg-accent my-auto cursor-pointer max-lg:hidden px-4 font-bold font-body rounded-full text-primary-text"
          >
            Login
          </Link>
        )}
        <img src="/search.svg" className="w-10 h-10" alt="" />
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-main flex flex-col h-screen items-center justify-center gap-6 text-primary-text text-xl z-60 ${
          isOpen ? "translate-x-0" : "-translate-x-[100%]"
        } transition-all duration-300 ease-linear`}
      >
        <div className="fixed top-4 left-4 p-5">
          <IconX onClick={() => setIsOpen(false)} className="cursor-pointer" />
        </div>
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="hover:scale-103 transition-all duration-300 flex gap-x-2"
          >
          {item.icon}  {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
