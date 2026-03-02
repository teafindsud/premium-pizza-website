"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const FEATURES = [
    {
        id: 1,
        title: "Wood-Fired Oven",
        description: "Our ovens are kept at a constant 450°C, ensuring a perfectly charred crust and tender base in under 90 seconds.",
        image: "/images/oven.png",
        position: "left",
    },
    {
        id: 2,
        title: "Fresh Local Ingredients",
        description: "We source our flour from Campania and our tomatoes from the slopes of Vesuvius, paired with local artisan cheeses.",
        image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800",
        position: "right",
    },
    {
        id: 3,
        title: "Hand-Stretched Dough",
        description: "Naturally leavened for 48 hours, each dough is hand-stretched to ensure a light, airy cornicione every time.",
        image: "/images/dough.png",
        position: "left",
    },
    {
        id: 4,
        title: "Authentic Italian Craft",
        description: "Following the traditions passed down through generations, we treat every pizza as a masterpiece.",
        image: "/images/craft.png",
        position: "right",
    }
];

export default function FeatureSection() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <section ref={containerRef} className="relative py-48 px-8 md:px-24 bg-dark overflow-hidden">
            {/* Center Rotating Pizza (Subtle Background) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none opacity-10">
                <motion.div
                    style={{ rotate }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1571066811402-9d8d77596f91?auto=format&fit=crop&q=80&w=1200"
                        alt="Rotating Masterpiece"
                        fill
                        className="object-contain rounded-full"
                    />
                </motion.div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="flex flex-col gap-32 md:gap-64">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col md:flex-row items-center gap-12 ${feature.position === "right" ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Feature Image */}
                            <div className="relative w-full md:w-1/2 h-80 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-border/30">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Feature Text */}
                            <div className={`flex flex-col gap-6 w-full md:w-1/2 ${feature.position === "right" ? "md:items-end md:text-right" : "md:items-start"}`}>
                                <span className="text-secondary font-serif text-3xl italic opacity-40">0{idx + 1}</span>
                                <h3 className="text-4xl md:text-6xl font-serif text-primary leading-tight">{feature.title}</h3>
                                <p className="text-xl text-secondary leading-relaxed font-sans max-w-md">{feature.description}</p>
                                <div className={`h-1 w-24 bg-accent ${feature.position === "right" ? "ml-auto" : ""}`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
