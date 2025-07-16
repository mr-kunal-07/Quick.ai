import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { assets } from '../assets/assets';
import Sidebar from '../components/Sidebar';
import { useUser, SignIn } from '@clerk/clerk-react';

const Layout = () => {

  const navigate = useNavigate();
  const [sidebar, setSetsidebar] = useState(false)
  const { user } = useUser();
  

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>

      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
        <img src={assets.logo} alt="logo" onClick={() => navigate('/')} className='cursor-pointer w-32 sm:w-44' />
        {
          sidebar ? <X onClick={() => setSetsidebar(false)} className='w-6 h-6 text-gray-600  sm:hidden' /> : <Menu onClick={() => setSetsidebar(true)} className='w-6 h-6 text-gray-600  sm:hidden' />
        }
      </nav>
      <div className='flex flex-1 w-full h-[calc(100vh-64px)] '>
        <Sidebar sidebar={sidebar} setSidebar={setSetsidebar} />
        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet />

        </div>
      </div>

    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn/>
    </div>
  )
}

export default Layout