"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

const PIZZAS = [
    {
        id: 1,
        name: "Classic Margherita",
        description: "San Marzano tomatoes, fresh buffalo mozzarella, fresh basil, and extra virgin olive oil.",
        price: "₹850",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        name: "Diavola Spice",
        description: "Spicy salame, nduja, mozzarella, and a hint of homemade chili honey.",
        price: "₹1,100",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        name: "Quattro Formaggi",
        description: "Gorgonzola, Fontina, Parmigiano Reggiano, and Mozzarella on a white base.",
        price: "₹950",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        name: "Tartufo & Prosciutto",
        description: "Truffle oil, aged prosciutto di Parma, wild mushrooms, and arugula.",
        price: "₹1,350",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?auto=format&fit=crop&q=80&w=800",
    },
];

const ProductCard = ({ pizza }: { pizza: typeof PIZZAS[0] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-bg-secondary border border-border rounded-3xl p-4 flex flex-col h-full overflow-hidden shadow-2xl"
        >
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6">
                <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-border/30">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="text-sm font-medium text-white">{pizza.rating}</span>
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                <h3 className="text-2xl font-serif text-primary mb-2">{pizza.name}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-6 flex-grow">{pizza.description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif text-primary">{pizza.price}</span>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white shadow-lg shadow-accent/40 transition-shadow hover:shadow-accent/60"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(230,57,70,0.15),transparent_70%)]" />
        </motion.div>
    );
};

export default function ProductSection() {
    return (
        <section className="relative py-32 px-8 md:px-24 bg-dark overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-bg-primary/50 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-accent tracking-[0.2em] font-sans font-semibold uppercase text-sm block mb-4">The Selection</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-primary">Signature Creations</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PIZZAS.map((pizza) => (
                        <ProductCard key={pizza.id} pizza={pizza} />
                    ))}
                </div>
            </div>
        </section>
    );
}
