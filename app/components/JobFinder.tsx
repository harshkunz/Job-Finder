'use client';
import React, { useEffect, useState } from 'react';
import { FaReact } from 'react-icons/fa';

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
}

interface JobFinderProps {
  onClose: () => void;
}

const JobFinder: React.FC<JobFinderProps> = ({ onClose }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data: Job[] = [
          { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Bangalore', type: 'Full-time', skills: ['React', 'TypeScript', 'TailwindCSS'], salary: '₹6,00,000 - ₹8,00,000', posted: '1 day ago', logo: 'https://via.placeholder.com/64' },
          { id: 2, title: 'AI Engineer', company: 'OpenAI', location: 'San Francisco', type: 'Full-time', skills: ['Python', 'Machine Learning', 'PyTorch'], salary: '₹15,00,000 - ₹25,00,000', posted: '2 days ago', logo: 'https://via.placeholder.com/64' },
          { id: 3, title: 'Backend Developer', company: 'DevSolutions', location: 'Mumbai', type: 'Full-time', skills: ['Node.js', 'Express', 'MongoDB'], salary: '₹7,00,000 - ₹9,00,000', posted: '3 days ago', logo: 'https://via.placeholder.com/64' },
          { id: 4, title: 'Backend Developer', company: 'DevSolutions', location: 'Mumbai', type: 'Full-time', skills: ['Node.js', 'Express', 'MongoDB'], salary: '₹7,00,000 - ₹9,00,000', posted: '3 days ago', logo: 'https://via.placeholder.com/64' },
          { id: 5, title: 'Backend Developer', company: 'DevSolutions', location: 'Mumbai', type: 'Full-time', skills: ['Node.js', 'Express', 'MongoDB'], salary: '₹7,00,000 - ₹9,00,000', posted: '3 days ago', logo: 'https://via.placeholder.com/64' },
        ];
        await new Promise((res) => setTimeout(res, 1000));
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="h-[85vh] w-full mx-auto overflow-y-auto bg-white rounded-4xl shadow-lg hide-scrollbar">
      {/* Sticky Header */}
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

      {/* Job List */}
      <div className="px-8 py-6 flex flex-col space-y-6">
        {loading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-24 h-24 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gradient-to-br from-orange-50 via-white to-orange-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:translate-y-1 transition-all duration-300 border border-gray-200 flex flex-col md:flex-row justify-between items-start w-full"
            >
              {/* Left: Logo + Title */}
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
                  <p className="text-gray-600 text-sm font-semibold mb-1">{job.company}</p>
                  <p className="text-gray-400 text-sm mb-1">{job.posted}</p>
                  <button className="mt-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold text-sm py-1.5 px-5 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                    Apply
                  </button>
                </div>
              </div>

              {/* Right: Location + Type + Skills + Salary */}
              <div className="flex flex-col md:items-end mt-4 md:mt-0 gap-2">
                <p className="text-gray-500 text-sm">{job.location} | {job.type}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map((skill, idx) => (
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
