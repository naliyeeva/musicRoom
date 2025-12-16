import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "music room",
  description: "Welcome to music room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0b0a09] text-white">{children}</body>
    </html>
  );
}
