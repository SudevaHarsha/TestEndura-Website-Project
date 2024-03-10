// components/Navbar.js
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="mx-auto px-4 sm:px-6 lg:px-24">
            <div className="flex justify-between items-center h-16">
                <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <div className="font-bold text-xl text-black">Your Logo</div>
                        </Link>
                    </div>
                </div>
                <div className="hidden md:block h-16">
                    <div className="h-full ml-10 flex items-center justify-center space-x-4 relative">
                        <Link href="/mocTests">
                            <div className="text-[#0c0c0d] hover:bg-[#01b3ef]/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Mock-Tests</div>
                        </Link>
                        <Link href="/study">
                            <div className="text-[#0c0c0d] hover:bg-[#01b3ef]/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Study</div>
                        </Link>

                        <Link href="/analysis">
                            <div className="text-[#0c0c0d] hover:bg-[#01b3ef]/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Analysis</div>
                        </Link>
                        <div className="h-[70%] bg-[#01b3ef]/80 w-px"></div>

                        <Link href="/pricing">
                            <div className="text-[#0c0c0d] hover:bg-[#01b3ef]/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pricing</div>
                        </Link>
                        <Link href="/blog">
                            <div className="text-[#0c0c0d] hover:bg-[#01b3ef]/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium">blog</div>
                        </Link>
                        <Button className="w-20 bg-strong text-white px-3 py-2 hover:bg-blue-500/90 hover:text-white/80 rounded-md text-sm font-medium">
                            Login
                        </Button>
                    </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                        <span className="sr-only text-black">Open main menu</span>
                        {isOpen ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </Button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/mocktests">
                            <div className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Mock Tests</div>
                        </Link>
                        <Link href="/study">
                            <div className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Study</div>
                        </Link>
                        <Link href="/analysis">
                            <div className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Analysis</div>
                        </Link>
                        <Link href="/pricing">
                            <div className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Pricing</div>
                        </Link>
                        <Link href="/blog">
                            <div className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Blog</div>
                        </Link>
                        <Button className="w-full bg-strong text-white px-3 py-2 hover:bg-blue-500/90 hover:text-white/80 rounded-md text-sm font-medium">
                            Login
                        </Button>
                        {/* Add more links as needed */}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
