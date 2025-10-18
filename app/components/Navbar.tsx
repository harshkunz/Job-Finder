"use client";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-5 bg-white shadow-sm border-b border-gray-300">
      {/* Left: Website Name */}
      <h1 className="text-xl font-bold text-gray-800 cursor-pointer">
        JobFinder
      </h1>

      {/* Right: GitHub Icon */}
      <a
        href="https://github.com/harshkunz/Job-Finder"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-black transition-transform transform hover:scale-110"
      >
        <FaGithub size={28} />
      </a>
    </nav>
  );
};

export default Navbar;
