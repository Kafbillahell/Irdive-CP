'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MAP_LOCATION } from '@/lib/content';

const EASING = [0.22, 1, 0.36, 1] as const;

export default function MapLocationSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const shouldReduce = useReducedMotion();

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_LOCATION.googleMapsQuery)}`;

  return (
    <section id="location" className="location-section" aria-label="Lokasi perusahaan">
      <div className="container">
        <motion.div
          ref={headerRef}
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASING }}
          className="location-header"
        >
          <span className="label-tag" style={{ display: 'block', marginBottom: '0.75rem', color: '#d13434' }}>
            Lokasi Kami
          </span>
          <h2 className="location-heading">Kantor kami berada di lokasi berikut</h2>
        </motion.div>

        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: EASING }}
          className="map-shell"
        >
          <div className="map-frame">
            <iframe
              title="Lokasi IRDIVE"
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_LOCATION.googleMapsQuery)}&z=17&output=embed`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-pin"
              aria-label="Buka lokasi di Google Maps"
            >
              <span className="map-pin-bubble">Buka di Google Maps</span>
              <span className="map-pin-core" aria-hidden="true" />
            </a>
          </div>

          <div className="location-address">
            <div className="location-address-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p>{MAP_LOCATION.address}</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .location-section {
          position: relative;
          background: #ffffff;
          color: #111827;
          padding-top: 5rem;
          padding-bottom: 5rem;
          border-top: 1px solid #e5e7eb;
        }

        .location-header {
          margin-bottom: 2rem;
        }

        .location-heading {
          max-width: 700px;
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #111827;
        }

        .map-shell {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 28px;
          box-shadow: 0 18px 45px rgba(17, 24, 39, 0.08);
          padding: 1rem;
        }

        .map-frame {
          position: relative;
          width: 100%;
          min-height: 440px;
          overflow: hidden;
          border-radius: 22px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
        }

        .map-frame iframe {
          display: block;
          width: 100%;
          height: 440px;
          border: 0;
          filter: grayscale(0.05) contrast(1.05);
        }

        .map-pin {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          z-index: 2;
        }

        .map-pin-core {
          position: relative;
          display: block;
          width: 26px;
          height: 26px;
          border-radius: 50% 50% 50% 0;
          background: #ef4444;
          border: 3px solid #ffffff;
          box-shadow: 0 8px 18px rgba(239, 68, 68, 0.42);
          transform: rotate(-45deg);
        }

        .map-pin-core::after {
          content: '';
          position: absolute;
          inset: 7px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
        }

        .map-pin-bubble {
          position: absolute;
          left: 50%;
          bottom: 38px;
          transform: translateX(-50%);
          white-space: nowrap;
          background: rgba(17, 24, 39, 0.92);
          color: #ffffff;
          padding: 0.6rem 0.85rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          box-shadow: 0 12px 24px rgba(17, 24, 39, 0.18);
        }

        .map-pin-bubble::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -8px;
          transform: translateX(-50%) rotate(45deg);
          width: 12px;
          height: 12px;
          background: rgba(17, 24, 39, 0.92);
          border-radius: 2px;
        }

        .location-address {
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
          margin-top: 1.25rem;
          padding: 0.3rem 0 0.1rem;
        }

        .location-address-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: #fff1f2;
          color: #d13434;
          border: 1px solid #fecaca;
        }

        .location-address-icon svg {
          width: 20px;
          height: 20px;
        }

        .location-address p {
          color: #374151;
          font-size: 1rem;
          line-height: 1.7;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .location-section {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }

          .map-shell {
            padding: 0.75rem;
            border-radius: 20px;
          }

          .map-frame,
          .map-frame iframe {
            min-height: 350px;
            height: 350px;
          }

          .map-pin-bubble {
            bottom: 30px;
            padding: 0.5rem 0.7rem;
            font-size: 0.68rem;
          }

          .location-address {
            flex-direction: column;
            gap: 0.7rem;
          }
        }
      `}</style>
    </section>
  );
}
