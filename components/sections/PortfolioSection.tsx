'use client';

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/content";
import SectionBg from "@/components/ui/SectionBg";

const EASING = [0.22, 1, 0.36, 1] as const;

// Deteksi apakah perangkat menggunakan touch (mobile) — dipakai untuk mematikan
// interaksi klik/geser pada card di mobile agar tidak mengganggu scroll halaman.
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0 ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => {
      setIsTouch(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0 ||
          mq.matches
      );
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isTouch;
}

// Icon per portfolio item category
const PORTFOLIO_ICONS: Record<string, React.ReactNode> = {
  featured: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  system: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  ),
  landing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={28} height={28}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
};

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  const bgImage = item.imageSrc ?? "/assets/image.png";

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.07 * (index % 3), ease: EASING }}
      style={{
        flexShrink: 0,
        scrollSnapAlign: "center",
        width: "85vw",
        maxWidth: 380,
        height: 480,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#0A0A0A",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
        cursor: "default",
        transformStyle: "flat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "pan-y",
        pointerEvents: "auto",
      }}
    >
      {/* ── Background Image ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          transition: "transform 0.5s ease-out",
          filter: "brightness(0.8)",
        }}
        className="pf-bg-img"
      />

      {/* ── Gradient Overlay for Text Readability ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.95) 100%)",
          zIndex: 0,
        }}
      />

      {/* ── Card Content ── */}
      <div style={{ padding: "2rem", position: "relative", zIndex: 2, display: "flex", flexDirection: "column" }}>
        {/* Category tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `rgba(255,255,255,0.1)`,
              border: `1px solid rgba(255,255,255,0.2)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFF",
              backdropFilter: "blur(10px)",
            }}
          >
            {PORTFOLIO_ICONS[item.category]}
          </div>
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#FFF",
              background: `rgba(255,255,255,0.1)`,
              border: `1px solid rgba(255,255,255,0.1)`,
              padding: "4px 12px",
              borderRadius: 20,
              backdropFilter: "blur(10px)",
            }}
          >
            {item.categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            color: "#FFF",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.6,
          }}
        >
          {item.description}
        </p>

        {/* Tech tags */}
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            flexWrap: "wrap",
            marginTop: "1.25rem",
          }}
        >
          {item.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                padding: "4px 10px",
                borderRadius: 6,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const headerRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const initialIndex = Math.floor(PORTFOLIO_ITEMS.length / 2);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Simple centering helper — uses native smooth scroll for light weight animation
  const goToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const slider = sliderRef.current;
    setActiveIndex(index);
    if (!slider) return;
    const target = slider.querySelector<HTMLElement>(`[data-idx='${index}']`);
    if (!target) return;
    const left = target.offsetLeft - (slider.clientWidth - target.clientWidth) / 2;
    slider.scrollTo({ left, behavior });
  };

  // Center to initial index before paint
  useLayoutEffect(() => {
    const slider = sliderRef.current;
    if (!slider || PORTFOLIO_ITEMS.length <= 1) return;
    const target = slider.querySelector<HTMLElement>(`[data-idx='${initialIndex}']`);
    if (target) {
      const left = target.offsetLeft - (slider.clientWidth - target.clientWidth) / 2;
      slider.scrollTo({ left, behavior: "auto" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lightweight scroll handler to update active index
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = slider.getBoundingClientRect();
        const center = slider.scrollLeft + rect.width / 2;
        const cards = Array.from(slider.querySelectorAll<HTMLElement>("[data-idx]"));
        let closest = 0;
        let minDist = Infinity;
        cards.forEach((c) => {
          const idx = Number(c.dataset.idx);
          const cCenter = c.offsetLeft + c.offsetWidth / 2;
          const d = Math.abs(cCenter - center);
          if (d < minDist) {
            minDist = d;
            closest = idx;
          }
        });
        setActiveIndex((prev) => (prev !== closest ? closest : prev));
        rafId = null;
      });
    };
    slider.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      slider.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

    // Update accent color smoothly when active index changes
    useEffect(() => {
      const color = PORTFOLIO_ITEMS[activeIndex]?.accentColor ?? "var(--theme-accent)";
      if (sectionRef.current) {
        sectionRef.current.style.setProperty("--portfolio-accent", color);
      }
    }, [activeIndex]);

    return (
      <section
        id="portfolio"
        ref={sectionRef as any}
        style={{
          background: "transparent",
          paddingTop: "5rem",
          paddingBottom: "5rem",
          position: "relative",
          overflow: "hidden",
          ["--portfolio-accent" as any]: "var(--theme-accent)",
        }}
    >
      <SectionBg variant="mascot-right" mascotSrc="/mascot-3.png" mascotOpacity={0.04} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
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
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--theme-text)",
                marginBottom: "1rem",
              }}
            >
              Karya yang kami <span style={{ color: "var(--theme-accent)" }}>banggakan</span>
            </h2>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flexDirection: "column" }}>
              <p style={{ color: "var(--theme-text)", opacity: 0.6, maxWidth: 480, fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                Proyek-proyek yang mencerminkan cara kerja dan standar kualitas yang kami terapkan di setiap kolaborasi.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Main Outer Frame ("Layar") ── */}
        <div className="container" style={{ marginTop: "1rem" }}>
          <div
            style={{
              position: "relative",
              margin: "0 auto",
              maxWidth: 1200,
            }}
          >
            {/* 3D Carousel Track */}
            <div
              ref={sliderRef}
              className="hide-scroll"
              style={{
                display: "flex",
                gap: "1.5rem",
                padding: "2rem 5vw 4rem 5vw",
                overflowX: "hidden",
                scrollSnapType: "x mandatory",
                overscrollBehaviorX: "contain",
                touchAction: "pan-y",
              }}
              onWheel={(e) => {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                  e.preventDefault();
                }
              }}
            >
                {PORTFOLIO_ITEMS.map((item, idx) => {
                  const isInteractive = !isTouch;
                  return (
                    <div
                      key={item.id}
                      className="pf-card-wrapper"
                      data-idx={idx}
                      role={isInteractive ? "button" : undefined}
                      tabIndex={isInteractive ? 0 : -1}
                      onKeyDown={
                        isInteractive
                          ? (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                goToIndex(idx);
                              }
                            }
                          : undefined
                      }
                      onClick={isInteractive ? () => goToIndex(idx) : undefined}
                      style={{
                        flexShrink: 0,
                        transition: "opacity 0.3s ease, filter 0.3s ease",
                        scrollSnapAlign: "center",
                        cursor: isInteractive ? "pointer" : "default",
                        willChange: "transform",
                        pointerEvents: isTouch ? "none" : "auto",
                        touchAction: isTouch ? "auto" : "pan-y",
                        userSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <PortfolioCard item={item} index={idx} />
                    </div>
                  );
                })}
            </div>

            {/* 3D Floating Bubble Pagination Indicators */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                marginTop: "-1rem",
                paddingBottom: "3rem",
              }}
            >
              {PORTFOLIO_ITEMS.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={`bubble-${item.id}`}
                    type="button"
                    aria-label={`Lihat portofolio ${item.title}`}
                    className="pf-bubble-indicator"
                    onClick={() => goToIndex(i)}
                    style={{
                      height: isActive ? 14 : 12,
                      width: isActive ? 14 : 12,
                      borderRadius: "50%",
                      background: isActive ? "var(--portfolio-accent, var(--theme-accent))" : "rgba(0,0,0,0.06)",
                      backdropFilter: "blur(4px)",
                      boxShadow: isActive
                        ? "0 6px 12px rgba(33, 150, 243, 0.25), inset 0 -2px 6px rgba(0,0,0,0.18), inset 0 2px 4px rgba(255,255,255,0.7)"
                        : "inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 3px rgba(0,0,0,0.05), 0 2px 5px rgba(0,0,0,0.05)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s, box-shadow 0.4s, width 0.3s, height 0.3s",
                      transform: isActive ? "scale(1.35)" : "scale(1)",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }

        .pf-card-wrapper:hover .pf-bg-img {
          transform: scale(1.05);
        }

        @media (hover: none) and (pointer: coarse), (hover: none) {
          .pf-card-wrapper,
          .pf-card-wrapper * {
            pointer-events: none !important;
            touch-action: auto !important;
            -webkit-user-drag: none !important;
            -webkit-tap-highlight-color: transparent !important;
          }

          .pf-card-wrapper:hover .pf-bg-img,
          .pf-card-wrapper:active .pf-bg-img {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
