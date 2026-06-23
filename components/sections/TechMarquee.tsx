"use client";

import { motion } from "framer-motion";

const row1 = ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Prisma", "tRPC", "Tailwind"];
const row2 = ["React Native", "Flutter", "Swift", "Kotlin", "AWS", "Docker", "Kubernetes", "Vercel"];
const row3 = ["OpenAI", "LangChain", "PyTorch", "TensorFlow", "PostgreSQL", "Redis", "MongoDB", "Supabase"];

function Row({ items, reverse = false, speed = 30 }: { items: string[]; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 py-4 glass rounded-2xl hover:bg-white/10 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-violet-400 to-blue-400" />
            <span className="text-xl font-semibold">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-2xl font-bold">Kullandığımız Teknolojiler</h3>
          <span className="text-sm text-white/50">60+ teknoloji · Sürekli güncel</span>
        </div>
      </div>
      <div className="space-y-4">
        <Row items={row1} speed={35} />
        <Row items={row2} reverse speed={40} />
        <Row items={row3} speed={45} />
      </div>
    </section>
  );
}