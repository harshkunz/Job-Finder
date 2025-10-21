'use client';
import React, { useRef, useState } from "react";

interface ResumeUploadProps {
  onAnalysis?: (data: any) => void;
  onStartLoading?: () => void;
  onStopLoading?: () => void;
  onFileNameChange?: (name: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onAnalysis, onStartLoading, onStopLoading, onFileNameChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<any>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    if (onFileNameChange) onFileNameChange(file.name);
    if (onStartLoading) onStartLoading();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      setResult(data.data);
      if (onAnalysis) onAnalysis(data.data);

    } catch (err) {
      alert("Failed to upload or analyze resume.");
    } finally {
      if (onStopLoading) onStopLoading();
    }
  };

  const handleGo = () => {
    const el = document.getElementById('job-analysis');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-15 px-6">
      {/* Intro Title and Description */}
      <div className="text-center mb-11 pt-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Unlock Your Next Career Move
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Our AI analyzes your skills, experience, and career trajectory to deliver highly relevant job opportunities.
          <br />
          Access curated roles on LinkedIn, Foundit, and Naukri to advance your career strategically
        </p>
      </div>

      {/* Upload Resume Section */}
      <div className="bg-white rounded-2xl mb-10 shadow-md px-16 py-12 text-center border border-gray-300 hover:shadow-xl hover:translate-y-1 transition-all duration-300">
        <h2 className="text-3xl sm:text-3xl font-semibold text-gray-800">
          Upload Your Resume
        </h2>
        <p className="text-gray-500 mt-2 mb-11 text-sm sm:text-base">
          Click to Choose Your File
        </p>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-around items-start mt-12 gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <h3 className="text-6xl sm:text-7xl font-bold text-gray-300">1</h3>
            <p className="font-semibold mt-3 text-gray-700 text-lg">Upload Resume</p>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Upload your resume in PDF format. max_size (50 mb)
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <h3 className="text-6xl sm:text-7xl font-bold text-gray-300">2</h3>
            <p className="font-semibold mt-3 text-gray-700 text-lg">AI Resume Analysis</p>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              AI creates a personalized resume summary.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <h3 className="text-6xl sm:text-7xl font-bold text-gray-300">3</h3>
            <p className="font-semibold mt-3 text-gray-700 text-lg">Click Job Profile</p>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Go to the job portal and apply for this job.
            </p>
          </div>
        </div>

        {/* Upload Button */}
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <button
          className={`mt-11 sm:mt-15 font-semibold py-3 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 
            ${result
              ? "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-green-500 hover:to-green-700 text-white"
              : "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white"
            }`}
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.value = ""; 
              fileInputRef.current.click();
            }
          }}
        >
          {result ? "ReUpload" : "Upload"}
        </button>

        {result && (
          <button
            className="mt-12 sm:mt-16 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={handleGo}
          >
            GoData
          </button>
        )}

        {result && (
          <p className="mt-4 text-gray-600 text-sm italic text-center">
            Uploaded file:&nbsp;
            <span className="font-semibold text-gray-800">{fileName}</span>
          </p>
        )}

      </div>
    </div>
  );
};

export default ResumeUpload;
