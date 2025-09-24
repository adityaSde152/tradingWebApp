import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
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
// import AboutUs from "./pages/AboutUs";
// import Resources from "./pages/Resources";
// import DownloadApp from "./pages/DownloadApp";
// import FaqSection from "./components/Home/FaqSection";
// import Guides from "./components/Resources/Guides";
// import Insights from "./components/Resources/Insights";
// import Videos from "./components/Resources/Videos";
import Deposit from "./pages/Transaction/Deposit";
import CryptoDeposit from "./pages/Transaction/CryptoDeposit";
import Withdrawl from "./pages/Transaction/Withdrawal";
import Withdrawal from "./pages/Transaction/Withdrawal";
import CryptoWithdrawal from "./pages/Transaction/CryptoWithdrawal";

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
      <Routes>
        <Route path="/demo-account" element={<Market />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainNavigation />}>
          <Route index element={<Home />} />
          {/* <Route path="about-us" element={<AboutUs />} /> */}
          {/* <Route path="download" element={<DownloadApp />} /> */}

          {/* Resources Routes */}
          {/* <Route path="resources" element={<Resources />} />
          <Route path="resources/guides" element={<Guides />} />
          <Route path="resources/faqs" element={<FaqSection />} />
          <Route path="resources/insights" element={<Insights />} />
          <Route path="resources/videos" element={<Videos />} /> */}


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
          <Route path="/dashboard/withdrawal/:crypto" element={<CryptoWithdrawal/>} /> 
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
