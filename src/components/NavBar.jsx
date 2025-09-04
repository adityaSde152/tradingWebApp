import React from "react";

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0C1522] border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <h1 className="text-[#38D300] text-2xl font-bold">BitBold</h1>
        <nav className="flex items-center space-x-8 text-white">
          <a href="#" className="hover:text-[#38D300]">
            Home
          </a>
          <a href="#" className="hover:text-[#38D300]">
            About
          </a>
          <a href="#" className="hover:text-[#38D300]">
            Features
          </a>
          <a href="#" className="hover:text-[#38D300]">
            Contact
          </a>
          <button className="bg-[#38D300] px-4 py-2 rounded hover:brightness-110">
            Sign Up
          </button>
          <button className="bg-[#38D300] text-[#F5F5F5] px-4 py-2 rounded hover:bg-gray-200">
            Demo Account
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
