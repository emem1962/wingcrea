"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Zap, Award } from "lucide-react";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const features = [
    {
      icon: Target,
      title: "Vizyoner Yaklaşım",
      desc: "Her projede geleceğin teknolojilerini bugünden entegre ediyoruz.",
    },
    {
      icon: Zap,
      title: "Hız & Performans",
      desc: "Milisaniye düzeyinde optimize edilmiş, ölçeklenebilir çözümler.",
    },
    {
      icon: Award,
      title: "Ödüllü Tasarım",
      desc: "Awwwards ve FWA standartlarında premium dijital deneyimler.",
    },
  ];

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div style={{ y: textY }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm uppercase tracking-widest text-violet-400 mb-4"
          >
            ● Hakkımızda
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            Kod yazmıyoruz,{" "}
            <span className="gradient-text">deneyimler tasarlıyoruz.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 leading-relaxed mb-10"
          >
            Wingcrea, 2006'den bu yana startup'lardan BIST100 şirketlerine kadar
            pek çok marka için dijital ürünler geliştiren bağımsız bir yazılım
            stüdyosudur. Tasarım, mühendislik ve stratejiyi tek çatı altında
            birleştiriyoruz.
          </motion.p>

          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ x: 10 }}
                className="group glass rounded-2xl p-5 flex items-start gap-4 hover:border-violet-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <f.icon className="text-violet-400" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                  <p className="text-sm text-white/60">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ y: imgY }} className="relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 via-blue-600/30 to-emerald-500/40" />
<div className="absolute inset-0">
  {/* Video arka plan */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/wingcrea_yazilim_hakkimizda.mp4" type="video/mp4" />
  </video>

  {/* Video üzerine overlay (daha iyi görünüm için) */}
  <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-black/20 to-blue-900/40" />

  {/* Dönen çemberler - video üstünde */}
  <div className="absolute inset-0 flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="w-64 h-64 rounded-full border border-white/20"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute w-48 h-48 rounded-full border border-white/10"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 blur-2xl opacity-40"
    />
  </div>
</div>
          </div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 glass rounded-2xl p-4 glow"
          >
            <div className="text-3xl font-bold gradient-text">98%</div>
            <div className="text-xs text-white/60">Müşteri Memnuniyeti</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}