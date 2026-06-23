"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { MagneticButton } from "../effects/1MagneticButton";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    company: "", 
    message: "", 
    budget: "10-25k" 
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", company: "", message: "", budget: "10-25k" });
        setTimeout(() => setSent(false), 5000);
      } else {
        setError(data.error || "Mesaj gönderilemedi. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("Form hatası:", err);
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-violet-600/20 via-blue-600/20 to-emerald-500/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm uppercase tracking-widest text-emerald-400 mb-4"
          >
            ● İletişim
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Bir sonraki projeniz <br />
            <span className="gradient-text">başlasın.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Fikrinizi anlatın, 24 saat içinde size özel bir yol haritası ile dönelim.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, label: "E-posta", value: "hello@wingcrea.com" },
              { icon: MapPin, label: "Konum", value: "İstanbul" },
            ].map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 8 }}
                className="glass rounded-2xl p-6 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center">
                  <c.icon className="text-violet-400" size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50">{c.label}</div>
                  <div className="font-medium">{c.value}</div>
                </div>
              </motion.div>
            ))}

            <div className="glass rounded-2xl p-6">
              <div className="text-sm text-white/60 mb-3">Çalışma saatleri</div>
              <div className="font-medium mb-1">Pzt - Cum: 09:00 - 18:00</div>
              <div className="text-sm text-white/60">Ortalama yanıt süresi: 2 saat</div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass rounded-3xl p-8 md:p-10 space-y-5"
          >
            {/* Başarı Mesajı */}
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3"
              >
                <CheckCircle className="text-emerald-400" size={20} />
                <div>
                  <div className="font-semibold text-emerald-400">Mesajınız gönderildi!</div>
                  <div className="text-sm text-white/60">En kısa sürede dönüş yapacağız.</div>
                </div>
              </motion.div>
            )}

            {/* Hata Mesajı */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
              >
                <AlertCircle className="text-red-400" size={20} />
                <span className="text-red-400 text-sm">{error}</span>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-white/60 mb-2 block">İsim</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">E-posta</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all"
                  placeholder="mail@sirket.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-white/60 mb-2 block">Şirket</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all"
                placeholder="Şirket adı"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-3 block">Bütçe Aralığı</label>
              <div className="grid grid-cols-4 gap-2">
                {["5-10k", "10-25k", "25-50k", "50k+"].map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setForm({ ...form, budget: b })}
                    className={`py-3 rounded-xl text-sm transition-all ${
                      form.budget === b
                        ? "bg-gradient-to-br from-violet-500 to-blue-500 text-white"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-white/60 mb-2 block">Proje Detayları</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all resize-none"
                placeholder="Projenizi kısaca anlatın..."
              />
            </div>

            <MagneticButton className="w-full">
              <button
                type="submit"
                disabled={sending || sent}
                className={`w-full py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  sent
                    ? "bg-emerald-500"
                    : sending
                    ? "bg-white/10 cursor-not-allowed"
                    : "bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 hover:shadow-2xl hover:shadow-violet-500/30"
                }`}
              >
                {sent ? (
                  <>
                    <CheckCircle size={20} /> Gönderildi!
                  </>
                ) : sending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Gönderiliyor...
                  </>
                ) : (
                  <>
                    Mesaj Gönder <Send size={18} />
                  </>
                )}
              </button>
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}