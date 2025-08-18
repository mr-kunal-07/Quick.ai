import React, { useState } from "react";
import { Scissors, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (object.split(" ").length > 1) {
        return toast.error("Please enter a single object");
      }

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post("/api/ai/remove-image-object", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.imageUrl);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6">
      {/* Left Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:w-1/2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <h1 className="text-lg font-semibold">Object Remover</h1>
        </div>

        {/* File Input */}
        {/* Image Upload */}
        <div className="w-full mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>

          <div
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <svg
              className="w-8 h-8 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6H16a5 5 0 011 9.9V16m-4-4v6m0 0l-3-3m3 3l3-3"
              />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag
              & drop
            </p>
            {input && (
              <p className="mt-2 text-xs text-gray-500 truncate max-w-[200px]">
                {input.name}
              </p>
            )}
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => setInput(e.target.files[0])}
            className="hidden"
            required
          />
        </div>


        {/* Object Input */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Describe Object to Remove
        </label>
        <textarea
          rows={3}
          value={object}
          onChange={(e) => setObject(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="e.g., watch or spoon (only one object)"
          required
        />

        {/* Button */}
        <button
          disabled={loading}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
          ) : (
            <Scissors className="w-5 h-5" />
          )}
          {loading ? "Processing..." : "Remove Object"}
        </button>
      </form>

      {/* Right Preview */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col min-h-[300px]">
        <div className="flex items-center gap-2 mb-4">
          <Scissors className="w-5 h-5 text-blue-500" />
          <h1 className="text-lg font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex flex-col justify-center items-center text-gray-400 text-sm gap-3">
            <Scissors className="w-10 h-10" />
            <p>Upload an image and describe an object to remove</p>
          </div>
        ) : (
          <img
            src={content}
            alt="Processed"
            className="w-full h-auto rounded-lg border mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
