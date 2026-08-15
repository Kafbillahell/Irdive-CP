'use client';

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SectionBg from "@/components/ui/SectionBg";
import Image from "next/image";
import { CONTACT_INFO } from "@/lib/content";

const EASING = [0.22, 1, 0.36, 1] as const;

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  needs: string;
}

export default function ContactSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    needs: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Halo IRDIVE! 👋\n\nNama: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nPerusahaan: ${form.company || "-"}\n\nKebutuhan Project:\n${form.needs}\n\nTerima kasih!`
    );
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${text}`, "_blank", "noopener");
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1.5px solid #E5E7EB",
    borderRadius: 10,
    fontFamily: "var(--font-body)",
    fontSize: "0.95rem",
    color: "#1E2328",
    background: "#FAFAFA",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section
      id="contact"
      style={{ background: "transparent", paddingTop: "5rem", paddingBottom: "1rem", position: "relative", overflow: "hidden" }}
    >
      <SectionBg variant="mascot-left" mascotSrc="/mascot-2.png" mascotOpacity={0.04} dark={true} />
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
            Hubungi Kami
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.01em", color: "var(--theme-text)", maxWidth: 520, lineHeight: 1.05 }}>
            Mari kita mulai<br />
            <span style={{ color: "var(--theme-accent)" }}>project</span> kamu.
          </h2>
        </motion.div>

        {/* 60/40 layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* LEFT: Form (60%) */}
          <motion.div
            className="contact-left-card"
            initial={shouldReduce ? {} : { opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASING }}
          >
            {submitted ? (
              <div
                style={{
                  background: "#E8F5E9",
                  border: "1px solid #C8E6C9",
                  borderRadius: 16,
                  padding: "3rem 2rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎉</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#1E2328", marginBottom: "0.5rem" }}>
                  WhatsApp terbuka!
                </h3>
                <p style={{ color: "#4B5563" }}>
                  Pesan udah siap terisi. Tinggal klik &quot;Kirim&quot; di WhatsApp dan kami akan segera merespons.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 340, gap: "1.5rem" }}>
                <div style={{ width: "100%", maxWidth: 560, padding: "2rem 2.25rem", background: "radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent 42%), #F6F8FF", borderRadius: "28px", border: "1px solid rgba(15, 23, 42, 0.08)", boxShadow: "0 28px 80px rgba(15, 23, 42, 0.08)" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 900, color: "#0F172A", marginBottom: "1rem", lineHeight: 1.05 }}>
                    Terhubung Lewat Instagram
                  </h3>
                  <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.75, maxWidth: 500, margin: "0 0 1.75rem" }}>
                    Saat ini kami lebih sering dan aktif merespons pesan melalui Instagram DM. Mari diskusikan detail project-mu di sana!
                  </p>
                  <motion.a
                    href="https://www.instagram.com/irdive.tech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -1, boxShadow: "0 10px 20px rgba(37, 99, 235, 0.14)" }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    style={{
                      background: "#2563EB",
                      color: "white",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      padding: "0.95rem 1.9rem",
                      textDecoration: "none",
                      borderRadius: 9999,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                      boxShadow: "0 12px 24px rgba(37, 99, 235, 0.15)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                    Kirim via Instagram
                  </motion.a>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.85rem", marginTop: "1.75rem" }}>
                    <div style={{ padding: "1rem", borderRadius: 18, background: "rgba(37, 99, 235, 0.08)", border: "1px solid rgba(37, 99, 235, 0.12)", minHeight: 96, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>
                        Respon cepat
                      </span>
                      <span style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.4 }}>
                        Balasan DM dalam 1x24 jam.
                      </span>
                    </div>
                    <div style={{ padding: "1rem", borderRadius: 18, background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.12)", minHeight: 96, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>
                        Solusi pas
                      </span>
                      <span style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.4 }}>
                        Kami bantu susun ide dan next step.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT: Info + Mascot (40%) */}
          <motion.div
            className="contact-right-col"
            initial={shouldReduce ? {} : { opacity: 0, x: 30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Mascot speech bubble */}
            <div className="contact-speech" style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
              <div style={{ width: 72, height: 72, position: "relative", flexShrink: 0 }}>
                <Image src="/mascot-1.png" alt="IRDIVE mascot" fill style={{ objectFit: "contain" }} />
              </div>
              <div
                style={{
                  background: "#E3F2FD",
                  border: "1px solid #BBDEFB",
                  borderRadius: "16px 16px 16px 0",
                  padding: "1rem 1.25rem",
                  fontSize: "0.9rem",
                  color: "#1565C0",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  maxWidth: 240,
                }}
              >
                Ceritain dulu aja, kami bantu pilihkan solusi yang paling pas buat kamu!
              </div>
            </div>

            {/* ── Contact info (Minimal Dark) ── */}
            <div
              className="contact-info-panel"
              style={{
                background: "#0B1530",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                padding: "2rem",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.22)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 900, color: "#F8FAFF", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
                Cara lain menghubungi kami
              </h3>

              {[
                { icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                { icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, label: "Instagram", value: CONTACT_INFO.instagram, href: `https://instagram.com/${CONTACT_INFO.instagram.replace("@", "")}` },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.55V6.79a4.86 4.86 0 0 1-1.01-.1Z"/></svg>, label: "TikTok", value: "@irdive.tech", href: CONTACT_INFO.tiktok },
                { icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>, label: "Lokasi", value: CONTACT_INFO.location, href: null },
              ].map((item) => {
                const isLink = !!item.href;
                const Wrapper = isLink ? "a" : "div";
                return (
                  <Wrapper
                    className="contact-info-item"
                    key={item.label}
                    href={item.href || undefined}
                    target={isLink ? "_blank" : undefined}
                    rel={isLink ? "noopener noreferrer" : undefined}
                    style={{
                      display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none",
                      padding: "1rem 1.2rem",
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
                      backdropFilter: "blur(8px)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: isLink ? "pointer" : "default"
                    }}
                    onMouseEnter={isLink ? (e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.07)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 8px 16px rgba(0, 0, 0, 0.5)";
                    } : undefined}
                    onMouseLeave={isLink ? (e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)";
                    } : undefined}
                  >
                    {/* Box Ikon 3D Gelap */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "38px", height: "38px", // UKURAN IKON DISESUAIKAN agar pas dengan padding baru
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)", 
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#10B981",
                      boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15), 0 4px 8px rgba(0,0,0,0.3)",
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>

                    {/* Label & Value */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem", overflow: "hidden" }}>
                      <span style={{ 
                        fontSize: "0.75rem", fontWeight: 700, color: "rgba(248, 250, 255, 0.72)", 
                        textTransform: "uppercase", letterSpacing: "0.12em" 
                      }}>
                        {item.label}
                      </span>
                      <span style={{ 
                        fontSize: "1rem", fontWeight: 700, color: isLink ? "#E2E8F0" : "#F8FAFF", 
                        letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                      }}>
                        {item.value}
                      </span>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-left-card { min-width: 0; }
        .contact-right-col { min-width: 0; }
        .contact-info-panel { width: 100%; }
        .contact-info-item { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .contact-info-item:hover { transform: translateY(-2px); box-shadow: inset 0 1px 2px rgba(255,255,255,0.1), 0 10px 18px rgba(0,0,0,0.18); }

        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1.5fr 1fr !important; }
          .form-2col { grid-template-columns: 1fr 1fr !important; }
        }

        @media (min-width: 960px) {
          .contact-grid { grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.95fr) !important; gap: 3rem !important; align-items: start; }
          .contact-right-col { display: grid; gap: 1.75rem; align-self: start; }
          .contact-speech { align-items: flex-start; }
          .contact-info-panel { padding: 2rem !important; gap: 1rem; }
          .contact-item { padding: 0.9rem 1rem !important; }
        }

        @media (max-width: 640px) {
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
