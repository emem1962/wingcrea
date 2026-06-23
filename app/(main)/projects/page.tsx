"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-32">
                <div className="text-white/60">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-block text-sm uppercase tracking-widest text-violet-400 mb-4"
                    >
                        ● Projelerimiz
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Son <span className="gradient-text">çalışmalarımız</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Sektörlere özel geliştirdiğimiz dijital dönüşüm projeleri.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((p, i) => {
                        // JSON'dan gradient al, yoksa otomatik ata
                        const gradient = p.gradient || colorPalettes[i % colorPalettes.length];
                        const technologies = p.technologies || p.tags || [];

                        return (
                            <motion.div
                                key={p.slug}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link href={`/projects/${p.slug}`} className="group block">
                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                                        {/* Ana Görsel */}
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* 🎨 OTOMATİK RENK FİLTRESİ */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 mix-blend-multiply`}
                                        />

                                        {/* Alt Gradient (okunabilirlik) */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                        {/* Kategori Badge - Sol Üst */}
                                        {p.category && (
                                            <div className="absolute top-6 left-6">
                                                <span className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90">
                                                    {p.category}
                                                </span>
                                            </div>
                                        )}

                                        {/* Hover Ok İkonu - Sağ Üst */}
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
                                            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                                                {p.title}
                                            </h3>

                                            {/* Açıklama */}
                                            <p className="text-white/80 mb-4">{p.description || p.subtitle}</p>

                                            {/* Detayları Gör Linki */}
                                            <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                                                <span>Detayları Gör</span>
                                                <ArrowUpRight
                                                    size={16}
                                                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Boş Durum */}
                {projects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/40">Henüz proje eklenmemiş.</p>
                    </div>
                )}
            </div>
        </div>
    );
}