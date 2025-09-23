import { Outlet } from "react-router-dom";
import Navbar from "./Home/NavBar";
import Footer from "./Home/Footer";

const MainNavigation = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainNavigation;
