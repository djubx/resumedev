import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaFileAlt, FaChartBar, FaClipboardList, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/resume-analyzer", label: "Analyze", icon: <FaFileAlt /> },
    { href: "/ats-score", label: "ATS Score", icon: <FaChartBar /> },
    { href: "/resume-checklist", label: "Checklist", icon: <FaClipboardList /> },
    { href: "/about", label: "About", icon: <FaInfoCircle /> },
    { href: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-300">
              Resume Checkers
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-blue-300 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="sm:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <MobileNavLink key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </MobileNavLink>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300"
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:bg-gray-800 hover:text-blue-300 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300"
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
}