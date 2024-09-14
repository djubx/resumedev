"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from '@sanity/client';
import { FaEnvelope, FaUser, FaCommentAlt, FaPaperPlane } from "react-icons/fa";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2023-05-03',
});

export default function Contact() {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const contactData = {
      _type: 'contact',
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      submittedAt: new Date().toISOString(),
    };

    try {
      const result = await client.create(contactData);
      setFormStatus("Thank you for your message. We'll get back to you soon!");
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-shadow-lg max-w-6xl text-blue-300">
            Get in Touch
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            We're excited to hear from you! Drop us a message and let's start a conversation.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-2xl"
        >
          <div className="mb-6 relative">
            <FaUser className="absolute top-3 left-3 text-blue-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-10 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6 relative">
            <FaEnvelope className="absolute top-3 left-3 text-blue-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-10 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6 relative">
            <FaCommentAlt className="absolute top-3 left-3 text-blue-400" />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full px-10 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows={4}
              required
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <FaPaperPlane />
              </motion.div>
            ) : (
              <FaPaperPlane className="mr-2" />
            )}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>

        {formStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-6 p-4 rounded-lg ${
              formStatus.includes('Error') 
                ? 'bg-red-600 text-white' 
                : 'bg-green-600 text-white'
            } shadow-lg`}
          >
            {formStatus}
          </motion.div>
        )}
      </main>
    </div>
  );
}