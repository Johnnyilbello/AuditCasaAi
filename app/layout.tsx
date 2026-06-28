import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Property Lead System | Demo Web App",
  description: "Demo operativa mobile-first per valutazione immobile e lead qualificati."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0f172a"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
