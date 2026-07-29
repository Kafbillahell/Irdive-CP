'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bricolage_Grotesque } from 'next/font/google';
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TECH_STACK, CONTACT_INFO } from "@/lib/content";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"] });

const EASING = [0.22, 1, 0.36, 1] as const;

export default function PartnershipsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  // Duplicate for seamless loop
  const techDouble = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      id="partnerships"
      style={{ background: "transparent", paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASING }}
          style={{ marginBottom: "3.5rem" }}
        >
          <span className="label-tag" style={{ display: "block", marginBottom: "0.75rem", color: "var(--theme-accent)" }}>
            Teknologi & Kolaborasi
          </span>
          <h2 className={bricolage.className} style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em", color: "var(--theme-text)", maxWidth: 520 }}>
            Dibangun dengan<br />
            tools <span style={{ color: "var(--theme-accent)" }}>terbaik.</span>
          </h2>
        </motion.div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASING }}
          style={{ marginBottom: "5rem" }}
        >
          <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--theme-text)", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
            Technology Stack kami
          </p>

          {/* Outer container — clips overflow */}
          <div
            style={{
              overflow: "hidden",
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            {/* Scrolling track */}
            <div
              className={shouldReduce ? "" : "marquee-track"}
              style={{ display: "flex", gap: "0.875rem", paddingBottom: "0.25rem" }}
            >
              {techDouble.map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(255,255,255,0.02)",
                    border: "1.5px solid var(--theme-border)",
                    borderRadius: 12,
                    padding: "0.625rem 1.125rem",
                    whiteSpace: "nowrap",
                    transition: "border-color 0.2s, background 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e: React.MouseEvent) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--theme-accent)";
                    el.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e: React.MouseEvent) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--theme-border)";
                    el.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: tech.color }} />
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--theme-text)" }}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Two-col: Open collaboration CTA + Why partner */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
          className="partner-grid"
        >
          {/* CTA Card */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: -24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: EASING }}
            style={{
              background: "linear-gradient(135deg, #2196F3 0%, #1565C0 100%)",
              borderRadius: 20,
              padding: "2.5rem",
              color: "white",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
                Tertarik kolaborasi?
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, opacity: 0.88 }}>
                Kami terbuka untuk kemitraan bisnis, referral, dan kolaborasi teknis. Kalau kamu punya klien yang butuh solusi digital, ayo ngobrol dulu.
              </p>
            </div>
              <motion.a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Halo IRDIVE! Saya tertarik untuk eksplorasi peluang kolaborasi dengan tim kalian.")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "white",
                color: "var(--theme-accent)",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "0.75rem 1.5rem",
                borderRadius: 12,
                transition: "box-shadow 0.2s",
                alignSelf: "flex-start",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Hubungi via WhatsApp
            </motion.a>
          </motion.div>

          {/* Why partner */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: 24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.28, ease: EASING }}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--theme-border)",
              borderRadius: 20,
              padding: "2.5rem",
            }}
          >
            <h3 className={bricolage.className} style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--theme-text)", marginBottom: "1.5rem" }}>
              Mengapa kolaborasi dengan IRDIVE?
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, text: "Eksekusi cepat — dari brief ke live dalam hitungan minggu" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, text: "Kode bersih dan terdokumentasi — gampang di-handover" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, text: "Referral program tersedia untuk agen dan konsultan" },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>, text: "Respons WhatsApp dalam hitungan jam, bukan hari" },
              ].map((item) => (
                <li key={item.text} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, marginTop: 2, color: "var(--theme-accent)" }}>{item.icon}</span>
                  <span style={{ fontSize: "0.9rem", color: "var(--theme-text)", opacity: 0.8, lineHeight: 1.6 }}>{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Testimonials placeholder */}
            {/* TODO: add real testimonials when available */}
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: EASING }}
          style={{ textAlign: "center", fontSize: "0.8rem", color: "#9CA3AF" }}
        >
          Technology stack di atas adalah tools yang kami gunakan secara aktif — bukan sponsor berbayar.
        </motion.p>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .partner-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
