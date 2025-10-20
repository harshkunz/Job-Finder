'use client';
import { useEffect } from "react";
import React from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  skills: string[];
  salary?: string;
  posted: string;
  logo?: string;
  source: string;
}

interface JobFinderProps {
  jobs: Job[];
  loading: boolean;
  resumeData?: any;
}

const JobFinder: React.FC<JobFinderProps> = ({ jobs, resumeData }) => {
  
  return (
    <section className="h-[85vh] w-full mx-auto overflow-y-auto bg-white rounded-4xl shadow-lg hide-scrollbar relative">
      <div className="sticky top-0 bg-white z-30 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="text-center flex-1">
          <h2 className="text-3xl sm:text-3xl font-semibold text-gray-800 mb-1">
            Recommended Jobs
          </h2>
          <p className="text-gray-500 sm:text-md">
            Explore curated job opportunities based on your profile.
          </p>
        </div>
      </div>

      <div className="px-8 py-6 flex flex-col space-y-6">
        { jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gradient-to-br from-orange-50 via-white to-orange-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-1 transition-all duration-300 border border-gray-200 flex flex-col md:flex-row justify-between items-start w-full"
            >
              <div className="flex items-center gap-4 flex-1">
                {job.logo && (
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-16 h-16 object-contain rounded-full border border-gray-300"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{job.title}</h3>
                  <p className="text-gray-600 text-sm font-semibold mb-1">{job.source}</p>
                  <p className="text-gray-400 text-sm mb-1">{job.posted}</p>
                  <button className="mt-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold text-sm py-1.5 px-5 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:items-end mt-4 md:mt-0 gap-2">
                <p className="text-gray-500 text-sm">{job.location} | {job.type}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData?.skills?.slice(0, 3).map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {job.salary && (
                  <p className="text-green-600 font-semibold mt-2">{job.salary}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default JobFinder;
