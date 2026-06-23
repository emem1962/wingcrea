"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Calendar, User, Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const [project, setProject] = useState<any>(null);
    const [related, setRelated] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((projects) => {
                const found = projects.find((p: any) => p.slug === slug);
                setProject(found);
                setRelated(projects.filter((p: any) => p.slug !== slug).slice(0, 3));
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-32">
                <div className="text-white/60">Yükleniyor...</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-32">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Proje Bulunamadı</h1>
                    <Link href="/projects" className="text-violet-400 hover:underline">
                        ← Projelere Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20">
            {/* Hero */}
            <section className="relative px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.push("/projects")}
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Tüm Projelere Dön</span>
                    </motion.button>

                    <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                                — {project.hero.tagline}
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                                {project.title}
                            </h1>
                            <p className="text-xl text-white/70 leading-relaxed">{project.subtitle}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="glass rounded-2xl p-6">
                                <Calendar size={20} className="text-violet-400 mb-3" />
                                <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Süre</div>
                                <div className="font-medium">{project.timeline}</div>
                            </div>
                            <div className="glass rounded-2xl p-6">
                                <User size={20} className="text-violet-400 mb-3" />
                                <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Müşteri</div>
                                <div className="font-medium">{project.client}</div>
                            </div>
                            <div className="glass rounded-2xl p-6 col-span-2">
                                <Briefcase size={20} className="text-violet-400 mb-3" />
                                <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Rolüm</div>
                                <div className="font-medium">{project.role}</div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative rounded-3xl overflow-hidden aspect-[16/9]"
                    >
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30 mix-blend-multiply`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="px-6 py-20 border-y border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {project.stats.map((stat: any, i: number) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center lg:text-left"
                            >
                                <div className={`text-5xl md:text-6xl font-bold bg-gradient-to-br ${project.gradient} bg-clip-text text-transparent mb-2`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm uppercase tracking-widest text-white/50">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="px-6 py-24">
                <div className="mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">— Genel Bakış</div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{project.hero.overview}</h2>
                    </motion.div>
                </div>
            </section>

            {/* Problem & Solution */}
            <section className="px-6 py-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 mb-32"
                    >
                        <div>
                            <div className="text-xs uppercase tracking-[0.3em] text-red-400 mb-4">— Problem</div>
                            <h3 className="text-4xl md:text-5xl font-bold mb-6">
                                Karşılaşılan <span className="text-red-400">Zorluk</span>
                            </h3>
                        </div>
                        <div className="flex items-center">
                            <p className="text-xl text-white/70 leading-relaxed">{project.problem}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12"
                    >
                        <div className="lg:order-2">
                            <div className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">— Çözüm</div>
                            <h3 className="text-4xl md:text-5xl font-bold mb-6">
                                Sunduğumuz <span className="text-emerald-400">Çözüm</span>
                            </h3>
                        </div>
                        <div className="flex items-center lg:order-1">
                            <p className="text-xl text-white/70 leading-relaxed">{project.solution}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="px-6 py-24 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">— Özellikler</div>
                        <h2 className="text-4xl md:text-6xl font-bold">
                            Öne Çıkan <span className="gradient-text">Özellikler</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {project.features.map((feature: any, i: number) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-3xl p-8 hover:border-violet-500/30 transition-all group"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <CheckCircle2 size={24} className="text-white" />
                                </div>
                                <h4 className="text-2xl font-bold mb-3">{feature.title}</h4>
                                <p className="text-white/60 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* 🎨 SLOGAN BÖLÜMÜ */}
{project.slogan && (
  <section className="px-6 py-32 relative overflow-hidden">
    {/* Dekoratif arka plan */}
    <div className="absolute inset-0">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-3xl`} />
    </div>

    <div className="max-w-5xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        {/* Üst çizgi ve etiket */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`w-24 h-px bg-gradient-to-r ${project.gradient} mx-auto mb-8`}
        />

        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
          — {project.slogan.label || "Vizyon"}
        </div>

        {/* Büyük Başlık */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight"
        >
          <span className="text-white">{project.slogan.title.split(' ').slice(0, Math.ceil(project.slogan.title.split(' ').length / 2)).join(' ')}</span>
          <br />
          <span className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
            {project.slogan.title.split(' ').slice(Math.ceil(project.slogan.title.split(' ').length / 2)).join(' ')}
          </span>
        </motion.h2>

        {/* Açıklama */}
        {project.slogan.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            {project.slogan.description}
          </motion.p>
        )}

        {/* Alt dekoratif elementler */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`} />
          <div className={`w-16 h-px bg-gradient-to-r ${project.gradient} opacity-50`} />
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`} />
        </motion.div>
      </motion.div>
    </div>
  </section>
)}

            {/* Technologies */}
            <section className="px-6 py-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">— Teknoloji Stack</div>
                        <h2 className="text-4xl md:text-6xl font-bold">
                            Kullanılan <span className="gradient-text">Teknolojiler</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {project.technologies.map((tech: string, i: number) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="glass px-6 py-3 rounded-full text-sm font-medium hover:border-violet-500/30 transition-all"
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Gallery */}
            <section className="px-6 py-24 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">— Galeri</div>
                        <h2 className="text-4xl md:text-6xl font-bold">
                            Proje <span className="gradient-text">Görselleri</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-6">
                        {project.gallery.map((img: string, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative rounded-3xl overflow-hidden aspect-[16/9] group"
                            >
                                <img
                                    src={img}
                                    alt={`${project.title} ${i + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related */}
            {related.length > 0 && (
                <section className="px-6 py-24 border-t border-white/10">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-baseline justify-between mb-12"
                        >
                            <div>
                                <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">— Keşfet</div>
                                <h2 className="text-4xl md:text-5xl font-bold">
                                    Diğer <span className="gradient-text">Projeler</span>
                                </h2>
                            </div>
                            <Link href="/projects" className="hidden md:flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors">
                                <span>Tüm Projeler</span>
                                <ArrowRight size={16} />
                            </Link>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {related.map((p: any, i: number) => (
                                <motion.div
                                    key={p.slug}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link href={`/projects/${p.slug}`} className="group block">
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                                            <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-50 mix-blend-multiply`} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>
                                        <div className="text-xs uppercase tracking-widest text-white/50 mb-1">{p.category}</div>
                                        <h3 className="text-2xl font-bold mb-1 group-hover:text-violet-400 transition-colors">{p.title}</h3>
                                        <p className="text-sm text-white/60">{p.description}</p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="px-6 py-24">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-12 text-center relative overflow-hidden"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
                        <div className="relative">
                            <h3 className="text-4xl md:text-6xl font-bold mb-6">
                                Benzer bir <span className="gradient-text">projeniz</span> mi var?
                            </h3>
                            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
                                Fikrinizi hayata geçirmek için birlikte çalışalım.
                            </p>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium text-lg hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all"
                            >
                                <span>İletişime Geç</span>
                                <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}