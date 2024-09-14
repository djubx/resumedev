import { useState } from "react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import extractTextFromPDF from "pdf-parser-client-side";
import { motion, AnimatePresence } from "framer-motion";
import md5 from "md5";

interface ATSScoreUploaderProps {
  onParsedData: (data: any) => void;
  onError: (error: string) => void;
  onNewUpload: () => void;
}

export default function ATSScoreUploader({ onParsedData, onError, onNewUpload }: ATSScoreUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const calculateFileHash = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const hash = md5(result);
          resolve(hash);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsBinaryString(file);
    });
  };

  const checkExistingAnalysis = async (fileHash: string) => {
    const query = `*[_type == "atsScore" && fileHash == $fileHash] | order(_createdAt desc)[0]`;
    const params = { fileHash };
    const existingDoc = await client.fetch(query, params);
    return existingDoc;
  };

  const uploadToSanity = async (file: File, pdfText: string, analysisResult: any, fileHash: string) => {
    setStatus("Uploading results...");
    try {
      const fileAsset = await client.assets.upload('file', file);

      const doc = await client.create({
        _type: 'atsScore',
        title: file.name,
        file: {
          _type: 'file',
          asset: {
            _type: "reference",
            _ref: fileAsset._id
          }
        },
        formattedFileSize: formatFileSize(file.size),
        uploadedAt: new Date().toISOString(),
        extractedText: pdfText,
        analysisResult: analysisResult,
        fileHash: fileHash,
      });

      console.log('ATS Score uploaded to Sanity:', doc);
      setStatus(`ATS analysis successful`);
      return doc;
    } catch (error: any) {
      console.error('Error uploading to Sanity:', error);
      throw new Error(error.message.includes("Insufficient permissions")
        ? "Unable to upload resume due to permission issues. Please contact support."
        : "Error uploading resume. Please try again.");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onNewUpload();
      console.log("Resume file:", selectedFile, "Size:", formatFileSize(selectedFile.size));
      await handleFileProcessing(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onNewUpload();
      console.log("Resume file (dropped):", droppedFile, "Size:", formatFileSize(droppedFile.size));
      await handleFileProcessing(droppedFile);
    }
  };

  const handleFileProcessing = async (file: File, forceReanalyze: boolean = false) => {
    setIsUploading(true);
    setStatus("Calculating file hash...");
    try {
      const fileHash = await calculateFileHash(file);
      
      if (!forceReanalyze) {
        const existingAnalysis = await checkExistingAnalysis(fileHash);
        if (existingAnalysis) {
          setStatus("Using existing ATS analysis...");
          setShowAnimation(true);
          setTimeout(() => {
            setShowAnimation(false);
            onParsedData(existingAnalysis.analysisResult);
          }, 1000);
          return;
        }
      }

      setStatus("Extracting text from PDF...");
      const pdfText = await extractTextFromPDF(file, "clean");

      setStatus("Analyzing resume...");
      const analysisResult = await analyzeResume(pdfText ?? "");

      setStatus("Uploading resume...");
      await uploadToSanity(file, pdfText ?? "", analysisResult, fileHash);
      console.log("ATS Analysis result:", analysisResult, fileHash);

      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        onParsedData(analysisResult);
      }, 1000);
    } catch (error) {
      console.error('Error processing file:', error);
      onError(error instanceof Error ? error.message : "Error processing resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const analyzeResume = async (resumeText: string): Promise<any> => {
    try {
      const response = await fetch("/api/analyze-resume-ats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error analyzing resume");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="mb-8 relative">
      <div
        className="flex items-center justify-center w-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label htmlFor="resume-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FaUpload className="w-10 h-10 mb-3 text-blue-400" />
            <p className="mb-2 text-sm text-blue-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-blue-500">PDF (MAX. 5MB)</p>
          </div>
          <input id="resume-file" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
        </label>
      </div>
      {file && <p className="mt-2 text-sm text-blue-500">{file.name} ({formatFileSize(file.size)})</p>}

      <div className="mt-2 flex justify-between items-start">
        <div className="flex flex-col space-y-2">
          {status && (
            <p className={`text-sm ${status.includes("Error") || status.includes("Unable") ? "text-red-500" : "text-green-500"}`}>
              {status}
            </p>
          )}
          {isUploading && <p className="text-sm text-blue-500">Processing resume...</p>}
        </div>
        {file && (
          <button
            onClick={() => handleFileProcessing(file, true)}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            disabled={isUploading}
          >
            Force Re-analyze
          </button>
        )}
      </div>

      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-green-500 text-6xl"
            >
              <FaCheckCircle />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-xl font-bold text-green-600"
            >
              ATS Analysis Complete!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}