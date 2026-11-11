import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { organizationSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Cursor } from "@/components/layout/Cursor";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1626" },
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* data-theme selects the visual direction: "midnight" | "paper" | "press".
       See src/styles/themes.css. */
    <html lang="en" data-theme="midnight">
      <body className={`${display.variable} ${mono.variable}`}>
        {/* Keyboard users land on the nav first; this lets them jump the whole
            header on every page. Visible only once focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-accent-fg"
        >
          Skip to content
        </a>
        <JsonLd schema={organizationSchema()} />
        <SmoothScroll />
        <Cursor />
        <Navbar />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
