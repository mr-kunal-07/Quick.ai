import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-6">
      {/* Section Heading */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Powerful{" "}
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            AI tools
          </span>
        </h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => user && navigate(tool.path)}
            className="group p-8 rounded-2xl bg-white shadow-md border border-gray-100 
                       hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {/* Icon */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-xl text-white text-2xl shadow-md"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            >
              <tool.Icon className="w-8 h-8" />
            </div>

            {/* Title */}
            <h3 className="mt-6 text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
              {tool.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-gray-500 text-sm leading-relaxed">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AiTools
