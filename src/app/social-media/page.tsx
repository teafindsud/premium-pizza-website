"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export default function SocialMediaPage() {
    const socials = [
        { name: "Instagram", icon: Instagram, color: "hover:text-[#E1306C]" },
        { name: "Facebook", icon: Facebook, color: "hover:text-[#4267B2]" },
        { name: "Twitter / X", icon: Twitter, color: "hover:text-[#1DA1F2]" },
        { name: "YouTube", icon: Youtube, color: "hover:text-[#FF0000]" },
    ];

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
                        <span className="text-accent tracking-[0.4em] font-sans font-bold uppercase text-sm block mb-8">Join the Community</span>
                        <h1 className="text-6xl md:text-8xl font-serif text-[#FDE8D0] leading-none mb-12">Follow Us</h1>

                        <div className="w-24 h-1 bg-accent mx-auto mb-16" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {socials.map((social) => (
                                <motion.div
                                    key={social.name}
                                    whileHover={{ y: -10 }}
                                    className="p-8 border border-white/5 rounded-3xl bg-bg-secondary/5 backdrop-blur-sm group cursor-pointer"
                                >
                                    <social.icon className={`w-12 h-12 mx-auto mb-4 text-[#C9A98D] transition-colors ${social.color}`} />
                                    <p className="text-sm font-sans tracking-widest text-[#C9A98D] uppercase">{social.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
