"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, useSpring, motion, useVelocity } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 20;

const Section = ({ children, opacity, y }: { children: React.ReactNode, opacity: any, y?: any }) => (
    <motion.div
        style={{ opacity, y }}
        className="max-w-2xl absolute h-fit flex flex-col items-start justify-start"
    >
        {children}
    </motion.div>
);

export default function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scrollVelocity = useVelocity(scrollYProgress);
    const smoothVelocity = useSpring(scrollVelocity, {
        stiffness: 100,
        damping: 30
    });

    const frameIndex = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]),
        {
            stiffness: 70,
            damping: 25,
            mass: 0.8,
            restDelta: 0.0005,
        }
    );

    // Smooth scroll progress for text transitions
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001
    });

    // Text opacity transitions
    const text1Opacity = useTransform(smoothProgress, [0, 0.4, 0.6], [1, 1, 0]);
    const text3Opacity = useTransform(smoothProgress, [0.45, 0.65, 1], [0, 1, 1]);

    // Text vertical motion transitions
    const text1Y = useTransform(smoothProgress, [0.4, 0.6], [0, -40]);
    const text3Y = useTransform(smoothProgress, [0.45, 0.65], [40, 0]);

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/frames/frame_${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
                if (loadedCount === TOTAL_FRAMES) {
                    setImages(loadedImages);
                }
            };
            loadedImages[i] = img;
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const render = () => {
            const index = Math.round(frameIndex.get());
            const img = images[index] || images[0];

            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        const unsubscribe = frameIndex.on("change", render);

        // Initial render
        render();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[1000px] w-full bg-dark overflow-clip">
            {/* Loading Progress */}
            {loadProgress < 100 && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark text-primary">
                    <div className="text-3xl font-serif italic mb-4">Crafting Perfection...</div>
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${loadProgress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover opacity-95"
                    style={{
                        filter: "contrast(1.05) saturate(1.1)",
                    }}
                />

                {/* Soft Light Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-bg-primary/20" />

                {/* Floating Particles/Steam using motion.div */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                        y: useTransform(smoothVelocity, [-1, 1], [50, -50]),
                    }}
                >
                    {/* We can simulate steam with SVG filters or just subtle overlays */}
                    <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                </motion.div>

                {/* Hero Text Sections */}
                <div className="absolute inset-0 z-10 pointer-events-none px-8 md:px-24 pt-32 md:pt-40 flex flex-col items-start justify-start">
                    <Section opacity={text1Opacity} y={text1Y}>
                        <h1 className="text-7xl md:text-9xl font-serif mb-6 text-primary leading-tight">
                            Artisan <br /> Pizza
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary font-sans tracking-wide">
                            Hand-stretched. Wood-fired. Perfected.
                        </p>
                    </Section>

                    <Section opacity={text3Opacity} y={text3Y}>
                        <h2 className="text-7xl md:text-9xl font-serif mb-6 text-primary leading-tight">
                            Fired to <br /> Perfection
                        </h2>
                        <p className="text-xl md:text-2xl text-secondary mb-10 font-sans tracking-wide">
                            Tradition meets modern craft.
                        </p>
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 40px rgba(230, 57, 70, 0.6)",
                                backgroundColor: "#FDE8D0",
                                color: "#140A07"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="pointer-events-auto px-10 py-5 bg-red-gradient text-white text-lg font-sans font-semibold rounded-full flex items-center gap-3 shadow-lg shadow-accent/20 transition-colors duration-300"
                        >
                            Explore Menu <ChevronDown className="w-5 h-5" />
                        </motion.button>
                    </Section>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}
