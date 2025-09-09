import React from "react";
import NavBar from "./components/Home/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Router, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import MainNavigation from "./components/MainNavigation";
import DashboardMainNavigation from "./components/Dashboard/DashboardMainNavigation";

const App = () => {
  return (
    <>
      <NavBar />
      <ChatBot/>
      <Routes>
        <Route path="/" element={<MainNavigation />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardMainNavigation />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
