"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 🎯 Scroll sırasında hover'ı devre dışı bırak
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);
            setHoveredIndex(null); // Scroll sırasında hover'ı kapat

            // Scroll timeout - 150ms sonra scroll bitti kabul et
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

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

                    {/* Hizmet Listesi */}
                    <div className="border-t border-white/10">
                        {services.map((service, i) => {
                            const isHovered = hoveredIndex === i && !isScrolling;

                            return (
                                <div
                                    key={service.num}
                                    onMouseEnter={() => !isScrolling && setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="group relative border-b border-white/10 overflow-hidden cursor-pointer"
                                >
                                    {/* Hover arka plan gradient - CSS transition ile */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-blue-500/0 transition-opacity duration-400 ${
                                            isHovered ? "opacity-100" : "opacity-0"
                                        }`}
                                    />

                                    {/* Ana içerik */}
                                    <div className="relative grid grid-cols-12 gap-4 py-8 md:py-10 items-center px-2 md:px-6">
                                        {/* Numara */}
                                        <div className="col-span-2 md:col-span-1">
                                            <span className={`text-sm md:text-base font-mono transition-colors duration-300 ${
                                                isHovered ? "text-violet-400" : "text-white/40"
                                            }`}>
                                                {service.num}
                                            </span>
                                        </div>

                                        {/* Başlık */}
                                        <div className="col-span-10 md:col-span-5">
                                            <h3 className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-transform duration-500 ${
                                                isHovered ? "translate-x-4" : "translate-x-0"
                                            }`}>
                                                <span className={`transition-colors duration-300 ${
                                                    isHovered ? "text-white" : "text-white/90"
                                                }`}>
                                                    {service.title}
                                                </span>
                                            </h3>
                                        </div>

                                        {/* Tags - Desktop */}
                                        <div className="hidden md:flex col-span-4 gap-2 flex-wrap items-center">
                                            {service.features.slice(0, 3).map((feature) => (
                                                <span
                                                    key={feature}
                                                    className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 ${
                                                        isHovered
                                                            ? "border-violet-500/30 text-violet-300"
                                                            : "border-white/10 text-white/50"
                                                    }`}
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Ok ikonu */}
                                        <div className="hidden md:flex col-span-2 justify-end">
                                            <div className={`transition-all duration-300 ${
                                                isHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-30"
                                            }`}>
                                                <ArrowUpRight
                                                    size={32}
                                                    className={`transition-colors duration-300 ${
                                                        isHovered ? "text-violet-400" : "text-white/60"
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Açıklama + Özellikler - CSS transition ile */}
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                            isHovered ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="px-2 md:px-6 pb-8 md:pb-10 pl-12 md:pl-24">
                                            {/* Açıklama */}
                                            <p className="text-base md:text-lg text-white/60 max-w-4xl leading-relaxed mb-6">
                                                {service.desc}
                                            </p>

                                            {/* Özellikler Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 max-w-4xl">
                                                {service.features.map((feature, idx) => (
                                                    <div
                                                        key={feature}
                                                        className="flex items-center gap-2 text-sm text-white/70"
                                                        style={{
                                                            transition: `opacity 0.3s ease ${idx * 0.05}s, transform 0.3s ease ${idx * 0.05}s`,
                                                            opacity: isHovered ? 1 : 0,
                                                            transform: isHovered ? "translateX(0)" : "translateX(-10px)",
                                                        }}
                                                    >
                                                        <span className="text-violet-400 text-xs">✦</span>
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
