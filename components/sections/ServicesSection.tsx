'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SERVICES, type Service } from "@/lib/content";
import SectionBg from "@/components/ui/SectionBg";

const EASING = [0.22, 1, 0.36, 1] as const;

// Custom inline SVG icons per service
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "company-profile": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  "landing-page": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  "web-app": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  "business-system": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  ),
  "ui-ux": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="15.5" r="2.5" />
      <circle cx="17" cy="17" r="2" />
      <path d="M13.5 9L6.5 13M13.5 9l3.5 5.5M6.5 18l3.5 1.5" />
    </svg>
  ),
  "maintenance": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.06 * (index % 3), ease: EASING }}
      className={`svc-card ${service.featured ? "svc-featured" : ""}`}
    >
      {/* Featured badge */}
      {service.featured && (
        <span className="svc-badge">Paling Populer</span>
      )}

      {/* Icon */}
      <div className="svc-icon">
        {SERVICE_ICONS[service.id]}
      </div>

      <h3 className="svc-title">{service.title}</h3>
      <p className="svc-desc">{service.desc}</p>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="services"
      className="services-section"
      aria-label="Services"
    >
      <SectionBg variant="mascot-right" mascotSrc="/mascot-1.png" mascotOpacity={0.045} dark={true} />
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <motion.div
            ref={headerRef}
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASING }}
          >
            <span className="label-tag" style={{ display: "block", marginBottom: "0.75rem", color: "var(--theme-accent)" }}>
              Layanan
            </span>
            <h2 className="display-2" style={{ color: "var(--theme-text)", maxWidth: 520 }}>
              Apa yang kami<br />
              <span style={{ color: "var(--theme-accent)" }}>kerjakan</span>
            </h2>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          position: relative;
          overflow: hidden;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .svc-card {
          position: relative;
          background: transparent;
          border: 1px solid var(--theme-border);
          border-radius: 16px;
          padding: 1rem;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.25s, box-shadow 0.3s, transform 0.25s;
        }
        .svc-card:hover {
          border-color: var(--theme-accent);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
        .svc-featured {
          grid-column: 1 / -1;
          padding: 1.5rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.03);
        }
        .svc-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.1);
          color: var(--theme-text);
          border: 1px solid var(--theme-border);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
          z-index: 1;
        }
        .svc-icon {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--theme-text);
          border: 1px solid var(--theme-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          transition: background 0.2s, color 0.2s;
        }
        .svc-icon svg {
          width: 20px;
          height: 20px;
        }
        .svc-card:hover .svc-icon {
          background: rgba(255, 255, 255, 0.1);
          color: var(--theme-accent);
        }
        .svc-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(0.88rem, 2.2vw, 1.15rem);
          color: var(--theme-text);
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }
        .svc-desc {
          color: var(--theme-text);
          opacity: 0.7;
          line-height: 1.5;
          font-size: clamp(0.72rem, 1.8vw, 0.9rem);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .services-grid {
            gap: 1.25rem;
          }
          .svc-card {
            padding: 1.75rem;
          }
          .svc-featured {
            padding: 2.5rem;
          }
          .svc-icon {
            width: 52px;
            height: 52px;
          }
          .svc-icon svg {
            width: 28px;
            height: 28px;
          }
          .svc-title {
            font-size: 1.25rem;
          }
          .svc-desc {
            font-size: 0.95rem;
            display: block;
            -webkit-line-clamp: unset;
          }
        }

        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .svc-featured {
            grid-column: span 3;
          }
        }
      `}</style>
    </section>
  );
}
