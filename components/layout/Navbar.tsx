"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MagneticButton } from "../effects/1MagneticButton";
import { MorphingButton } from "../effects/MorphingButton";

const links = [
    { name: "Hakkımızda", href: "/about", anchor: "#about" },
    { name: "Hizmetler", href: "/services", anchor: "#services" },
    { name: "Projeler", href: "/projects", anchor: "#projects" },
    { name: "Süreç", href: "/#process", anchor: "#process" },
    { name: "İletişim", href: "/contact", anchor: "#contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const topBtnRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    const isHomePage = pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleNavClick = (href: string, anchor: string) => {
        setOpen(false);

        if (isHomePage) {
            const el = document.querySelector(anchor);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.push(href);
        }
    };

    // 🎯 Basitleştirilmiş scroll to top - native smooth scroll
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToContact = () => {
        setOpen(false);
        if (isHomePage) {
            const el = document.querySelector("#contact");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.push("/contact");
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled ? "py-2 md:py-3" : "py-4 md:py-6"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between relative">
                    
                    {/* SOL: Mobil Hamburger */}
                    <div className="w-10 md:hidden relative z-10">
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-10 h-10 flex items-center justify-center glass rounded-full"
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* ORTA: Logo (Mobil & Desktop) */}
                    <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-10">
                        <Link href="/" className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold tracking-tight">
                            <motion.div
                                className="relative"
                                animate={{
                                    scale: [1, 1.15, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    repeatDelay: 1,
                                }}
                            >
                                <img
                                    src="/wingcrea_logo.png"
                                    alt="Wingcrea Logo"
                                    className="relative w-12 h-12 md:w-10 md:h-10 object-contain"
                                    style={{
                                        filter: 'brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.4))',
                                    }}
                                />
                                <div
                                    className="absolute inset-0 rounded-full blur-xl opacity-50"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                                    }}
                                />
                            </motion.div>
                            <span className="text-white hidden sm:inline">Wingcrea</span>
                        </Link>
                    </div>

                    {/* SAĞ: Desktop Nav + Proje Başlat / Mobil Başlat */}
                    <div className="flex items-center gap-3 relative z-10">
                        {/* Desktop: Nav menu */}
                        <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-2">
                            {links.map((l) => (
                                <MagneticButton key={l.name} strength={0.25}>
                                    <button
                                        onClick={() => handleNavClick(l.href, l.anchor)}
                                        className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all"
                                    >
                                        {l.name}
                                    </button>
                                </MagneticButton>
                            ))}
                        </nav>

                        {/* Mobil: Küçük Başlat butonu */}
                        <button
                            onClick={scrollToContact}
                            className="md:hidden relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white rounded-full overflow-hidden"
                            style={{
                                background: "rgba(10, 10, 15, 0.85)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                            }}
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                            </span>
                            <span>Başlat</span>
                            <span>→</span>
                        </button>

                        {/* Desktop: Morphing buton */}
                        <div className="hidden md:block">
                            <MorphingButton onClick={scrollToContact}>
                                Proje Başlat
                            </MorphingButton>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobil Menü */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 md:hidden pt-24 px-6 glass-dark"
                    >
                        <nav className="flex flex-col gap-2">
                            {links.map((l, i) => (
                                <motion.button
                                    key={l.name}
                                    onClick={() => handleNavClick(l.href, l.anchor)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="text-3xl font-semibold py-3 border-b border-white/10 text-left"
                                >
                                    {l.name}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 🔝 Yukarı Çık Butonu - Basitleştirilmiş */}
            <motion.button
                ref={topBtnRef}
                initial={false}
                animate={{
                    opacity: scrolled ? 1 : 0,
                    scale: scrolled ? 1 : 0.5,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full flex items-center justify-center group"
                style={{
                    background: "rgba(10, 10, 15, 0.85)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 0 30px rgba(139, 92, 246, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)",
                    pointerEvents: scrolled ? 'auto' : 'none',
                }}
                whileHover={{
                    scale: 1.15,
                    boxShadow: "0 0 50px rgba(139, 92, 246, 0.6), 0 12px 40px rgba(0, 0, 0, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
                data-cursor="Yukarı"
            >
                {/* Dönen gradient border */}
                <motion.div
                    className="absolute -inset-[1.5px] rounded-full"
                    style={{
                        background: "conic-gradient(from 0deg, #a78bfa, #60a5fa, #34d399, #a78bfa)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* İç kısım */}
                <div className="absolute inset-[1.5px] rounded-full bg-black/90 flex items-center justify-center">
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowUp
                            size={20}
                            className="text-white group-hover:text-violet-400 transition-colors"
                        />
                    </motion.div>
                </div>

                {/* Pulse ring */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: "2px solid rgba(139, 92, 246, 0.4)",
                    }}
                    animate={{
                        scale: [1, 1.6],
                        opacity: [0.5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            </motion.button>
        </>
    );
}
