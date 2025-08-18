import { LogOutIcon } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full bg-gray-50 text-gray-600 mt-20 border-t border-gray-200">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between w-full gap-12 pb-10 border-b border-gray-200">

                {/* Logo & About */}
                <div className="md:max-w-sm">
                    <div
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 cursor-pointer select-none"
                    >
                        <LogOutIcon color="#AA14F0" size={32} strokeWidth={1.5} />
                        <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#AA14F0] to-indigo-600 bg-clip-text text-transparent">
                            Multi.ai
                        </span>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-gray-500">
                        Experience the power of <span className="font-semibold text-gray-700">Multi.ai</span>.
                        Transform your ideas into captivating content effortlessly, and enhance your workflow.
                    </p>
                </div>

                {/* Links & Newsletter */}
                <div className="flex-1 flex flex-col sm:flex-row md:justify-end gap-12">
                    {/* Links */}
                    <div>
                        <h2 className="font-semibold mb-4 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-primary transition">Home</a></li>
                            <li><a href="#" className="hover:text-primary transition">About us</a></li>
                            <li><a href="#" className="hover:text-primary transition">Contact us</a></li>
                            <li><a href="#" className="hover:text-primary transition">Privacy policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">Subscribe to our newsletter</h2>
                        <p className="text-sm text-gray-500 max-w-xs">
                            The latest news, articles, and resources, sent to your inbox weekly.
                        </p>
                        <div className="flex items-center gap-2 pt-4">
                            <input
                                className="border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none w-full max-w-xs h-10 rounded-lg px-3 text-sm"
                                type="email"
                                placeholder="Enter your email"
                            />
                            <button className="bg-primary hover:bg-primary/90 cursor-pointer px-4 h-10 text-white rounded-lg text-sm shadow-sm">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <p className="pt-6 text-center text-xs sm:text-sm text-gray-400">
                © 2025 Multi.ai. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer
