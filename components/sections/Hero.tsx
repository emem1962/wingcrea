"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { AuroraShader } from "../effects/AuroraShader";
import { MagneticButton } from "../effects/1MagneticButton";
import { ParallaxText } from "../effects/ParallaxText";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const titleWords = "Dijital Deneyimleri Yeniden Tanımlıyoruz".split(" ");

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden aurora-bg pt-20 md:pt-32"
        >
            {/* Video background */}
            <motion.div style={{ scale }} className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-30"
                    poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920"
                >
                    <source
                        src="https://cdn.coverr.co/videos/coverr-abstract-blue-waves-7477/1080p.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
            </motion.div>

            {/* Aurora shader */}
            <div className="absolute inset-0 z-[1] opacity-70">
                <AuroraShader />
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 z-[2] opacity-20"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Content */}
            <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">


                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
                    {titleWords.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                delay: 0.3 + i * 0.08,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="inline-block mr-4"
                        >
                            {i === 0 || i === 3 ? <span className="gradient-text">{word}</span> : word}
                        </motion.span>
                    ))}
                </h1>

                <ParallaxText offset={40}>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Web, mobil ve yapay zeka projelerinde uçtan uca tasarım ve geliştirme.
                        Markanızı geleceğe taşıyan dijital deneyimler yaratıyoruz.
                    </motion.p>
                </ParallaxText>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <MagneticButton>
                        <a
                            href="#projects"
                            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium overflow-hidden"
                        >
                            <span className="relative z-10">Projeleri Gör</span>
                            <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-white font-medium hover:bg-white/10 transition-all"
                        >
                            İletişime Geç
                        </a>
                    </MagneticButton>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 1 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                >
                    {[
                        { num: "600+", label: "Tamamlanan Proje" },
                        { num: "500+", label: "Mutlu Müşteri" },
                        { num: "20+", label: "Yıllık Deneyim" },
                        { num: "4", label: "Ödül" },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="glass rounded-2xl p-6"
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{s.num}</div>
                            <div className="text-sm text-white/60">{s.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ArrowDown size={16} className="text-white/50" />
                </motion.div>
            </motion.div>
        </section>
    );
}