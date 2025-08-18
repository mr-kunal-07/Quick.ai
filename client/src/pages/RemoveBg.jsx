import React, { useState } from 'react'
import { Eraser, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import FormData from 'form-data'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveBg = () => {
  const [input, setInput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', input)

      const { data } = await axios.post('/api/ai/remove-image-background', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })

      if (data.success) {
        setContent(data.secure_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="h-full overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side - Form */}
      <form
        onSubmit={onsubmitHandler}
        className="w-full p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Remover</h1>
        </div>

        <p className="mt-6 text-sm font-medium text-gray-600">Upload an image</p>
        <label
          htmlFor="imageUpload"
          className="mt-3 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <svg
              className="w-8 h-8 mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 8v-6m0 0l4 4m-4-4l-4 4"
              ></path>
            </svg>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-orange-500">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 5MB</p>
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={(e) => setInput(e.target.files[0])}
            className="hidden"
            required
          />
        </label>

        <p className="text-xs text-gray-500 mt-1">
          Supports .jpg, .jpeg, .png and more
        </p>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-6 py-2.5 mt-6 text-sm rounded-lg shadow hover:opacity-90 transition disabled:opacity-70"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Eraser className="w-5 h-5" />
          )}
          {loading ? 'Removing...' : 'Remove Background'}
        </button>
      </form>

      {/* Right Side - Preview */}
      <div className="w-full p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col min-h-[400px]">
        <div className="flex items-center gap-3">
          <Eraser className="w-6 h-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Result</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400 text-center">
            <Eraser className="w-12 h-12 opacity-50" />
            <p className="text-sm max-w-xs">
              Upload an image above and click{" "}
              <span className="font-semibold text-gray-600">Remove Background</span>
              to get started
            </p>
          </div>
        ) : (
          <div className="flex-1 mt-4 flex items-center justify-center">
            <img
              src={content}
              alt="AI Processed"
              className="rounded-lg shadow-md max-h-[350px] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default RemoveBg
