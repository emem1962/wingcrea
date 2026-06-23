"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

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
                setForm({ name: "", email: "", message: "" });
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
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        İletişim
                    </h1>
                    <p className="text-xl text-white/60">
                        Projenizi konuşalım.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {[
                        { icon: Mail, label: "E-posta", value: "hello@wingcrea.com" },
                        { icon: MapPin, label: "Adres", value: "İstanbul" },
                    ].map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
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
                </div>

                <motion.form
                    onSubmit={submit}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl p-8 space-y-5"
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
                                <div className="font-semibold text-emerald-400">
                                    Mesajınız gönderildi!
                                </div>
                                <div className="text-sm text-white/60">
                                    En kısa sürede dönüş yapacağız.
                                </div>
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

                    <div>
                        <label className="text-sm text-white/60 mb-2 block">İsim</label>
                        <input
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            disabled={sending}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all disabled:opacity-50"
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
                            disabled={sending}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all disabled:opacity-50"
                            placeholder="mail@sirket.com"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-white/60 mb-2 block">Mesaj</label>
                        <textarea
                            required
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            disabled={sending}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all resize-none disabled:opacity-50"
                            placeholder="Projenizi anlatın..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={sending || sent}
                        className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                            sent
                                ? "bg-emerald-500 text-white"
                                : sending
                                ? "bg-white/10 text-white/50 cursor-not-allowed"
                                : "bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:shadow-lg hover:shadow-violet-500/50 hover:scale-[1.02]"
                        }`}
                    >
                        {sent ? (
                            <>
                                <CheckCircle size={20} />
                                Gönderildi!
                            </>
                        ) : sending ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Gönderiliyor...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                Gönder
                            </>
                        )}
                    </button>
                </motion.form>
            </div>
        </div>
    );
}