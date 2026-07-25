"use client";

import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link } from 'react-router-dom'
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
                className={`overflow-hidden bg-[#0d1321] transition-all duration-300 ease-in-out md:hidden ${isOpen
                        ? "max-h-64 border-t border-white/10"
                        : "max-h-0"
                    }`}
            >
                <ul className="py-2">
                    <li>
                        <Link
                            to="/motorcycle-search"
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center justify-between px-6 py-4 text-sm font-medium tracking-wide text-gray-300 transition-all duration-200 hover:bg-white/5 hover:pl-8 hover:text-[#f18f01]"
                        >
                            <span>Motorcycle Search</span>

                            <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                                →
                            </span>
                        </Link>
                    </li>

                    <li className="mx-6 border-t border-white/10" />

                    <li>
                        <Link
                            to="/analytics"
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center justify-between px-6 py-4 text-sm font-medium tracking-wide text-gray-300 transition-all duration-200 hover:bg-white/5 hover:pl-8 hover:text-[#f18f01]"
                        >
                            <span>NYC Accident Analytics</span>

                            <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                                →
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};