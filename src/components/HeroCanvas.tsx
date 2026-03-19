"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, useSpring, motion, useVelocity } from "framer-motion";
import Link from "next/link";

const TOTAL_FRAMES = 20;

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

        const ZOOM_OUT = 0.50;

        const render = () => {
            const index = Math.round(frameIndex.get());
            const img = images[index] || images[0];

            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // On mobile: scale by width so full frame width is visible,
                // then divide by zoomOutFactor to zoom out slightly.
                const scale = (canvas.width / img.width) / ZOOM_OUT;
                const x = (canvas.width - img.width * scale) / 2;  // centers tiny horizontal offset
                const y = 0;  // top-aligned
                context.fillStyle = '#1a0e0a';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            } else {
                // Desktop: keep original cover-fit behavior exactly as before
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const unsubscribe = frameIndex.on("change", render);

        // Initial render
        render();

        const handleResize = () => {
            const isMobileResize = window.innerWidth <= 768;
            if (isMobileResize) {
                const img = images[0];
                const w = window.innerWidth;
                const scale = (w / img.width) / ZOOM_OUT;
                const h = Math.round(img.height * scale);
                canvas.width = w;
                canvas.height = h;
                setMobileHeroHeight(h);
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                setMobileHeroHeight(null);
            }
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
        <div
            ref={containerRef}
            className="relative w-full bg-transparent md:bg-dark overflow-clip md:h-[1000px]"
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
                {/* Aggressive cache-busting style injection */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @media (max-width: 768px) {
                            #pizza-canvas {
                                transform: none !important;
                                width: 100% !important;
                                height: 100% !important;
                                max-width: 100vw !important;
                                object-fit: cover !important;
                                display: block !important;
                            }
                            [data-hero-wrapper] {
                                background: transparent !important;
                                margin-top: 0 !important;
                                padding-top: 0 !important;
                            }
                            [data-hero-wrapper] > div:first-child {
                                top: 0 !important;
                                margin-top: 0 !important;
                            }
                        }
                    `
                }} />

                <canvas
                    id="pizza-canvas"
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-95"
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
                                    color: "#140A07"
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
