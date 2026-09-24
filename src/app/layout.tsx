import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import "./v11.css";
import "./v2.css";

const siteUrl = "https://kallist.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "kallist — AI systems, made inspectable",
    template: "%s | kallist",
  },
  description:
    "kallist builds inspectable AI systems, repository context tools and agent products. Explore project evidence, engineering decisions and visual practice.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "kallist — AI systems, made inspectable",
    description:
      "Context engineering, agent systems and product-minded AI engineering.",
    images: [
      {
        url: "/portrait/self-portrait.webp",
        width: 1448,
        height: 1086,
        alt: "Black and white manga self portrait for kallist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "kallist — AI systems, made inspectable",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
