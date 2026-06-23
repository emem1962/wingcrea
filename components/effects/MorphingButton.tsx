"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Yazılım sembolleri - kod yapı taşları
const softwareIcons = [
    {
        name: "Terminal",
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
        ),
        color: "#22d3ee",
        gradient: "from-cyan-400 to-blue-500",
    },
    {
        name: "Code",
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        color: "#34d399",
        gradient: "from-emerald-400 to-teal-500",
    },
    {
        name: "Git Branch",
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="3" x2="6" y2="15" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
        ),
        color: "#fb923c",
        gradient: "from-orange-400 to-red-500",
    },
    {
        name: "Braces",
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
                <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
            </svg>
        ),
        color: "#a78bfa",
        gradient: "from-violet-500 to-purple-500",
    },
    {
        name: "Hash",
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
            </svg>
        ),
        color: "#e879f9",
        gradient: "from-fuchsia-500 to-pink-500",
    },
    {
        name: "Infinity",
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
            </svg>
        ),
        color: "#818cf8",
        gradient: "from-indigo-500 to-violet-500",
    },
];
// Parçacık komponenti - her geçişte patlayan 12 parçacık
function Particles({ color, trigger }: { color: string; trigger: number }) {
    const particles = Array.from({ length: 1 }, (_, i) => {
        const angle = (i / 1) * Math.PI * 2;
        const distance = 20 + Math.random() * 25;
        const size = 2 + Math.random() * 3;
        return {
            id: i,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            size,
            delay: Math.random() * 0.1,
        };
    });

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
                <motion.span
                    key={`${trigger}-${p.id}`}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                        x: p.x,
                        y: p.y,
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.5, 1, 0],
                    }}
                    transition={{
                        duration: 0.8,
                        delay: p.delay,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-1/2 top-1/2 rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        background: color,
                        boxShadow: `0 0 8px ${color}`,
                        marginLeft: -p.size / 2,
                        marginTop: -p.size / 2,
                    }}
                />
            ))}
        </div>
    );
}

export function MorphingButton({
    children,
    onClick,
    className = "",
}: {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}) {
    const [idx, setIdx] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [transitioning, setTransitioning] = useState(false);

    const current = softwareIcons[idx];

    useEffect(() => {
        const interval = setInterval(() => {
            setTransitioning(true);
            setTimeout(() => {
                setIdx((prev) => (prev + 1) % softwareIcons.length);
                setTransitioning(false);
            }, 300);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            data-cursor="Başlat"
        >
            {/* Outer glow - ikon rengine göre değişir */}
            <motion.div
                className="absolute -inset-1.5 rounded-full opacity-60 blur-xl"
                animate={{
                    background: `radial-gradient(circle, ${current.color}80 0%, transparent 70%)`,
                    scale: hovered ? 1.15 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Dönen orbital ring */}
            <motion.div
                className="absolute -inset-2 rounded-full pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
                <div
                    className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{ background: current.color, boxShadow: `0 0 10px ${current.color}` }}
                />
            </motion.div>

            {/* Ana buton gövdesi */}
            <motion.button
                className="relative px-8 py-3.5 text-sm font-semibold text-white rounded-full overflow-hidden"
                style={{
                    background: "rgba(8, 8, 12, 0.92)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${current.color}30`,
                }}
                animate={{
                    borderColor: `${current.color}30`,
                }}
                transition={{ duration: 0.6 }}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
            >
                {/* İç gradient fill */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-15`}
                    key={`bg-${idx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 0.6 }}
                />

                {/* Hover shine sweep */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: hovered ? "100%" : "-100%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                />

                {/* İçerik */}
                <div className="relative flex items-center gap-3">
                    {/* İkon container - 3D perspective */}
                    <div
                        className="relative w-7 h-7 flex items-center justify-center"
                        style={{ perspective: "600px" }}
                    >
                        {/* Dönen loading ring (arka plan) */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-transparent"
                            animate={{
                                borderColor: `${current.color}40`,
                                rotate: transitioning ? 180 : 0,
                            }}
                            transition={{
                                rotate: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                                borderColor: { duration: 0.4 },
                            }}
                            style={{
                                borderTopColor: current.color,
                            }}
                        />

                        {/* Parçacık patlaması */}
                        <Particles color={current.color} trigger={idx} />

                        {/* Glitch katmanları - transition sırasında görünür */}
                        {transitioning && (
                            <>
                                <motion.div
                                    className="absolute inset-0 rounded-md"
                                    initial={{ opacity: 0, x: -2, y: 1 }}
                                    animate={{ opacity: [0, 0.6, 0], x: [-2, 2, 0], y: [1, -1, 0] }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        background: current.color,
                                        mixBlendMode: "screen",
                                        clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
                                    }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-md"
                                    initial={{ opacity: 0, x: 2, y: -1 }}
                                    animate={{ opacity: [0, 0.4, 0], x: [2, -2, 0], y: [-1, 1, 0] }}
                                    transition={{ duration: 0.4, delay: 0.05 }}
                                    style={{
                                        background: current.color,
                                        mixBlendMode: "screen",
                                        clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
                                    }}
                                />
                            </>
                        )}

                        {/* Ana ikon - 3D flip animasyonu */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`icon-${idx}`}
                                initial={{
                                    opacity: 0,
                                    rotateY: -180,
                                    scale: 0.3,
                                    filter: "blur(12px) brightness(2)",
                                }}
                                animate={{
                                    opacity: 1,
                                    rotateY: 0,
                                    scale: 1,
                                    filter: "blur(0px) brightness(1)",
                                }}
                                exit={{
                                    opacity: 0,
                                    rotateY: 180,
                                    scale: 0.3,
                                    filter: "blur(12px) brightness(2)",
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* İkon glow halo */}
                                <motion.div
                                    className="absolute inset-0 rounded-full blur-md"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 0.6, scale: 1.2 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ background: current.color }}
                                />

                                {/* İkon çerçevesi */}
                                <motion.div
                                    className="relative w-full h-full p-1 rounded-md"
                                    style={{
                                        background: `linear-gradient(135deg, ${current.color}, ${current.color}40)`,
                                    }}
                                >
                                    <div
                                        className="w-full h-full rounded-[4px] flex items-center justify-center"
                                        style={{ background: "rgba(8, 8, 12, 0.95)" }}
                                    >
                                        <div className="w-4 h-4" style={{ color: current.color }}>
                                            {current.svg}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Metin - sabit ama hafif glow */}
                    <motion.span
                        className="whitespace-nowrap tracking-wide"
                        animate={{
                            textShadow: transitioning
                                ? `0 0 12px ${current.color}`
                                : `0 0 0px transparent`,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.span>

                    {/* Ok */}
                    <motion.span
                        className="inline-block text-lg"
                        animate={{
                            x: hovered ? 4 : 0,
                            rotate: hovered ? -45 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        →
                    </motion.span>
                </div>
            </motion.button>
        </div>
    );
}