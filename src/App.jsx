import React from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import MainNavigation from "./components/MainNavigation";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<MainNavigation />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
