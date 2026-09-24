import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} kallist</span>
        <span>Drawn in ink. Built with evidence.</span>
        <Link href="#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
