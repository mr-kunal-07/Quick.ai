import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, LogOutIcon } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {

    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        <div>
            <div
                className='
                    fixed flex z-50 w-full justify-between items-center py-3 px-4 sm:px-20 xl:px-32
                    bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-md
                '
            >
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 cursor-pointer select-none"
                >
                    <LogOutIcon color="#AA14F0" size={32} strokeWidth={1.5} />
                    <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#AA14F0] to-indigo-600 bg-clip-text text-transparent">
                        Multi.ai
                    </span>
                </div>

                {user ? (
                    <UserButton />
                ) : (
                    <button
                        onClick={openSignIn}
                        className="
    flex items-center gap-2 text-sm font-medium rounded-full 
    bg-gradient-to-r from-primary to-purple-800 cursor-pointer 
    text-white px-8 py-3 
    shadow-lg hover:shadow-xl 
    transition-all duration-300 
    transform hover:-translate-y-1 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400
  "
                    >
                        Get started <ArrowRight className="w-5 h-5" />
                    </button>

                )}
            </div>
        </div>
    )
}

export default Navbar
