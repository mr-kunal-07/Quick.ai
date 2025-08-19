import React from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 sm:px-16 lg:px-28 bg-[url(/bg.png)] bg-cover bg-no-repeat text-center">

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-extrabold leading-tight tracking-tight text-gray-900">
          Create amazing content <br />
          with{" "}
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            AI tools
          </span>
        </h1>

        <p className="mt-6 max-w-md sm:max-w-2xl mx-auto text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
          Transform your ideas into captivating content effortlessly.
          Write articles, generate images, and enhance your workflow —
          all in one place.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm sm:text-base">
          <button
            onClick={() => navigate('/ai')}
            className="bg-primary text-white px-8 sm:px-10 py-3 rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            Start creating now
          </button>
          <button
            className="px-8 sm:px-10 py-3 rounded-xl border border-gray-300 text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md active:scale-95 transition-all duration-200"
          >
            Watch Demo
          </button>
        </div>

        {/* Trusted Badge */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm text-gray-700 text-sm sm:text-base">
            <img src={assets.user_group} alt="" className="h-5 sm:h-6" />
            <span>
              Trusted by <span className="font-semibold text-gray-900">10k+</span> users
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
