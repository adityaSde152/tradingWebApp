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
import Trade from "./pages/Trade";
import Blog from "./pages/Blog";
import AllArticle from "./components/Blogs/AllArticle";
import ArticlePage from "./components/Blogs/ArticlePage";
import Deposit from "./pages/Transaction/Deposit";
import CryptoDeposit from "./pages/Transaction/CryptoDeposit";
import Withdrawl from "./pages/Transaction/Withdrawal";
import Withdrawal from "./pages/Transaction/Withdrawal";

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
        <Route path="/demo-account" element={<Market />} />
        <Route path="/" element={<MainNavigation />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          {/* Blogs Routes */}
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<ArticlePage />} />
          <Route path="blog/all" element={<AllArticle />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardMainNavigation />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Dashboard />} />
          <Route path="markets" element={<Market />} />
          <Route path="trade" element={<Trade />} />
          <Route path="deposit" element={<Deposit/>}/>
          <Route path="withdrawal" element={<Withdrawal/>}/>
          <Route path="/dashboard/deposit/:crypto" element={<CryptoDeposit/>} /> 
          <Route path="*" element={<PageNotFound />} />
          
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
