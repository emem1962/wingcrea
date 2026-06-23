"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

const services = [
    {
        num: "WEB",
        title: "Web Sitesi Tasarımı",
        subtitle: "Stratejik Dijital Varlıklar",
        desc: "Sadece web sitesi tasarlamıyoruz — markanızı yükselten ve sonuç getiren stratejik dijital varlıklar inşa ediyoruz. Şık landing page'lerden karmaşık kurumsal platformlara kadar, her piksel amaçlı, her etkileşim bilinçli. Tasarım sürecimiz estetik mükemmelliği kullanıcı psikolojisiyle harmanlayarak, sitenizin sadece çarpıcı görünmesini değil, ziyaretçileri anlamlı eylemlere yönlendirmesini de sağlar.",
        features: [
            "Özel UI/UX Tasarımı",
            "Tam Responsive",
            "Performans Optimize",
            "Erişilebilirlik Uyumlu",
            "SEO Odaklı Yapı",
            "Kolay İçerik Yönetimi",
        ],
        gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
        accent: "violet",
    },
    {
        num: "SALES",
        title: "E-Ticaret Çözümleri",
        subtitle: "Yüksek Dönüşüm Platformları",
        desc: "Online mağazanız en az sizin kadar çalışmalı. Güzel tasarımı sağlam işlevsellikle birleştiren, yüksek dönüşüm sağlayan e-ticaret platformları geliştiriyoruz. Ürün keşfinden ödeme adımına kadar her temas noktasını optimize ederek satışları maksimize ediyor, kesintisiz bir alışveriş deneyimi sunuyoruz. İster yeni bir marka başlatıyor ister mevcut bir mağazayı büyütüyor olun, çözümlerimiz hedeflerinizle birlikte büyür.",
        features: [
            "Özel Mağaza Tasarımı",
            "Güvenli Ödeme Entegrasyonu",
            "Stok & Sipariş Yönetimi",
            "Çoklu Para Birimi & Dil Desteği",
            "Analitik & Dönüşüm Takibi",
            "Ölçeklenebilir Mimari",
        ],
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        accent: "blue",
    },
    {
        num: "ENGINE",
        title: "Sektöre Özel Yazılım",
        subtitle: "İş Akışınıza Özel Çözümler",
        desc: "Hazır yazılımlar nadiren tam olarak uyar. İş akışlarınıza, uyumluluk ihtiyaçlarınıza ve büyüme hedeflerinize özel uygulamalar geliştirmek için sizinle ortak çalışıyoruz. Sağlık portallarından fintech panellerine kadar, geliştirme ekibimiz derin teknik uzmanlığı sektör bilgisiyle birleştirerek sadece çalışmakla kalmayan — çalışma şeklinizi dönüştüren yazılımlar sunar.",
        features: [
            "Özel Özellik Geliştirme",
            "Kurumsal Düzeyde Güvenlik",
            "Sorunsuz API Entegrasyonları",
            "Ölçeklenebilir Bulut Mimari",
            "Rol Tabanlı Erişim Kontrolü",
            "Sürekli Destek & Güncellemeler",
        ],
        gradient: "from-emerald-500 via-green-500 to-lime-500",
        accent: "emerald",
    },
    {
        num: "AI",
        title: "Yapay Zeka Entegrasyonu",
        subtitle: "Geleceğe Dönük AI Çözümleri",
        desc: "İşletmenizi akıllı, geleceğe dönük AI çözümleriyle güçlendiriyoruz. Tahminleyici analitik ve otomatik iş akışlarından özel makine öğrenmesi modellerine kadar, yapay zekayı mevcut sistemlerinize sorunsuz entegre ediyoruz. Yaklaşımımız yeni operasyonel verimlilikler açığa çıkarır, veriye dayalı kararları destekler ve belirgin bir rekabet avantajı yaratır.",
        features: [
            "Tahminleyici Analitik & İçgörüler",
            "Akıllı İş Akışı Otomasyonu",
            "Özel Makine Öğrenmesi Modelleri",
            "Sorunsuz Sistem Entegrasyonu",
            "Veri Odaklı Karar Alma",
            "Rekabet Avantajı",
        ],
        gradient: "from-orange-500 via-amber-500 to-yellow-500",
        accent: "orange",
    },
];

export default function ServicesPage() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-24"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                        <span className="text-white">Dijital dönüşümünüz için</span>
                        <br />
                        <span className="gradient-text">uçtan uca çözümler</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Fikirden lansmana, tüm aşamalarda yanınızdayız. Her projede mükemmelliği hedefliyoruz.
                    </p>
                </motion.div>

                {/* Hizmetler - Zigzag Layout */}
                <div className="space-y-32 md:space-y-40">
                    {services.map((service, i) => {
                        const isEven = i % 2 === 0;
                        const isExpanded = expandedIndex === i;

                        return (
                            <motion.div
                                key={service.num}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="relative"
                            >
                                <div
                                    className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? "lg:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Sol Taraf - İçerik (Çift sayılarda) */}
                                    <div
                                        className={`space-y-8 ${!isEven ? "lg:order-2" : "lg:order-1"
                                            }`}
                                    >
                                        {/* Numara + Başlık */}
                                        <div>
                                            <div className="flex items-center gap-4 mb-4">

                                                <div
                                                    className={`h-px flex-1 bg-gradient-to-r ${service.gradient} opacity-30`}
                                                />
                                            </div>

                                            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
                                                — {service.subtitle}
                                            </div>

                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                                                <span className="text-white">{service.title}</span>
                                            </h2>

                                            <p className="text-lg text-white/60 leading-relaxed">
                                                {service.desc}
                                            </p>
                                        </div>

                                        {/* Özellikler */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {service.features.map((feature, idx) => (
                                                <motion.div
                                                    key={feature}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        delay: 0.3 + idx * 0.08,
                                                        duration: 0.5,
                                                    }}
                                                    className="flex items-center gap-3 group"
                                                >
                                                    <div
                                                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                                                    >
                                                        <CheckCircle2
                                                            size={14}
                                                            className="text-white"
                                                        />
                                                    </div>
                                                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                                        {feature}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <Link
                                                href="/contact"
                                                className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r ${service.gradient} text-white font-medium hover:shadow-2xl transition-all duration-300`}
                                                style={{
                                                    boxShadow: `0 0 40px rgba(139, 92, 246, 0.3)`,
                                                }}
                                            >
                                                <span>Teklif Al</span>
                                                <ArrowUpRight
                                                    size={18}
                                                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                                />
                                            </Link>
                                        </motion.div>
                                    </div>

                                    {/* Sağ Taraf - Dekoratif Görsel */}
                                    <div
                                        className={`relative ${!isEven ? "lg:order-1" : "lg:order-2"
                                            }`}
                                    >
                                        <div className="relative aspect-square max-w-lg mx-auto">
                                            {/* Arka plan gradient blob */}
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
                                                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-20`}
                                            />

                                            {/* Dönen çemberler */}
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 30,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                className="absolute inset-8 rounded-full border border-white/10"
                                            />
                                            <motion.div
                                                animate={{ rotate: -360 }}
                                                transition={{
                                                    duration: 20,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                className="absolute inset-16 rounded-full border border-white/5"
                                            />
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 40,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                className="absolute inset-24 rounded-full border border-white/5"
                                            />

                                            {/* Merkez numara */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.05, 1],
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                    className={`text-[12rem] md:text-[16rem] font-bold bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent opacity-20`}
                                                >
                                                    {service.num}
                                                </motion.div>
                                            </div>

                                            {/* Floating özellik noktaları */}
                                            {service.features.slice(0, 4).map((_, idx) => {
                                                const angle = (idx * 90 * Math.PI) / 180;
                                                const radius = 45;
                                                const x = 50 + radius * Math.cos(angle);
                                                const y = 50 + radius * Math.sin(angle);

                                                return (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        whileInView={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        viewport={{ once: true }}
                                                        animate={{
                                                            y: [0, -10],
                                                        }}
                                                        transition={{
                                                            delay: 0.5 + idx * 0.1,
                                                            type: "spring",
                                                            y: {
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                repeatType: "reverse",
                                                                ease: "easeInOut",
                                                            },
                                                        }}
                                                        className={`absolute w-3 h-3 rounded-full bg-gradient-to-br ${service.gradient}`}
                                                        style={{
                                                            left: `${x}%`,
                                                            top: `${y}%`,
                                                            boxShadow: `0 0 20px rgba(139, 92, 246, 0.6)`,
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Bölüm ayırıcı çizgi */}
                                {i < services.length - 1 && (
                                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-white/20 to-transparent" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Alt CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-32 text-center"
                >
                    <div className="glass rounded-3xl p-12 md:p-16 border border-white/10 relative overflow-hidden">
                        {/* Dekoratif arka plan */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-emerald-500/10" />

                        <div className="relative">
                            <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                <span className="text-white">Projenizi</span>
                                <br />
                                <span className="gradient-text">hayata geçirelim</span>
                            </h3>
                            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
                                Hangi hizmete ihtiyacınız olursa olsun, size özel bir çözüm sunmak için hazırız.
                            </p>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium text-lg hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300"
                            >
                                <span>Ücretsiz Danışmanlık</span>
                                <ArrowUpRight
                                    size={20}
                                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
