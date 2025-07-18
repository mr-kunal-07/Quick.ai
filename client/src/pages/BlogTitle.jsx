import React, { useState } from 'react'
import { Edit, Hash, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import Markdown from 'react-markdown'
import toast from 'react-hot-toast'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogTitle = () => {

  const BlogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food']

  const [selectedCategory, setselectedCategory] = useState('General')
  const [input, setInput] = useState('')

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()


  const onsubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the ${selectedCategory} category.`

      const { data } = await axios.post('/api/ai/gererate-blog-title', { prompt }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

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
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4'>
      {/* Left Side */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#8E37EB] ' />
          <h1 className='text-xl font-semibold'>Ai Title Generator</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none border border-gray-300 rounded-md text-sm' placeholder='The Future of Artical Intelligence is...' required />

        <p className='mt-4 text-sm font-medium'>Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11 ">
          {BlogCategories.map((item) => (
            <span onClick={() => setselectedCategory(item)} key={item} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? 'bg-purple-50 text-purple-700' : 'text-gray-500 border-gray-300'} `}>{item}</span>
          ))}
        </div>
        <br />
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-10 py-2 mt-6 text-sm rounded-lg cursor-pointer '>
          {loading ? <span className='w-4 h-4 border-2 my-1 rounded-full animate-spin border-t-transparent '></span> : <Hash className='w-5 ' />
          }
          Generate title
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">

        <div className="flex items-center gap-3">
          <Hash className='w-5 text-[#8E37EB] h-5 ' />
          <h1 className='text-xl font-semibold'>Generated titles</h1>
        </div>

        {
          !content ? (

            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Hash className='w-9 h-9 ' />
                <p>Enter a topic and click Generate Title to get started</p>

              </div>
            </div>
          ) : (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
              <div className='reset-tw'>
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )
        }


      </div>

    </div>
  )
}

export default BlogTitle
