"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";

// Her proje için otomatik renk paleti
const colorPalettes = [
    "from-violet-600 to-blue-600",
    "from-emerald-600 to-teal-600",
    "from-pink-600 to-rose-600",
    "from-amber-600 to-orange-600",
    "from-blue-600 to-cyan-600",
    "from-green-600 to-emerald-600",
    "from-red-600 to-pink-600",
    "from-indigo-600 to-purple-600",
];

export function Projects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState("Tümü");

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Projeler yüklenemedi:", err);
                setLoading(false);
            });
    }, []);

    const categories = ["Tümü", ...new Set(projects.map((p) => p.category))];
    const filtered = active === "Tümü" ? projects : projects.filter((p) => p.category === active);

    if (loading) {
        return (
            <section id="projects" className="relative py-32 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        return null;
    }

    return (
        <section id="projects" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-block text-sm uppercase tracking-widest text-emerald-400 mb-4"
                        >
                            ● Seçili Projeler
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-bold"
                        >
                            Son <span className="gradient-text">çalışmalarımız</span>
                        </motion.h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setActive(c)}
                                className={`px-5 py-2 rounded-full text-sm transition-all ${active === c
                                        ? "bg-white text-black"
                                        : "glass text-white/70 hover:text-white"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => {
                            // JSON'dan gradient al, yoksa otomatik ata
                            const gradient = p.gradient || colorPalettes[i % colorPalettes.length];
                            const technologies = p.technologies || p.tags || [];

                            return (
                                <motion.div
                                    key={p.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ y: -8 }}
                                    data-cursor="Görüntüle"
                                >
                                    <Link href={`/projects/${p.slug}`} className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer block">
                                        {/* Ana Görsel */}
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* 🎨 OTOMATİK RENK FİLTRESİ - HER PROJE FARKLI */}
                                        <div 
                                            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 mix-blend-multiply`}
                                        />

                                        {/* Alt Gradient (okunabilirlik) */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                        {/* Hover Ok İkonu */}
                                        <div className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
                                            <ArrowUpRight size={20} />
                                        </div>

                                        {/* İçerik - Alt Kısım */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8">
                                            {/* Teknolojiler */}
                                            {technologies.length > 0 && (
                                                <div className="flex gap-2 mb-3 flex-wrap">
                                                    {technologies.slice(0, 4).map((t: string) => (
                                                        <span
                                                            key={t}
                                                            className="text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Başlık */}
                                            <h3 className="text-3xl font-bold mb-2">{p.title}</h3>

                                            {/* Açıklama */}
                                            <p className="text-white/80">{p.description || p.subtitle}</p>
                                        </div>

                                        {/* Kategori Badge - Sol Üst */}
                                        {p.category && (
                                            <div className="absolute top-6 left-6">
                                                <span className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90">
                                                    {p.category}
                                                </span>
                                            </div>
                                        )}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Tüm Projeleri Gör Linki */}
                {projects.length > 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full glass hover:bg-white/10 transition-all text-white font-medium"
                        >
                            <span>Tüm Projeleri Gör</span>
                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}