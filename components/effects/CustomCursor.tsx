"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 }); // Ekran dışı başlat
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Mobil cihazlarda cursor'ı gizle
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!visible) setVisible(true);
        };

        const handleMouseLeave = () => setVisible(false);
        const handleMouseEnter = () => setVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", checkMobile);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [visible]);

    // Mobil cihazlarda veya henüz mouse hareket etmemişse gizle
    if (isMobile || !visible) return null;

    return (
        <>
            {/* Ana cursor */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
                animate={{ 
                    x: position.x - 8, 
                    y: position.y - 8,
                    scale: 1,
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 28,
                    mass: 0.5
                }}
            />
            
            {/* Dış halka (opsiyonel - daha büyük cursor efekti) */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/50 pointer-events-none z-[9998] mix-blend-difference"
                animate={{ 
                    x: position.x - 20, 
                    y: position.y - 20,
                    scale: 1,
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 250, 
                    damping: 20,
                    mass: 0.8
                }}
            />
        </>
    );
}
