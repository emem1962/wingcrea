"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Keşif & Strateji",
    desc: "İş hedeflerinizi, kullanıcı ihtiyaçlarını ve pazar dinamiklerini derinlemesine analiz ediyoruz.",
    duration: "1-2 hafta",
  },
  {
    num: "02",
    title: "Tasarım & Prototip",
    desc: "Wireframe'den yüksek sadakatli prototiplere, kullanıcı testleriyle desteklenmiş tasarımlar.",
    duration: "2-4 hafta",
  },
  {
    num: "03",
    title: "Geliştirme",
    desc: "Modern teknolojiler, temiz kod ve CI/CD pipeline'ları ile production-grade geliştirme.",
    duration: "4-12 hafta",
  },
  {
    num: "04",
    title: "Lansman & Büyüme",
    desc: "Deployment, monitoring ve sürekli optimizasyon ile uzun vadeli başarı.",
    duration: "Sürekli",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={containerRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm uppercase tracking-widest text-pink-400 mb-4"
          >
            ● Çalışma Sürecimiz
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold"
          >
            Fikirden <span className="gradient-text">lansmana</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Animated line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-violet-500 via-blue-500 to-emerald-500"
            />
          </div>

          <div className="space-y-16">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative grid md:grid-cols-2 gap-8 items-center ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 glow z-10" />

                <div className={`pl-20 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}>
                  <div className="glass rounded-3xl p-8 hover:border-violet-500/30 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl font-bold gradient-text">{s.num}</span>
                      <span className="text-xs uppercase tracking-widest text-white/50 px-3 py-1 rounded-full bg-white/5">
                        {s.duration}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                    <p className="text-white/60 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}