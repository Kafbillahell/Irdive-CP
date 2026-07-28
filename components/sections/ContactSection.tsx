'use client';

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import IrdiveMaskot from "@/components/logo-maskot/IrdiveMaskot";
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
      style={{ background: "#F8FAFC", paddingTop: "5rem", paddingBottom: "5rem" }}
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
            Hubungi Kami
          </span>
          <h2 className="display-2" style={{ color: "#1E2328", maxWidth: 520 }}>
            Mari kita mulai<br />
            <span style={{ color: "#2196F3" }}>project</span> kamu.
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
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-2col">
                  {/* Name */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.4rem" }}>
                      Nama *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Nama kamu"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#2196F3"; e.target.style.boxShadow = "0 0 0 3px rgba(33,150,243,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.4rem" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="email@kamu.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#2196F3"; e.target.style.boxShadow = "0 0 0 3px rgba(33,150,243,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-2col">
                  {/* WhatsApp */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.4rem" }}>
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      placeholder="08xxxxxxxxxx"
                      value={form.whatsapp}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#2196F3"; e.target.style.boxShadow = "0 0 0 3px rgba(33,150,243,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.4rem" }}>
                      Perusahaan
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Nama perusahaan (opsional)"
                      value={form.company}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#2196F3"; e.target.style.boxShadow = "0 0 0 3px rgba(33,150,243,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                {/* Needs */}
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4B5563", marginBottom: "0.4rem" }}>
                    Ceritakan Kebutuhan Project Kamu *
                  </label>
                  <textarea
                    name="needs"
                    required
                    rows={5}
                    placeholder="Contoh: Saya perlu website company profile untuk bisnis konsultan saya, preferensi warna hijau/putih, ada halaman tim dan kontak..."
                    value={form.needs}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                    onFocus={(e) => { e.target.style.borderColor = "#2196F3"; e.target.style.boxShadow = "0 0 0 3px rgba(33,150,243,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "#2196F3",
                    color: "white",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    padding: "0.875rem 2rem",
                    border: "none",
                    borderRadius: 12,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 4px 14px rgba(33,150,243,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "#1565C0";
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 8px 24px rgba(33,150,243,0.32)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "#2196F3";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 4px 14px rgba(33,150,243,0.25)";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Kirim via WhatsApp
                </button>
              </form>
            )}
          </motion.div>

          {/* RIGHT: Info + Mascot (40%) */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: 30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Mascot speech bubble */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
              <IrdiveMaskot size="sm" />
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
                &ldquo;Ceritain dulu aja — kami bantu pilihkan solusi yang paling pas buat kamu! 🤖&rdquo;
              </div>
            </div>

            {/* Contact info */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#1E2328" }}>
                Cara lain menghubungi kami
              </h3>

              {[
                { icon: "💌", label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                { icon: "📸", label: "Instagram", value: CONTACT_INFO.instagram, href: "https://instagram.com" },
                { icon: "💼", label: "LinkedIn", value: CONTACT_INFO.linkedin, href: "https://linkedin.com" },
                { icon: "📍", label: "Lokasi", value: CONTACT_INFO.location, href: null },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.9rem", color: "#2196F3", fontWeight: 500, textDecoration: "none" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: "0.9rem", color: "#4B5563", fontWeight: 500 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 3fr 2fr !important; }
          .form-2col { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
