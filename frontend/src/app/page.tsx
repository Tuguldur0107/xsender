"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from 'react'


export default function Home() {
  const [papers, setPapers] = useState<
    { id: number; left: string; top: string; delay: string }[]
  >([])

  useEffect(() => {
    const interval = setInterval(() => {
      const paper = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 80 + 10}%`,
        delay: `${Math.random() * 2}s`,
      }
      setPapers((prev) => [...prev, paper])
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className={styles.main}>

      <div className={styles.fixedBackground}></div>

        {/* 🕊️ Floating Morphing Papers */}
        <div className={styles.paperContainer}>
          {papers.map((paper) => (
            <div
              key={paper.id}
              className={styles.paper}
              style={{
                left: paper.left,
                top: paper.top,
                animationDelay: paper.delay,
              }}
            >
              <svg
                className={styles.birdSvg}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="white">
                  <animate
                    attributeName="d"
                    dur="0.6s"
                    repeatCount="indefinite"
                    values="
                      M10,50 Q50,10 90,50 Q50,90 10,50;
                      M10,55 Q50,5 90,55 Q50,95 10,55;
                      M10,50 Q50,10 90,50 Q50,90 10,50;
                    "
                  />
                </path>
              </svg>
            </div>
          ))}
        </div>

      {/* 🌈 Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlass}>
          <h1 className={styles.heroTitle}>
            Таны өмнөөс X-SENDER <br />
            X тайлан илгээнэ
          </h1>
          <p className={styles.description}>
            3 тайланг үнэгүй, автоматаар, алдаагүй бөгөөд хугацаанд нь илгээж туршаарай
          </p>
          <div className={styles.buttonGroup}>
          <Link
            href="https://www.facebook.com/profile.php?id=61578621497518"
            className={styles.blueButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Facebook-р бүртгүүлэх
          </Link>
          </div>
        </div>
      </section>

      {/* 🧾 About Section */}
      <section id="about" className={styles.section}>
        <h2 className={styles.sectionTitle}>X-SENDER гэж юу вэ?</h2>
        <div className={styles.glassTextBox}>
          Монголын 200,000+ ААН сар бүр X тайлан илгээх үүрэгтэй. 
          Гэтэл ихэнх жижиг компани Excel-ээр гараар бэлдэж, хугацаа хэтрүүлэх, мартах, системийн гацалтад өртдөг. 
          X-SENDER бол эдгээр асуудлыг бүрэн шийдэх автоматжуулсан Facebook bot + QPay төлбөр + etax automation хосолсон шийдэл юм.
        </div>
      </section>

      {/* 📦 How it works */}
      <section id="how" className={styles.section}>
        <h2 className={styles.sectionTitle}>Хэрхэн ажилладаг вэ?</h2>
        <div className={styles.cardList}>
          <div className={styles.card}>
            <div className={styles.cardNumber}>1</div>
            <p>Хэрэглэгч Messenger ботод нэвтэрч бүртгүүлнэ (нягтлан/захирал)</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardNumber}>2</div>
            <p>1 эсвэл олон компани нэмнэ</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardNumber}>3</div>
            <p>Компанийн регистр, тайлангийн key файл, нууц үг, etax login зэрэг мэдээллийг оруулна</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardNumber}>4</div>
            <p>QPay-р төлбөрөө төлж дансаа цэнэглэнэ</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardNumber}>5</div>
            <p>Хуулийн хугацаанд тайлан автоматаар илгээгдэнэ</p>
          </div>
        </div>
      </section>

      {/* 🚀 Features */}
      <section id="features" className={styles.section}>
        <h2 className={styles.sectionTitle}>Үндсэн боломжууд</h2>
        <ul className={styles.featureList}>
          <li>Таны өмнөөс X тайлангуудыг автоматаар илгээнэ</li>
          <li>Нэг хэрэглэгч олон компани бүртгүүлэх болномжтой</li>
          <li>Төлбөрийг шууд QPay-ээр хялбар төлнө</li>
          <li>Илгээсэн тайлан бүрийн түүх хадгалагдана</li>
          <li>Facebook Messenger дээр ажиллана – Илүү хялбар</li>
          <li>3 тайланг үнэгүй туршиж болно – Та туршаад үзээрэй</li>
        </ul>
      </section>

      {/* 💸 Pricing */}
      <section id="price" className={styles.section}>
        <h2 className={styles.sectionTitle}>Үнийн мэдээлэл</h2>
        <div className={styles.pricingBox}>
          <ul className={styles.pricingList}>
            <li><strong>1 тайлан = 5,000₮</strong></li>
            <li>Эхний 3 тайланг <strong>үнэгүй</strong> туршина</li>
            <li>Цэнэглэлтийн доод дүн: <strong>50,000₮</strong></li>
            <li>QPay-р <strong>төлөх</strong> боломжтой</li>
          </ul>
        </div>
      </section>

      {/* 🔐 Security */}
      <section id="security" className={styles.section}>
        <h2 className={styles.sectionTitle}>Аюулгүй байдал</h2>
        <ul className={styles.securityList}>
          <li>🛡️ Таны нууц үг, etax мэдээлэл найдвартай шифрлэгдэж хадгалагдана</li>
          <li>🔒 Эдгээр мэдээлэл таны зөвшөөрөлгүйгээр хэнд ч харагдахгүй</li>
          <li>🧪 Тайлан илгээх бүрт тусгай орчинд тусгаарлагдан ажилладаг</li>
          <li>🧹 Илгээсний дараа таны нэвтрэлт автоматаар устдаг</li>
          <li>📁 Та зөвхөн өөрийн тайлан, илгээсэн түүхээ харах эрхтэй</li>
          <li>💾 Бүх мэдээлэл шифртэй байдлаар сервер дээр хадгалагдана</li>
          <li>♻️ Мэдээлэл 12 цаг тутам автоматаар нөөцлөгдөнө</li>
        </ul>
      </section>

      {/* 🧠 Технологи ба Архитектур */}
      <section id="tech" className={styles.section}>
        <h2 className={styles.sectionTitle}>Технологи ба Архитектур</h2>
        <ul className={styles.techList}>
          <li>💬 Facebook Messenger дээр ажилладаг — Апп суулгах шаардлагагүй</li>
          <li>💸 QPay-р төлбөрөө төлнө — Шууд, хурдан, нэхэмжлэхгүй</li>
          <li>🤖 Тайлан илгээх процессыг автоматжуулсан тусгай bot ажиллуулдаг</li>
          <li>🧾 Bot нь etax сайтад таны өмнөөс найдвартай тайлан илгээнэ</li>
          <li>🛠️ Сервер, өгөгдлийн сан Railway дээр байрладаг — тасралтгүй ажиллагаа</li>
          <li>🔐 Нууц үг, нэвтрэх мэдээлэл бүгд шифрлэгдэн хадгалагддаг</li>
        </ul>
      </section>
    </main>
  );
}