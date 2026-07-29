'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ThemeZoneProps {
  children: React.ReactNode;
  bg: string;
  text: string;
  accent: string;
  border?: string;
  id?: string;
  className?: string;
}

export default function ThemeZone({ children, bg, text, accent, border, id, className }: ThemeZoneProps) {
  const container = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => gsap.to(document.documentElement, { 
          '--theme-bg': bg, '--theme-text': text, '--theme-accent': accent, '--theme-border': border || 'rgba(0,0,0,0.1)', duration: 0.7, ease: "power2.inOut" 
        }),
        onEnterBack: () => gsap.to(document.documentElement, { 
          '--theme-bg': bg, '--theme-text': text, '--theme-accent': accent, '--theme-border': border || 'rgba(0,0,0,0.1)', duration: 0.7, ease: "power2.inOut" 
        }),
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => gsap.set(document.documentElement, { '--theme-bg': bg, '--theme-text': text, '--theme-accent': accent, '--theme-border': border || 'rgba(0,0,0,0.1)' }),
        onEnterBack: () => gsap.set(document.documentElement, { '--theme-bg': bg, '--theme-text': text, '--theme-accent': accent, '--theme-border': border || 'rgba(0,0,0,0.1)' }),
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <div ref={container} id={id} className={className} style={{ position: 'relative' }}>
      {children}
    </div>
  );
}
