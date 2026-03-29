"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Instagram, Facebook, Twitter, MapPin, Phone, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Order Now", href: "/order-now" },
    { name: "Social Media", href: "/social-media" },
    { name: "Contact Us", href: "/contact-us" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-2 md:px-10 ${scrolled ? "pt-3 md:pt-5" : "pt-5 md:pt-9"
                }`}
        >
            <div className="mx-auto max-w-[1800px]">
                <div className={`relative flex items-center justify-between px-4 md:px-12 py-3 rounded-3xl transition-all duration-500 border border-white/5 ${scrolled
                    ? "bg-[#140A07]/90 backdrop-blur-2xl shadow-2xl scale-[0.98]"
                    : "bg-[#140A07]/60 backdrop-blur-md"
                    }`}>

                    {/* LEFT: Hamburger Menu */}
                    <div className="w-[40px] md:w-auto flex-shrink-0 flex items-center justify-start">
                        <div className="relative group">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="w-10 h-10 flex flex-col items-start justify-center gap-1.5 focus:outline-none"
                            >
                                <motion.span
                                    animate={isMenuOpen ? { rotate: 45, y: 7, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                                    className="h-0.5 bg-white rounded-full transition-all duration-300"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0, width: 16 }}
                                    className="h-0.5 bg-white rounded-full transition-all duration-300"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { rotate: -45, y: -7, width: 24 } : { rotate: 0, y: 0, width: 20 }}
                                    className="h-0.5 bg-white rounded-full transition-all duration-300"
                                />
                            </motion.button>

                            {/* Desktop Hover Dropdown */}
                            <div className="hidden md:block absolute top-full left-0 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                                <div className="bg-[#1A0F0C] border border-white/10 rounded-2xl p-6 shadow-2xl min-w-[240px]">
                                    <ul className="space-y-4">
                                        {NAV_ITEMS.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className="nav-link-hover text-[#C9A98D] hover:text-white transition-colors block text-sm font-sans tracking-widest uppercase"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                                        <Instagram className="w-5 h-5 text-[#C9A98D] hover:text-white cursor-pointer transition-colors" />
                                        <Facebook className="w-5 h-5 text-[#C9A98D] hover:text-white cursor-pointer transition-colors" />
                                        <Twitter className="w-5 h-5 text-[#C9A98D] hover:text-white cursor-pointer transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CENTER: Brand Name */}
                    <Link href="/" className="flex-1 text-center flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="text-3xl sm:text-4xl md:text-7xl font-cursive text-[#FDE8D0] drop-shadow-[0_4px_15_rgba(0,0,0,0.5)] tracking-wider leading-none px-2 py-1.5 whitespace-nowrap"
                            style={{
                                textShadow: "0 0 30px rgba(253, 232, 208, 0.3)",
                            }}
                        >
                            Pizza Galeria
                        </motion.span>
                    </Link>

                    {/* RIGHT: CTA Button */}
                    <div className="w-[40px] md:w-auto flex-shrink-0 flex justify-end">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/order-now"
                                className="group relative w-10 h-10 md:w-auto md:h-auto md:px-6 md:py-2.5 bg-accent text-white font-sans font-bold rounded-full overflow-hidden shadow-xl btn-premium flex items-center justify-center"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1.5 md:gap-2">
                                    <ShoppingBag className="w-5 h-5 md:w-4 md:h-4" />
                                    <span className="tracking-wider hidden md:block text-sm">ORDER NOW</span>
                                </span>
                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20 transition-all duration-300 group-hover:h-full" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile Slide-down Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden absolute top-full left-0 w-full mt-4 px-6 overflow-hidden"
                        >
                            <div className="bg-[#1A0F0C] border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <ul className="space-y-6">
                                    {NAV_ITEMS.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-2xl font-serif text-[#FDE8D0] hover:text-accent transition-colors block"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <p className="text-[#C9A98D]/40 text-[10px] uppercase tracking-[0.2em]">Contact</p>
                                        <div className="flex items-center gap-3 text-[#FDE8D0] text-sm italic">
                                            <Phone className="w-4 h-4 text-accent" />
                                            <span>+91 98765 43210</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3 font-sans">
                                        <p className="text-[#C9A98D]/40 text-[10px] uppercase tracking-[0.2em]">Follow</p>
                                        <div className="flex gap-4">
                                            <Instagram className="w-5 h-5 text-[#C9A98D] hover:text-accent cursor-pointer" />
                                            <Facebook className="w-5 h-5 text-[#C9A98D] hover:text-accent cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
