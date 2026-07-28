'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TECH_STACK, CONTACT_INFO } from "@/lib/content";

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
      style={{ background: "#FFFFFF", paddingTop: "5rem", paddingBottom: "5rem" }}
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
          <span className="label-tag" style={{ display: "block", marginBottom: "0.75rem" }}>
            Teknologi & Kolaborasi
          </span>
          <h2 className="display-2" style={{ color: "#1E2328", maxWidth: 520 }}>
            Dibangun dengan<br />
            tools <span style={{ color: "#2196F3" }}>terbaik.</span>
          </h2>
        </motion.div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASING }}
          style={{ marginBottom: "5rem" }}
        >
          <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
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
                    background: "#F8FAFC",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 12,
                    padding: "0.625rem 1.125rem",
                    whiteSpace: "nowrap",
                    transition: "border-color 0.2s, background 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#90CAF9";
                    el.style.background = "#E3F2FD";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#E5E7EB";
                    el.style.background = "#F8FAFC";
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{tech.emoji}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151" }}>{tech.name}</span>
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
                Tertarik kolaborasi? 🤝
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, opacity: 0.88 }}>
                Kami terbuka untuk kemitraan bisnis, referral, dan kolaborasi teknis. Kalau kamu punya klien yang butuh solusi digital, ayo ngobrol dulu.
              </p>
            </div>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Halo IRDIVE! Saya tertarik untuk eksplorasi peluang kolaborasi dengan tim kalian.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "white",
                color: "#1565C0",
                fontWeight: 700,
                fontSize: "0.9rem",
                padding: "0.75rem 1.5rem",
                borderRadius: 12,
                transition: "transform 0.2s, box-shadow 0.2s",
                alignSelf: "flex-start",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.18)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Hubungi via WhatsApp
            </a>
          </motion.div>

          {/* Why partner */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: 24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.28, ease: EASING }}
            style={{
              background: "#F8FAFC",
              border: "1px solid #E5E7EB",
              borderRadius: 20,
              padding: "2.5rem",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#1E2328", marginBottom: "1.5rem" }}>
              Mengapa kolaborasi dengan IRDIVE?
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "⚡", text: "Eksekusi cepat — dari brief ke live dalam hitungan minggu" },
                { icon: "🔐", text: "Kode bersih dan terdokumentasi — gampang di-handover" },
                { icon: "🤝", text: "Referral program tersedia untuk agen dan konsultan" },
                { icon: "📞", text: "Respons WhatsApp dalam hitungan jam, bukan hari" },
              ].map((item) => (
                <li key={item.text} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <span style={{ fontSize: "0.9rem", color: "#4B5563", lineHeight: 1.6 }}>{item.text}</span>
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
