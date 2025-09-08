import React from "react";
import DashboardSidebar from "./Dashboard/DashboardSidebar";
import { Outlet } from "react-router-dom";

const MainNavigation = () => {
  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />
        <Outlet />
      </div>
    </>
  );
};

export default MainNavigation;
