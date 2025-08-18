import React, { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6 overflow-y-auto">
      {/* Left Side - Upload */}
      <form
        onSubmit={onsubmitHandler}
        className="flex-1 max-w-xl p-6 bg-white rounded-2xl border shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-green-500" />
          <h1 className="text-lg font-semibold">Resume Review</h1>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Resume
        </label>

        <div className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-400 transition">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setInput(e.target.files[0])}
            required
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>

          <p className="text-sm text-gray-600">
            <span className="font-medium text-green-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF files only (max 5MB)</p>
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white py-2.5 mt-6 text-sm rounded-lg transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
          ) : (
            <FileText className="w-5 h-5" />
          )}
          {loading ? "Reviewing..." : "Review Resume"}
        </button>
      </form>

      {/* Right Side - Results */}
      <div className="flex-1 max-w-xl p-6 bg-white rounded-2xl border shadow-sm flex flex-col min-h-[300px]">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-green-500" />
          <h1 className="text-lg font-semibold">Analysis Results</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm text-center gap-3">
            <FileText className="w-8 h-8" />
            <p>Upload a resume and click "Review Resume" to get started.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto text-sm text-slate-700 leading-relaxed">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
