import { FaExclamationTriangle, FaCheckCircle, FaStar, FaClipboardList } from "react-icons/fa";
import Link from 'next/link';
import { motion } from "framer-motion";

interface AnalysisResult {
  issues?: Array<{
    type: string;
    description: string;
    suggestion: string;
  }>;
  strengths?: string[];
  overallScore?: number;
}

interface ResumeAnalysisProps {
  result: AnalysisResult;
}

export default function ResumeAnalysis({ result }: ResumeAnalysisProps) {
  if (!result) {
    return <div className="text-gray-300">No analysis result available.</div>;
  }

  return (
    <div className="w-full text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-blue-300">Analysis Results</h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-semibold mb-4 text-green-400 flex items-center">
          <FaStar className="mr-2" /> Strengths
        </h3>
        {result.strengths && result.strengths.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {result.strengths.map((strength, index) => (
              <motion.li 
                key={index} 
                className="text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {strength}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No specific strengths identified.</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-yellow-400 flex items-center">
          <FaExclamationTriangle className="mr-2" /> Areas for Improvement
        </h3>
        {result.issues && result.issues.length > 0 ? (
          <div className="space-y-4">
            {result.issues.map((issue, index) => (
              <motion.div 
                key={index} 
                className="p-4 bg-gray-800 rounded-lg shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-2">
                  <FaExclamationTriangle className="text-yellow-400 mr-2 w-5 h-5" />
                  <h4 className="font-bold text-lg text-blue-300">{issue.type}</h4>
                </div>
                <p className="text-red-400 mb-2">{issue.description}</p>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2 w-3 h-3 flex-shrink-0" />
                  <p className="text-green-300 flex-grow">Suggestion: {issue.suggestion}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No specific areas for improvement identified.</p>
        )}
      </motion.div>

      <motion.div 
        className="mt-8 p-4 bg-gray-800 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold mb-2 text-blue-300">Overall Score</h3>
        <p className="text-4xl font-bold text-blue-400 mb-2">{result.overallScore ?? 'N/A'}/100</p>
        <Link href="/resume-checklist" className="inline-flex items-center text-blue-300 hover:text-blue-400 transition-colors duration-300">
          <FaClipboardList className="mr-2" />
          Go to Resume Checklist
        </Link>
        <p className="mt-2 text-sm text-gray-400">
          Use the checklist to track your improvements. Once you've made changes, please reupload your resume for a fresh analysis.
        </p>
      </motion.div>

      <motion.div 
        className="mt-8 p-4 bg-gray-800 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-green-400">Next Steps</h3>
        <ol className="list-decimal pl-5 space-y-2 text-gray-300">
          <li>Review the areas for improvement and suggestions above.</li>
          <li>Use the Resume Checklist to track your progress.</li>
          <li>Make necessary changes to your resume.</li>
          <li>Reupload your improved resume for a new analysis.</li>
        </ol>
      </motion.div>
    </div>
  );
}