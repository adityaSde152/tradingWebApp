import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import MainNavigation from "./components/MainNavigation";
import DashboardMainNavigation from "./components/Dashboard/DashboardMainNavigation";
import Login from "./pages/Login";
import Market from "./pages/Market";

const App = () => {
  return (
    <>
      <ChatBot />
      <Routes>
        <Route path="/" element={<MainNavigation />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardMainNavigation />}>
          <Route index element={<Dashboard />} />
<<<<<<< HEAD
          <Route path="markets" element={<Market/>} />
=======
          <Route path="profile" element={<Dashboard />} />
>>>>>>> f7db05aac56291d0bcea907cb3b6c7d6890ae1d1
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
