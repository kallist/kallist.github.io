import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} Wei Zhuojie</span>
        <span>Built with evidence, in public.</span>
        <Link href="#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
