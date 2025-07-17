import React, { useState } from 'react'
import { Edit, Eraser, Hash, Sparkles } from 'lucide-react'

const RemoveBg = () => {

  const [input, setInput] = useState('')

  const onsubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4'>
      {/* Left Side */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#FF4938] ' />
          <h1 className='text-xl font-semibold'>Background Remover</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Uplode Image</p>
        <input onChange={(e) => setInput(e.target.files[0])} accept='image/*' type="file" className='w-full p-2 px-3 mt-2 outline-none border border-gray-300 rounded-md text-sm text-shadow-gray-600' required />

        <p className='text-sm text-gray-500 font-light mt-1'>Supported .jpg, .jpeg, .png, and other image formats</p>
       
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-10 py-2 mt-6 text-sm rounded-lg cursor-pointer '>
          <Eraser className='w-5 ' />
          Remove Background
        </button>
      </form>

      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">

        <div className="flex items-center gap-3">
          <Eraser className='w-5 text-[#FF4938] h-5 ' />
          <h1 className='text-xl font-semibold'>Ai Background Remover</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Eraser className='w-9 h-9 ' />
            <p>Upload an image and click Remove Background to get started</p>

          </div>
        </div>

      </div>

    </div>
  )
}

export default RemoveBg
