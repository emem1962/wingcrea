"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Wingcrea ekibi ile çalışmak inanılmaz bir deneyimdi. Ürünümüzü 3 ay içinde lansmana hazırladılar ve beklentilerimizin çok ötesine geçtiler.",
    name: "Elif Yılmaz",
    role: "CEO, Finova",
    img: "https://i.pravatar.cc/150?img=47",
  },
  {
    quote:
      "Teknik yetkinlikleri kadar işimizi anlama biçimleri de etkileyici. Gerçek bir stratejik partner bulduk.",
    name: "Mehmet Demir",
    role: "CTO, Lumen Health",
    img: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote:
      "AI entegrasyonu konusunda piyasadaki en iyi ekiple çalıştık. ROI'miz ilk çeyrekte %340 arttı.",
    name: "Ayşe Kaya",
    role: "Founder, Neural Studio",
    img: "https://i.pravatar.cc/150?img=32",
  },
  {
    quote:
      "Tasarım kalitesi ve kullanıcı deneyimi konusunda takıntılılar. Tam da aradığımız şey buydu.",
    name: "Can Özkan",
    role: "Head of Product, Atelier Luxe",
    img: "https://i.pravatar.cc/150?img=68",
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-30" />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm uppercase tracking-widest text-amber-400 mb-4"
          >
            ● Müşteri Görüşleri
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold"
          >
            Müşterilerimiz <span className="gradient-text">ne diyor?</span>
          </motion.h2>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl p-10 md:p-16 text-center"
            >
              <Quote size={48} className="mx-auto mb-6 text-violet-400 opacity-50" />
              <p className="text-xl md:text-3xl font-light leading-relaxed mb-10 text-white/90">
                "{testimonials[idx].quote}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[idx].img}
                  alt={testimonials[idx].name}
                  className="w-14 h-14 rounded-full border-2 border-white/20"
                />
                <div className="text-left">
                  <div className="font-semibold">{testimonials[idx].name}</div>
                  <div className="text-sm text-white/60">{testimonials[idx].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-white" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
