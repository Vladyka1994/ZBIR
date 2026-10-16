import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header, TabBar, ServiceWorker } from "@/components/Chrome";
import { brand, asset } from "@/lib/brand";

export const metadata: Metadata = {
  title: { default: `${brand.name} — ${brand.tagline}`, template: `%s · ${brand.name}` },
  description: brand.description,
  applicationName: brand.name,
  appleWebApp: { capable: true, title: brand.name, statusBarStyle: "default" },
  icons: { icon: asset("/icons/icon.svg"), apple: asset("/icons/apple-touch-icon.png") },
  openGraph: { title: brand.name, description: brand.description, locale: "uk_UA", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#f5f6f2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className="min-h-dvh">
        <Header />
        <main className="pb-28 md:pb-12">{children}</main>
        <TabBar />
        <ServiceWorker />
      </body>
    </html>
  );
}
