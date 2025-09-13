import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import MainNavigation from "./components/MainNavigation";
import DashboardMainNavigation from "./components/Dashboard/DashboardMainNavigation";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Market from "./pages/Market";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: { fontSize: "14px" },
        }}
      />
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
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
