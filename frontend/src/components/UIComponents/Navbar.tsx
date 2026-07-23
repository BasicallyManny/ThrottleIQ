"use client";

import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import {Link} from 'react-router-dom'
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0d1321]/95 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <div className="cursor-pointer select-none text-xl font-extrabold tracking-tight md:text-2xl">
                    <span className="text-[#f18f01]">Throttle</span>
                    <span className="text-white">IQ</span>
                    <span className="text-gray-400">NYC</span>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
                    <li>
                        <Link className="transition-colors duration-200 hover:text-[#f18f01]" to={'/motorcycle-search'}>
                            Motorcycle Search
                        </Link>
                    </li>

                    <li>
                        <Link className="transition-colors duration-200 hover:text-[#f18f01]" to={'/analytics'}>
                            NYC Accident Analytics
                        </Link>
                    </li>
                </ul>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
                    aria-label="Toggle navigation"
                >
                    {isOpen ? (
                        <HiX className="h-7 w-7" />
                    ) : (
                        <HiMenuAlt3 className="h-7 w-7" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden bg-[#0d1321] transition-all duration-300 md:hidden ${isOpen ? "max-h-60 border-t border-white/10" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col py-3">
                    <li>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="w-full px-6 py-4 text-left text-gray-300 transition hover:bg-white/5 hover:text-[#f18f01]"
                            to={"/motorcycle-search"}
                        >
                            Motorcycle Search
                        </Link>
                    </li>

                    <li>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="w-full px-6 py-4 text-left text-gray-300 transition hover:bg-white/5 hover:text-[#f18f01]"
                            to={"/analytics"}
                        >
                            NYC Accident Analytics
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};