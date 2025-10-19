'use client';
import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import Features from "./components/Features";
import Footer from './components/Footer';
import ResumeAnalysis from './components/JobDescription';
import JobFinder from './components/JobFinder';
import { IoClose } from "react-icons/io5";

export default function Home() {
  const [showJobs, setShowJobs] = useState(false);

  const handleFindJobs = () => {
    setShowJobs(true);
  };

  return (
    <main className="relative">
      <ResumeUpload />
      <ResumeAnalysis onFindJobs={handleFindJobs} />
      <Features />
      <Footer />

      {/* JobFinder Popup */}
      {showJobs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          {/* Close button inside overlay */}
          <button
            onClick={() => setShowJobs(false)}
            className="
              absolute bottom-2.5 right-center
              flex items-center gap-2
              px-4 py-2
              bg-black/60 text-white
              rounded-full
              hover:shadow-[0_0_20px_4px_white]
              hover:bg-white hover:text-black
              transition duration-300
            "
          >
            <IoClose size={22} />
            Close
          </button>

          {/* Popup Box taking full JobFinder control */}
          <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-4xl shadow-2xl overflow-hidden">
            <JobFinder onClose={() => setShowJobs(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
