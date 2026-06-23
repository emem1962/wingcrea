"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    Loader2,
    CheckCircle,
    AlertCircle,
    Image as ImageIcon
} from "lucide-react";

interface Project {
    slug: string;
    title: string;
    category: string;
    subtitle: string;
    description: string;
    hero: {
        tagline: string;
        overview: string;
    };
    slogan: {
        label: string;
        title: string;
        description: string;
    };
    stats: { label: string; value: string }[];
    problem: string;
    solution: string;
    features: { title: string; description: string }[];
    technologies: string[];
    gallery: string[];
    timeline: string;
    client: string;
    role: string;
    gradient: string;
    color: string;
    image: string;
}

const emptyProject: Project = {
    slug: "",
    title: "",
    category: "",
    subtitle: "",
    description: "",
    hero: { tagline: "", overview: "" },
    slogan: {
        label: "",
        title: "",
        description: "",
    },
    stats: [
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" },
    ],
    problem: "",
    solution: "",
    features: [{ title: "", description: "" }],
    technologies: [],
    gallery: [""],
    timeline: "",
    client: "",
    role: "",
    gradient: "from-violet-600 to-blue-600",
    color: "violet",
    image: "",
};

const gradientOptions = [
    { label: "Violet-Blue", value: "from-violet-600 to-blue-600", color: "violet" },
    { label: "Blue-Cyan", value: "from-blue-600 to-cyan-600", color: "blue" },
    { label: "Emerald-Teal", value: "from-emerald-600 to-teal-600", color: "emerald" },
    { label: "Pink-Rose", value: "from-pink-600 to-rose-600", color: "pink" },
    { label: "Orange-Amber", value: "from-orange-600 to-amber-600", color: "orange" },
    { label: "Red-Pink", value: "from-red-600 to-pink-600", color: "red" },
];

export default function AdminProjects() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Project | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [saving, setSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [techInput, setTechInput] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            fetchProjects();
        }
    }, [status]);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Projeler yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project: Project) => {
        setEditing({ ...project });
        setIsNew(false);
    };

    const handleNew = () => {
        setEditing({ ...emptyProject });
        setIsNew(true);
    };

    const handleCancel = () => {
        setEditing(null);
        setIsNew(false);
    };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        setStatusMsg(null);

        try {
            const url = "/api/projects";
            const method = isNew ? "POST" : "PUT";
            const body = isNew
                ? JSON.stringify(editing)
                : JSON.stringify({ slug: editing.slug, project: editing });

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body,
            });

            const data = await res.json();

            if (res.ok) {
                setStatusMsg({ type: 'success', text: isNew ? 'Proje eklendi!' : 'Proje güncellendi!' });
                setTimeout(() => {
                    setEditing(null);
                    setIsNew(false);
                    fetchProjects();
                    setStatusMsg(null);
                }, 1500);
            } else {
                setStatusMsg({ type: 'error', text: data.error || 'İşlem başarısız' });
            }
        } catch (error) {
            setStatusMsg({ type: 'error', text: 'Bağlantı hatası' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch("/api/projects", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug }),
            });

            if (res.ok) {
                setStatusMsg({ type: 'success', text: 'Proje silindi!' });
                fetchProjects();
                setTimeout(() => setStatusMsg(null), 3000);
            }
        } catch (error) {
            setStatusMsg({ type: 'error', text: 'Silme hatası' });
        }
    };

    const addFeature = () => {
        if (!editing) return;
        setEditing({
            ...editing,
            features: [...editing.features, { title: "", description: "" }],
        });
    };

    const removeFeature = (index: number) => {
        if (!editing) return;
        setEditing({
            ...editing,
            features: editing.features.filter((_, i) => i !== index),
        });
    };

    const addTech = () => {
        if (!editing || !techInput.trim()) return;
        setEditing({
            ...editing,
            technologies: [...editing.technologies, techInput.trim()],
        });
        setTechInput("");
    };

    const removeTech = (index: number) => {
        if (!editing) return;
        setEditing({
            ...editing,
            technologies: editing.technologies.filter((_, i) => i !== index),
        });
    };

    const addGallery = () => {
        if (!editing) return;
        setEditing({
            ...editing,
            gallery: [...editing.gallery, ""],
        });
    };

    const removeGallery = (index: number) => {
        if (!editing) return;
        setEditing({
            ...editing,
            gallery: editing.gallery.filter((_, i) => i !== index),
        });
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    // EDITOR VIEW
    if (editing) {
        return (
            <div className="min-h-screen bg-black p-6 md:p-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleCancel}
                                className="p-2 rounded-lg glass hover:bg-white/10 transition-all"
                            >
                                <X size={20} />
                            </button>
                            <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                                {isNew ? "Yeni Proje Ekle" : "Projeyi Düzenle"}
                            </h1>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${saving
                                ? "bg-white/10 text-white/50 cursor-not-allowed"
                                : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-lg hover:shadow-violet-500/50"
                                }`}
                        >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {saving ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                    </div>

                    {/* Status Message */}
                    {statusMsg && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${statusMsg.type === 'success'
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : 'bg-red-500/10 border border-red-500/30 text-red-400'
                            }`}>
                            {statusMsg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span>{statusMsg.text}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Temel Bilgiler */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-violet-400" />
                                Temel Bilgiler
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Başlık *</label>
                                    <input
                                        type="text"
                                        value={editing.title}
                                        onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                        placeholder="Proje başlığı"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Slug *</label>
                                    <input
                                        type="text"
                                        value={editing.slug}
                                        onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                                        disabled={!isNew}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none disabled:opacity-50"
                                        placeholder="ornek-proje-slug"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Kategori</label>
                                    <input
                                        type="text"
                                        value={editing.category}
                                        onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                        placeholder="Sektöre Özel Platform"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Müşteri</label>
                                    <input
                                        type="text"
                                        value={editing.client}
                                        onChange={(e) => setEditing({ ...editing, client: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                        placeholder="Müşteri adı"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-white/60 mb-2">Alt Başlık</label>
                                    <input
                                        type="text"
                                        value={editing.subtitle}
                                        onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                        placeholder="Proje alt başlığı"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-white/60 mb-2">Kısa Açıklama</label>
                                    <textarea
                                        value={editing.description}
                                        onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none resize-none"
                                        placeholder="Projenin kısa açıklaması"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hero Bölümü */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-400" />
                                Hero Bölümü
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Tagline</label>
                                    <input
                                        type="text"
                                        value={editing.hero.tagline}
                                        onChange={(e) => setEditing({ ...editing, hero: { ...editing.hero, tagline: e.target.value } })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                        placeholder="Enterprise • SaaS Platform"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Timeline</label>
                                    <input
                                        type="text"
                                        value={editing.timeline}
                                        onChange={(e) => setEditing({ ...editing, timeline: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                        placeholder="Ocak 2024 - Mart 2025"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-white/60 mb-2">Genel Bakış</label>
                                    <textarea
                                        value={editing.hero.overview}
                                        onChange={(e) => setEditing({ ...editing, hero: { ...editing.hero, overview: e.target.value } })}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none resize-none"
                                        placeholder="Detaylı genel bakış metni"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Slogan Bölümü */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pink-400" />
                                Slogan & Vizyon
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Etiket (Üst Kısım)</label>
                                    <input
                                        type="text"
                                        value={editing.slogan?.label || ""}
                                        onChange={(e) => setEditing({
                                            ...editing,
                                            slogan: { ...editing.slogan, label: e.target.value }
                                        })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                        placeholder="Dijital Dönüşüm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Büyük Başlık</label>
                                    <textarea
                                        value={editing.slogan?.title || ""}
                                        onChange={(e) => setEditing({
                                            ...editing,
                                            slogan: { ...editing.slogan, title: e.target.value }
                                        })}
                                        rows={2}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none resize-none"
                                        placeholder="Karmaşık operasyonları tek panelde çözen güçlü bir platform"
                                    />
                                    <p className="text-xs text-white/40 mt-1">İki satıra bölünecek (ilk yarısı beyaz, ikinci yarısı gradient)</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Açıklama</label>
                                    <textarea
                                        value={editing.slogan?.description || ""}
                                        onChange={(e) => setEditing({
                                            ...editing,
                                            slogan: { ...editing.slogan, description: e.target.value }
                                        })}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none resize-none"
                                        placeholder="Detaylı açıklama metni..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Problem & Solution */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-400" />
                                Problem & Çözüm
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Problem</label>
                                    <textarea
                                        value={editing.problem}
                                        onChange={(e) => setEditing({ ...editing, problem: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none resize-none"
                                        placeholder="Karşılaşılan problem"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Çözüm</label>
                                    <textarea
                                        value={editing.solution}
                                        onChange={(e) => setEditing({ ...editing, solution: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none resize-none"
                                        placeholder="Sunulan çözüm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                İstatistikler
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {editing.stats.map((stat, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={stat.label}
                                            onChange={(e) => {
                                                const newStats = [...editing.stats];
                                                newStats[i].label = e.target.value;
                                                setEditing({ ...editing, stats: newStats });
                                            }}
                                            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                            placeholder="Label"
                                        />
                                        <input
                                            type="text"
                                            value={stat.value}
                                            onChange={(e) => {
                                                const newStats = [...editing.stats];
                                                newStats[i].value = e.target.value;
                                                setEditing({ ...editing, stats: newStats });
                                            }}
                                            className="w-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                            placeholder="Değer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="glass rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                                    Özellikler
                                </h2>
                                <button
                                    onClick={addFeature}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-all"
                                >
                                    <Plus size={14} /> Ekle
                                </button>
                            </div>
                            <div className="space-y-3">
                                {editing.features.map((feature, i) => (
                                    <div key={i} className="glass rounded-xl p-4 space-y-2">
                                        <div className="flex items-start gap-2">
                                            <input
                                                type="text"
                                                value={feature.title}
                                                onChange={(e) => {
                                                    const newFeatures = [...editing.features];
                                                    newFeatures[i].title = e.target.value;
                                                    setEditing({ ...editing, features: newFeatures });
                                                }}
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none text-sm"
                                                placeholder="Özellik başlığı"
                                            />
                                            <button
                                                onClick={() => removeFeature(i)}
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <textarea
                                            value={feature.description}
                                            onChange={(e) => {
                                                const newFeatures = [...editing.features];
                                                newFeatures[i].description = e.target.value;
                                                setEditing({ ...editing, features: newFeatures });
                                            }}
                                            rows={2}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none text-sm resize-none"
                                            placeholder="Özellik açıklaması"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Teknolojiler */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pink-400" />
                                Teknolojiler
                            </h2>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                    placeholder="Teknoloji adı (Enter ile ekle)"
                                />
                                <button
                                    onClick={addTech}
                                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {editing.technologies.map((tech, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm"
                                    >
                                        <span>{tech}</span>
                                        <button
                                            onClick={() => removeTech(i)}
                                            className="text-white/40 hover:text-red-400 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Galeri */}
                        <div className="glass rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <ImageIcon size={18} />
                                    Galeri Görselleri
                                </h2>
                                <button
                                    onClick={addGallery}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-all"
                                >
                                    <Plus size={14} /> Ekle
                                </button>
                            </div>
                            <div className="space-y-2">
                                {editing.gallery.map((url, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => {
                                                const newGallery = [...editing.gallery];
                                                newGallery[i] = e.target.value;
                                                setEditing({ ...editing, gallery: newGallery });
                                            }}
                                            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none text-sm"
                                            placeholder="https://..."
                                        />
                                        <button
                                            onClick={() => removeGallery(i)}
                                            className="p-3 rounded-xl hover:bg-red-500/20 text-red-400 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Görsel & Renk */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-400" />
                                Görsel & Renk
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Ana Görsel URL</label>
                                    <input
                                        type="text"
                                        value={editing.image}
                                        onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                        placeholder="https://..."
                                    />
                                    {editing.image && (
                                        <img
                                            src={editing.image}
                                            alt="Preview"
                                            className="mt-3 w-full h-48 object-cover rounded-xl"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Gradient Renk</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {gradientOptions.map((g) => (
                                            <button
                                                key={g.value}
                                                type="button"
                                                onClick={() => setEditing({ ...editing, gradient: g.value, color: g.color })}
                                                className={`p-3 rounded-xl bg-gradient-to-r ${g.value} text-white text-sm font-medium transition-all ${editing.gradient === g.value
                                                    ? 'ring-2 ring-white scale-105'
                                                    : 'opacity-60 hover:opacity-100'
                                                    }`}
                                            >
                                                {g.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Rol</label>
                                    <input
                                        type="text"
                                        value={editing.role}
                                        onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                                        placeholder="Full Stack Developer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // LIST VIEW
    return (
        <div className="min-h-screen bg-black p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/dashboard"
                            className="p-2 rounded-lg glass hover:bg-white/10 transition-all"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold gradient-text">Proje Yönetimi</h1>
                            <p className="text-sm text-white/50 mt-1">{projects.length} proje</p>
                        </div>
                    </div>
                    <button
                        onClick={handleNew}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/50 transition-all"
                    >
                        <Plus size={18} />
                        Yeni Proje
                    </button>
                </div>

                {/* Status Message */}
                {statusMsg && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${statusMsg.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                        }`}>
                        {statusMsg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{statusMsg.text}</span>
                    </div>
                )}

                {/* Projects List */}
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div
                            key={project.slug}
                            className="glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs uppercase tracking-widest text-white/40">
                                            {project.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-1 truncate">{project.title}</h3>
                                    <p className="text-sm text-white/50 truncate">{project.subtitle}</p>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
                                        <span>/{project.slug}</span>
                                        <span>•</span>
                                        <span>{project.features.length} özellik</span>
                                        <span>•</span>
                                        <span>{project.technologies.length} teknoloji</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-all"
                                >
                                    <Edit size={16} />
                                    Düzenle
                                </button>
                                <button
                                    onClick={() => handleDelete(project.slug)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-red-500/20 text-red-400 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-white/40 mb-4">Henüz proje eklenmemiş</div>
                        <button
                            onClick={handleNew}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium"
                        >
                            <Plus size={18} />
                            İlk Projeyi Ekle
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}