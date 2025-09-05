import React from "react";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#0C1522] border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <h1 className="text-[#38D300] text-2xl font-bold">BitBold</h1>
          <nav className="flex items-center space-x-8 text-white">
            <Link to={"/"} className="hover:text-[#38D300]">
              Home
            </Link>
            <Link to={"/"} className="hover:text-[#38D300]">
              About
            </Link>
            <Link to={"/"} className="hover:text-[#38D300]">
              Features
            </Link>
            <Link to={"/"} className="hover:text-[#38D300]">
              Contact
            </Link>
            <Link
              to={"/login"}
              className="bg-[#38D300] px-4 py-2 rounded hover:brightness-110 duration-300"
            >
              Sign Up
            </Link>
            <button className="bg-[#38D300] text-[#F5F5F5] px-4 py-2 rounded hover:brightness-110 cursor-pointer duration-300">
              Demo Account
            </button>
          </nav>
        </div>
      </header>
      <main className="mt-15">
        <Outlet />
      </main>
    </>
  );
};

export default NavBar;
