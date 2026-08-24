'use client';

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PORTFOLIO_ITEMS } from "@/lib/content";
import SectionBg from "@/components/ui/SectionBg";

const EASING = [0.22, 1, 0.36, 1] as const;

export default function PortfolioSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  // Split items: first = featured (Zans Café), rest = secondary
  const featured = PORTFOLIO_ITEMS.find((p) => p.category === "featured") ?? PORTFOLIO_ITEMS[0];
  const secondary = PORTFOLIO_ITEMS.filter((p) => p.id !== featured.id);

  return (
    <section
      id="portfolio"
      className="portfolio-section"
      aria-label="Portfolio"
    >
      <SectionBg variant="mascot-right" mascotSrc="/mascot-3.png" mascotOpacity={0.04} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASING }}
          style={{ marginBottom: "3rem" }}
        >
          <span className="label-tag" style={{ display: "block", marginBottom: "0.75rem", color: "var(--theme-accent)" }}>
            Portfolio
          </span>
          <h2 className="pf-heading">
            Karya yang kami <span style={{ color: "var(--theme-accent)" }}>banggakan</span>
          </h2>
          <p className="pf-subtext">
            Proyek-proyek yang mencerminkan cara kerja dan standar kualitas yang kami terapkan di setiap kolaborasi.
          </p>
        </motion.div>

        {/* Editorial Grid */}
        <div className="pf-grid">
          {/* Featured card — Zans Café */}
          <motion.div
            className="pf-card pf-card-featured"
            initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
          >
            {featured.imageSrc && (
              <div className="pf-card-image">
                <Image
                  src={featured.imageSrc}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div className="pf-card-overlay" />
            <div className="pf-card-content">
              <div className="pf-card-meta">
                <span className="pf-card-category">{featured.categoryLabel}</span>
              </div>
              <h3 className="pf-card-title">{featured.title}</h3>
              <p className="pf-card-desc">{featured.description}</p>
              <div className="pf-card-tech">
                {featured.tech.map((t) => (
                  <span key={t} className="pf-tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Secondary cards — stacked on right (desktop) */}
          <div className="pf-secondary-stack">
            {secondary.map((item, i) => (
              <motion.div
                key={item.id}
                className="pf-card pf-card-secondary"
                initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: EASING }}
              >
                {item.imageSrc && (
                  <div className="pf-card-image">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="pf-card-overlay" />
                <div className="pf-card-content">
                  <div className="pf-card-meta">
                    <span className="pf-card-category">{item.categoryLabel}</span>
                  </div>
                  <h3 className="pf-card-title pf-card-title-sm">{item.title}</h3>
                  <p className="pf-card-desc pf-card-desc-sm">{item.description}</p>
                  <div className="pf-card-tech">
                    {item.tech.map((t) => (
                      <span key={t} className="pf-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .portfolio-section {
          position: relative;
          overflow: hidden;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        .pf-heading {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.25rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--theme-text);
          margin-bottom: 1rem;
        }
        .pf-subtext {
          color: var(--theme-text);
          opacity: 0.6;
          max-width: 480px;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Grid: stacked on mobile, editorial on desktop */
        .pf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .pf-secondary-stack {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        /* Card base */
        .pf-card {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: #0A0A0A;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          cursor: default;
          transition: transform 0.3s var(--ease-out-spring), box-shadow 0.3s;
        }
        .pf-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.35);
        }
        .pf-card-featured {
          min-height: 380px;
        }
        .pf-card-secondary {
          min-height: 260px;
        }
        .pf-card-image {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .pf-card-image img {
          transition: transform 0.5s ease-out;
        }
        .pf-card:hover .pf-card-image img {
          transform: scale(1.05);
        }
        .pf-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.08) 0%,
            rgba(0, 0, 0, 0.7) 50%,
            rgba(0, 0, 0, 0.92) 100%
          );
          z-index: 1;
        }
        .pf-card-content {
          position: relative;
          z-index: 2;
          padding: 1.75rem;
        }
        .pf-card-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .pf-card-category {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FFF;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 4px 12px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        .pf-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          color: #FFF;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .pf-card-title-sm {
          font-size: clamp(1.1rem, 2.5vw, 1.35rem);
        }
        .pf-card-desc {
          font-size: clamp(0.82rem, 2vw, 0.95rem);
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.6;
        }
        .pf-card-desc-sm {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pf-card-tech {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }
        .pf-tech-tag {
          font-size: 0.65rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 4px 10px;
          border-radius: 6px;
        }

        @media (min-width: 768px) {
          .pf-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 1.5rem;
          }
          .pf-card-featured {
            min-height: 520px;
          }
          .pf-card-secondary {
            min-height: 250px;
          }
          .pf-secondary-stack {
            gap: 1.5rem;
          }
          .pf-card-content {
            padding: 2rem;
          }
          .pf-card-desc-sm {
            -webkit-line-clamp: 3;
          }
        }

        @media (min-width: 1024px) {
          .pf-card-featured {
            min-height: 560px;
          }
        }
      `}</style>
    </section>
  );
}