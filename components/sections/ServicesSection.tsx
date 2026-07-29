'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  useGSAP(() => {
    if (shouldReduce) return;
    const mm = gsap.matchMedia();
    
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.4, ease: "power3" });

      const handleMove = (e: MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if(!rect) return;
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };

      const handleEnter = () => gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
      const handleLeave = () => gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });

      ref.current?.addEventListener("mousemove", handleMove);
      ref.current?.addEventListener("mouseenter", handleEnter);
      ref.current?.addEventListener("mouseleave", handleLeave);
      
      return () => {
        ref.current?.removeEventListener("mousemove", handleMove);
        ref.current?.removeEventListener("mouseenter", handleEnter);
        ref.current?.removeEventListener("mouseleave", handleLeave);
      }
    });

    // Mobile fallback: Shimmer pulse via ScrollTrigger
    mm.add("(hover: none)", () => {
      // Glow stays at center pulsing
      gsap.set(glowRef.current, { x: "50%", y: "50%", xPercent: -50, yPercent: -50, opacity: 0 });
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play pause resume pause",
        }
      });
    });

  }, { scope: ref, dependencies: [shouldReduce] });

  const xDir = index % 2 === 0 ? -30 : 30;

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, x: xDir, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * (index % 3), ease: EASING }}
      style={{
        background: "transparent",
        border: "1px solid var(--theme-border)",
        borderRadius: service.featured ? 20 : 16,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
      }}
      onMouseEnter={(e: React.MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--theme-accent)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e: React.MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--theme-border)";
        el.style.transform = "translateY(0)";
      }}
      className={service.featured ? "service-featured service-card" : "service-card"}
    >
      {/* Magnetic Glow Tracker */}
      <div 
        ref={glowRef}
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 0
        }}
      />
      {/* Animated left blue border */}
      <div
        className="left-bar"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: "#2196F3",
          borderRadius: "16px 0 0 16px",
          opacity: 0,
          transition: "opacity 0.2s",
        }}
      />

      {/* Featured badge */}
      {service.featured && (
        <span
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "rgba(255,255,255,0.1)",
            color: "var(--theme-text)",
            border: "1px solid var(--theme-border)",
            fontSize: "clamp(0.55rem, 1.5vw, 0.7rem)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "2px 6px",
            borderRadius: 20,
            zIndex: 1
          }}
        >
          Paling Populer
        </span>
      )}

      {/* Icon */}
      <div
        className="svc-icon"
        style={{
          borderRadius: 14,
          background: "rgba(255,255,255,0.05)",
          color: "var(--theme-text)",
          border: "1px solid var(--theme-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0.75rem",
          transition: "background 0.2s, color 0.2s, transform 0.2s",
          position: "relative", zIndex: 1
        }}
      >
        {SERVICE_ICONS[service.id]}
      </div>

      <h3
        className="svc-title"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: "var(--theme-text)",
          marginBottom: "0.4rem",
          letterSpacing: "-0.02em",
          position: "relative", zIndex: 1,
          lineHeight: 1.2
        }}
      >
        {service.title}
      </h3>
      <p className="svc-desc" style={{ color: "var(--theme-text)", opacity: 0.7, lineHeight: 1.4, position: "relative", zIndex: 1 }}>{service.desc}</p>
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
      style={{ background: "transparent", paddingTop: "5rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}
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
              Apa yang bisa<br />
              kami <span style={{ color: "var(--theme-accent)" }}>bantu?</span>
            </h2>
          </motion.div>
        </div>

        {/* Asymmetric grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
          className="services-grid"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .services-grid {
          grid-template-columns: 1fr 1fr !important;
          gap: 0.5rem !important;
        }
        .service-card { padding: 0.65rem !important; }
        .svc-icon { width: 28px !important; height: 28px !important; svg { width: 18px; height: 18px; } }
        .svc-title { font-size: clamp(0.85rem, 2vw, 1.15rem); }
        .svc-desc { font-size: clamp(0.7rem, 1.8vw, 0.9rem); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        
        @media (min-width: 768px) {
          .services-grid { gap: 1.25rem !important; }
          .service-card { padding: 1.75rem !important; }
          .svc-icon { width: 52px !important; height: 52px !important; svg { width: 28px; height: 28px; } }
          .svc-title { font-size: 1.35rem !important; }
          .svc-desc { font-size: 0.95rem !important; display: block; }
          .service-featured {
            grid-column: span 2;
            padding: 2.5rem !important;
          }
        }
        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
