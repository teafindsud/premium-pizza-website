"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { LabelAccent } from "./SectionDivider";

/* ─────────── REAL MENU DATA — 4 Signature Pizzas ─────────── */

const PIZZAS = [
    {
        id: 1,
        name: "Truffle Mushroom",
        description:
            "Tomato sauce · buffalo mozzarella · black truffle crème · button mushrooms · white truffle oil · extra virgin olive oil · parmesan",
        price: "₹500",
        priceLabel: "Napolitana",
        rating: 4.9,
        image: "/images/signature-truffle-mushroom.png",
    },
    {
        id: 2,
        name: "Cherry Truffata",
        description:
            "Cherry tomato sauce · buffalo mozzarella · jalapeños · paprika · black olives · sundried tomatoes · truffle butter · extra virgin olive oil · parmesan",
        price: "₹550",
        priceLabel: "Napolitana",
        rating: 4.8,
        image: "/images/signature-cherry-truffata.png",
    },
    {
        id: 3,
        name: "Quattro Formaggi",
        description:
            "Tomato sauce · buffalo mozzarella · mascarpone · goat cheese · parmesan · extra virgin olive oil",
        price: "₹480",
        priceLabel: "Napolitana",
        rating: 4.7,
        image: "/images/signature-quattro-formaggi.png",
    },
    {
        id: 4,
        name: "Picante Goat Cheese",
        description:
            "Tomato sauce · buffalo mozzarella · jalapeños · paprika · black olives · button mushrooms · goat cheese · extra virgin olive oil · parmesan",
        price: "₹540",
        priceLabel: "Napolitana",
        rating: 4.6,
        image: "/images/signature-picante-goat.png",
    },
];

/* ─────────── ANIMATION ─────────── */

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut" as const,
        },
    }),
};

/* ─────────── PRODUCT CARD ─────────── */

const ProductCard = ({
    pizza,
    index,
}: {
    pizza: (typeof PIZZAS)[0];
    index: number;
}) => {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group relative bg-[#FFFBF7] border border-[#E8D5C4] rounded-2xl p-4 flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(42,20,16,0.14)]"
        >
            {/* Image Area */}
            <div className="relative h-56 md:h-64 w-full rounded-xl overflow-hidden mb-5">
                <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark gradient overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1410]/20 via-transparent to-transparent" />

                {/* Star Rating Pill */}
                <div className="absolute top-3 right-3 bg-[#2A1410]/75 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="text-xs font-medium text-white font-sans">
                        {pizza.rating}
                    </span>
                </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-col flex-grow px-1">
                <h3 className="text-xl md:text-2xl font-serif text-[#2A1410] mb-2 leading-tight">
                    {pizza.name}
                </h3>
                <p className="text-[#5C4A44] text-[0.9375rem] leading-[1.75] mb-5 flex-grow font-sans line-clamp-3">
                    {pizza.description}
                </p>

                {/* Price + Cart Button Row */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xl md:text-2xl font-serif text-[#2A1410] font-medium">
                            {pizza.price}
                        </span>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg shadow-[#E63946]/30 btn-premium hover:shadow-[#E63946]/50 cursor-pointer"
                        style={{
                            background:
                                "linear-gradient(to right, #E63946, #C72C41)",
                        }}
                    >
                        <ShoppingCart className="w-4.5 h-4.5" />
                    </motion.button>
                </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(230,57,70,0.08),transparent_70%)]" />
        </motion.div>
    );
};

/* ─────────── SECTION ─────────── */

export default function ProductSection() {
    return (
        <section className="relative py-24 md:py-32 px-6 md:px-24 bg-[#FDF8F3] overflow-hidden">
            {/* Subtle background decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-[#E63946]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-[#F7E7D6]/80 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-14 md:mb-16"
                >
                    <LabelAccent centered={false} />
                    <span className="text-[#E63946] tracking-[0.2em] font-sans font-medium uppercase text-[11px] md:text-xs block mb-2">
                        The Selection
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#2A1410]">
                        Signature Creations
                    </h2>
                    <div className="w-16 h-1 bg-[#D4AF37] rounded-full mt-5" />
                </motion.div>

                {/* Pizza Cards Grid — 4 cols desktop, 2 tablet, 1 mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-8">
                    {PIZZAS.map((pizza, i) => (
                        <ProductCard key={pizza.id} pizza={pizza} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
