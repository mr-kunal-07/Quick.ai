import React, { useState } from 'react'
import { Edit, Hash, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import Markdown from 'react-markdown'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogTitle = () => {
  const BlogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food']

  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the ${selectedCategory} category.`

      const { data } = await axios.post(
        '/api/ai/gererate-blog-title',
        { prompt },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      )

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">
      {/* Left Side - Form */}
      <form
        onSubmit={onsubmitHandler}
        className="w-full lg:w-1/2 p-6 bg-white rounded-xl shadow border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        {/* Keyword input */}
        <label className="block text-sm font-medium text-gray-700 mt-4">Keyword</label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 outline-none"
          placeholder="The Future of Artificial Intelligence..."
          required
        />

        {/* Category select */}
        <label className="block text-sm font-medium text-gray-700 mt-6">Category</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {BlogCategories.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`px-4 py-1.5 rounded-full text-xs cursor-pointer transition ${selectedCategory === item
                  ? 'bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white shadow'
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Submit button */}
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-10 py-3 mt-8 text-sm rounded-lg cursor-pointer hover:opacity-90 transition"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Hash className="w-5" />
          )}
          {loading ? 'Generating...' : 'Generate Title'}
        </button>
      </form>

      {/* Right Side - Results */}
      <div className="w-full lg:w-1/2 p-6 bg-white rounded-xl shadow border border-gray-100 flex flex-col min-h-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <Hash className="w-5 h-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">Generated Titles</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
              <Hash className="w-9 h-9" />
              <p>Enter a keyword & category, then generate titles.</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex-1 overflow-y-auto text-sm text-slate-700 leading-relaxed">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogTitle
