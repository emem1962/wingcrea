"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
    {
        num: "01",
        title: "Web Sitesi Tasarımı",
        desc: "Sadece web sitesi tasarlamıyoruz — markanızı yükselten ve sonuç getiren stratejik dijital varlıklar inşa ediyoruz. Şık landing page'lerden karmaşık kurumsal platformlara kadar, her piksel amaçlı, her etkileşim bilinçli. Tasarım sürecimiz estetik mükemmelliği kullanıcı psikolojisiyle harmanlayarak, sitenizin sadece çarpıcı görünmesini değil, ziyaretçileri anlamlı eylemlere yönlendirmesini de sağlar.",
        features: [
            "Özel UI/UX Tasarımı",
            "Tam Responsive",
            "Performans Optimize",
            "Erişilebilirlik Uyumlu",
            "SEO Odaklı Yapı",
            "Kolay İçerik Yönetimi",
        ],
    },
    {
        num: "02",
        title: "E-Ticaret Çözümleri",
        desc: "Online mağazanız en az sizin kadar çalışmalı. Güzel tasarımı sağlam işlevsellikle birleştiren, yüksek dönüşüm sağlayan e-ticaret platformları geliştiriyoruz. Ürün keşfinden ödeme adımına kadar her temas noktasını optimize ederek satışları maksimize ediyor, kesintisiz bir alışveriş deneyimi sunuyoruz. İster yeni bir marka başlatıyor ister mevcut bir mağazayı büyütüyor olun, çözümlerimiz hedeflerinizle birlikte büyür.",
        features: [
            "Özel Mağaza Tasarımı",
            "Güvenli Ödeme Entegrasyonu",
            "Stok & Sipariş Yönetimi",
            "Çoklu Para Birimi & Dil Desteği",
            "Analitik & Dönüşüm Takibi",
            "Ölçeklenebilir Mimari",
        ],
    },
    {
        num: "03",
        title: "Sektöre Özel Yazılım",
        desc: "Hazır yazılımlar nadiren tam olarak uyar. İş akışlarınıza, uyumluluk ihtiyaçlarınıza ve büyüme hedeflerinize özel uygulamalar geliştirmek için sizinle ortak çalışıyoruz. Sağlık portallarından fintech panellerine kadar, geliştirme ekibimiz derin teknik uzmanlığı sektör bilgisiyle birleştirerek sadece çalışmakla kalmayan — çalışma şeklinizi dönüştüren yazılımlar sunar.",
        features: [
            "Özel Özellik Geliştirme",
            "Kurumsal Düzeyde Güvenlik",
            "Sorunsuz API Entegrasyonları",
            "Ölçeklenebilir Bulut Mimari",
            "Rol Tabanlı Erişim Kontrolü",
            "Sürekli Destek & Güncellemeler",
        ],
    },
    {
        num: "04",
        title: "Yapay Zeka Entegrasyonu",
        desc: "İşletmenizi akıllı, geleceğe dönük AI çözümleriyle güçlendiriyoruz. Tahminleyici analitik ve otomatik iş akışlarından özel makine öğrenmesi modellerine kadar, yapay zekayı mevcut sistemlerinize sorunsuz entegre ediyoruz. Yaklaşımımız yeni operasyonel verimlilikler açığa çıkarır, veriye dayalı kararları destekler ve belirgin bir rekabet avantajı yaratır.",
        features: [
            "Tahminleyici Analitik & İçgörüler",
            "Akıllı İş Akışı Otomasyonu",
            "Özel Makine Öğrenmesi Modelleri",
            "Sorunsuz Sistem Entegrasyonu",
        ],
    },
];

export function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="services" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-block text-sm uppercase tracking-widest text-blue-400 mb-4"
                    >
                        ● Hizmetlerimiz
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Dijital dönüşümünüz için{" "}
                        <span className="gradient-text">uçtan uca çözümler</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/60 max-w-2xl mx-auto"
                    >
                        Fikirden lansmana, tüm aşamalarda yanınızdayız.
                    </motion.p>
                </div>

                {/* Hizmetler - Editorial Tarzı */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    {/* Üst başlık */}
                    <div className="flex items-baseline justify-between mb-12 pb-6 border-b border-white/10">
                        <div>
                            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                                — Uzmanlık Alanları
                            </div>
                            <h4 className="text-3xl md:text-5xl font-bold tracking-tight">
                                Neler <span className="gradient-text">Yaparız</span>
                            </h4>
                        </div>
                        <div className="hidden md:block text-right">
                            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                                Hizmet Sayısı
                            </div>
                            <div className="text-5xl font-bold gradient-text">
                                0{services.length}
                            </div>
                        </div>
                    </div>

                    {/* Hizmet Listesi - Büyük Tipografi */}
                    <div className="border-t border-white/10">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group relative border-b border-white/10 overflow-hidden cursor-pointer"
                            >
                                {/* Hover arka plan gradient */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-blue-500/0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Ana içerik */}
                                <div className="relative grid grid-cols-12 gap-4 py-8 md:py-12 items-center px-2 md:px-6">
                                    {/* Numara */}
                                    <div className="col-span-2 md:col-span-1">
                                        <span className="text-sm md:text-base font-mono text-white/40 group-hover:text-violet-400 transition-colors">
                                            {service.num}
                                        </span>
                                    </div>

                                    {/* Başlık */}
                                    <div className="col-span-10 md:col-span-7">
                                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                                            <span className="text-white/90 group-hover:text-white">
                                                {service.title}
                                            </span>
                                        </h3>
                                    </div>

                                    {/* Ok ikonu */}
                                    <div className="hidden md:flex col-span-4 justify-end">
                                        <motion.div
                                            animate={{
                                                x: hoveredIndex === i ? 0 : -10,
                                                opacity: hoveredIndex === i ? 1 : 0.3,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowUpRight
                                                size={32}
                                                className="text-white/60 group-hover:text-violet-400 transition-colors"
                                            />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Açıklama + Özellikler - Hover'da açılır */}
                                <AnimatePresence>
                                    {hoveredIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-2 md:px-6 pb-10 md:pb-12 pl-12 md:pl-24">
                                                {/* Açıklama */}
                                                <p className="text-base md:text-lg text-white/60 max-w-4xl leading-relaxed mb-8">
                                                    {service.desc}
                                                </p>

                                                {/* Özellikler Grid */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 max-w-4xl">
                                                    {service.features.map((feature, idx) => (
                                                        <motion.div
                                                            key={feature}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{
                                                                delay: idx * 0.05,
                                                                duration: 0.3,
                                                            }}
                                                            className="flex items-center gap-2 text-sm text-white/70"
                                                        >
                                                            <span className="text-violet-400 text-xs">
                                                                ✦
                                                            </span>
                                                            <span>{feature}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}