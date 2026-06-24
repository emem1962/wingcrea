"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
    {
        num: "01",
        title: "Web Sitesi Tasarımı",
        desc: "Sadece web sitesi tasarlamıyoruz — markanızı yükselten ve sonuç getiren stratejik dijital varlıklar inşa ediyoruz.",
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
        desc: "Online mağazanız en az sizin kadar çalışmalı. Güzel tasarımı sağlam işlevsellikle birleştiren, yüksek dönüşüm sağlayan e-ticaret platformları geliştiriyoruz.",
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
        desc: "Hazır yazılımlar nadiren tam olarak uyar. İş akışlarınıza, uyumluluk ihtiyaçlarınıza ve büyüme hedeflerinize özel uygulamalar geliştiriyoruz.",
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
        desc: "İşletmenizi akıllı, geleceğe dönük AI çözümleriyle güçlendiriyoruz. Tahminleyici analitik ve otomatik iş akışlarından özel makine öğrenmesi modellerine kadar.",
        features: [
            "Tahminleyici Analitik & İçgörüler",
            "Akıllı İş Akışı Otomasyonu",
            "Özel Makine Öğrenmesi Modelleri",
            "Sorunsuz Sistem Entegrasyonu",
        ],
    },
];

export function Services() {
    return (
        <section id="services" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Başlık */}
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
                        Uçtan uca <span className="gradient-text">dijital çözümler</span>
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

                {/* Hizmetler Listesi */}
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
                                Neler <span className="gradient-text">Yaparım</span>
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

                    {/* Hizmet Satırları - CSS ONLY HOVER */}
                    <div className="border-t border-white/10">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="group relative border-b border-white/10 cursor-pointer"
                            >
                                {/* Hover arka plan - CSS only */}
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                                {/* Ana içerik */}
                                <div className="relative grid grid-cols-12 gap-4 py-8 md:py-10 items-center px-2 md:px-6">
                                    {/* Numara */}
                                    <div className="col-span-2 md:col-span-1">
                                        <span className="text-sm md:text-base font-mono text-white/40 group-hover:text-violet-400 transition-colors duration-300">
                                            {service.num}
                                        </span>
                                    </div>

                                    {/* Başlık */}
                                    <div className="col-span-10 md:col-span-5">
                                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                                            <span className="text-white/90 group-hover:text-white transition-colors duration-300">
                                                {service.title}
                                            </span>
                                        </h3>
                                    </div>

                                    {/* Özellikler - Desktop */}
                                    <div className="hidden md:flex col-span-4 gap-2 flex-wrap items-center">
                                        {service.features.slice(0, 3).map((feature) => (
                                            <span
                                                key={feature}
                                                className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/50 group-hover:border-violet-500/30 group-hover:text-violet-300 transition-all duration-300"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Ok ikonu */}
                                    <div className="hidden md:flex col-span-2 justify-end">
                                        <div className="group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2 opacity-30 transition-all duration-300">
                                            <ArrowUpRight
                                                size={32}
                                                className="text-white/60 group-hover:text-violet-400 transition-colors duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Açıklama - Hover'da görünür, CSS only */}
                                <div className="overflow-hidden max-h-0 group-hover:max-h-[300px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                                    <div className="px-2 md:px-6 pb-8 md:pb-10 pl-12 md:pl-24">
                                        <p className="text-base md:text-lg text-white/60 max-w-4xl leading-relaxed">
                                            {service.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
