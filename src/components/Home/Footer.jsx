import React from "react";

const Footer = () => {
  return (
    <footer style={{ background: "linear-gradient(165deg, black 40%, #38D300 100%, #38D300 5%)" }} className="   w-full flex flex-col justify-end items-center pt-10 h-[90vh]  text-gray-300 py-8 px-6">
      <div className="w-[80vw]   mx-auto flex  justify-between gap-8">

        {/* Useful Links */}
        <div>
          <h3 className="text-white  font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">About</a></li>
            <li><a href="#" className="hover:text-blue-400">Features</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect with Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
            <li><a href="#" className="hover:text-blue-400">LinkedIn</a></li>
            <li><a href="#" className="hover:text-blue-400">Instagram</a></li>
            <li><a href="#" className="hover:text-blue-400">Facebook</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Terms</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
            <li><a href="#" className="hover:text-blue-400">Cookies</a></li>
            <li><a href="#" className="hover:text-blue-400">Sitemap</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Terms</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
            <li><a href="#" className="hover:text-blue-400">Cookies</a></li>
            <li><a href="#" className="hover:text-blue-400">Sitemap</a></li>
          </ul>
        </div>

      </div>
      <div className="mt-8 border-t  border-gray-700 w-[80vw]   pt-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0  flex flex-col gap-5">
            <div>
            <span>Never miss an update</span>
            <p>Get all the latest update of real time market price and trading tips</p>
            </div>
           
             {/* Copyright */}
        <div className="text-gray-400 my-4">
          <p className="text-sm">
            &copy; 2025 Priyanshu Rautela,<br /> All rights reserved.
          </p>
        </div>
        </div>
        <div className="flex flex-col gap-4">
          <span><input className="border border-gray-300 rounded-md p-2"  type="text" /> <button className="bg-[#F5F5F5] text-black rounded-md p-2">Join</button></span>
          <span><input className="border rounded-md "  type="checkbox" /> <span>I agree to the terms and conditions</span> </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
