'use client'
import { FaRobot, FaChartLine, FaShieldAlt, FaFileUpload, FaCheckCircle, FaLaptopCode } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaFileUpload size={32} className="text-orange-500" />,
      title: "Easy Upload",
      desc: "Just upload your resume in PDF — no complex forms or signups.",
    },
    {
      icon: <FaRobot size={32} className="text-orange-500" />,
      title: "Smart Parsing",
      desc: "AI automatically extracts your skills, experience, and education.",
    },
    {
      icon: <FaShieldAlt size={32} className="text-orange-500" />,
      title: "Secure",
      desc: "Your resume data stays private with strong encryption and HTTPS.",
    },
    {
      icon: <FaChartLine size={32} className="text-orange-500" />,
      title: "ATS Insights",
      desc: "Get instant ATS compatibility score and suggestions for improvement.",
    },
    {
      icon: <FaCheckCircle size={32} className="text-orange-500" />,
      title: "Best Job Matches",
      desc: "AI finds jobs that perfectly align with your resume and preferences.",
    },
    {
      icon: <FaLaptopCode size={32} className="text-orange-500" />,
      title: "Device Friendly",
      desc: "Seamlessly works on mobile, tablet, and desktop devices.",
    },
  ];

  return (
    <section className="py-18 bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Why Choose JobFinder?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-3xl shadow-sm bg-white hover:shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
