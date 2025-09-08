import React from "react";
import NavBar from "./components/Home/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Router, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";

const App = () => {
  return (
    <>
      <NavBar />
      <ChatBot/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
