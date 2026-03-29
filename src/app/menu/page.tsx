"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ───────────────────────── DATA ───────────────────────── */

interface PizzaItem {
    name: string;
    description: string;
    napolitana?: number;
    romanaSlice?: number;
    siciliana?: number;
    spicy?: 1 | 2;
    mushroom?: boolean;
}

const PIZZAS: PizzaItem[] = [
    { name: "Marinara", description: "Tomato sauce · garlic slices · fresh basil · extra virgin olive oil · parmesan", napolitana: 350, romanaSlice: 200, siciliana: 340 },
    { name: "Queen's Margherita", description: "Tomato sauce · buffalo mozzarella · basil · extra virgin olive oil · parmesan", napolitana: 400, romanaSlice: 220, siciliana: 400 },
    { name: "Aioli Margherita", description: "Tomato sauce · buffalo mozzarella · garlic slices · herb oil · extra virgin olive oil · parmesan", napolitana: 420, romanaSlice: 230 },
    { name: "Caramelised Onions", description: "Tomato sauce · buffalo mozzarella · caramelised onions · extra virgin olive oil · parmesan", napolitana: 430, romanaSlice: 240, siciliana: 430 },
    { name: "Veggie Delight", description: "Tomato sauce · buffalo mozzarella · bell peppers · caramelised onions · black olives · extra virgin olive oil · parmesan", napolitana: 440, romanaSlice: 250 },
    { name: "Picante", description: "Tomato sauce · buffalo mozzarella · jalapenos · paprika · black olives · button mushrooms · parmesan", napolitana: 440, romanaSlice: 250, siciliana: 440, spicy: 2, mushroom: true },
    { name: "Green Margherita", description: "Tomato sauce · buffalo mozzarella · basil pesto · extra virgin olive oil · parmesan", napolitana: 450, romanaSlice: 250 },
    { name: "Sundried Tomatoes", description: "Tomato sauce · buffalo mozzarella · sundried tomatoes · extra virgin olive oil · parmesan", napolitana: 450, romanaSlice: 250, siciliana: 450 },
    { name: "All Peppers", description: "Tomato sauce · buffalo mozzarella · bell peppers · jalapenos · paprika · spicy marinara · tabasco · parmesan", napolitana: 480, romanaSlice: 260, siciliana: 480, spicy: 2 },
    { name: "Quattro Formaggi", description: "Tomato sauce · buffalo mozzarella · mascarpone · goat cheese · parmesan · extra virgin olive oil", napolitana: 480, romanaSlice: 260, siciliana: 480 },
    { name: "Pesto Sundried", description: "Tomato sauce · buffalo mozzarella · basil pesto · sundried tomatoes · extra virgin olive oil · parmesan", napolitana: 500, romanaSlice: 270 },
    { name: "Truffle Mushroom", description: "Tomato sauce · buffalo mozzarella · black truffle creme · button mushrooms · white truffle oil · extra virgin olive oil · parmesan", napolitana: 500, romanaSlice: 270, mushroom: true },
    { name: "Rosso", description: "Tomato sauce · buffalo mozzarella · sundried tomatoes pesto · extra virgin olive oil · parmesan", napolitana: 500, romanaSlice: 270 },
    { name: "Truffle Rosso", description: "Tomato sauce · buffalo mozzarella · button mushrooms · sundried tomatoes · truffle butter · extra virgin olive oil · parmesan", napolitana: 500, romanaSlice: 270, mushroom: true },
    { name: "Tuscan Sundried", description: "Tomato sauce · buffalo mozzarella · basil · jalapenos · caramelised onions · sundried tomatoes · extra virgin olive oil · parmesan", napolitana: 500, romanaSlice: 270, siciliana: 500 },
    { name: "Al Fungi", description: "Mushroom sauce · buffalo mozzarella · paprika · sundried tomatoes · button mushrooms · extra virgin olive oil · parmesan", napolitana: 500, romanaSlice: 270, mushroom: true },
    { name: "Truffata", description: "Tomato sauce · buffalo mozzarella · jalapenos · paprika · black olives · sundried tomatoes · truffle butter · extra virgin olive oil · parmesan", napolitana: 520, romanaSlice: 280, spicy: 1 },
    { name: "Picante Goat Cheese", description: "Tomato sauce · buffalo mozzarella · jalapenos · paprika · black olives · button mushrooms · goat cheese · extra virgin olive oil · parmesan", napolitana: 540, romanaSlice: 290, siciliana: 540, spicy: 2, mushroom: true },
    { name: "Sundried Goat Cheese", description: "Tomato sauce · buffalo mozzarella · sundried tomatoes · goat cheese · extra virgin olive oil · parmesan", napolitana: 550, romanaSlice: 300, siciliana: 550 },
    { name: "Cherry Truffata", description: "Cherry tomato sauce · buffalo mozzarella · jalapenos · paprika · black olives · sundried tomatoes · truffle butter · extra virgin olive oil · parmesan", napolitana: 550, romanaSlice: 300, siciliana: 550, spicy: 2 },
];

interface DescItem {
    name: string;
    description: string;
    price: number;
    spicy?: 1 | 2;
    mushroom?: boolean;
}

const GARLIC_BREADS: DescItem[] = [
    { name: "No-Cheese", description: "Garlic and parsley", price: 320 },
    { name: "Cheesy", description: "Low moisture mozzarella and parsley", price: 340 },
    { name: "Jalapeno, Paprika & Olives", description: "Low moisture mozzarella · jalapenos · paprika and black olives", price: 360, spicy: 2 },
    { name: "Sundried Tomatoes & Paprika", description: "Low moisture mozzarella · paprika and sundried tomatoes", price: 380, spicy: 1 },
    { name: "Mushrooms & Caramelised Onions", description: "Low moisture mozzarella · caramelised onions · jalapenos · paprika and button mushrooms", price: 400, mushroom: true },
    { name: "Four-Cheese", description: "Low moisture mozzarella · buffalo mozzarella · cheddar · parmesan and parsley", price: 420 },
    { name: "Truffle", description: "Low moisture mozzarella · jalapenos · paprika · black olives · button mushrooms and truffle butter", price: 440, spicy: 2, mushroom: true },
];

const SANDWICHES: DescItem[] = [
    { name: "Pesto", description: "Creamy pesto sauce · buffalo mozzarella · button mushrooms and black olives", price: 360 },
    { name: "Marinara", description: "Marinara sauce · buffalo mozzarella · jalapenos · paprika · black olives and ranch", price: 380, spicy: 1 },
];

const POCKET_PIZZAS: DescItem[] = [
    { name: "Tri-Cheese", description: "Siracha sour cream · cheddar · parmesan · buffalo mozzarella · caramelised onion · extra virgin olive oil", price: 320 },
    { name: "Mushroom & Caramelised Onions", description: "Siracha sour cream · black truffle creme · cheddar · parmesan · buffalo mozzarella · caramelised onion · button mushrooms · extra virgin olive oil", price: 340, spicy: 1 },
];

interface SimpleItem { name: string; price: number; spicy?: 1 | 2; mushroom?: boolean; }

const PASTAS: SimpleItem[] = [
    { name: "Alfredo", price: 320 },
    { name: "Aglio Olio", price: 320, spicy: 2 },
    { name: "Arrabiata", price: 320, spicy: 1 },
    { name: "Al Pomodoro", price: 320 },
    { name: "Rosa Pomodoro", price: 320, spicy: 1 },
    { name: "Cherry Tomato", price: 350 },
    { name: "Pesto", price: 350 },
    { name: "Truffle Mushroom", price: 380, mushroom: true },
];

const PASTA_SHAPES = ["Penne", "Fusilli", "Farfalle", "Spaghetti", "Fettuccini"];

const SPECIAL_PASTAS: DescItem[] = [
    { name: "Pesto Arancini", description: "Creamy pesto spaghetti balls served with marinara and basil", price: 350 },
    { name: "Spinach & Ricotta Ravioli", description: "In any sauce", price: 400 },
    { name: "Mushroom & Cream Cheese Ravioli", description: "In any sauce", price: 420 },
];

const SIDES: SimpleItem[] = [
    { name: "Salted Fries", price: 150 },
    { name: "Peri Peri Fries", price: 180 },
    { name: "Truffle Parmesan Fries", price: 220 },
    { name: "Quattro Fries", price: 220 },
    { name: "Cheesy Fries", price: 250 },
    { name: "Salted Mozzarella Sticks", price: 180 },
    { name: "Peri Peri Mozzarella Sticks", price: 200 },
    { name: "Truffle Parmesan Mozzarella Sticks", price: 220 },
    { name: "Pasta Chips", price: 180 },
    { name: "Onion Rings", price: 180 },
];

const COOLERS: SimpleItem[] = [
    { name: "Lemon Soda", price: 150 },
    { name: "Lemon Ice Tea", price: 150 },
    { name: "Peach Ice Tea", price: 150 },
    { name: "Mint Mojito", price: 150 },
    { name: "Watermelon Mojito", price: 150 },
    { name: "Cucumber Mojito", price: 150 },
];

const COLD_COFFEES: SimpleItem[] = [
    { name: "Classic Vanilla", price: 180 },
    { name: "Hazelnut", price: 200 },
    { name: "Cookie & Creme", price: 200 },
    { name: "Caramel", price: 200 },
    { name: "Nutella", price: 200 },
    { name: "Okinawa", price: 240 },
    { name: "Javachip", price: 240 },
];

const SHAKES: SimpleItem[] = [
    { name: "Blueberry", price: 200 },
    { name: "Strawberry", price: 200 },
    { name: "Caramel", price: 200 },
    { name: "Nutella", price: 220 },
    { name: "Cookie & Creme", price: 220 },
    { name: "Tres Leches", price: 250 },
    { name: "Tiramisu", price: 250 },
    { name: "Biscoff", price: 280 },
    { name: "Blueberry Caramel", price: 280 },
    { name: "Strawberry Caramel", price: 280 },
];

const DIPS: SimpleItem[] = [
    { name: "Ranch", price: 30 },
    { name: "Marinara", price: 30 },
    { name: "Siracha Sour Cream", price: 30 },
    { name: "Spicy Marinara", price: 40 },
    { name: "Pesto", price: 50 },
];

const ADD_ONS: SimpleItem[] = [
    { name: "Garlic Oil", price: 30 },
    { name: "Chilli Oil", price: 30 },
    { name: "Bell Peppers / Mushrooms / Olives / Onions", price: 40 },
    { name: "Jalapenos / Paprika", price: 20 },
    { name: "Bocconcini", price: 50 },
    { name: "Sundried Tomatoes", price: 70 },
    { name: "Parmesan", price: 70 },
    { name: "Pecorino", price: 90 },
    { name: "White Truffle Oil", price: 90 },
    { name: "Goat Cheese", price: 100 },
    { name: "Burrata", price: 190 },
];

/* ───────────────── CATEGORY NAV CONFIG ───────────────── */

const CATEGORIES = [
    { id: "pizzas", label: "Pizzas" },
    { id: "garlic-breads", label: "Garlic Breads" },
    { id: "sandwiches", label: "Sandwiches & Calzones" },
    { id: "pasta", label: "Pasta" },
    { id: "sides", label: "Sides" },
    { id: "beverages", label: "Beverages" },
    { id: "add-ons", label: "Add-Ons" },
];

/* ───────────────── ANIMATION VARIANTS ─────────────────── */

const EASE_CURVE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.09, duration: 0.6, ease: EASE_CURVE },
    }),
};

const sectionHeadingVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_CURVE } },
};

const imageReveal = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE_CURVE } },
};

/* ───────────────── SUB-COMPONENTS ─────────────────────── */

function PriceTag({ amount, variant }: { amount: number; variant?: "gold" | "red" }) {
    const color = variant === "gold" ? "text-[#D4AF37]" : "text-[#E63946]";
    return <span className={`${color} font-serif font-medium text-sm md:text-base whitespace-nowrap`}>₹{amount}</span>;
}

function SpicyBadge({ level, mushroom }: { level?: 1 | 2; mushroom?: boolean }) {
    return (
        <>
            {level === 1 && <span className="ml-2 text-sm" title="Mildly Spicy">🌶️</span>}
            {level === 2 && <span className="ml-2 text-sm" title="Spicy">🌶️🌶️</span>}
            {mushroom && <span className="ml-1 text-sm" title="Contains Mushroom">🍄</span>}
        </>
    );
}

/* Image column used in the alternating layout */
function SectionImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
    return (
        <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            className="relative w-full aspect-[4/3] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(42,20,16,0.12)] border border-[#E8D5C4]/50"
        >
            <Image src={src} alt={alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1410]/25 via-transparent to-transparent" />
            {caption && (
                <div className="absolute bottom-5 left-5 right-5">
                    <span className="font-cursive text-2xl md:text-3xl text-white drop-shadow-lg">{caption}</span>
                </div>
            )}
        </motion.div>
    );
}

/* ────────────── FLOATING CATEGORY BUTTON ─────────────── */

function FloatingCategoryButton({ activeId }: { activeId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const activeLabel = CATEGORIES.find((c) => c.id === activeId)?.label ?? "Menu";

    const scrollTo = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const y = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setIsOpen(false);
    }, []);

    // Close panel on outside click
    useEffect(() => {
        if (!isOpen) return;
        function handleClick(e: MouseEvent) {
            if (
                panelRef.current && !panelRef.current.contains(e.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50">
            {/* Popup Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.97 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute bottom-full left-0 mb-3 w-[240px] bg-[#FDF8F3] border border-[#E8D5C4] rounded-[20px] p-5 shadow-[0_12px_48px_rgba(42,20,16,0.18)]"
                    >
                        <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-[#5C4A44]/60 mb-3">Jump to</span>
                        <div className="space-y-0.5">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => scrollTo(cat.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${activeId === cat.id
                                        ? "bg-[#F7E7D6]"
                                        : "hover:bg-[#F7E7D6]/60"
                                        }`}
                                >
                                    <span className={`w-1.5 h-5 rounded-full flex-shrink-0 transition-colors duration-150 ${activeId === cat.id ? "bg-[#E63946]" : "bg-[#D4AF37]/40 group-hover:bg-[#D4AF37]"
                                        }`} />
                                    <span className={`font-serif text-[15px] transition-colors duration-150 ${activeId === cat.id ? "text-[#E63946] font-semibold" : "text-[#2A1410] group-hover:text-[#E63946]"
                                        }`}>
                                        {cat.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                ref={buttonRef}
                onClick={() => setIsOpen((v) => !v)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-5 py-3 md:px-6 md:py-3.5 rounded-2xl text-[#FDF8F3] shadow-[0_8px_32px_rgba(42,20,16,0.35)] transition-shadow duration-200 hover:shadow-[0_12px_40px_rgba(42,20,16,0.45)] cursor-pointer"
                style={{ background: "linear-gradient(135deg, #2A1410 0%, #140A07 100%)" }}
            >
                {/* 3x3 Grid Icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                    <circle cx="3" cy="3" r="1.5" fill="#D4AF37" />
                    <circle cx="8" cy="3" r="1.5" fill="#D4AF37" />
                    <circle cx="13" cy="3" r="1.5" fill="#D4AF37" />
                    <circle cx="3" cy="8" r="1.5" fill="#FDF8F3" />
                    <circle cx="8" cy="8" r="1.5" fill="#FDF8F3" />
                    <circle cx="13" cy="8" r="1.5" fill="#FDF8F3" />
                    <circle cx="3" cy="13" r="1.5" fill="#D4AF37" />
                    <circle cx="8" cy="13" r="1.5" fill="#D4AF37" />
                    <circle cx="13" cy="13" r="1.5" fill="#D4AF37" />
                </svg>
                <span className="font-sans text-sm font-medium tracking-wide">{activeLabel}</span>
            </motion.button>
        </div>
    );
}

/* ────────────────────── MAIN PAGE ──────────────────────── */

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState("pizzas");

    // Intersection Observer to track active section
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        CATEGORIES.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveCategory(id);
                    }
                },
                { rootMargin: "-200px 0px -50% 0px", threshold: 0 }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <main className="min-h-screen bg-[#FDF8F3] custom-scrollbar">
            {/* Hide scrollbar on nav pills */}
            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* ════════════════════ HERO BANNER ════════════════════ */}
            <section className="relative w-full pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden bg-[#1E0F0A]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[attachment:scroll] md:bg-fixed pointer-events-none"
                    style={{
                        backgroundImage: `url('/images/menu-hero-flatlay-user.jpg')`,
                        filter: "blur(2px)",
                        transform: "scale(1.06)"
                    }}
                />

                {/* Thin dark warm veil overlay for text contrast */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: "rgba(20, 10, 8, 0.40)" }}
                />

                <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-[#D4AF37] tracking-[0.2em] font-sans font-medium uppercase text-[11px] md:text-xs block mb-6"
                    >
                        Curated with Passion
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#FDF8F3] leading-[1.15] mb-6"
                    >
                        The Menu
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full origin-center"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-[#F7E7D6] font-sans text-[0.9375rem] md:text-lg max-w-2xl mx-auto leading-[1.75]"
                    >
                        Artisan pizzas, handcrafted pastas &amp; wood-fired creations — made with high-quality Italian &lsquo;00&rsquo; flour, fresh in-house doughs, and the finest locally-sourced ingredients.
                    </motion.p>
                </div>
            </section>

            {/* ════════════════════ FLOATING CATEGORY BUTTON ════════════════════ */}
            <FloatingCategoryButton activeId={activeCategory} />

            {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — PIZZAS (Odd: Image LEFT, Content RIGHT)
          ═══════════════════════════════════════════════════════════ */}
            <section id="pizzas" className="py-16 md:py-28 bg-[#FFFBF7]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-5%" }} className="mb-10 md:mb-14">
                        <h2 className="text-4xl md:text-5xl font-serif text-[#2A1410] mb-3">Pizza</h2>
                        <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />
                        <p className="mt-4 text-[#5C4A44] font-sans text-base md:text-lg max-w-2xl">Choose your base: Napolitana (round, 10-11&Prime;, 6 slices), Romana (rectangular, 8 slices, buffalo mozzarella), or Siciliana (rectangular, 8 slices, low-moisture mozzarella).</p>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* LEFT — Image */}
                        <div className="w-full lg:w-5/12 flex-shrink-0">
                            <div className="lg:sticky lg:top-[180px]">
                                <SectionImage src="/images/menu-hero-pizza.png" alt="Artisan wood-fired pizza" caption="Wood-Fired Perfection" />
                                <div className="mt-5 grid grid-cols-3 gap-3">
                                    {[
                                        { base: "Napolitana", detail: "Round  · 6 slices" },
                                        { base: "Romana", detail: "Rect  · 8 slices" },
                                        { base: "Siciliana", detail: "Rect  · 8 slices" },
                                    ].map((b) => (
                                        <motion.div key={b.base} variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#F7E7D6] rounded-xl p-3 text-center border border-[#E8D5C4]">
                                            <span className="block font-serif text-sm text-[#2A1410] font-semibold">{b.base}</span>
                                            <span className="block text-[10px] text-[#5C4A44] mt-1 font-sans">{b.detail}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Pizza List */}
                        <div className="w-full lg:w-7/12">
                            <div className="hidden md:flex items-center mb-6 pb-4 border-b-2 border-[#D4AF37]/30">
                                <span className="flex-1 font-serif text-sm text-[#5C4A44] uppercase tracking-wider">Pizza</span>
                                <span className="w-24 text-center font-sans text-xs text-[#5C4A44] uppercase tracking-wider">Napolitana</span>
                                <span className="w-24 text-center font-sans text-xs text-[#5C4A44] uppercase tracking-wider">Romana Slice</span>
                                <span className="w-24 text-center font-sans text-xs text-[#5C4A44] uppercase tracking-wider">Siciliana</span>
                            </div>

                            {PIZZAS.map((pizza, i) => (
                                <motion.div
                                    key={pizza.name}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="group py-5 border-b border-[#E8D5C4] last:border-b-0 hover:bg-[#F7E7D6]/40 px-3 -mx-3 rounded-xl transition-colors duration-300"
                                >
                                    {/* Desktop */}
                                    <div className="hidden md:flex items-start">
                                        <div className="flex-1 pr-6">
                                            <h3 className="font-serif text-xl text-[#2A1410] group-hover:text-[#E63946] transition-colors duration-300">
                                                {pizza.name}<SpicyBadge level={pizza.spicy} mushroom={pizza.mushroom} />
                                            </h3>
                                            <p className="text-[#5C4A44] font-sans text-[0.9375rem] leading-[1.75] mt-1 max-w-md">{pizza.description}</p>
                                        </div>
                                        <span className="w-24 text-center font-serif font-medium text-sm text-[#E63946]">{pizza.napolitana ? `₹${pizza.napolitana}` : "—"}</span>
                                        <span className="w-24 text-center font-serif font-medium text-sm text-[#E63946]">{pizza.romanaSlice ? `₹${pizza.romanaSlice}` : "—"}</span>
                                        <span className="w-24 text-center font-serif font-medium text-sm text-[#D4AF37]">{pizza.siciliana ? `₹${pizza.siciliana}` : "—"}</span>
                                    </div>
                                    {/* Mobile */}
                                    <div className="md:hidden">
                                        <h3 className="font-serif text-lg text-[#2A1410]">{pizza.name}<SpicyBadge level={pizza.spicy} mushroom={pizza.mushroom} /></h3>
                                        <p className="text-[#5C4A44] font-sans text-sm mt-1">{pizza.description}</p>
                                        <div className="flex gap-4 mt-3 flex-wrap">
                                            {pizza.napolitana && <span className="text-xs font-sans"><span className="text-[#5C4A44]">Napolitana </span><span className="font-bold text-[#E63946]">₹{pizza.napolitana}</span></span>}
                                            {pizza.romanaSlice && <span className="text-xs font-sans"><span className="text-[#5C4A44]">Romana </span><span className="font-bold text-[#E63946]">₹{pizza.romanaSlice}</span></span>}
                                            {pizza.siciliana && <span className="text-xs font-sans"><span className="text-[#5C4A44]">Siciliana </span><span className="font-bold text-[#D4AF37]">₹{pizza.siciliana}</span></span>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 p-5 bg-[#F7E7D6] rounded-2xl border border-[#E8D5C4]">
                                <p className="text-[#5C4A44] font-sans text-sm italic">
                                    <span className="text-[#D4AF37] font-bold not-italic">✦</span> We offer <span className="font-semibold text-[#2A1410]">half &amp; half</span> pizzas as well. All doughs are fresh &amp; made in-house using high-quality Italian &lsquo;00&rsquo; flour.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — GARLIC BREADS (Even: Content LEFT, Image RIGHT)
          ═══════════════════════════════════════════════════════════ */}
            <section id="garlic-breads" className="py-16 md:py-28 bg-[#F7E7D6]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-5%" }} className="mb-10 md:mb-14">
                        <h2 className="text-4xl md:text-5xl font-serif text-[#2A1410] mb-3">Garlic Bread</h2>
                        <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />
                        <p className="mt-4 text-[#5C4A44] font-sans text-base md:text-lg max-w-xl">Freshly baked with our signature garlic butter blend.</p>
                    </motion.div>

                    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16">
                        {/* LEFT — Content */}
                        <div className="w-full lg:w-7/12">
                            {GARLIC_BREADS.map((item, i) => (
                                <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    className="group flex items-start justify-between py-5 border-b border-[#E8D5C4] last:border-b-0 hover:bg-[#FFFBF7]/50 px-3 -mx-3 rounded-xl transition-colors duration-300">
                                    <div className="flex-1 pr-4">
                                        <h3 className="font-serif text-lg text-[#2A1410] group-hover:text-[#E63946] transition-colors duration-300">
                                            {item.name}<SpicyBadge level={item.spicy} mushroom={item.mushroom} />
                                        </h3>
                                        <p className="text-[#5C4A44] font-sans text-sm mt-1">{item.description}</p>
                                    </div>
                                    <PriceTag amount={item.price} />
                                </motion.div>
                            ))}

                            {/* Dips */}
                            <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12">
                                <h3 className="font-serif text-2xl text-[#2A1410] mb-2">Choice of Dips</h3>
                                <div className="w-10 h-0.5 bg-[#D4AF37] rounded-full mb-6" />
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {DIPS.map((dip) => (
                                        <div key={dip.name} className="flex items-center justify-between bg-[#FFFBF7] rounded-xl py-3 px-4 border border-[#E8D5C4]">
                                            <span className="font-sans text-sm text-[#2A1410]">{dip.name}</span>
                                            <PriceTag amount={dip.price} variant="gold" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT — Image */}
                        <div className="w-full lg:w-5/12 flex-shrink-0">
                            <div className="lg:sticky lg:top-[180px]">
                                <SectionImage src="/images/menu-garlic-bread.png" alt="Freshly baked garlic bread" caption="Golden & Herbed" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — SANDWICHES & CALZONES (Odd: Image LEFT, Content RIGHT)
          ═══════════════════════════════════════════════════════════ */}
            <section id="sandwiches" className="py-16 md:py-28 bg-[#FFFBF7]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* LEFT — Image */}
                        <div className="w-full lg:w-5/12 flex-shrink-0">
                            <div className="lg:sticky lg:top-[180px]">
                                <SectionImage src="/images/menu-sandwich.png" alt="Italian panuozzo sandwich" caption="Panuozzo & Calzone" />
                            </div>
                        </div>

                        {/* RIGHT — Content */}
                        <div className="w-full lg:w-7/12">
                            {/* Italian Style Sandwich */}
                            <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-5%" }} className="mb-10">
                                <h2 className="text-4xl md:text-5xl font-serif text-[#2A1410] mb-3">Italian Style Sandwich</h2>
                                <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />
                                <p className="mt-4 text-[#5C4A44] font-sans text-base md:text-lg max-w-xl">Panuozzo — crispy Italian bread filled with premium ingredients.</p>
                            </motion.div>

                            {SANDWICHES.map((item, i) => (
                                <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    className="group flex items-start justify-between py-5 border-b border-[#E8D5C4] last:border-b-0 hover:bg-[#F7E7D6]/40 px-3 -mx-3 rounded-xl transition-colors duration-300">
                                    <div className="flex-1 pr-4">
                                        <h3 className="font-serif text-lg text-[#2A1410] group-hover:text-[#E63946] transition-colors duration-300">
                                            {item.name}<SpicyBadge level={item.spicy} />
                                        </h3>
                                        <p className="text-[#5C4A44] font-sans text-sm mt-1">{item.description}</p>
                                    </div>
                                    <PriceTag amount={item.price} />
                                </motion.div>
                            ))}

                            {/* Pocket Style Pizza */}
                            <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 mb-10">
                                <h3 className="text-3xl md:text-4xl font-serif text-[#2A1410] mb-3">Pocket Style Pizza</h3>
                                <div className="w-12 h-1 bg-[#D4AF37] rounded-full" />
                                <p className="mt-4 text-[#5C4A44] font-sans text-base max-w-xl">Calzone — folded pizza pocket baked to golden perfection.</p>
                            </motion.div>

                            {POCKET_PIZZAS.map((item, i) => (
                                <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    className="group flex items-start justify-between py-5 border-b border-[#E8D5C4] last:border-b-0 hover:bg-[#F7E7D6]/40 px-3 -mx-3 rounded-xl transition-colors duration-300">
                                    <div className="flex-1 pr-4">
                                        <h3 className="font-serif text-lg text-[#2A1410] group-hover:text-[#E63946] transition-colors duration-300">
                                            {item.name}<SpicyBadge level={item.spicy} />
                                        </h3>
                                        <p className="text-[#5C4A44] font-sans text-sm mt-1">{item.description}</p>
                                    </div>
                                    <PriceTag amount={item.price} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — PASTA (Even: Content LEFT, Image RIGHT)
          ═══════════════════════════════════════════════════════════ */}
            <section id="pasta" className="py-16 md:py-28 bg-[#F7E7D6]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-5%" }} className="mb-10 md:mb-14">
                        <h2 className="text-4xl md:text-5xl font-serif text-[#2A1410] mb-3">Pasta</h2>
                        <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />
                        <p className="mt-4 text-[#5C4A44] font-sans text-base md:text-lg max-w-xl">Fresh semolina pasta, made in-house. Choose your shape and sauce.</p>
                    </motion.div>

                    {/* Pasta Shapes */}
                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 flex flex-wrap gap-3">
                        {PASTA_SHAPES.map((shape) => (
                            <span key={shape} className="bg-[#FFFBF7] border border-[#E8D5C4] rounded-full px-5 py-2 font-cursive text-lg text-[#2A1410]">
                                {shape}
                            </span>
                        ))}
                    </motion.div>

                    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16">
                        {/* LEFT — Content */}
                        <div className="w-full lg:w-7/12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                                {/* Classic Pastas */}
                                <div>
                                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <h3 className="font-serif text-2xl text-[#2A1410] mb-2">Classic Pastas</h3>
                                        <div className="w-10 h-0.5 bg-[#D4AF37] rounded-full mb-6" />
                                    </motion.div>
                                    {PASTAS.map((item, i) => (
                                        <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                            className="flex items-center justify-between py-3 border-b border-[#E8D5C4] last:border-b-0 group">
                                            <span className="font-serif text-lg text-[#2A1410] group-hover:text-[#E63946] transition-colors duration-300">
                                                {item.name}<SpicyBadge level={item.spicy} mushroom={item.mushroom} />
                                            </span>
                                            <div className="flex-1 mx-3 border-b border-dotted border-[#E8D5C4]" />
                                            <PriceTag amount={item.price} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Specialities */}
                                <div>
                                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <h3 className="font-serif text-2xl text-[#2A1410] mb-2">Specialities</h3>
                                        <div className="w-10 h-0.5 bg-[#D4AF37] rounded-full mb-6" />
                                    </motion.div>
                                    {SPECIAL_PASTAS.map((item, i) => (
                                        <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                            className="group py-5 border-b border-[#E8D5C4] last:border-b-0">
                                            <div className="flex items-start justify-between">
                                                <h4 className="font-serif text-lg text-[#2A1410] group-hover:text-[#E63946] transition-colors duration-300">{item.name}</h4>
                                                <PriceTag amount={item.price} />
                                            </div>
                                            <p className="text-[#5C4A44] font-sans text-sm mt-1">{item.description}</p>
                                        </motion.div>
                                    ))}

                                    <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-6 p-4 bg-[#FFFBF7] rounded-xl border border-[#E8D5C4]">
                                        <p className="text-[#5C4A44] font-sans text-xs italic">
                                            We make our own fresh pasta dough for ravioli using Italian &lsquo;00&rsquo; flour. Our pasta does not include veggies — you can add them on charge.
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Image */}
                        <div className="w-full lg:w-5/12 flex-shrink-0">
                            <div className="lg:sticky lg:top-[180px]">
                                <SectionImage src="/images/menu-pasta.png" alt="Premium Italian pasta" caption="Fresh & Handcrafted" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — SIDES (Odd: Image LEFT, Content RIGHT)
          ═══════════════════════════════════════════════════════════ */}
            <section id="sides" className="py-16 md:py-28 bg-[#FFFBF7]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* LEFT — Image */}
                        <div className="w-full lg:w-5/12 flex-shrink-0">
                            <div className="lg:sticky lg:top-[180px]">
                                <SectionImage src="/images/menu-sides.png" alt="Crispy fries and mozzarella sticks" caption="Perfectly Crispy" />
                            </div>
                        </div>

                        {/* RIGHT — Content */}
                        <div className="w-full lg:w-7/12">
                            <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-5%" }} className="mb-10 md:mb-14">
                                <h2 className="text-4xl md:text-5xl font-serif text-[#2A1410] mb-3">Sides</h2>
                                <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />
                                <p className="mt-4 text-[#5C4A44] font-sans text-base md:text-lg max-w-xl">Perfectly crispy fries, mozzarella sticks, and more.</p>
                            </motion.div>

                            {SIDES.map((item, i) => (
                                <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    className="flex items-center justify-between py-4 border-b border-[#E8D5C4] last:border-b-0 group">
                                    <span className="font-serif text-lg text-[#2A1410] group-hover:text-[#E63946] transition-colors duration-300">{item.name}</span>
                                    <div className="flex-1 mx-4 border-b border-dotted border-[#E8D5C4]" />
                                    <PriceTag amount={item.price} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — BEVERAGES (Even: Content LEFT, Image RIGHT)
          ═══════════════════════════════════════════════════════════ */}
            <section id="beverages" className="py-16 md:py-28 bg-[#F7E7D6]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-5%" }} className="mb-10 md:mb-14">
                        <h2 className="text-4xl md:text-5xl font-serif text-[#2A1410] mb-3">Beverages</h2>
                        <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />
                        <p className="mt-4 text-[#5C4A44] font-sans text-base md:text-lg max-w-xl">100% palm-oil free ice creams as sweetener. We do not use sugar in any other form.</p>
                    </motion.div>

                    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16">
                        {/* LEFT — Content */}
                        <div className="w-full lg:w-7/12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
                                {/* Coolers */}
                                <div>
                                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <h3 className="font-serif text-2xl text-[#2A1410] mb-2">Coolers</h3>
                                        <div className="w-10 h-0.5 bg-[#D4AF37] rounded-full mb-6" />
                                    </motion.div>
                                    {COOLERS.map((item, i) => (
                                        <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                            className="flex items-center justify-between py-2.5 border-b border-[#E8D5C4] last:border-b-0">
                                            <span className="font-sans text-sm text-[#2A1410]">{item.name}</span>
                                            <PriceTag amount={item.price} variant="gold" />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Cold Coffee */}
                                <div>
                                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <h3 className="font-serif text-2xl text-[#2A1410] mb-2">Cold Coffee</h3>
                                        <div className="w-10 h-0.5 bg-[#D4AF37] rounded-full mb-6" />
                                    </motion.div>
                                    {COLD_COFFEES.map((item, i) => (
                                        <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                            className="flex items-center justify-between py-2.5 border-b border-[#E8D5C4] last:border-b-0">
                                            <span className="font-sans text-sm text-[#2A1410]">{item.name}</span>
                                            <PriceTag amount={item.price} variant="gold" />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Shakes */}
                                <div>
                                    <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <h3 className="font-serif text-2xl text-[#2A1410] mb-2">Shakes</h3>
                                        <div className="w-10 h-0.5 bg-[#D4AF37] rounded-full mb-6" />
                                    </motion.div>
                                    {SHAKES.map((item, i) => (
                                        <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                            className="flex items-center justify-between py-2.5 border-b border-[#E8D5C4] last:border-b-0">
                                            <span className="font-sans text-sm text-[#2A1410]">{item.name}</span>
                                            <PriceTag amount={item.price} variant="gold" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 text-center">
                                <span className="font-sans text-sm text-[#5C4A44] italic">Soft Drinks / Water Bottles available @ MRP</span>
                            </motion.div>
                        </div>

                        {/* RIGHT — Image */}
                        <div className="w-full lg:w-5/12 flex-shrink-0">
                            <div className="lg:sticky lg:top-[180px]">
                                <SectionImage src="/images/menu-beverages.png" alt="Cold beverages and shakes" caption="Refreshingly Crafted" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — ADD-ONS (Odd: Image LEFT, Content RIGHT)
          ═══════════════════════════════════════════════════════════ */}
            <section id="add-ons" className="py-16 md:py-28 bg-[#FFFBF7]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* LEFT — Image */}
                        <div className="w-full lg:w-5/12 flex-shrink-0">
                            <div className="lg:sticky lg:top-[180px]">
                                <SectionImage src="/images/menu-addons.png" alt="Premium toppings" caption="Premium Toppings" />
                            </div>
                        </div>

                        {/* RIGHT — Content */}
                        <div className="w-full lg:w-7/12">
                            <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-5%" }} className="mb-10 md:mb-14">
                                <h2 className="text-4xl md:text-5xl font-serif text-[#2A1410] mb-3">Add-Ons</h2>
                                <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />
                                <p className="mt-4 text-[#5C4A44] font-sans text-base md:text-lg max-w-xl">Customize your pizza or pasta with premium toppings.</p>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                {ADD_ONS.map((item, i) => (
                                    <motion.div key={item.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                        className="flex items-center justify-between py-3 border-b border-[#E8D5C4] last:border-b-0">
                                        <span className="font-sans text-sm text-[#2A1410] flex-1 pr-3">{item.name}</span>
                                        <PriceTag amount={item.price} variant="gold" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Legend */}
                            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 flex flex-wrap gap-6 text-xs font-sans text-[#5C4A44]">
                                <span>🌶️ Mildly Spicy, Tangy</span>
                                <span>🌶️🌶️ Spicy, Tangy</span>
                                <span>🍄 Contains Mushroom</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════ FOOTER INFO BANNER ════════════════════ */}
            <section className="py-12 md:py-16 pizza-gradient">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="bg-[#FFFBF7] rounded-2xl p-6 border border-[#E8D5C4] shadow-sm">
                            <h4 className="font-serif text-lg text-[#2A1410] mb-3">Our Promise</h4>
                            <ul className="space-y-2 text-[#5C4A44] font-sans text-sm">
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37]">✦</span> High quality Italian &lsquo;00&rsquo; flour</li>
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37]">✦</span> All doughs &amp; sauces are fresh &amp; made in-house</li>
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37]">✦</span> We offer half &amp; half pizzas</li>
                            </ul>
                        </motion.div>
                        <motion.div variants={sectionHeadingVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="bg-[#FFFBF7] rounded-2xl p-6 border border-[#E8D5C4] shadow-sm">
                            <h4 className="font-serif text-lg text-[#2A1410] mb-3">Good to Know</h4>
                            <ul className="space-y-2 text-[#5C4A44] font-sans text-sm">
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37]">✦</span> 100% palm-oil free ice creams in our cold coffees &amp; shakes</li>
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37]">✦</span> We do not use sugar in any other form</li>
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37]">✦</span> Fresh pasta dough for ravioli using Italian &lsquo;00&rsquo; flour</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
