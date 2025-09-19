import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Stairs from "./components/Common/Stair.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TradeProvider } from "./context/TradeContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Stairs>
        <AuthProvider>
          <TradeProvider>
            <App />
          </TradeProvider>
        </AuthProvider>
      </Stairs>
    </BrowserRouter>
  </React.StrictMode>
);
