import React, { useState } from "react";
import { Edit, Sparkles, Loader2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArtical = () => {
  const articalLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setselectedLength] = useState(articalLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}.`;

      const { data } = await axios.post(
        "/api/ai/gererate-article",
        { prompt, length: selectedLength.length },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

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
    <div className="h-full p-4 flex flex-col lg:flex-row gap-6">
      {/* Left Side */}
      <form
        onSubmit={onsubmitHandler}
        className="w-full lg:w-1/2 p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h1 className="text-lg font-semibold">Article Configuration</h1>
        </div>

        {/* Topic */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Article Topic
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="The Future of Artificial Intelligence..."
          required
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Length */}
        <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
          Article Length
        </label>
        <div className="flex flex-wrap gap-2">
          {articalLength.map((item, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setselectedLength(item)}
              className={`px-4 py-1 text-xs rounded-full border transition ${selectedLength.text === item.text
                  ? "bg-blue-100 text-blue-700 border-blue-400"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {item.text}
            </button>
          ))}
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 mt-6 text-sm rounded-lg transition"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
          {loading ? "Generating..." : "Generate Article"}
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 p-6 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-[400px] max-h-[600px]">
        <div className="flex items-center gap-2 mb-4">
          <Edit className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold">Generated Article</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
            <Edit className="w-8 h-8 mb-2" />
            <p>Enter a topic and click <b>Generate</b> to get started</p>
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

export default WriteArtical;
