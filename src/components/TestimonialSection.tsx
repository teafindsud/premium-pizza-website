"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { LabelAccent } from "./SectionDivider";

interface Testimonial {
    id: number;
    name: string;
    image: string;
    rating: number;
    timestamp: string;
    text: string;
    breakdown?: {
        food: number;
        service: number;
        atmosphere: number;
    };
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "daksha dodo",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timestamp: "a month ago",
        text: "I had heard about the spot through a family member and I ended up ordering their truffle mushroom pizza with spinach pesto ravioli, the pizza was soooo fresh and soft!! The best pizza I've had in a while!! 🌸 And everyone was so super sweet but the food quality and value for money is beyond!!! Must must try!\nThey used fresh pizza sauce, brilliantly delicious truffle oil and caramelized mushrooms, simply amazing and so super authentic.",
        breakdown: { food: 5, service: 5, atmosphere: 5 }
    },
    {
        id: 2,
        name: "Rohan Sharma",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timestamp: "2 weeks ago",
        text: "Authentic Neapolitan pizza! The base was airy and light. Highly recommended for anyone looking for the real deal in town.",
        breakdown: { food: 5, service: 4, atmosphere: 5 }
    },
    {
        id: 3,
        name: "Ananya Iyer",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timestamp: "3 days ago",
        text: "Best Diavola I've ever had! The spicy honey drizzle is a game changer. Perfect atmosphere for a date night.",
        breakdown: { food: 5, service: 5, atmosphere: 5 }
    },
    {
        id: 4,
        name: "Vikram Malhotra",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timestamp: "2 months ago",
        text: "The wood-fired aroma hits you as soon as you walk in. Great service and the Margherita is simple perfection.",
        breakdown: { food: 5, service: 4, atmosphere: 5 }
    },
    {
        id: 5,
        name: "Sanya Gupta",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timestamp: "a week ago",
        text: "Obsessed with the truffle oil they use. Every bite was an explosion of flavor. The staff is very attentive!",
        breakdown: { food: 5, service: 5, atmosphere: 4 }
    },
    {
        id: 6,
        name: "Arjun Reddy",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timestamp: "4 months ago",
        text: "Finally, a place that understands what sourdough actually means. The crust is to die for.",
        breakdown: { food: 5, service: 5, atmosphere: 5 }
    },
    {
        id: 7,
        name: "Priya Varma",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timestamp: "5 days ago",
        text: "The selection of cheeses is impressive. The atmosphere feels like a small corner of Naples. Truly premium.",
        breakdown: { food: 5, service: 5, atmosphere: 5 }
    },
    {
        id: 8,
        name: "Kabir Singh",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        timestamp: "3 weeks ago",
        text: "Value for money despite being premium quality. The portions are generous and the ingredients are top-notch.",
        breakdown: { food: 4, service: 5, atmosphere: 5 }
    },
];

// Combine testimonials to create an infinite effect by cloning
const EXTENDED_TESTIMONIALS = [
    ...TESTIMONIALS,
    ...TESTIMONIALS,
    ...TESTIMONIALS
];

export default function TestimonialSection() {
    const originalCount = TESTIMONIALS.length;
    // Start index points to the beginning of the second TESTIMONIALS block
    const [activeIndex, setActiveIndex] = useState(originalCount);
    const [isPaused, setIsPaused] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const effectiveWidth = isMounted ? windowWidth : 1200;
    const isMobile = effectiveWidth < 640;
    const isTablet = effectiveWidth < 1024 && effectiveWidth >= 640;

    const cardWidth = isMobile ? 320 : 400;
    const gap = isMobile ? 16 : 32;
    const stepSize = cardWidth + gap;

    const next = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => prev + 1);
    }, [isAnimating]);

    const prev = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => prev - 1);
    }, [isAnimating]);

    // Handle loop jump
    const onAnimationComplete = () => {
        setIsAnimating(false);
        if (activeIndex >= originalCount * 2) {
            setActiveIndex(activeIndex - originalCount);
        } else if (activeIndex < originalCount) {
            setActiveIndex(activeIndex + originalCount);
        }
    };

    useEffect(() => {
        if (!isPaused && !isAnimating) {
            const timer = setInterval(next, 2500);
            return () => clearInterval(timer);
        }
    }, [next, isPaused, isAnimating]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [next, prev]);

    return (
        <section className="relative py-24 md:py-32 bg-[#FDF8F3] md:bg-bg-primary overflow-hidden">
            <div className="relative z-10 mx-auto max-w-[2000px]">
                <div className="text-center mb-16 md:mb-20 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <LabelAccent />
                        <span className="text-accent tracking-[0.2em] font-sans font-medium uppercase text-[11px] md:text-xs block mb-2">Our Community</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-primary leading-[1.15]">What Our People Say About Us</h2>
                    </motion.div>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative w-full overflow-hidden h-[450px] md:h-[550px]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        className="flex absolute left-1/2"
                        initial={false}
                        animate={{
                            x: -activeIndex * stepSize - cardWidth / 2,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: [0.32, 0.72, 0, 1] // Snappy but smooth ease
                        }}
                        onAnimationComplete={onAnimationComplete}
                        style={{ width: EXTENDED_TESTIMONIALS.length * stepSize }}
                    >
                        {EXTENDED_TESTIMONIALS.map((testimonial, i) => {
                            const distance = Math.abs(i - activeIndex);

                            // Scaling logic
                            let scale = 0.7;
                            let opacity = 0.4;
                            let zIndex = 0;

                            if (distance === 0) {
                                scale = 1.0;
                                opacity = 1.0;
                                zIndex = 10;
                            } else if (distance === 1) {
                                scale = 0.85;
                                opacity = 0.7;
                                zIndex = 5;
                            } else if (distance === 2) {
                                scale = 0.7;
                                opacity = 0.4;
                                zIndex = 0;
                            }

                            // Mobile: Hide others
                            if (isMobile && distance > 0) {
                                opacity = 0;
                            } else if (isTablet && distance > 1) {
                                opacity = 0;
                            } else if (!isMobile && !isTablet && distance > 2) {
                                opacity = 0;
                            }

                            return (
                                <motion.div
                                    key={`${testimonial.id}-${i}`}
                                    animate={{ scale, opacity }}
                                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                                    style={{
                                        width: cardWidth,
                                        marginRight: gap,
                                        zIndex
                                    }}
                                    className="flex-shrink-0"
                                >
                                    <div className="bg-bg-secondary rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-border/10 flex flex-col h-[350px] md:h-[450px] h-full transition-shadow duration-300 hover:shadow-[0_12px_48px_rgba(42,20,16,0.14)]">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
                                                <Image
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-primary text-lg leading-tight">{testimonial.name}</h4>
                                                <span className="text-secondary/60 text-xs tracking-wide">4 reviews</span>
                                            </div>
                                            <div className="ml-auto text-secondary/40">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                                                ))}
                                            </div>
                                            <span className="text-secondary/60 text-sm">{testimonial.timestamp}</span>
                                        </div>

                                        <p className="text-secondary leading-[1.75] text-[0.9375rem] mb-6 flex-grow line-clamp-6">
                                            {testimonial.text}
                                        </p>

                                        {testimonial.breakdown && (
                                            <div className="mt-auto pt-6 border-t border-border/20 flex flex-wrap gap-x-4 gap-y-2 text-[10px] md:text-xs font-medium text-secondary/70 uppercase tracking-widest">
                                                <span>Food: {testimonial.breakdown.food}/5</span>
                                                <span className="text-border/40">|</span>
                                                <span>Service: {testimonial.breakdown.service}/5</span>
                                                <span className="text-border/40">|</span>
                                                <span>Atmosphere: {testimonial.breakdown.atmosphere}/5</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-center items-center gap-6 mt-0 md:mt-4 relative z-20">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prev}
                        className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary bg-white shadow-lg hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={next}
                        className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary bg-white shadow-lg hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>

            {/* Subtle background glow enhancement */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
