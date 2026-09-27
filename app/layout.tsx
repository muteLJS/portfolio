import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-serif-kr",
  weight: "300",
  subsets: ["latin"],
  display: "swap",
  fallback: ["serif"],
});

export const metadata: Metadata = {
  title: "이진성 포트폴리오",
  description:
    "UX/UI 디자인과 프론트엔드 구현을 함께 다루는 이진성의 포트폴리오입니다.",
  keywords: [
    "이진성",
    "UX/UI Designer",
    "Frontend Developer",
    "Portfolio",
    "Next.js",
    "React",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
