import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STATE Audit Tool | Production Readiness Assessment",
  description: "Is your AI agent production-ready? Run it through the STATE framework.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
