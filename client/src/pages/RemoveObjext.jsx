import React, { useState } from 'react'
import { Scissors, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveObjext = () => {

  const [input, setInput] = useState('')
  const [object, setObject] = useState('')

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()
  const onsubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      if (object.split(' ').length > 1) {
        return toast.error('Please enter a single object')
      }

      const formData = new FormData()
      formData.append('image', input)
      formData.append('object', object)

      const { data } = await axios.post('/api/ai/remove-image-object', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.imageUrl)
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
          <Sparkles className='w-6 text-[#4A7AFF] ' />
          <h1 className='text-xl font-semibold'>Object Remover</h1>
        </div>


        <input onChange={(e) => setInput(e.target.files[0])} accept='image/*' type="file" className='w-full p-2 px-3 mt-2 outline-none border border-gray-300 rounded-md text-sm text-shadow-gray-600' required />

        <p className='mt-6 text-sm font-medium'>Dicribe Object you want to remove</p>

        <textarea rows={4} onChange={(e) => setObject(e.target.value)} value={object} type="text" className='w-full p-2 px-3 mt-2 outline-none border border-gray-300 rounded-md text-sm' placeholder='e.g., watch or spoon, only single object name' required />

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-10 py-2 mt-6 text-sm rounded-lg cursor-pointer '>
          {loading ? <span className='w-4 h-4 border-2 my-1 rounded-full animate-spin border-t-transparent '></span> : <Scissors className='w-5 ' />}
          Remove Object
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">

        <div className="flex items-center gap-3">
          <Scissors className='w-5 text-[#4A7AFF] h-5 ' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className='w-9 h-9 ' />
              <p>Upload an image and click Remove Object to get started</p>

            </div>
          </div>
        ) : (
          <img src={content} alt="image" className='w-full h-full mt-3' />
        )}

      </div>

    </div>
  )
}

export default RemoveObjext
