import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="kallist, home">
          kallist
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#profile">Method</Link>
          <Link href="/#visual">Art</Link>
          <Link href="/resume/">Resume</Link>
        </nav>
        <Link className="header-contact" href="/#contact">
          Contact <span aria-hidden="true">↗</span>
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
