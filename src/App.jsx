import React from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="flex flex-col bg-[#0C1522]">
      <NavBar />
      <main className="mt-15">
        <Home />
        <Register />
      </main>
    </div>
  );
};

export default App;
