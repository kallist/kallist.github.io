import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Wei Zhuojie, home">
          WZ<span className="brand-mark">✳</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#profile">Profile</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#visual">Visual</Link>
          <Link href="/resume/">Resume</Link>
        </nav>
        <Link className="header-contact" href="/#contact">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
