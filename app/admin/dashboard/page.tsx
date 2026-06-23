"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, FolderKanban, LogOut } from "lucide-react";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-white/60">Yükleniyor...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const menuItems = [
        { icon: LayoutDashboard, title: "Genel Bakış", href: "/admin/dashboard", desc: "Panel özeti" },
        { icon: FileText, title: "İçerik Yönetimi", href: "/admin/content", desc: "Site içeriklerini düzenle" },
        { icon: FolderKanban, title: "Projeler", href: "/admin/projects", desc: "Projeleri yönet" },
    ];

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold gradient-text mb-2">Admin Panel</h1>
                        <p className="text-white/60">Hoş geldin, {session.user?.name || 'Admin'}</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-all"
                    >
                        <LogOut size={18} />
                        Çıkış Yap
                    </button>
                </div>

                {/* Menu Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group p-8 glass rounded-2xl hover:border-violet-500/30 transition-all hover:scale-105"
                        >
                            <item.icon className="w-12 h-12 text-violet-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-white/60 text-sm">{item.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="p-6 glass rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4">Hızlı Erişim</h2>
                    <div className="flex gap-4 flex-wrap">
                        <Link
                            href="/"
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                        >
                            Siteyi Görüntüle →
                        </Link>
                        <Link
                            href="/admin/content"
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                        >
                            İçerikleri Düzenle
                        </Link>
                        <Link
                            href="/admin/projects"
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                        >
                            Projeleri Yönet
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}