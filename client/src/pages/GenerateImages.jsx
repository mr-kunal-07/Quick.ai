import React, { useState } from 'react'
import { Image, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateImages = () => {
  const ImageStyle = [
    'Realistic',
    'Ghibli style',
    'Anime style',
    'Cartoon style',
    'Fantasy style',
    '3D style',
    'Portrait style',
  ]

  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate an image of ${input} in the ${selectedStyle} style.`
      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

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
    <div className='h-full overflow-y-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Left Side - Form */}
      <form
        onSubmit={onsubmitHandler}
        className='w-full p-4 md:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col'
      >
        <div className="flex items-center gap-3">
          <Sparkles className='w-5 h-5 md:w-6 md:h-6 text-[#00AD25]' />
          <h1 className='text-lg md:text-xl font-semibold'>AI Image Generator</h1>
        </div>

        <p className='mt-4 md:mt-6 text-xs md:text-sm font-medium text-gray-600'>Describe your image</p>
        <textarea
          rows={4}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className='w-full p-2.5 md:p-3 mt-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none resize-none'
          placeholder='E.g. A futuristic city skyline at night with neon lights...'
          required
        />

        <p className='mt-4 md:mt-5 text-xs md:text-sm font-medium text-gray-600'>Choose a style</p>
        <div className="mt-2 md:mt-3 flex gap-2 flex-wrap">
          {ImageStyle.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full border transition 
              ${selectedStyle === item
                  ? 'bg-green-500 text-white border-green-500 shadow-sm'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100'
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Publish toggle */}
        <div className='my-5 md:my-6 flex items-center gap-3'>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className='sr-only peer'
            />
            <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
            <span className='absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full transition peer-checked:translate-x-4'></span>
          </label>
          <p className='text-xs md:text-sm text-gray-700'>Make this image Public</p>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 md:px-10 py-2.5 mt-2 text-sm md:text-base rounded-lg shadow hover:opacity-90 transition disabled:opacity-70'
        >
          {loading
            ? <span className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
            : <Image className='w-5 h-5' />
          }
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {/* Right Side - Preview */}
      <div className="w-full p-4 md:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col min-h-[300px] md:min-h-[400px]">
        <div className="flex items-center gap-3">
          <Image className='w-5 h-5 md:w-6 md:h-6 text-[#00AD25]' />
          <h1 className='text-lg md:text-xl font-semibold'>Generated Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
            <Image className='w-10 h-10 md:w-12 md:h-12 opacity-50' />
            <p className='text-xs md:text-sm text-center max-w-xs'>
              Describe something above and click <span className="font-semibold text-gray-600">Generate Image</span> to see magic ✨
            </p>
          </div>
        ) : (
          <div className='flex-1 mt-4 flex items-center justify-center'>
            <img
              src={content}
              alt="AI Generated"
              className='rounded-lg shadow-md max-h-[250px] md:max-h-[400px] object-contain'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default GenerateImages
