import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/effects/SmoothScroller";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { SessionWrapper } from "@/components/providers/SessionWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// 🎯 ANA SEO METADATA
export const metadata: Metadata = {
  metadataBase: new URL("https://wingcrea.com"),
  title: {
    default: "Wingcrea | Yazılım Ajansı - Web, Mobil & AI Çözümleri",
    template: "%s | Wingcrea",
  },
  description:
    "Wingcrea, İstanbul merkezli premium yazılım ajansı. Web geliştirme, mobil uygulama, yapay zeka entegrasyonu ve UI/UX tasarım. Sektöre özel web çözümleri ve AI çözümleri ile dijital dönüşümünüzü hızlandırın.",
  applicationName: "Wingcrea Studio",
  authors: [{ name: "Wingcrea Studio", url: "https://wingcrea.com" }],
  creator: "Wingcrea Studio",
  publisher: "Wingcrea Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "yazılım ajansı",
    "yazılım şirketi",
    "web ajansı",
    "dijital ajans",
    "yazılım geliştirme",
    "web geliştirme",
    "mobil uygulama geliştirme",
    "yapay zeka çözümleri",
    "AI entegrasyonu",
    "UI UX tasarım",
    "freelance developer",
    "full stack developer",
    "next.js geliştirme",
    "react geliştirme",
    "e-ticaret yazılımı",
    "özel yazılım",
    "SaaS geliştirme",
    "API geliştirme",
    "OSGB yazılımı",
    "stok yönetim sistemi",
    "dijital dönüşüm",
    "istanbul yazılım ajansı",
    "türkiye yazılım şirketi",
    "software agency",
    "web development agency",
    "mobile app developer turkey",
    "istanbul software company",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://wingcrea.com",
    languages: {
      "tr-TR": "https://wingcrea.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://wingcrea.com",
    siteName: "Wingcrea Studio",
    title: "Wingcrea | Premium Yazılım Ajansı",
    description:
      "İstanbul merkezli yazılım ajansı. Sektöre özel web çözümleri ve AI çözümleri ile dijital dönüşümünüzü hızlandırın. 600+ başarılı proje, 20+ yıl deneyim.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wingcrea Studio - Premium Yazılım Ajansı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wingcrea | Premium Yazılım Ajansı",
    description:
      "Web, mobil ve AI çözümleri ile dijital dönüşümünüzü hızlandırın. 600+ proje, 20+ yıl deneyim.",
    images: ["/og-image.jpg"],
    creator: "@wingcrea",
  },
  category: "technology",
};

// 🎯 VIEWPORT METADATA
export const viewport: Viewport = {
  themeColor: "#8b5cf6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        {/* 🎯 FAVICON LINKS */}
        <link rel="icon" href="/favico/favicon.ico" sizes="any" />
        <link rel="icon" href="/favico/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="icon" href="/favico/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/favico/apple-touch-icon.png" />
        <link rel="manifest" href="/favico/site.webmanifest" />

        {/* 🎯 PRECONNECT (Performans) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* 🎯 STRUCTURED DATA - JSON-LD (Organization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Wingcrea Studio",
              "image": "https://wingcrea.com/og-image.jpg",
              "logo": "https://wingcrea.com/wingcrea_logo.png",
              "url": "https://wingcrea.com",
              "telephone": "+90-212-555-0123",
              "priceRange": "$$",
              "description":
                "İstanbul merkezli premium yazılım ajansı. Web, mobil ve yapay zeka çözümleri.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "İstanbul",
                "addressRegion": "İstanbul",
                "addressCountry": "TR",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 41.0082,
                "longitude": 28.9784,
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                "opens": "09:00",
                "closes": "18:00",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127",
              },
              "sameAs": [
                "https://www.linkedin.com/company/wingcrea",
                "https://twitter.com/wingcrea",
                "https://github.com/wingcrea",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans noise`}
      >
        <SessionWrapper>
          <CustomCursor />
          <SmoothScroller>{children}</SmoothScroller>
        </SessionWrapper>
      </body>
    </html>
  );
}
