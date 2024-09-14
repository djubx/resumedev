"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ATSScoreUploader from "@/components/ATSScoreUploader";
import ATSScoreResult from "@/components/ATSScoreResult";
import { FaCloudUploadAlt, FaChartBar } from "react-icons/fa";

export default function ATSScorePage() {
  const [atsParsedData, setAtsParsedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAtsParsedData = (data: any) => {
    setAtsParsedData(data);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setAtsParsedData(null);
  };

  const handleNewUpload = () => {
    setAtsParsedData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-start bg-gradient-to-br from-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-shadow-lg max-w-6xl text-blue-300">ATS Score Check</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Upload your resume and get an instant ATS compatibility score.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-2xl p-8"
        >
          {!atsParsedData ? (
            <div className="text-center">
              <FaCloudUploadAlt className="text-6xl text-blue-400 mb-4 mx-auto" />
              <ATSScoreUploader
                onParsedData={handleAtsParsedData}
                onError={handleError}
                onNewUpload={handleNewUpload}
              />
            </div>
          ) : (
            <div>
              <FaChartBar className="text-6xl text-green-400 mb-4 mx-auto" />
              <ATSScoreResult parsedData={atsParsedData} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewUpload}
                className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Upload Another Resume
              </motion.button>
            </div>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 mt-4"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </main>
    </div>
  );
}