import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UX Pilot - AI UI 디자인 생성기",
  description: "AI로 아이디어를 즉시 아름다운 UI 디자인으로 변환하세요. 프롬프트 하나로 완성된 HTML/CSS 코드를 생성합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white">{children}</body>
    </html>
  );
}
