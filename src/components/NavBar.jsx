import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import assets from "../assets/assets";

export default function Navbar() {
  const navItems = (
    <>
      {" "}
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        PRODUCT
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        SOLUTIONS
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        AGENCIES
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        PRICING
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        RESOURCES
      </Link>
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
    <div
      className={`${
        scrolled ? "w-full bg-transparent flex justify-center" : ""
      }`}
    >
      <nav
        className={`bg-dark fixed w-full z-999 shadow-sm ${
          scrolled
            ? "bg-dark border border-gray-400 rounded-xl shadow-md mt-2 mx-auto  max-w-[80%]"
            : ""
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section */}
            <Link to={"/"} className="flex items-center">
              <img src={assets.logo} className="w-16 h-16 text-2xl" />
              <div className="font-bold text-xl text-green"> BINARYV</div>
            </Link>

            {/* Desktop menu */}
            <nav className={`hidden md:flex space-x-6 text-sm font-medium`}>
              {navItems}
            </nav>

            {/* Right section */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                onClick={() => setIsOpen(false)}
                to={"/"}
                className="border px-4 py-1 rounded-full hover:bg-green text-sm duration-300"
              >
                Demo Account
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to={"/login"}
                className="text-sm px-2 py-1 rounded-full hover:bg-green  hover:border-gray-600 duration-300"
              >
                SIGN IN
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden duration-300">
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
              className="md:hidden px-4 pb-4  space-y-2 text-sm font-medium"
            >
              <div className="flex flex-col gap-2 items-center">{navItems}</div>
              <Link
                onClick={() => setIsOpen(false)}
                className="border block px-4 py-1 text-center rounded-full text-sm w-full mt-2 hover:bg-green duration-300"
              >
                Demo Account
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to={"/"}
                className="block text-sm text-center py-1 hover:bg-green rounded-full"
              >
                SIGN IN
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
