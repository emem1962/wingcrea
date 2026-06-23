"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Kullanıcı adı veya şifre hatalı");
        } else {
            router.push("/admin/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 glass rounded-3xl">
                <h1 className="text-3xl font-bold text-center mb-8 gradient-text">
                    Admin Girişi
                </h1>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-white/60 mb-2">Kullanıcı Adı</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                            placeholder="admin"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-white/60 mb-2">Şifre</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium"
                    >
                        Giriş Yap
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-white/40">
                    Kullanıcı: admin / Şifre: admin123
                </div>
            </div>
        </div>
    );
}