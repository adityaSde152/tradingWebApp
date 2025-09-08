import React, { useState } from "react";
import assets from "../assets/assets";
import { FcGoogle } from "react-icons/fc";
import { BiDollarCircle, BiWorld } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Dropdown from "../components/Dropdown";
import countryCurrencyData from "../assets/countryCurrencyData";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const countryOptions = countryCurrencyData.map((c) => c.country);
  const currencyOptions = countryCurrencyData.map((c) => c.currency);

  // Country selection on change
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    const match = countryCurrencyData.find((c) => c.country === country);
    setSelectedCurrency(match ? match.currency : "");
  };

  // Currency change (manual selection allowed)
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };
  return (
    <div className="h-screen flex flex-col md:flex-row relative">
      {/* Left Side - Image */}

      <div className="relative md:w-1/2 hidden w-full h-full md:flex justify-start items-start bg-[#0a0f14] overflow-hidden">
        <img
          src={assets.login_hero_img}
          alt="Trading Illustration"
          className="w-full h-full object-contain mt-6"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f14] via-transparent to-[#0a0f14]" />
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-6 py-4 bg-black text-white">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Welcome to Trading Platform
          </h2>

          {/* Tabs */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 ${
                isLogin ? "bg-gray-800" : "bg-green-600"
              } text-white rounded-l-lg cursor-pointer`}
            >
              Register
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 ${
                isLogin ? "bg-green-600" : "bg-gray-800"
              } rounded-r-lg cursor-pointer`}
            >
              Login
            </button>
          </div>

          {/* Form  */}
          <form className={`${!isLogin ? "space-y-4" : "space-y-8"}`}>
            {!isLogin && (
              // Country
              <Dropdown
                label="Country"
                icon={BiWorld}
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountryChange}
              />
            )}

            {!isLogin && (
              // Currency
              <Dropdown
                label="Currency"
                icon={BiDollarCircle}
                options={currencyOptions}
                value={selectedCurrency}
                onChange={handleCurrencyChange}
              />
            )}

            {/* Email */}
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder=" "
                className="peer w-full px-4 pl-8 pt-4 pb-2 rounded-lg border border-gray-700 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <MdOutlineMail className="absolute top-4 text-gray-500 left-1 text-xl" />
              <label
                htmlFor="email"
                className="peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 absolute left-8 top-2.5 text-gray-400  transition-all
                          peer-placeholder-shown:top-3.5  peer-placeholder-shown:text-gray-500
                          peer-focus:-top-3 bg-black peer-focus:text-green-500"
              >
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                placeholder=" "
                className="peer w-full px-4 pl-8 pt-4 pb-2 rounded-lg  border border-gray-700 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {/* Hide and Show Password */}
              {showPassword ? (
                <IoMdEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-4 text-gray-500 right-8 text-xl cursor-pointer"
                />
              ) : (
                <IoMdEyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-4 text-gray-500 right-8 text-xl cursor-pointer"
                />
              )}
              <MdOutlineLock className="absolute top-4 text-gray-500 left-1 text-xl" />

              <label
                htmlFor="password"
                className="peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 absolute left-8 top-2.5 text-gray-400  transition-all
                          peer-placeholder-shown:top-3.5  peer-placeholder-shown:text-gray-500
                          peer-focus:-top-3 bg-black peer-focus:text-green-500"
              >
                Password
              </label>
            </div>

            {!isLogin && ( // Referral
              <div className="relative w-full">
                <input
                  type="text"
                  id="referral"
                  placeholder=" "
                  className="peer w-full px-4 pl-8 pt-4 pb-2 rounded-lg border border-gray-700 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <FaLink className="absolute top-4 text-gray-500 left-1 text-xl" />
                <label
                  htmlFor="referral"
                  className="peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 absolute left-8 top-2.5 text-gray-400  transition-all
                          peer-placeholder-shown:top-3.5  peer-placeholder-shown:text-gray-500
                          peer-focus:-top-3 bg-black peer-focus:text-green-500"
                >
                  Referral (Optional)
                </label>
              </div>
            )}

            {/* Checkbox */}
            <label className="flex items-start text-sm">
              <input type="checkbox" className="mt-1 mr-2 cursor-pointer" />
              <span>
                I confirm that I am 18 years old or older and accept{" "}
                <span className="text-green-500">service agreement</span>
              </span>
            </label>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-white font-semibold cursor-pointer"
            >
              {isLogin ? "Login →" : "Register →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center mb-6 mt-2">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-3 text-gray-400 text-sm">Sign in via</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center rounded-lg">
            <FcGoogle className="text-4xl cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
