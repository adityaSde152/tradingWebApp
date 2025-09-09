import { Outlet } from "react-router-dom";
import Navbar from "../components/Home/NavBar";

const MainNavigation = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainNavigation;
