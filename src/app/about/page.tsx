"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { FaUsers, FaLightbulb, FaRocket, FaHandshake } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-shadow-lg max-w-6xl text-blue-300">About Us</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Resume Checkers is dedicated to helping job seekers optimize their resumes using cutting-edge AI technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl"
        >
          {[
            {
              icon: <FaRocket className="text-5xl mb-4 text-blue-400" />,
              title: "Our Mission",
              content: "To empower job seekers with AI-driven insights for crafting perfect resumes.",
            },
            {
              icon: <FaLightbulb className="text-5xl mb-4 text-yellow-400" />,
              title: "Our Vision",
              content: "To revolutionize the job application process through innovative technology.",
            },
            {
              icon: <FaUsers className="text-5xl mb-4 text-green-400" />,
              title: "Our Team",
              content: "A diverse group of AI experts, HR professionals, and software engineers.",
            },
            {
              icon: <FaHandshake className="text-5xl mb-4 text-purple-400" />,
              title: "Our Values",
              content: "Innovation, integrity, and commitment to user success.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              className="bg-gray-800 p-8 rounded-lg text-center flex flex-col items-center shadow-lg transition-all duration-300"
            >
              {item.icon}
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">{item.title}</h2>
              <p className="text-gray-300">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}