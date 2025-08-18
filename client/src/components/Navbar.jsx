import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, LogOutIcon } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'


const Navbar = () => {

    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();



    return (
        <div>
            <div className='fixed flex z-5 w-full backdrop:blur-2xl justify-between items-center py-3 px-4 sm:px-20 xl:px-32  '>
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 cursor-pointer select-none"
                >
                    <LogOutIcon color="#AA14F0" size={32} strokeWidth={1.5} />
                    <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#AA14F0] to-indigo-600 bg-clip-text text-transparent">
                        Multi.ai
                    </span>
                </div>

                {
                    user ? <UserButton />
                        :
                        (
                            <button onClick={openSignIn} className='flex items-center gap-2 text-sm rounded-full cursor-pointer bg-primary text-white px-10 py-2.5'>Get started <ArrowRight className='w-4 h-4' /> </button>
                        )
                }

            </div>
        </div>
    )
}

export default Navbar