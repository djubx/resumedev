import { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaUser, FaBriefcase, FaGraduationCap, FaCogs, FaCertificate, FaProjectDiagram, FaHandsHelping, FaUsers, FaGlobe } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ATSScoreResultProps {
  parsedData: any;
}

const sectionIcons: { [key: string]: JSX.Element } = {
  contactInformation: <FaUser className="text-blue-400" />,
  workExperience: <FaBriefcase className="text-green-400" />,
  education: <FaGraduationCap className="text-yellow-400" />,
  skills: <FaCogs className="text-purple-400" />,
  certifications: <FaCertificate className="text-red-400" />,
  projects: <FaProjectDiagram className="text-indigo-400" />,
  volunteerExperience: <FaHandsHelping className="text-pink-400" />,
  professionalAssociations: <FaUsers className="text-teal-400" />,
  additionalSections: <FaGlobe className="text-orange-400" />,
};

const RenderSection = ({ title, content }: { title: string; content: any }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  const renderContent = (data: any, depth: number = 0) => {
    if (Array.isArray(data)) {
      return (
        <ul className={`list-disc pl-5 ${depth > 0 ? 'mt-2' : ''}`}>
          {data.map((item, index) => (
            <li key={index} className="mb-2 text-gray-300">{renderContent(item, depth + 1)}</li>
          ))}
        </ul>
      );
    } else if (typeof data === 'object' && data !== null) {
      return (
        <div className={`pl-4 ${depth > 0 ? 'mt-2' : ''}`}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-medium text-blue-300">{key}:</span> {renderContent(value, depth + 1)}
            </div>
          ))}
        </div>
      );
    } else {
      return <span className="text-gray-300">{data?.toString() || 'Not found'}</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-4 border border-gray-700 rounded-lg p-4 shadow-md bg-gray-800"
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleOpen}
      >
        {sectionIcons[title] || <FaChevronRight className="mr-2 text-gray-400" />}
        <h3 className="font-semibold text-lg ml-2 text-blue-300">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-auto"
        >
          <FaChevronDown className="text-gray-400" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 overflow-hidden"
          >
            {renderContent(content)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ATSScoreResult({ parsedData }: ATSScoreResultProps) {
  return (
    <div className="text-gray-100 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">ATS Parsed Resume Data</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {Object.entries(parsedData).map(([key, value]) => (
          <RenderSection key={key} title={key} content={value} />
        ))}
      </motion.div>
    </div>
  );
}