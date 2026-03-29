"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OrderNowPage() {
    return (
        <main className="min-h-screen bg-dark pt-32 px-8 md:px-24">
            <section className="relative py-24 flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2A1410_0%,#140A07_100%)] opacity-80" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-accent tracking-[0.4em] font-sans font-bold uppercase text-sm block mb-8">Fresh & Fast</span>
                        <h1 className="text-6xl md:text-8xl font-serif text-[#FDE8D0] leading-none mb-12">Order Your<br />Favorite Pizza</h1>

                        <div className="w-24 h-1 bg-accent mx-auto mb-16" />

                        <div className="bg-bg-secondary/5 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
                            <p className="text-xl text-[#C9A98D] italic mb-8">Online ordering system is coming soon!</p>
                            <div className="flex flex-col md:flex-row gap-6 justify-center">
                                <div className="px-8 py-4 bg-accent/20 border border-accent/30 rounded-full text-accent font-bold uppercase tracking-widest text-sm">
                                    Call to Order: +91 98765 43210
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
