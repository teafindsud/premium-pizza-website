"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, motion, useVelocity } from "framer-motion";
import Link from "next/link";

const TOTAL_FRAMES = 20;
const ZOOM_OUT = 0.80; // Fix #5: was 0.50, which doubled canvas height unnecessarily

const Section = ({ children, opacity, y }: { children: React.ReactNode, opacity: any, y?: any }) => (
    <motion.div
        style={{ opacity, y }}
        className="absolute left-[20px] md:left-[80px] top-32 md:top-40 pr-[20px] md:pr-0 w-full max-w-[calc(100vw-40px)] md:max-w-2xl h-fit flex flex-col items-start justify-start"
    >
        {children}
    </motion.div>
);

export default function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadProgress, setLoadProgress] = useState(0);
    const [mobileHeroHeight, setMobileHeroHeight] = useState<number | null>(null);

    const { scrollY } = useScroll();
    const scrollYProgress = useTransform(scrollY, (val) => {
        if (!containerRef.current) return 0;
        const rect = containerRef.current.getBoundingClientRect();
        const containerTop = rect.top + val;
        const containerHeight = rect.height;
        if (containerHeight === 0) return 0;
        const isMobile = window.innerWidth <= 768;
        const rawProgress = val / (containerTop + containerHeight);
        const progress = isMobile ? rawProgress * 8 : rawProgress;
        return Math.min(Math.max(progress, 0), 1);
    });
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        stiffness: 100,
        damping: 30,
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

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001,
    });

    const text1Opacity = useTransform(smoothProgress, [0, 0.4, 0.6], [1, 1, 0]);
    const text3Opacity = useTransform(smoothProgress, [0.45, 0.65, 1], [0, 1, 1]);
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
                    setImages([...loadedImages]);
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
            if (!img || !img.complete) return; // guard against unloaded frames

            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                const scale = (canvas.width / img.width) / ZOOM_OUT;
                const x = (canvas.width - img.width * scale) / 2;
                const y = 0;
                context.fillStyle = "#1a0e0a";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            } else {
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = canvas.width / 2 - (img.width / 2) * scale;
                const y = canvas.height / 2 - (img.height / 2) * scale;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const unsubscribe = frameIndex.on("change", render);

        // Fix #1 & #2: guard against missing image, set canvas dimensions BEFORE render()
        const handleResize = () => {
            const img = images[0];
            if (!img || !img.complete) return; // Fix #1: guard against undefined/unloaded

            const isMobileResize = window.innerWidth <= 768;

            if (isMobileResize) {
                const w = window.innerWidth;
                const scale = (w / img.width) / ZOOM_OUT;
                const h = Math.round(img.height * scale);
                // Fix #2: assign dimensions BEFORE calling render()
                canvas.width = w;
                canvas.height = h;
                setMobileHeroHeight(h);
            } else {
                // Fix #2: assign dimensions BEFORE calling render()
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                setMobileHeroHeight(null);
            }

            render(); // now always called after canvas dimensions are correct
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // initial sizing + render

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [images, frameIndex]);

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-dark overflow-clip md:h-[1000px]"
            style={mobileHeroHeight ? { height: `${mobileHeroHeight}px` } : undefined}
            data-hero-wrapper
        >
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
            <div className="absolute inset-0 z-0 h-full md:sticky md:top-0 md:h-screen overflow-hidden">
                {/*
                    Fix #3: Removed the injected <style> block entirely.
                    - `object-fit: cover` on <canvas> is a no-op (Fix #3).
                    - Forcing `height: 100%` via CSS fights the JS-controlled
                      canvas.height drawing buffer and causes blurry/stretched
                      frames on mobile (Fix #4).
                    The canvas dimensions are now fully managed by JS in handleResize.
                */}

                <canvas
                    id="pizza-canvas"
                    ref={canvasRef}
                    // Fix #3: removed `object-fit: cover` — has no effect on <canvas>
                    // Fix #4: removed forced CSS height; canvas size is set via JS only
                    className="opacity-95"
                    style={{
                        filter: "contrast(1.05) saturate(1.1)",
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                />

                {/* Soft Light Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-bg-primary/20" />

                {/* Floating Particles/Steam */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                        y: useTransform(smoothVelocity, [-1, 1], [50, -50]),
                    }}
                >
                    <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                </motion.div>

                {/* Hero Text Sections */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <Section opacity={text1Opacity} y={text1Y}>
                        <h1 className="text-[clamp(2.8rem,9vw,4.5rem)] md:text-9xl font-serif mb-6 text-[#FDF8F3] leading-[1.1] md:leading-tight">
                            Artisan <br /> Pizza
                        </h1>
                        <p className="text-[1rem] md:text-2xl text-[#F7E7D6] font-sans tracking-wide">
                            Hand-stretched. Wood-fired. Perfected.
                        </p>
                    </Section>

                    <Section opacity={text3Opacity} y={text3Y}>
                        <h2 className="text-[clamp(2.8rem,9vw,4.5rem)] md:text-9xl font-serif mb-6 text-[#FDF8F3] leading-[1.1] md:leading-tight">
                            Fired to <br /> Perfection
                        </h2>
                        <p className="text-[1rem] md:text-2xl text-[#F7E7D6] mb-10 font-sans tracking-wide">
                            Tradition meets modern craft.
                        </p>
                        <Link href="/menu">
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 40px rgba(230, 57, 70, 0.6)",
                                    backgroundColor: "#FDE8D0",
                                    color: "#140A07",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="pointer-events-auto px-10 py-5 bg-red-gradient text-white text-lg font-sans font-semibold rounded-full shadow-lg shadow-accent/20 transition-colors duration-300 cursor-pointer"
                            >
                                Explore Menu
                            </motion.button>
                        </Link>
                    </Section>
                </div>
            </div>
        </div>
    );
}