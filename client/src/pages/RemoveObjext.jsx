import React, { useState } from 'react'
import { Edit, Eraser, Hash, Scissors, Sparkles } from 'lucide-react'

const RemoveObjext = () => {

  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const onsubmitHandler = (e) => {
    e.preventDefault()
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

        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-10 py-2 mt-6 text-sm rounded-lg cursor-pointer '>
          <Scissors className='w-5 ' />
          Remove Object
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">

        <div className="flex items-center gap-3">
          <Scissors className='w-5 text-[#4A7AFF] h-5 ' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Scissors className='w-9 h-9 ' />
            <p>Upload an image and click Remove Object to get started</p>

          </div>
        </div>

      </div>

    </div>
  )
}

export default RemoveObjext
