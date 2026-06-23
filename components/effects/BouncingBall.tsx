"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function BouncingBall() {
  const ballRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowHeadRef = useRef<SVGPolygonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Viewport'a girince başlat
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const ball = ballRef.current;
    const shadow = shadowRef.current;
    const path = pathRef.current;
    const arrowHead = arrowHeadRef.current;
    if (!ball || !shadow || !path || !arrowHead) return;

    const pathLength = path.getTotalLength();

    // Başlangıç durumu
    gsap.set(ball, {
      x: 0,
      y: 0,
      width: 32,
      height: 32,
      borderRadius: 16,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    });
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      opacity: 0.9,
    });
    gsap.set(arrowHead, { opacity: 0, scale: 0, transformOrigin: "center center" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 6 });

    // ============================================
    // FAZ 1: ZARİF ZIPLAYARAK İLERLEME (0 - 3s)
    // Sadece 3 zıplama, enerji kaybı ile
    // ============================================

    // Çizgi çizimi - smooth
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power2.inOut",
    }, 0);

    // Top path boyunca hareket
    tl.to(ball, {
      x: 480,
      y: -380,
      duration: 3,
      ease: "power2.inOut",
    }, 0);

    // Gölge
    tl.to(shadow, {
      x: 480,
      y: -380,
      duration: 3,
      ease: "power2.inOut",
    }, 0);

    // 1. ZIPLAMA - Yüksek, zarif
    tl.to(ball, { y: "-=70", duration: 0.35, ease: "power3.out" }, 0.3)
      .to(ball, {
        y: "+=70",
        duration: 0.28,
        ease: "power3.in",
        onStart: () => {
          gsap.to(ball, {
            scaleX: 1.15,
            scaleY: 0.88,
            duration: 0.08,
            ease: "power2.out",
          });
        },
        onComplete: () => {
          gsap.to(ball, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.25,
            ease: "elastic.out(1, 0.4)",
          });
        },
      })
      .to(shadow, { scale: 0.5, opacity: 0.3, duration: 0.35, ease: "power3.out" }, "<")
      .to(shadow, { scale: 1, opacity: 0.5, duration: 0.28, ease: "power3.in" }, "<");

    // 2. ZIPLAMA - Orta
    tl.to(ball, { y: "-=45", duration: 0.28, ease: "power3.out" }, 1.0)
      .to(ball, {
        y: "+=45",
        duration: 0.22,
        ease: "power3.in",
        onStart: () => {
          gsap.to(ball, {
            scaleX: 1.12,
            scaleY: 0.9,
            duration: 0.07,
            ease: "power2.out",
          });
        },
        onComplete: () => {
          gsap.to(ball, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.2,
            ease: "elastic.out(1, 0.45)",
          });
        },
      })
      .to(shadow, { scale: 0.65, opacity: 0.35, duration: 0.28, ease: "power3.out" }, "<")
      .to(shadow, { scale: 1, opacity: 0.5, duration: 0.22, ease: "power3.in" }, "<");

    // 3. ZIPLAMA - Alçak, son enerji
    tl.to(ball, { y: "-=25", duration: 0.22, ease: "power3.out" }, 1.7)
      .to(ball, {
        y: "+=25",
        duration: 0.18,
        ease: "power3.in",
        onStart: () => {
          gsap.to(ball, {
            scaleX: 1.08,
            scaleY: 0.93,
            duration: 0.06,
            ease: "power2.out",
          });
        },
        onComplete: () => {
          gsap.to(ball, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.18,
            ease: "elastic.out(1, 0.5)",
          });
        },
      })
      .to(shadow, { scale: 0.8, opacity: 0.4, duration: 0.22, ease: "power3.out" }, "<")
      .to(shadow, { scale: 1, opacity: 0.5, duration: 0.18, ease: "power3.in" }, "<");

    // ============================================
    // FAZ 2: NAZİK OKA DÖNÜŞÜM (3s - 3.8s)
    // Top küçülüp kaybolur, ok nazikçe belirir
    // ============================================

    // Top nazikçe küçülüp kaybolur
    tl.to(ball, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    tl.to(shadow, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "<");

    // Ok ucu nazikçe belirir
    tl.to(arrowHead, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.1");

    // Hafif pulse (sadece 1 kez, subtle)
    tl.to(arrowHead, {
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out",
    })
      .to(arrowHead, {
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });

    // ============================================
    // FAZ 3: UZUN BEKLEME, SONRA ZARİF GERİ DÖNÜŞ (3.8s - 9s)
    // ============================================

    // Uzun bekleme (6 saniye repeatDelay zaten var)
    // Geri dönüş çok yavaş ve zarif
    tl.to(arrowHead, {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      ease: "power2.inOut",
    });

    tl.to(path, {
      strokeDashoffset: pathLength,
      duration: 0.8,
      ease: "power2.inOut",
    }, "-=0.3");

    tl.to(ball, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.inOut",
    }, "-=0.4");

    tl.to(shadow, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0.5,
      duration: 0.6,
      ease: "power2.inOut",
    }, "<");

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ zIndex: 5 }}
    >
      {/* SVG Çizgi - Zarif, sade kıvrımlar */}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 600 500"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Zarif kıvrımlı path - sadece 2 büyük kıvrım */}
        <path
          ref={pathRef}
          d="M 40 460 C 120 420, 200 380, 260 320 S 380 220, 480 120"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))",
          }}
        />

        {/* Ok ucu - zarif, küçük */}
        <polygon
          ref={arrowHeadRef}
          points="475,115 495,120 475,125"
          fill="#6366f1"
          style={{
            filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))",
          }}
        />
      </svg>

      {/* Gölge - subtle */}
      <div
        ref={shadowRef}
        className="absolute bottom-[40px] left-[40px] w-8 h-2 rounded-full bg-violet-500/40 blur-sm"
      />

      {/* Top - daha küçük, zarif */}
      <div
        ref={ballRef}
        className="absolute bottom-[40px] left-[40px] overflow-hidden"
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          background: "radial-gradient(circle at 30% 30%, #c4b5fd, #8b5cf6, #6366f1)",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.6), inset -2px -2px 4px rgba(0,0,0,0.2)",
        }}
      >
        {/* 3D parlama - daha subtle */}
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full bg-white/60 blur-[1px]" />
        <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white/90" />
      </div>
    </div>
  );
}