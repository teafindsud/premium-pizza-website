"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center py-48 px-8 md:px-24 bg-[#140A07] overflow-hidden">
            {/* Oven Glow Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2A1410_0%,#140A07_100%)] opacity-80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,#E63946_0%,transparent_70%)] blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <span className="text-[#E63946] tracking-[0.2em] font-sans font-medium uppercase text-[11px] block mb-10">Limited Availability</span>
                    <h2 className="text-6xl md:text-9xl font-serif text-[#FDE8D0] leading-[1.15] mb-10">Find Your<br />Perfect Slice</h2>
                    <p className="text-xl md:text-3xl text-[#C9A98D] leading-relaxed font-sans max-w-2xl mb-16 opacity-80 italic" style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
                        “From classic Margherita to bold creations — every bite tells a story.”
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-12 py-6 bg-red-gradient text-white text-xl font-sans font-bold rounded-full relative overflow-hidden shadow-2xl btn-premium hover:shadow-accent/40"
                    >
                        <span className="relative z-10 tracking-[0.1em] uppercase">Order Now</span>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transition-all duration-300 group-hover:h-full" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Footer Minimal */}
            <div className="absolute bottom-12 left-0 w-full px-12 flex flex-col md:flex-row items-center justify-between text-[#C9A98D]/30 text-xs font-sans tracking-[0.2em] uppercase">
                <div className="mb-4 md:mb-0">© 2026 Premium Artisan Pizzeria</div>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-[#E63946] transition-colors">Privacy</a>
                    <a href="#" className="hover:text-[#E63946] transition-colors">Terms</a>
                    <a href="#" className="hover:text-[#E63946] transition-colors">Contact</a>
                </div>
            </div>
        </section>
    );
}
