"use client";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFileAlt, FaChartLine, FaClipboardCheck, FaExclamationTriangle, FaCheckCircle, FaQuoteLeft, FaGraduationCap, FaBriefcase, FaUserTie } from "react-icons/fa";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <SpeedInsights />
      <Analytics />
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header */}
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 w-full flex flex-col items-center"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-shadow-lg max-w-6xl text-blue-300">
            Transform Your Resume into a Job-Winning Asset with AI
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-gray-300">
            Don't let your dream job slip away. Our AI-powered tools help you craft a resume that stands out and gets you hired faster.
          </p>
          <Link
            href="/resume-analyzer"
            className="bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-yellow-400 transition duration-300 shadow-lg hover:shadow-xl animate-pulse"
          >
            Get Instant Feedback Now
          </Link>
        </motion.section>

        {/* Our solutions with enhanced descriptions */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mb-20 w-full"
        >
          <h2 className="text-4xl font-semibold mb-10 flex items-center justify-center text-shadow-md text-blue-300">
            <FaCheckCircle className="mr-3 text-green-400" />
            Powerful Tools for Resume Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto">
            {[
              { 
                icon: <FaFileAlt className="text-7xl" />, 
                title: "AI Resume Checker", 
                description: "Get personalized insights to make your resume stand out",
                link: "/resume-analyzer"
              },
              { 
                icon: <FaChartLine className="text-7xl" />, 
                title: "ATS Score", 
                description: "Optimize your resume to pass 95% of ATS filters",
                link: "/ats-score"
              },
              { 
                icon: <FaClipboardCheck className="text-7xl" />, 
                title: "Resume Checklist", 
                description: "Ensure your resume covers all essential elements",
                link: "/resume-checklist"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                className="bg-gray-800 p-8 rounded-lg text-center flex flex-col items-center shadow-lg transition-all duration-300"
              >
                <div className="text-6xl mb-6 text-blue-400 hover:text-blue-300 transition-colors duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-300">{feature.title}</h3>
                <p className="mb-6 text-base text-gray-300">{feature.description}</p>
                <Link
                  href={feature.link}
                  className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-sm hover:bg-blue-500 transition duration-300 shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="w-full max-w-4xl mb-20"
        >
          <h2 className="text-3xl font-semibold mb-10 text-center text-shadow-md text-blue-300">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "John D.", position: "Marketing Director at Tech Giant", text: "Landed my dream job at a Fortune 500 company!", image: "/john.png" },
              { name: "Sarah M.", position: "Senior Software Engineer", text: "50% increase in interview callbacks!", image: "/sarah.png" },
              { name: "Alex K.", position: "Data Analyst at Startup", text: "Secured my first job right out of college!", image: "/alex.png" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md flex items-start border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <Image src={testimonial.image} alt={testimonial.name} width={64} height={64} className="rounded-full mr-4" />
                <div>
                  <FaQuoteLeft className="text-blue-400 mb-4 text-2xl" />
                  <p className="mb-4 text-lg text-gray-300">{testimonial.text}</p>
                  <p className="text-right text-blue-300 font-bold">- {testimonial.name}</p>
                  <p className="text-right text-gray-400 text-sm font-semibold">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Revised Ethical AI statement */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center mb-16 w-full max-w-4xl bg-gray-800 p-6 rounded-lg border border-gray-700"
        >
          <h3 className="text-2xl font-semibold mb-4 text-blue-300">Our Mission: Level the Playing Field</h3>
          <p className="text-lg text-gray-300">
            We're committed to ensuring your resume is judged by its merits, not by hidden biases in hiring systems. Our AI tools are designed to promote equal opportunities for all job seekers, regardless of background or experience level.
          </p>
        </motion.section>

        {/* Personalization Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-center mb-16 w-full max-w-4xl"
        >
          <h3 className="text-2xl font-semibold mb-6 text-blue-300">Tailored for Every Career Stage</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <FaGraduationCap />, title: "New Graduates", description: "Stand out in entry-level job applications" },
              { icon: <FaBriefcase />, title: "Mid-Career Professionals", description: "Highlight your growing expertise and achievements" },
              { icon: <FaUserTie />, title: "Executives", description: "Showcase your leadership and industry impact" },
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="text-4xl mb-2 text-blue-400">{item.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-blue-300">{item.title}</h4>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-center mb-16 w-full"
        >
          <h2 className="text-3xl font-semibold mb-6 text-shadow-md text-blue-300">Ready to Supercharge Your Job Search?</h2>
          <p className="text-xl mb-4 text-gray-300">Join over 10,000 professionals who've landed their dream jobs with our AI tools.</p>
          <p className="text-lg mb-8 text-yellow-400 font-bold">15,000+ resumes improved and counting!</p>
          <Link
            href="/resume-analyzer"
            className="bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-yellow-400 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Get Insights Now
          </Link>
        </motion.section>

        {/* Progress Indicator */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="w-full max-w-3xl mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-blue-300">Your Path to the Perfect Resume</h3>
          <div className="flex justify-between items-center">
            {[
              { step: 1, title: "Upload", description: "Submit your current resume", color: "bg-green-600" },
              { step: 2, title: "Analyze", description: "AI-powered review of your resume", color: "bg-blue-600" },
              { step: 3, title: "Optimize", description: "Receive personalized improvement tips", color: "bg-purple-600" },
            ].map((item, index) => (
              <div key={index} className="text-center flex-1">
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-4 mx-auto text-2xl font-bold`}>{item.step}</div>
                <h4 className="text-lg font-semibold mb-2 text-blue-300">{item.title}</h4>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Quick Links</h3>
              <ul>
                <li><Link href="/blog" className="hover:text-blue-300 transition-colors duration-300">Resume Tips Blog</Link></li>
                <li><Link href="/resources" className="hover:text-blue-300 transition-colors duration-300">Free Resources</Link></li>
                <li><Link href="/about" className="hover:text-blue-300 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Legal</h3>
              <ul>
                <li><Link href="/privacy" className="hover:text-blue-300 transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-300 transition-colors duration-300">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Connect With Us</h3>
              <p>Stay updated on the latest resume trends and job search tips.</p>
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
