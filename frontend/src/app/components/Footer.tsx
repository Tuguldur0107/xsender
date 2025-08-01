"use client";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} X‑SENDER. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </footer>
  );
}
