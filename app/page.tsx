'use client';
import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import Features from "./components/Features";
import Footer from './components/Footer';
import ResumeAnalysis from './components/JobDescription';
import JobFinder from './components/JobFinder';
import { IoClose } from "react-icons/io5";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [resumeData, setResumeData] = useState<any>(null);
  const [resumeFileName, setResumeFileName] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [showJobs, setShowJobs] = useState(false);

  const handleFindJobs = (fetchedJobs: any[]) => {
    setJobs(fetchedJobs);
    setShowJobs(true);
    setLoading(false);
  };

  const handleStartLoading = () => setLoading(true);

  const handleCloseJobs = () => {
    setShowJobs(false);
    setJobs([]);
  };

  return (
    <main className="relative">
      <ResumeUpload
        onStartLoading={handleStartLoading}
        onStopLoading={() => setLoading(false)}
        onAnalysis={(data) => setResumeData(data)}
        onFileNameChange={(name) => setResumeFileName(name)}
      />

      <ResumeAnalysis
        resumeData={resumeData}
        fileName={resumeFileName}
        onFindJobs={(fetchedJobs) => {
          handleFindJobs(fetchedJobs);
        }}
        onStartLoading={handleStartLoading}
      />
      <Features />
      <Footer />

      {/* Show loading overlay globally */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="w-24 h-24 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {showJobs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <button
            onClick={handleCloseJobs}
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

          <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-4xl shadow-2xl overflow-hidden">
            <JobFinder jobs={jobs} loading={loading} />
          </div>
        </div>
      )}
    </main>
  );
}
