import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";

const DashboardMainNavigation = () => {
  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardMainNavigation;
