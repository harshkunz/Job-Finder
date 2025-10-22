'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaMapMarkerAlt, FaTools, FaProjectDiagram, FaFileAlt } from 'react-icons/fa';


interface ResumeAnalysisProps {
  resumeData?: any;
  fileName?: string;
  onFindJobs: (jobs: any[]) => void;
  onStartLoading: () => void;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ resumeData, fileName, onFindJobs, onStartLoading,}) => {
  const [data, setData] = useState({
    role: '',
    qualification: '',
    skills: [],
    projects: [],
  });

  useEffect(() => {
    if (resumeData) {
      setData({
        role: resumeData.role || '',
        qualification: resumeData.qualification || '',
        skills: resumeData.skills?.slice(0, 7) || [],
        projects: resumeData.projects?.slice(0, 3) || [],
    });
    }
  }, [resumeData]);


  const handleChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]:
        field === 'skills' || field === 'projects'
          ? value.split(',').map((s) => s.trim())
          : value,
    }));
  };

  
  const cardVariants: {
    hidden: { opacity: number; y: number };
    visible: (i: number) => { opacity: number; y: number; transition: object };
  } = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 70 },
    }),
  };

  
  const handleFindJobs = async () => {
    onStartLoading();
    const formData = new FormData();
    formData.append("search_query", data.role);
    formData.append("location", "india");
    formData.append("max_jobs", "30");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search/linkedin`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      onFindJobs(result.data || []);
    } catch (err) {
      console.error("LinkedIn API error:", err);
      onFindJobs([]);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-6xl mx-auto mt-10 sm:mt-16 px-6"
    >
      {/* Outer Container */}
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border border-gray-300 mb-2 rounded-3xl shadow-md px-4 py-8 sm:px-10 sm:py-8 bg-white hover:shadow-2xl hover:translate-y-1 transition-all duration-300"
      >
        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 id='job-analysis' className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 sm:px-0 px-2">
            Dynamic Resume Insights
          </h2>
          <p className="text-gray-500 text-xs sm:text-base sm:px-0 px-6">
            Instant AI analysis, editable to match your career vision ✏️
          </p>
        </motion.div>

        {/* Resume Cards */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {[
            { icon: <FaFileAlt className="text-orange-600 text-3xl mr-4" />, label: 'Role', field: 'role'},
            { icon: <FaUserGraduate className="text-orange-600 text-3xl mr-4" />, label: 'Qualification', field: 'qualification' },
            { icon: <FaTools className="text-orange-600 text-3xl mr-4" />, label: 'Skills', field: 'skills' },
            { icon: <FaProjectDiagram className="text-orange-600 text-3xl mr-4" />, label: 'Projects', field: 'projects' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              className="flex items-start p-4 rounded-2xl border border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 via-white to-orange-50"
            >
              {item.icon}
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3">{item.label}</h3>
                <input
                    type="text"
                    value={
                          Array.isArray(data[item.field as keyof typeof data])
                            ? (data[item.field as keyof typeof data] as string[]).join(', ')
                            : data[item.field as keyof typeof data]
                          }
                    onChange={(e) => handleChange(item.field, e.target.value)}
                    className="w-full text-gray-700 bg-white text-sm rounded-xl p-3 focus:outline-orange-400 border border-gray-400"
                  />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Find Jobs Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8 sm:mt-10"
        >
          <motion.button
            onClick={handleFindJobs}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg transition-all duration-300"
          >
            Find Jobs
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeAnalysis;
