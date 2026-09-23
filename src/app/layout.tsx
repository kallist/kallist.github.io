import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const siteUrl = "https://kallist.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wei Zhuojie — AI systems, made inspectable",
    template: "%s | Wei Zhuojie",
  },
  description:
    "Wei Zhuojie builds inspectable AI systems, repository context tools and agent products. Explore project evidence, engineering decisions and visual practice.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Wei Zhuojie — AI systems, made inspectable",
    description:
      "Context engineering, agent systems and product-minded AI engineering.",
    images: [
      {
        url: "/portrait/self-portrait.webp",
        width: 1448,
        height: 1086,
        alt: "Black and white manga self portrait by Wei Zhuojie",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
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
