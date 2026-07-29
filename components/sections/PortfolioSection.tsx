'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/content";
import SectionBg from "@/components/ui/SectionBg";

const EASING = [0.22, 1, 0.36, 1] as const;

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
  const ref  = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  const bgImage = item.imageSrc ?? "/assets/image.png";

  useGSAP(() => {
    if (shouldReduce) return;
    const mm = gsap.matchMedia();

    mm.add("(hover: hover) and (pointer: fine)", () => {
      const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.4, ease: "power3" });

      const handleMove = (e: MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };
      const handleEnter = () => gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
      const handleLeave = () => gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });

      ref.current?.addEventListener("mousemove",  handleMove);
      ref.current?.addEventListener("mouseenter", handleEnter);
      ref.current?.addEventListener("mouseleave", handleLeave);
      return () => {
        ref.current?.removeEventListener("mousemove",  handleMove);
        ref.current?.removeEventListener("mouseenter", handleEnter);
        ref.current?.removeEventListener("mouseleave", handleLeave);
      };
    });
  }, { scope: ref });

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
        height: 480, // Fixed height for absolute image cover layout
        position: "relative",
        overflow: "hidden",
        borderRadius: 24, // softer radius
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#0A0A0A", // Base dark before image
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)", // Elegant deeper 3D lighting for dark cards
        cursor: "grab",
        transition: "border-color 0.4s, transform 0.4s",
        transformStyle: "preserve-3d",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end", // content pushed to bottom over the image gradient
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.1)";
      }}
      onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
      onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
    >
      {/* ── Background Image ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
        transition: "transform 0.5s ease-out",
        filter: "brightness(0.8)",
      }} className="pf-bg-img" />

      {/* ── Gradient Overlay for Text Readability ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.95) 100%)",
        zIndex: 0,
      }} />

      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 1,
          mixBlendMode: "overlay",
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
          <span style={{
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
          }}>
            {item.categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
          color: "#FFF",
          marginBottom: "0.5rem",
          lineHeight: 1.2,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          {item.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.6,
        }}>
          {item.description}
        </p>

        {/* Tech tags */}
        <div style={{
          display: "flex",
          gap: "0.4rem",
          flexWrap: "wrap",
          marginTop: "1.25rem",
        }}>
          {item.tech.map((t) => (
            <span key={t} style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              padding: "4px 10px",
              borderRadius: 6,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const headerRef     = useRef(null);
  const sliderRef     = useRef<HTMLDivElement>(null);
  const headerInView  = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce  = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    { ...PORTFOLIO_ITEMS[PORTFOLIO_ITEMS.length - 1], clone: true, realIndex: PORTFOLIO_ITEMS.length - 1 },
    ...PORTFOLIO_ITEMS.map((item, index) => ({ ...item, clone: false, realIndex: index })),
    { ...PORTFOLIO_ITEMS[0], clone: true, realIndex: 0 },
  ];

  const scrollToIndex = (realIndex: number) => {
    const target = sliderRef.current?.querySelector<HTMLElement>(`[data-idx='${realIndex}']`);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    if (shouldReduce || PORTFOLIO_ITEMS.length <= 1) return;
    scrollToIndex(activeIndex);
  }, [activeIndex, shouldReduce]);

  useEffect(() => {
    if (!sliderRef.current || PORTFOLIO_ITEMS.length <= 1) return;

    const cards = sliderRef.current.querySelectorAll<HTMLElement>('.pf-card-wrapper[data-idx]');
    const firstCard = cards[0];
    if (!firstCard) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const cardRect = firstCard.getBoundingClientRect();
    sliderRef.current.scrollLeft = firstCard.offsetLeft - sliderRect.width / 2 + cardRect.width / 2;
    // trigger a scroll event to apply initial 3D transforms (use timeout to ensure layout settled)
    setTimeout(() => sliderRef.current?.dispatchEvent(new Event('scroll')), 50);
  }, []);

  return (
    <section
      id="portfolio"
      style={{ background: "transparent", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}
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
            <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--theme-text)",
            marginBottom: "1rem",
          }}>
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
          <div style={{
            position: "relative",
            margin: "0 auto",
            maxWidth: 1200,
          }}>
            {/* 3D Carousel Track */}
            <div 
              ref={sliderRef}
              className="hide-scroll"
              style={{
                display: "flex",
                gap: "1.5rem",
                padding: "2rem 5vw 4rem 5vw",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                perspective: 1400,
                perspectiveOrigin: "50% 50%",
              }}
              onScroll={() => {
                if (!sliderRef.current) return;
                const slider = sliderRef.current;
                const sliderRect = slider.getBoundingClientRect();
                const center = slider.scrollLeft + sliderRect.width / 2;

                // cards that are real (have data-idx) used to determine active index
                const realCards = Array.from(slider.querySelectorAll<HTMLElement>('.pf-card-wrapper[data-idx]'));
                const allCards = Array.from(slider.querySelectorAll<HTMLElement>('.pf-card-wrapper'));

                let closest = activeIndex;
                let closestDistance = Infinity;

                // Compute transforms for all cards (including clones) to create curved room effect
                allCards.forEach((card) => {
                  const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                  const norm = Math.max(-1, Math.min(1, (cardCenter - center) / (sliderRect.width / 2)));
                  const absNorm = Math.abs(norm);

                  // stronger curvature: sides move forward and tilt inward, center slightly recessed and smaller
                  const rotateY = -norm * 24; // stronger inward tilt
                  const rotateX = Math.min(6, absNorm * 5);
                  const translateZ = 140 * absNorm; // sides come strongly forward
                  const scale = 0.92 + absNorm * 0.12; // center smaller (≈0.92), sides larger

                  const transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
                  const wrapperStyle = card.style as CSSStyleDeclaration & { transform?: string };
                  wrapperStyle.transform = transform;
                  wrapperStyle.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
                  wrapperStyle.transformStyle = 'preserve-3d';
                  // zIndex: sides overlay center
                  (card.style as any).zIndex = Math.round(absNorm * 200) + 1;
                });

                // Determine closest real card for active index
                realCards.forEach((card) => {
                  const idx = Number(card.dataset.idx);
                  const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                  const distance = Math.abs(cardCenter - center);
                  if (distance < closestDistance) {
                    closestDistance = distance;
                    closest = idx;
                  }
                });

                if (closest !== activeIndex) setActiveIndex(closest);
              }}
            >
              {carouselItems.map((item, i) => {
                const isClone = item.clone;
                const isActive = item.realIndex === activeIndex && !isClone;

                return (
                  <div
                    key={`${item.id}-${i}`}
                    className="pf-card-wrapper"
                    data-idx={isClone ? undefined : item.realIndex}
                    onClick={() => !isClone && setActiveIndex(item.realIndex)}
                    style={{
                      flexShrink: 0,
                      transition: "opacity 0.35s ease, filter 0.35s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                      opacity: isClone ? 0.5 : (isActive ? 1 : 0.88),
                      filter: isClone ? "grayscale(80%) blur(6px)" : (isActive ? "none" : "blur(1px)"),
                      zIndex: isActive ? 3 : 2,
                      scrollSnapAlign: "center",
                      cursor: isClone ? "default" : "pointer",
                      willChange: 'transform',
                      pointerEvents: isClone ? 'none' : 'auto',
                      // soften edges for clone fillers so they read as background
                      boxShadow: isClone ? 'inset 0 -10px 40px rgba(0,0,0,0.45)' : undefined,
                    }}
                  >
                    <PortfolioCard item={item} index={item.realIndex} />
                  </div>
                );
              })}
            </div>

            {/* 3D Floating Bubble Pagination Indicators */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              marginTop: "-1rem",
              paddingBottom: "3rem"
            }}>
              {PORTFOLIO_ITEMS.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={`bubble-${item.id}`}
                    type="button"
                    aria-label={`Lihat portofolio ${item.title}`}
                    className="pf-bubble-indicator"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      height: isActive ? 14 : 12,
                      width: isActive ? 14 : 12,
                      borderRadius: "50%",
                      background: isActive ? "var(--theme-accent)" : "rgba(0,0,0,0.06)",
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
        /* Hide scrollbar for clean UI but keep scroll functionality */
        .hide-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .pf-card-wrapper:hover .pf-bg-img {
          transform: scale(1.05); /* Slight Ken Burns effect on hover */
        }

        @keyframes float-bubble {
          0% { transform: translateY(0px) scale(inherit); }
          100% { transform: translateY(-4px) scale(inherit); }
        }
      `}</style>
    </section>
  );
}
