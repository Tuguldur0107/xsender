"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

const SECTION_MAP: { id: string; label: string }[] = [
  { id: "about", label: "Танилцуулга" },
  { id: "how", label: "Хэрхэн ажилладаг вэ?" },
  { id: "features", label: "Боломжууд" },
  { id: "price", label: "Үнийн мэдээлэл" },
  { id: "security", label: "Аюулгүй байдал" },
  { id: "tech", label: "Технологи" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Танилцуулга");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = SECTION_MAP.find((s) => s.id === entry.target.id);
            if (section) setActiveSection(section.label);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    SECTION_MAP.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoText}>
        <span className={styles.logoX}>X</span>-SENDER
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li
            className={styles.dropdown}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className={styles.navLink}>
              <span className={styles.navLabel}>{activeSection}</span> ▾
            </button>
            {open && (
              <ul className={styles.dropdownMenu}>
                {SECTION_MAP.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className={styles.dropdownItem}
                    >
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
