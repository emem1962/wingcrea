"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Web Geliştirme",
    tags: ["Next.js", "React", "TypeScript"],
    desc: "Yüksek performanslı, SEO dostu ve ölçeklenebilir web uygulamaları. E-ticaret platformlarından SaaS ürünlerine kadar.",
  },
  {
    num: "02",
    title: "Mobil Uygulama",
    tags: ["React Native", "iOS", "Android"],
    desc: "Native hissiyatında cross-platform mobil deneyimler. App Store ve Play Store'da öne çıkan uygulamalar.",
  },
  {
    num: "03",
    title: "Yapay Zeka Çözümleri",
    tags: ["LLM", "GPT-4", "LangChain"],
    desc: "Özel AI ajanları, chatbot'lar ve otomasyon sistemleri. İş süreçlerinizi yapay zeka ile dönüştürün.",
  },
  {
    num: "04",
    title: "UI/UX Tasarım",
    tags: ["Figma", "Design System", "Prototyping"],
    desc: "Kullanıcı odaklı, ödüllü arayüz tasarımları. Markanızı yansıtan premium dijital deneyimler.",
  },
  {
    num: "05",
    title: "DevOps & Cloud",
    tags: ["AWS", "Docker", "Kubernetes"],
    desc: "Ölçeklenebilir bulut altyapısı, CI/CD pipeline'ları ve güvenilir deployment süreçleri.",
  },
];

export function Footer() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <footer className="relative border-t border-white/10 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h3 className="text-5xl md:text-8xl font-bold tracking-tight">
            <span className="gradient-text">Hazır mısınız?</span>
          </h3>
          <a
            href="#contact"
            className="inline-block mt-8 text-xl md:text-2xl underline underline-offset-8 hover:text-violet-400 transition-colors"
          >
            hello@wingcrea.com →
          </a>
        </motion.div>

        {/* Alt Bölüm: Logo + Video + Bilgi */}
        <div className="grid md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-white/10">
          {/* Logo ve açıklama */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="flex items-center gap-2 text-2xl font-bold mb-4">
              <span className="gradient-text">Wingcrea</span>
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed mb-6">
              Premium yazılım stüdyosu. Dijital deneyimleri yeniden tanımlıyoruz.
            </p>
          </motion.div>

          {/* İletişim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
                       {/* Video */}
            <div className="relative w-56 rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover"
              >
                <source src="/wingcrea_footer.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Sosyal / Durum */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              — Durum
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-white font-medium">Yeni projelere açığız</span>
            </div>
            <div className="text-white/60 text-sm">
              Ortalama yanıt süresi: <span className="text-white">2 saat</span>
            </div>
            <div className="text-white/60 text-sm mt-1">
              Sonraki müsaitlik: <span className="text-white">2 hafta</span>
            </div>
          </motion.div>
        </div>

        {/* Alt bilgi */}
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-4 text-sm text-white/40">
          <div>© 2026 Wingcrea. Tüm hakları saklıdır.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Gizlilik
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Koşullar
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Çerezler
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}