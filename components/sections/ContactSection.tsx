'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SectionBg from "@/components/ui/SectionBg";
import { CONTACT_INFO } from "@/lib/content";

const EASING = [0.22, 1, 0.36, 1] as const;

export default function ContactSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const waLink = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(CONTACT_INFO.waMessage)}`;

  return (
    <section
      id="contact"
      className="contact-section"
      aria-label="Contact"
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
          <h2 className="contact-heading">
            Mulai Proyek<br />
            Bersama <span style={{ color: "var(--theme-accent)" }}>IRDIVE</span>
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="contact-grid">
          {/* LEFT: Primary CTA (Instagram) + Secondary CTA (WhatsApp) */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASING }}
            className="contact-cta-col"
          >
            {/* Instagram DM — Primary */}
            <div className="contact-ig-card">
              <h3 className="contact-ig-title">
                Terhubung Lewat Instagram
              </h3>
              <p className="contact-ig-desc">
                Saat ini kami lebih sering dan aktif merespons pesan melalui Instagram DM. Balasan dalam 1x24 jam.
              </p>
              <motion.a
                href="https://www.instagram.com/irdive.tech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="contact-ig-btn"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Kirim via Instagram DM
              </motion.a>

              {/* Response promise */}
              <div className="contact-promise-row">
                <div className="contact-promise">
                  <span className="contact-promise-title">Respon cepat</span>
                  <span className="contact-promise-desc">Balasan DM dalam 1x24 jam.</span>
                </div>
                <div className="contact-promise contact-promise-alt">
                  <span className="contact-promise-title">Solusi pas</span>
                  <span className="contact-promise-desc">Kami bantu susun ide dan next step.</span>
                </div>
              </div>
            </div>

            {/* WhatsApp — Secondary */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-wa-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Atau hubungi via WhatsApp
            </a>
          </motion.div>

          {/* RIGHT: Contact info */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: 30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASING }}
            className="contact-info-col"
          >
            <div className="contact-info-panel">
              <h3 className="contact-info-heading">Info Kontak</h3>

              {[
                { icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                { icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, label: "Instagram", value: CONTACT_INFO.instagram, href: `https://instagram.com/${CONTACT_INFO.instagram.replace("@", "")}` },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.55V6.79a4.86 4.86 0 01-1.01-.1Z"/></svg>, label: "TikTok", value: "@irdive.tech", href: CONTACT_INFO.tiktok },
                { icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Lokasi", value: CONTACT_INFO.location, href: null },
              ].map((item) => {
                const isLink = !!item.href;
                const Tag = isLink ? "a" : "div";
                return (
                  <Tag
                    key={item.label}
                    className="contact-info-item"
                    href={isLink ? (item.href ?? undefined) : undefined}
                    target={isLink ? "_blank" : undefined}
                    rel={isLink ? "noopener noreferrer" : undefined}
                  >
                    <div className="contact-info-icon">
                      {item.icon}
                    </div>
                    <div className="contact-info-text">
                      <span className="contact-info-label">{item.label}</span>
                      <span className="contact-info-value">{item.value}</span>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-section {
          position: relative;
          overflow: hidden;
          padding-top: 5rem;
          padding-bottom: 3rem;
        }
        .contact-heading {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          letter-spacing: -0.02em;
          color: var(--theme-text);
          max-width: 520px;
          line-height: 1.08;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        /* CTA column */
        .contact-cta-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Instagram card */
        .contact-ig-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 2rem;
        }
        .contact-ig-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--theme-text);
          margin-bottom: 0.75rem;
          line-height: 1.15;
        }
        .contact-ig-desc {
          color: var(--theme-text);
          opacity: 0.7;
          font-size: 0.95rem;
          line-height: 1.65;
          margin-bottom: 1.5rem;
          max-width: 440px;
        }
        .contact-ig-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #2563EB;
          color: white;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          padding: 0.95rem 1.9rem;
          text-decoration: none;
          border-radius: 9999px;
          box-shadow: 0 12px 24px rgba(37, 99, 235, 0.2);
          transition: box-shadow 0.2s;
        }
        .contact-ig-btn:hover {
          box-shadow: 0 16px 32px rgba(37, 99, 235, 0.35);
        }

        .contact-promise-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .contact-promise {
          padding: 1rem;
          border-radius: 16px;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.12);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .contact-promise-alt {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.12);
        }
        .contact-promise-title {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--theme-text);
        }
        .contact-promise-desc {
          font-size: 0.85rem;
          color: var(--theme-text);
          opacity: 0.65;
          line-height: 1.4;
        }

        /* WhatsApp secondary */
        .contact-wa-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--theme-text);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.85rem 1.5rem;
          border-radius: 14px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .contact-wa-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        /* Info panel */
        .contact-info-col {
          min-width: 0;
        }
        .contact-info-panel {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .contact-info-heading {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--theme-text);
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .contact-info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.2s, background 0.2s, border-color 0.2s;
          cursor: default;
        }
        a.contact-info-item {
          cursor: pointer;
        }
        a.contact-info-item:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }
        .contact-info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--theme-accent);
          flex-shrink: 0;
        }
        .contact-info-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          overflow: hidden;
        }
        .contact-info-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--theme-text);
          opacity: 0.5;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .contact-info-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--theme-text);
          opacity: 0.9;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1.4fr 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
