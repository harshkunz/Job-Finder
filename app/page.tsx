'use client';
import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import Features from "./components/Features";
import Footer from './components/Footer';
import ResumeAnalysis from './components/JobDescription';
import JobFinder from './components/JobFinder';
import { IoCloseCircleOutline } from "react-icons/io5";

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
              absolute 
              bottom-3 right-center
              text-white 
              bg-black/50 
              hover:bg-orange-500 
              p-1 
              rounded-full 
              z-50 
              transition 
              duration-200 
              shadow-lg
              flex items-center justify-center
            "
          >
            <IoCloseCircleOutline size={32} />
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
