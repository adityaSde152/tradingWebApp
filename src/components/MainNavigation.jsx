import { Outlet } from "react-router-dom";
import Navbar from "./Home/NavBar";

const MainNavigation = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainNavigation;
