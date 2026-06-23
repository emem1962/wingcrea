"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function AdminContent() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            fetchContent();
        }
    }, [status]);

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/content");
            if (!res.ok) throw new Error('İçerik yüklenemedi');
            const data = await res.json();
            setContent(data);
        } catch (error) {
            console.error("İçerik yüklenemedi:", error);
            setErrorMessage('İçerik yüklenirken hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveStatus('idle');
        setErrorMessage('');

        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(content),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Kaydetme başarısız');
            }

            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            console.error("Kaydetme hatası:", error);
            setSaveStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Kaydetme hatası');
            setTimeout(() => setSaveStatus('idle'), 5000);
        } finally {
            setSaving(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
                    <div className="text-white/60">Yükleniyor...</div>
                </div>
            </div>
        );
    }

    if (!session || !content) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/dashboard"
                            className="p-2 rounded-lg glass hover:bg-white/10 transition-all"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-3xl font-bold gradient-text">İçerik Yönetimi</h1>
                    </div>

                    {/* Geliştirilmiş Kaydet Butonu */}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`
              relative group flex items-center gap-2 px-8 py-3 rounded-xl font-medium
              transition-all duration-300 overflow-hidden
              ${saving
                                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                                : saveStatus === 'success'
                                    ? 'bg-emerald-500 text-white'
                                    : saveStatus === 'error'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105'
                            }
            `}
                    >
                        {/* Background animation */}
                        {!saving && saveStatus === 'idle' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}

                        {/* Icon */}
                        {saving ? (
                            <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                        ) : saveStatus === 'success' ? (
                            <CheckCircle className="w-5 h-5 relative z-10" />
                        ) : saveStatus === 'error' ? (
                            <AlertCircle className="w-5 h-5 relative z-10" />
                        ) : (
                            <Save className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                        )}

                        {/* Text */}
                        <span className="relative z-10">
                            {saving
                                ? 'Kaydediliyor...'
                                : saveStatus === 'success'
                                    ? 'Kaydedildi!'
                                    : saveStatus === 'error'
                                        ? 'Hata!'
                                        : 'Kaydet'
                            }
                        </span>

                        {/* Shine effect */}
                        {!saving && saveStatus === 'idle' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        )}
                    </button>
                </div>

                {/* Status Message */}
                {saveStatus === 'error' && errorMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
                        <AlertCircle size={20} />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Content Editor */}
                <div className="space-y-6">
                    {/* Hero Section */}
                    <div className="p-6 glass rounded-2xl border border-white/5 hover:border-violet-500/20 transition-all">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-violet-400" />
                            Hero Bölümü
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Başlık</label>
                                <input
                                    type="text"
                                    value={content.hero?.title || ""}
                                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Alt Başlık</label>
                                <textarea
                                    value={content.hero?.subtitle || ""}
                                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="p-6 glass rounded-2xl border border-white/5 hover:border-violet-500/20 transition-all">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            Hakkımızda
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Başlık</label>
                                <input
                                    type="text"
                                    value={content.about?.title || ""}
                                    onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Açıklama</label>
                                <textarea
                                    value={content.about?.description || ""}
                                    onChange={(e) => setContent({ ...content, about: { ...content.about, description: e.target.value } })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="p-6 glass rounded-2xl border border-white/5 hover:border-violet-500/20 transition-all">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            İletişim Bilgileri
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">E-posta</label>
                                <input
                                    type="email"
                                    value={content.contact?.email || ""}
                                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Telefon</label>
                                <input
                                    type="text"
                                    value={content.contact?.phone || ""}
                                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Adres</label>
                                <input
                                    type="text"
                                    value={content.contact?.address || ""}
                                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}