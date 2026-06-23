"use client";

import { motion } from "framer-motion";
import { Target, Zap, Award, ArrowRight, CheckCircle2, Sparkles, Users, Lightbulb, Rocket } from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: Target,
        title: "Vizyoner Yaklaşım",
        desc: "Her projede geleceğin teknolojilerini bugünden entegre ediyoruz. Sektör trendlerini yakından takip ederek, müşterilerimize her zaman bir adım önde çözümler sunuyoruz.",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        icon: Zap,
        title: "Hız & Performans",
        desc: "Milisaniye düzeyinde optimize edilmiş, ölçeklenebilir çözümler. Modern teknolojiler ve en iyi pratiklerle, rakiplerinizden her zaman önde olmanızı sağlıyoruz.",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: Award,
        title: "Ödüllü Tasarım",
        desc: "Awwwards ve FWA standartlarında premium dijital deneyimler. Estetik mükemmelliği kullanıcı psikolojisiyle harmanlayarak, markanızı unutulmaz kılıyoruz.",
        gradient: "from-emerald-500 to-teal-500",
    },
];

const stats = [
    { value: "20+", label: "Yıllık Deneyim", desc: "2006'dan bu yana" },
    { value: "600+", label: "Tamamlanan Proje", desc: "Başarılı teslimat" },
    { value: "500+", label: "Mutlu Müşteri", desc: "Uzun vadeli ilişkiler" },
    { value: "4", label: "Sektör Ödülü", desc: "Ulusal ve uluslararası" },
];

const values = [
    {
        icon: Lightbulb,
        title: "Yenilikçilik",
        desc: "Her projede sınırları zorlayan, sektör standartlarını yeniden tanımlayan çözümler üretiyoruz.",
    },
    {
        icon: Users,
        title: "İşbirliği",
        desc: "Müşterilerimizle ortak bir vizyon oluşturarak, birlikte başarılı projeler geliştiriyoruz.",
    },
    {
        icon: Rocket,
        title: "Mükemmeliyetçilik",
        desc: "Her detayda kaliteyi hedefliyor, en küçük unsurlara bile özen gösteriyoruz.",
    },
];

const timeline = [
    { year: "2006", title: "Kuruluş", desc: "Wingcrea, İstanbul'da bağımsız bir yazılım stüdyosu olarak kuruldu." },
    { year: "2012", title: "Büyüme", desc: "50+ müşteriye ulaşarak Türkiye'nin önde gelen dijital ajanslarından biri haline geldik." },
    { year: "2018", title: "Dijital Dönüşüm", desc: "Yapay zeka ve bulut teknolojilerine odaklanarak hizmet portföyümüzü genişlettik." },
    { year: "2024", title: "Global Vizyon", desc: "Uluslararası projelere imza atarak global pazarda aktif rol almaya başladık." },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-24 relative"
                >
                    {/* Dekoratif arka plan */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight relative">
                        <span className="text-white">Kod yazmıyoruz,</span>
                        <br />
                        <span className="gradient-text">deneyimler tasarlıyoruz.</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed relative">
                        Wingcrea, 2006'dan bu yana startup'lardan BIST100 şirketlerine kadar pek çok marka için dijital ürünler geliştiren bağımsız bir yazılım stüdyosudur. Tasarım, mühendislik ve stratejiyi tek çatı altında birleştiriyoruz.
                    </p>
                </motion.div>

                {/* İstatistikler */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass rounded-3xl p-8 text-center hover:border-violet-500/30 transition-all group"
                        >
                            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                                {stat.value}
                            </div>
                            <div className="text-sm uppercase tracking-widest text-white/50 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-white/40">{stat.desc}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Hikayemiz - Editorial Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-16 items-center mb-32"
                >
                    {/* Sol: Metin */}
                    <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                            — Hikayemiz
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            20 yıllık <span className="gradient-text">dijital yolculuk</span>
                        </h2>
                        <div className="space-y-4 text-white/70 leading-relaxed">
                            <p>
                                2006 yılında İstanbul'da küçük bir ekip olarak başladığımız bu yolculukta, bugün Türkiye'nin önde gelen dijital dönüşüm partnerlerinden biri haline geldik.
                            </p>
                            <p>
                                Startup'lardan kurumsal şirketlere, sağlık sektöründen finansa kadar pek çok alanda 500'den fazla başarılı proje teslim ettik. Her projede mükemmelliği hedefledik, her müşterimizle uzun vadeli ilişkiler kurduk.
                            </p>
                            <p>
                                Bugün, tasarım, mühendislik ve stratejiyi tek çatı altında birleştiren multidisipliner bir ekibiz. Teknolojiyi sadece bir araç olarak değil, markanızı geleceğe taşıyan bir güç olarak görüyoruz.
                            </p>
                        </div>
                    </div>

                    {/* Sağ: Dekoratif Görsel */}
                    <div className="relative">
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Gradient blob */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 90, 0],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-emerald-500/20 rounded-full blur-3xl"
                            />

                            {/* Dönen çemberler */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-8 rounded-full border border-white/10"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-16 rounded-full border border-white/5"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-24 rounded-full border border-white/5"
                            />

                            {/* Merkez yazı */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-[8rem] md:text-[10rem] font-bold bg-gradient-to-br from-violet-400 to-blue-400 bg-clip-text text-transparent opacity-20"
                                >
                                    W
                                </motion.div>
                            </div>

                            {/* Floating noktalar */}
                            {[0, 1, 2, 3].map((idx) => {
                                const angle = (idx * 90 * Math.PI) / 180;
                                const radius = 45;
                                const x = 50 + radius * Math.cos(angle);
                                const y = 50 + radius * Math.sin(angle);

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{
                                            y: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                                        }}
                                        className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-violet-400 to-blue-400"
                                        style={{
                                            left: `${x}%`,
                                            top: `${y}%`,
                                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Yaklaşımımız - 3 Özellik */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="text-center mb-16">
                        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                            — Yaklaşımımız
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold">
                            Bizi <span className="gradient-text">farklı kılan</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group glass rounded-3xl p-8 hover:border-violet-500/30 transition-all relative overflow-hidden"
                            >
                                {/* Hover gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                <div className="relative">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <f.icon className="text-white" size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Değerlerimiz */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="flex items-baseline justify-between mb-12 pb-6 border-b border-white/10">
                        <div>
                            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                                — Değerlerimiz
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                İnançlarımız <span className="gradient-text">ve ilkelerimiz</span>
                            </h2>
                        </div>
                        <div className="hidden md:block text-right">
                            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                                Temel Değer
                            </div>
                            <div className="text-5xl font-bold gradient-text">0{values.length}</div>
                        </div>
                    </div>

                    <div className="border-t border-white/10">
                        {values.map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="group relative border-b border-white/10 overflow-hidden"
                            >
                                <div className="relative grid grid-cols-12 gap-4 py-8 md:py-10 items-center px-2 md:px-6">
                                    {/* Numara */}
                                    <div className="col-span-2 md:col-span-1">
                                        <span className="text-sm md:text-base font-mono text-white/40 group-hover:text-violet-400 transition-colors">
                                            0{i + 1}
                                        </span>
                                    </div>

                                    {/* İkon */}
                                    <div className="col-span-2 md:col-span-1">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <value.icon className="text-violet-400" size={22} />
                                        </div>
                                    </div>

                                    {/* Başlık */}
                                    <div className="col-span-8 md:col-span-4">
                                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                                            <span className="text-white/90 group-hover:text-white">
                                                {value.title}
                                            </span>
                                        </h3>
                                    </div>

                                    {/* Açıklama */}
                                    <div className="hidden md:block col-span-6">
                                        <p className="text-white/60 leading-relaxed">
                                            {value.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="text-center mb-16">
                        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                            — Yolculuğumuz
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold">
                            Kilometre <span className="gradient-text">taşlarımız</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Dikey çizgi */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-blue-500/50 to-emerald-500/50" />

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative flex items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                >
                                    {/* Nokta */}
                                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 -translate-x-1/2 ring-4 ring-black z-10" />

                                    {/* İçerik */}
                                    <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                                        <div className="glass rounded-2xl p-6 hover:border-violet-500/30 transition-all">
                                            <div className="text-3xl font-bold gradient-text mb-2">{item.year}</div>
                                            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                            <p className="text-white/60 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="glass rounded-3xl p-12 md:p-16 border border-white/10 relative overflow-hidden">
                        {/* Dekoratif arka plan */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-emerald-500/10" />

                        <div className="relative">
                            <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                <span className="text-white">Bir sonraki projeniz için</span>
                                <br />
                                <span className="gradient-text">hazır mısınız?</span>
                            </h3>
                            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
                                Fikrinizi hayata geçirmek için birlikte çalışalım. İlk danışmanlık ücretsiz.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium text-lg hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all"
                                >
                                    <span>İletişime Geç</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/projects"
                                    className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full glass hover:bg-white/10 transition-all text-white font-medium text-lg"
                                >
                                    <span>Projelerimiz</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}