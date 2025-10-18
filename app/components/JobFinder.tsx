'use client';
import React, { useEffect, useState } from 'react';

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

const JobFinder = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data: Job[] = [
          {
            id: 1,
            title: 'Frontend Developer',
            company: 'TechCorp',
            location: 'Bangalore',
            type: 'Full-time',
            skills: ['React', 'TypeScript', 'TailwindCSS'],
            salary: '₹6,00,000 - ₹8,00,000',
            posted: '1 day ago',
            logo: '/logo.png',
          },
          {
            id: 2,
            title: 'AI Engineer',
            company: 'OpenAI',
            location: 'San Francisco',
            type: 'Full-time',
            skills: ['Python', 'Machine Learning', 'PyTorch'],
            salary: '₹15,00,000 - ₹25,00,000',
            posted: '2 days ago',
            logo: '/logo.png',
          },
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
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Recommended Jobs for You
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="w-full bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200"
              >
                {/* Left: Logo + Title */}
                <div className="flex items-center gap-4 flex-1">
                  {job.logo && (
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-16 h-16 object-contain rounded-full border"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-500 text-sm">{job.posted}</p>
                  </div>
                </div>

                {/* Right: Company + Location + Salary */}
                <div className="flex flex-col md:items-end mt-4 md:mt-0 gap-1">
                  <p className="text-gray-700 font-semibold">{job.company}</p>
                  <p className="text-gray-500 text-sm">{job.location} | {job.type}</p>
                  {job.salary && <p className="text-green-600 font-semibold">{job.salary}</p>}
                </div>

                {/* Optional: Skills */}
                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobFinder;
