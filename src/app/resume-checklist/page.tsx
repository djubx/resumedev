"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Cookies from 'js-cookie';
import { FaCheckCircle, FaClipboardCheck, FaUserGraduate, FaTrophy, FaSearch, FaBullseye } from "react-icons/fa";

interface ChecklistItem {
  text: string;
  checked: boolean;
  icon: JSX.Element;
}

const generalChecklistItems: ChecklistItem[] = [
  { text: "Include contact information", checked: false, icon: <FaCheckCircle className="text-blue-400" /> },
  { text: "Write a compelling summary or objective", checked: false, icon: <FaBullseye className="text-green-400" /> },
  { text: "List relevant work experience", checked: false, icon: <FaClipboardCheck className="text-yellow-400" /> },
  { text: "Highlight key skills", checked: false, icon: <FaCheckCircle className="text-purple-400" /> },
  { text: "Include education details", checked: false, icon: <FaUserGraduate className="text-red-400" /> },
  { text: "Add any certifications or awards", checked: false, icon: <FaTrophy className="text-orange-400" /> },
  { text: "Proofread for errors", checked: false, icon: <FaSearch className="text-indigo-400" /> },
  { text: "Tailor resume to job description", checked: false, icon: <FaClipboardCheck className="text-pink-400" /> },
  { text: "Use action verbs", checked: false, icon: <FaCheckCircle className="text-teal-400" /> },
  { text: "Quantify achievements where possible", checked: false, icon: <FaCheckCircle className="text-cyan-400" /> },
];

export default function ResumeChecklist() {
  const [generalChecklist, setGeneralChecklist] = useState<ChecklistItem[]>(generalChecklistItems);
  const [personalizedFeedback, setPersonalizedFeedback] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    const savedGeneralChecklist = Cookies.get('resumeChecklist');
    if (savedGeneralChecklist) {
      setGeneralChecklist(JSON.parse(savedGeneralChecklist));
    }

    const savedFeedback = Cookies.get('personalizedFeedback');
    if (savedFeedback) {
      setPersonalizedFeedback(JSON.parse(savedFeedback));
    }
  }, []);

  const handleCheckboxChange = (index: number, isPersonalized: boolean) => {
    if (isPersonalized) {
      const newPersonalizedFeedback = [...personalizedFeedback];
      newPersonalizedFeedback[index].checked = !newPersonalizedFeedback[index].checked;
      setPersonalizedFeedback(newPersonalizedFeedback);
      Cookies.set('personalizedFeedback', JSON.stringify(newPersonalizedFeedback), { expires: 30 });
    } else {
      const newGeneralChecklist = [...generalChecklist];
      newGeneralChecklist[index].checked = !newGeneralChecklist[index].checked;
      setGeneralChecklist(newGeneralChecklist);
      Cookies.set('resumeChecklist', JSON.stringify(newGeneralChecklist), { expires: 30 });
    }
  };

  const renderChecklist = (items: ChecklistItem[], isPersonalized: boolean) => (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-center w-6 h-6 mr-4">
            <input
              type="checkbox"
              id={`${isPersonalized ? 'personalized' : 'general'}-item-${index}`}
              checked={item.checked}
              onChange={() => handleCheckboxChange(index, isPersonalized)}
              className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
            />
          </div>
          <label htmlFor={`${isPersonalized ? 'personalized' : 'general'}-item-${index}`} className="text-lg flex-grow flex items-center">
            <span className="mr-3">{item.icon}</span>
            {item.text}
          </label>
        </motion.li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-shadow-lg text-blue-300">Resume Checklist</h1>
          
          {personalizedFeedback.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Personalized Feedback on Your Resume</h2>
              {renderChecklist(personalizedFeedback, true)}
              <h3 className="text-2xl font-semibold mt-6 mb-4 text-green-400">Let's fix them one by one!</h3>
            </motion.div>
          )}

          <h2 className="text-3xl font-semibold mb-6 text-blue-300">General Resume Checklist</h2>
          {renderChecklist(generalChecklist, false)}
        </motion.div>
      </main>
    </div>
  );
}