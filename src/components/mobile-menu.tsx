"use client";

import Link from "next/link";
import { useRef } from "react";

const destinations = [
  { href: "/#work", label: "Work" },
  { href: "/#profile", label: "Profile" },
  { href: "/#experience", label: "Experience" },
  { href: "/#visual", label: "Visual" },
  { href: "/resume/", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function MobileMenu() {
  const details = useRef<HTMLDetailsElement>(null);

  return (
    <details className="mobile-menu" ref={details}>
      <summary aria-label="Navigation menu">
        Menu <span aria-hidden="true">+</span>
      </summary>
      <nav aria-label="Mobile navigation">
        {destinations.map(({ href, label }) => (
          <Link
            href={href}
            key={href}
            onClick={() => {
              if (details.current) details.current.open = false;
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
