'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaMapMarkerAlt, FaTools, FaProjectDiagram, FaFileAlt } from 'react-icons/fa';

interface ResumeAnalysisProps {
  onFindJobs: () => void;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ onFindJobs }) => {
  const initialData = {
    summary: "***",
    qualification: "***",
    skills: ['***',],
    projects: ['***',]
  };

  const [data, setData] = useState(initialData);

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]:
        field === 'skills' || field === 'projects'
          ? value.split(',').map((s) => s.trim())
          : value,
    }));
  };

  const handleFindJobs = () => {
    console.log("Finding jobs for:", data);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-6xl mx-auto mt-16 px-6"
    >
      {/* Outer Container */}
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border border-gray-300 mb-2 rounded-3xl shadow-md px-10 py-10 bg-white hover:shadow-2xl hover:translate-y-1 transition-all duration-300"
      >
        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-3xl font-semibold text-gray-800 mb-2">
            Dynamic Resume Insights
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Instant AI analysis, editable to match your career vision ✏️
          </p>
        </motion.div>

        {/* Resume Cards */}
        <div className="flex flex-col gap-6">
          {[
            { icon: <FaFileAlt className="text-orange-600 text-3xl mr-4" />, label: 'Summary', field: 'summary', type: 'textarea' },
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
              className="flex items-start p-5 rounded-2xl border border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 via-white to-orange-50"
            >
              {item.icon}
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-700 mb-3">{item.label}</h3>
                {item.type === 'textarea' ? (
                  <textarea
                    value={data[item.field as keyof typeof data]}
                    onChange={(e) => handleChange(item.field, e.target.value)}
                    rows={2}
                    className="w-full text-gray-700 bg-white text-sm rounded-lg p-3 focus:outline-orange-400 border border-gray-400"
                  />
                ) : (
                  <input
                    type="text"
                    value={
                          Array.isArray(data[item.field as keyof typeof data])
                            ? (data[item.field as keyof typeof data] as string[]).join(', ')
                            : data[item.field as keyof typeof data]
                          }
                    onChange={(e) => handleChange(item.field, e.target.value)}
                    className="w-full text-gray-700 bg-white text-sm rounded-lg p-3 focus:outline-orange-400 border border-gray-400"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Find Jobs Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-10"
        >
          <motion.button
            onClick={onFindJobs}
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
