import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const MainNavigation = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainNavigation;
