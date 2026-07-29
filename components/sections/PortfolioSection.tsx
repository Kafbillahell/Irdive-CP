'use client';

import { useRef } from "react";
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

  // Placeholder images based on index, looking professional (coding, tech, abstract dark)
  const placeholderImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  ];
  const bgImage = placeholderImages[index % placeholderImages.length];

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

  // 3D Coverflow Effect Logic
  useGSAP(() => {
    if (shouldReduce || !sliderRef.current) return;
    
    // We use a simple rAF loop to calculate the distance of each card 
    // from the center of the viewport and apply a rotateY and scale.
    let rafId: number;
    const cards = sliderRef.current.querySelectorAll('.pf-card-wrapper');
    const bubbles = document.querySelectorAll('.pf-bubble-indicator');
    
    const update3D = () => {
      if (!sliderRef.current) return;
      const sliderCenter = sliderRef.current.getBoundingClientRect().width / 2;
      
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((cardEl, idx) => {
        const el = cardEl as HTMLElement;
        const rect = el.getBoundingClientRect();
        // Calculate center of this specific card relative to the viewport
        const cardCenter = rect.left + rect.width / 2;
        
        // Distance from center of window
        const windowCenter = window.innerWidth / 2;
        const dist = cardCenter - windowCenter;
        
        const absDistForActive = Math.abs(dist);
        if (absDistForActive < minDistance) {
          minDistance = absDistForActive;
          closestIdx = idx;
        }

        // Max rotation angle
        const maxRotate = 22; 
        
        // Map distance to rotation (-max to +max)
        let rotateY = (dist / window.innerWidth) * maxRotate * 2.8; 
        
        // Clamp rotation
        if (rotateY > maxRotate) rotateY = maxRotate;
        if (rotateY < -maxRotate) rotateY = -maxRotate;
        
        // Scale down slightly as it moves away from center, adding depth
        const absDist = Math.abs(rotateY) / maxRotate;
        const scale = 1 - (absDist * 0.1);
        const z = -absDist * 50; // Push back in Z space
        const zIndex = Math.round((1 - absDist) * 100);

        // Enhance 3D effect with Z translation
        el.style.transform = `perspective(1200px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.zIndex = zIndex.toString();
        // Add dynamic box-shadow based on tilt for elegant lighting
        const shadowOffset = rotateY * -1; // opposite to tilt
        el.style.filter = `drop-shadow(${shadowOffset}px 20px 30px rgba(0,0,0,${0.05 + (absDist * 0.1)}))`;
      });

      // Update bubbles
      bubbles.forEach((bubble, idx) => {
        const b = bubble as HTMLElement;
        if (idx === closestIdx) {
          b.style.transform = "scale(1.5) translateY(-4px)";
          b.style.background = "var(--theme-accent)"; // Active gets the primary brand color
          b.style.boxShadow = "0 6px 12px rgba(33, 150, 243, 0.3), inset 0 -2px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.6)";
          b.style.borderColor = "rgba(0,0,0,0.1)";
          b.style.opacity = "1";
        } else {
          // Add a subtle wave float based on distance
          const floatOffset = Math.abs(idx - closestIdx) * 1.5;
          b.style.transform = `scale(1) translateY(${floatOffset}px)`;
          b.style.background = "rgba(0, 0, 0, 0.06)"; // Darker tint for light backgrounds
          b.style.boxShadow = "inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 3px rgba(0,0,0,0.05), 0 2px 5px rgba(0,0,0,0.05)";
          b.style.borderColor = "rgba(0,0,0,0.08)";
          b.style.opacity = "0.7";
        }
      });

      rafId = requestAnimationFrame(update3D);
    };
    rafId = requestAnimationFrame(update3D);

    return () => cancelAnimationFrame(rafId);
  }, { scope: sliderRef });

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
                padding: "2rem 5vw 4rem 5vw", // Padding ensures 3D cards aren't clipped
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {PORTFOLIO_ITEMS.map((item, i) => (
                <div key={item.id} className="pf-card-wrapper" style={{ flexShrink: 0, transition: "transform 0.1s cubic-bezier(0.2,0.8,0.2,1)" }}>
                  <PortfolioCard item={item} index={i} />
                </div>
              ))}
            </div>

            {/* 3D Floating Bubble Pagination Indicators */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px", // a bit more space for floating bubbles
              marginTop: "-1rem", /* Pull up closer to cards */
              paddingBottom: "3rem"
            }}>
              {PORTFOLIO_ITEMS.map((item, i) => (
                <div 
                  key={`bubble-${item.id}`} 
                  className="pf-bubble-indicator"
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.06)",
                    backdropFilter: "blur(4px)",
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 3px rgba(0,0,0,0.05), 0 2px 5px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s, box-shadow 0.4s",
                    animation: `float-bubble 3s ease-in-out infinite alternate ${i * 0.2}s`
                  }}
                />
              ))}
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
