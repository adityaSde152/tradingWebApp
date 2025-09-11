import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import assets from "../../assets/assets";

export default function Navbar() {
  const navItems = (
    <>
      {" "}
      <NavLink
        onClick={() => setIsOpen(false)}
        to={"/"}
        className={({ isActive }) => `${isActive && "text-green"}`}
      >
        Home
      </NavLink>
      <NavLink
        onClick={() => setIsOpen(false)}
        to={"/about-us"}
        className={({ isActive }) => `${isActive && "text-green"}`}
      >
        About us
      </NavLink>
      <NavLink
        onClick={() => setIsOpen(false)}
        to={"/blog"}
        className={({ isActive }) => `${isActive && "text-green"}`}
      >
        Blog
      </NavLink>
      <NavLink
        onClick={() => setIsOpen(false)}
        to={"/resources"}
        className={({ isActive }) => `${isActive && "text-green"}`}
      >
        RESOURCES
      </NavLink>
      <NavLink
        onClick={() => setIsOpen(false)}
        to={"/download"}
        className={({ isActive }) => `${isActive && "text-green"}`}
      >
        Download App
      </NavLink>
    </>
  );

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-99 overflow-x-hidden">
      <nav
        className={`bg-dark shadow-sm transition-all duration-300 mx-auto ${
          scrolled
            ? "bg-dark border border-gray-400 rounded-xl shadow-md mt-2 max-w-[90%] sm:max-w-[85%] md:max-w-[80%] duration-300"
            : "w-full"
        } text-white`}
      >
        <div className="px-4 lg:px-20">
          <div className="flex justify-between items-center h-16">
            {/* Left section */}
            <Link to={"/"} className="flex items-center space-x-2">
              <img src={assets.logo} className="w-12 h-12 sm:w-14 sm:h-14" />
              <div className="font-bold text-lg sm:text-xl text-green">
                BINARYV
              </div>
            </Link>

            {/* Desktop menu */}
            <nav
              className={`hidden lg:flex space-x-6 text-xs xl:text-sm font-medium uppercase`}
            >
              {navItems}
            </nav>

            {/* Right section */}
            <div className="hidden lg:flex items-center space-x-4">
              <NavLink
                onClick={() => setIsOpen(false)}
                to={"/demo-account"}
                className={({ isActive }) =>
                  `${
                    isActive && "text-green"
                  } border px-2 text-xs lg:px-4 py-1 rounded-full hover:bg-green  duration-300`
                }
              >
                Demo Account
              </NavLink>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={"/login"}
                className={({ isActive }) =>
                  `${
                    isActive && "text-green"
                  } text-sm px-2 py-1 rounded-full hover:bg-green  hover:border-gray-600 duration-300`
                }
              >
                Sign In
              </NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden duration-300">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <X size={24} className="cursor-pointer" />
                ) : (
                  <Menu size={24} className="cursor-pointer" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:hidden px-4 pb-4  space-y-2 text-sm font-medium"
            >
              <nav className="flex flex-col gap-2 items-center ">
                {navItems}
              </nav>
              <Link
                to={"/demo-account"}
                onClick={() => setIsOpen(false)}
                className="border block px-4 py-1 text-center rounded-full text-sm w-full mt-2  hover:bg-green duration-300"
              >
                Demo Account
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to={"/login"}
                className="block text-sm text-center py-1 hover:bg-green rounded-full"
              >
                Sign In
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
