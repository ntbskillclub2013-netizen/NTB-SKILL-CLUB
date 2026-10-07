import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NTB SKILL CLUB",
  description: "Nền tảng vận hành & quản trị nội bộ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
