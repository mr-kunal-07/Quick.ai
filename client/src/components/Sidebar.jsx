import React from "react";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
    Eraser,
    FileText,
    Hash,
    House,
    Image,
    LogOut,
    Scissors,
    SquarePen,
    User,
    CreditCard,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/ai", label: "Dashboard", Icon: House },
    { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
    { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
    { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
    { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
    { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
    { to: "/ai/review-resume", label: "Resume Review", Icon: FileText },
    { to: "/ai/community", label: "Community", Icon: User },
    { to: "/ai/pricing", label: "Pricing", Icon: CreditCard },
];

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className={`fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 md:hidden ${sidebar ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setSidebar(false)}
            />

            <aside
                className={`w-64 bg-white shadow-md border-r border-gray-200 h-full fixed md:static top-0 left-0 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out ${sidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                {/* User section */}
                <div className="px-6 py-8 text-center border-b border-gray-100">
                    <img
                        src={user.imageUrl}
                        alt="user avatar"
                        className="w-16 h-16 rounded-full mx-auto shadow-sm"
                    />
                    <h2 className="mt-3 font-semibold text-gray-800">{user.fullName}</h2>
                    <p className="text-xs text-gray-500">Welcome back 👋</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 mt-6 space-y-1 text-sm">
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/ai"}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${isActive
                                    ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white shadow-sm"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Pricing Section */}
                <div className="border-t border-gray-100 px-4 py-4 bg-gray-50">
                    <div className="p-4 bg-gradient-to-r from-[#3C81F6] to-[#9234EA] rounded-lg shadow-sm text-white text-center">
                        <h3 className="font-semibold">Upgrade Plan</h3>
                        <p className="text-xs opacity-90 mt-1">Unlock AI tools & premium features</p>
                        <NavLink
                            to="/ai/pricing"
                            onClick={() => setSidebar(false)}
                            className="mt-3 inline-block px-4 py-1.5 text-sm bg-white text-[#3C81F6] font-medium rounded-md hover:bg-gray-100"
                        >
                            View Pricing
                        </NavLink>
                    </div>
                </div>

                {/* Profile + Logout */}
                <div className="border-t border-gray-100 px-4 py-5 flex items-center justify-between bg-gray-50">
                    <div
                        onClick={openUserProfile}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <img
                            src={user.imageUrl}
                            alt="profile"
                            className="w-9 h-9 rounded-full border"
                        />
                        <div className="text-sm leading-tight">
                            <p className="font-medium text-gray-800">{user.fullName}</p>
                            <p className="text-xs text-gray-500">
                                <Protect plan="premium" fallback="Free">
                                    Premium
                                </Protect>{" "}
                                Plan
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={signOut}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
