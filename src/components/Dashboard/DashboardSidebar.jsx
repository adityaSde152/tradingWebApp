import React, { useState } from "react";
import {
  FaHome,
  FaChartLine,
  FaExchangeAlt,
  FaWallet,
  FaHistory,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const sidebarItems = [
  { name: "Dashboard", icon: <FaHome />, link: "/dashboard" },
  { name: "Markets", icon: <FaChartLine />, link: "/markets" },
  { name: "Trade", icon: <FaExchangeAlt />, link: "/trade" },
  { name: "Portfolio", icon: <FaWallet />, link: "/portfolio" },
  { name: "Transactions", icon: <FaHistory />, link: "/transactions" },
  { name: "Referral Program", icon: <FaUsers />, link: "/referral" },
  { name: "Settings", icon: <FaCog />, link: "/settings" },
  { name: "Support", icon: <FaUser />, link: "/support" },
  { name: "Logout", icon: <FaSignOutAlt />, link: "/logout" },
];

const DashboardSidebar = () => {
  return (
    <aside className=" w-20 group hover:w-64 lg:w-64 h-screen bg-gray-800 text-white flex flex-col p-6 duration-300">
      <div className="flex gap-2 items-center mb-8">
        <p className="bg-green p-2 lg:w-12 lg:h-12 lg:pt-2.5 lg:pl-3 text-xl text-dark font-semibold rounded-full">
          BB
        </p>
        <h2 className="text-2xl hidden lg:block group-hover:inline font-bold text-green">
          {" "}
          BitBold
        </h2>
      </div>
      <nav className="flex flex-col gap-4 flex-1">
        {sidebarItems.map((item, index) => (
          <>
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                `flex relative  items-center gap-3 pr-10 py-2 rounded-r-lg ${
                  isActive ? "bg-gray-800" : "bg-transparent"
                } hover:bg-gray-700 transition duration-200`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute w-1 h-[80%] bg-green rounded-r-md"></span>
                  )}
                  <span
                    className={`text-2xl ml-2 ${isActive ? "text-green" : ""}`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm hidden lg:block group-hover:inline font-medium">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          </>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
