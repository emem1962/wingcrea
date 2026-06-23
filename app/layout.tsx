import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/effects/SmoothScroller";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { SessionWrapper } from "@/components/providers/SessionWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexora — Premium Yazılım Stüdyosu",
  description: "Dijital deneyimleri yeniden tanımlıyoruz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans noise`}>
        <SessionWrapper>
          <CustomCursor />
          <SmoothScroller>
            {children}
          </SmoothScroller>
        </SessionWrapper>
      </body>
    </html>
  );
}