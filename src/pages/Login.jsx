import React, { useState } from "react";
import assets from "../assets/assets";
import { FcGoogle } from "react-icons/fc";
import { BiDollarCircle, BiWorld } from "react-icons/bi";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Dropdown from "../components/Home/Dropdown";
import countryCurrencyData from "../assets/countryCurrencyData";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser, registerUser, verifyOtp } from "../services/authServices";

const Login = () => {
  const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const countryOptions = countryCurrencyData.map((c) => c.country);
  const currencyOptions = countryCurrencyData.map((c) => c.currency);

  const initialFormData = {
    country: "",
    currency: "",
    name: "",
    email: "",
    password: "",
    referral: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Register User
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await registerUser(formData);
      console.log(res);
      setIsOtpSent(true);
      setUser(res.user);
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Login User
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await loginUser(formData);
      toast.success(res?.message);
      console.log(res);
      setUser(res?.user);
      navigate("/dashboard/profile");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP Function
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await verifyOtp({ email: user.email, otp });
      toast.success(response?.message);
      setIsOtpSent(false);
      navigate("/dashboard/profile");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row relative bg-gradient-to-r from-[#0a0f14] via-transparent to-[#0a0f14]">
      {/* Left Side - Image */}

      <div className="relative md:w-1/2 hidden w-full h-full md:flex justify-start items-start  bg-dark overflow-hidden">
        <img
          src={assets.login_hero_img}
          alt="Trading Illustration"
          className="w-full h-full object-contain mt-24"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f14] via-transparent to-[#0a0f14]" />
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 relative h-full w-full flex items-center justify-center px-6 py-4 bg-[#090e14] text-white">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Welcome to Our Platform
          </h2>

          {/* Switch Buttons b/w Register/Login */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => {
                setIsLogin(false);
                setFormData(initialFormData);
              }}
              className={`px-6 py-2 ${
                isLogin ? "bg-gray-800" : "bg-green-600"
              } text-white rounded-l-lg cursor-pointer`}
            >
              Register
            </button>
            <button
              onClick={() => {
                setIsLogin(true);
                setFormData(initialFormData);
                setIsOtpSent(false);
              }}
              className={`px-6 py-2 ${
                isLogin ? "bg-green-600" : "bg-gray-800"
              } rounded-r-lg cursor-pointer`}
            >
              Login
            </button>
          </div>

          {/* Form  */}
          <form
            onSubmit={isLogin ? handleLogin : handleRegister}
            className={`${!isLogin ? "space-y-3" : "space-y-8"}`}
          >
            {/* Country Input */}
            {!isLogin && (
              <Dropdown
                name="country"
                label="Country"
                icon={BiWorld}
                options={countryOptions}
                value={formData.country}
                onChange={(country) => {
                  const match = countryCurrencyData.find(
                    (c) => c.country === country
                  );
                  setFormData((prev) => ({
                    ...prev,
                    country,
                    currency: match ? match.currency : "",
                  }));
                }}
              />
            )}

            {/* Currency Input */}
            {!isLogin && (
              <Dropdown
                name="currency"
                label="Currency"
                icon={BiDollarCircle}
                options={currencyOptions}
                value={formData.currency}
                onChange={(currency) =>
                  setFormData((prev) => ({ ...prev, currency }))
                }
              />
            )}

            {/* Fullname Input */}
            {!isLogin && (
              <div className="relative w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                  autoComplete="name"
                  required
                  placeholder=" "
                  className="peer w-full px-4 pl-8 pt-4 pb-2 rounded-lg border border-gray-700 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <MdOutlineMail className="absolute top-4 text-gray-500 left-1 text-xl" />
                <label
                  htmlFor="name"
                  className="peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 absolute left-8 top-2.5 text-gray-400  transition-all
                          peer-placeholder-shown:top-3.5  peer-placeholder-shown:text-gray-500
                          peer-focus:-top-3 bg-black peer-focus:text-green-500"
                >
                  Full Name
                </label>
              </div>
            )}

            {/* Email Input */}
            <div className="relative w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                autoComplete="email"
                required
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

            {/* Password Input */}
            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleOnChange}
                autoComplete="current-password"
                required
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

            {/* Referral Input */}
            {!isLogin && ( // Referral
              <div className="relative w-full">
                <input
                  name="referral"
                  type="text"
                  id="referral"
                  value={formData.referral}
                  onChange={handleOnChange}
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
            {!isLogin && (
              <label className="flex items-start text-sm">
                <input
                  type="checkbox"
                  required
                  className="mt-1 mr-2 cursor-pointer"
                />
                <span>
                  I confirm that I am 18 years old or older and accept{" "}
                  <span className="text-green-500">service agreement</span>
                </span>
              </label>
            )}

            {/* OTP input Box */}
            {isOtpSent && (
              <div className="relative w-full">
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="peer w-full px-4 pl-8 pt-4 pb-2 rounded-lg border border-gray-700 text-white 
                 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="otp"
                  className="absolute left-8 top-2.5 text-gray-400 transition-all
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500
                peer-focus:-top-3 bg-black peer-focus:text-green-500"
                >
                  Enter OTP
                </label>
              </div>
            )}

            {/* Register/Login/Verify-OTP Button */}
            {!isOtpSent ? (
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-white font-semibold cursor-pointer"
              >
                {isLoading
                  ? "Processing..."
                  : isLogin
                  ? "Login →"
                  : "Register →"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-white font-semibold cursor-pointer"
              >
                {isLoading ? "Processing..." : "Verify OTP →"}
              </button>
            )}
          </form>

          {/* Divider */}
          {/* <div className="flex items-center mb-6 mt-2">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-3 text-gray-400 text-sm">Sign in via</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div> */}

          {/* Google Login */}
          {/* <button className="w-full flex items-center justify-center rounded-lg">
            <FcGoogle className="text-4xl cursor-pointer" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
