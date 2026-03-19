"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContactUsPage() {
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
                        <span className="text-accent tracking-[0.4em] font-sans font-bold uppercase text-sm block mb-8">Visit Us</span>
                        <h1 className="text-6xl md:text-8xl font-serif text-[#FDE8D0] leading-none mb-12">Get in Touch</h1>

                        <div className="w-24 h-1 bg-accent mx-auto mb-16" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-bg-secondary/5 p-12 rounded-3xl backdrop-blur-sm border border-white/10">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-serif text-[#FDE8D0]">The Gallery</h3>
                                <p className="text-[#C9A98D] italic leading-relaxed">
                                    123 Artisan Way, Flavor District<br />
                                    Mumbai, India 400001
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-3xl font-serif text-[#FDE8D0]">Hours</h3>
                                <p className="text-[#C9A98D] italic leading-relaxed">
                                    Mon - Thu: 12pm - 11pm<br />
                                    Fri - Sun: 12pm - 1am
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
