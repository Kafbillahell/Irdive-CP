'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PORTFOLIO_ITEMS } from "@/lib/content";
import SectionBg from "@/components/ui/SectionBg";

const EASING = [0.22, 1, 0.36, 1] as const;

const PORTFOLIO_DETAILS: Record<string, { description: string }> = {
  p1: {
    description:
      "Zans Cafe dirancang untuk menciptakan pengalaman yang lebih tenang, lebih cepat, dan lebih nyaman bagi pengunjung. Sistem yang tertata ini membantu mengurangi antre panjang, memperlancar proses penyajian, dan menjaga suasana café tetap santai tanpa mengorbankan kualitas layanan. Tujuannya bukan hanya mempercepat transaksi, tetapi juga membuat setiap kunjungan terasa lebih percaya diri dan menyenangkan.",
  },
  p2: {
    description:
      "Sistem absensi siswa dibuat untuk menanamkan nilai kedisiplinan sejak dini melalui proses yang sederhana dan akuntabel. Dengan pencatatan kehadiran yang lebih rapi dan mudah dipantau, sekolah dapat membangun budaya waktu, tanggung jawab, dan kejujuran tanpa harus menambah beban administratif secara berlebihan. Solusi ini membantu menata proses harian yang lebih konsisten dan terukur.",
  },
  p3: {
    description:
      "Aplikasi uang kas dibuat untuk menghadirkan transparansi penuh dalam setiap alur pemasukan dan pengeluaran. Dengan catatan yang jelas, mudah diaudit, dan mudah dipahami, setiap anggota dapat melihat kondisi keuangan secara objektif. Tujuannya adalah membangun rasa kepercayaan, menjaga integritas pengelolaan dana, dan memastikan keputusan finansial tetap berpihak pada kepentingan bersama.",
  },
};

export default function PortfolioSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = PORTFOLIO_ITEMS.find((item) => item.id === selectedId) ?? null;
  const selectedDetail = selectedProject ? PORTFOLIO_DETAILS[selectedProject.id] : null;

  return (
    <section id="portfolio" className="portfolio-section" aria-label="Portfolio">
      <SectionBg variant="mascot-right" mascotSrc="/mascot-3.png" mascotOpacity={0.04} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
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
            Proyek-proyek yang mencerminkan cara kerja, niat, dan standar kualitas yang kami terapkan dalam tiap solusi.
          </p>
        </motion.div>

        <div className="pf-grid">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.article
              key={item.id}
              className="pf-card"
              initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 * (index + 1), ease: EASING }}
            >
              {item.imageSrc && (
                <div className="pf-card-image">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className="pf-card-overlay" />

              <div className="pf-card-content">
                <span className="pf-card-category">{item.categoryLabel}</span>
                <h3 className="pf-card-title">{item.title}</h3>
                <p className="pf-card-desc">{item.description}</p>

                <div className="pf-card-tech">
                  {item.tech.map((tech) => (
                    <span key={tech} className="pf-tech-tag">{tech}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className="pf-card-button"
                  onClick={() => setSelectedId(item.id)}
                >
                  Lihat Detail
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {selectedProject && selectedDetail && (
        <div
          className="pf-modal-backdrop"
          onClick={() => setSelectedId(null)}
          role="presentation"
        >
          <motion.div
            className="pf-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Detail ${selectedProject.title}`}
            initial={shouldReduce ? {} : { opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASING }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="pf-modal-close"
              onClick={() => setSelectedId(null)}
              aria-label="Tutup modal"
            >
              ×
            </button>

            <div className="pf-modal-image-wrap">
              {selectedProject.imageSrc && (
                <Image
                  src={selectedProject.imageSrc}
                  alt={selectedProject.title}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              )}
            </div>

            <div className="pf-modal-body">
              <span className="pf-modal-tag">{selectedProject.categoryLabel}</span>
              <h3 className="pf-modal-title">{selectedProject.title}</h3>
              <p className="pf-modal-text">{selectedDetail.description}</p>
            </div>
          </motion.div>
        </div>
      )}

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
          opacity: 0.7;
          max-width: 640px;
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
        }

        .pf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .pf-card {
          position: relative;
          overflow: hidden;
          min-height: 420px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: #0b0b0d;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .pf-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
        }

        .pf-card-image {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .pf-card-image img {
          transition: transform 0.6s ease;
        }
        .pf-card:hover .pf-card-image img {
          transform: scale(1.06);
        }

        .pf-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6, 10, 16, 0.1) 0%,
            rgba(6, 10, 16, 0.38) 38%,
            rgba(6, 10, 16, 0.88) 100%
          );
          z-index: 1;
        }

        .pf-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 420px;
          padding: 1.5rem;
        }

        .pf-card-category {
          display: inline-flex;
          align-self: flex-start;
          margin-bottom: 0.8rem;
          padding: 0.4rem 0.7rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #ffffff;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pf-card-title {
          font-family: var(--font-display);
          color: #ffffff;
          font-size: clamp(1.45rem, 3vw, 2rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 0.6rem;
        }

        .pf-card-desc {
          color: rgba(255, 255, 255, 0.76);
          font-size: 0.92rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .pf-card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 1.2rem;
        }

        .pf-tech-tag {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.82);
          padding: 0.35rem 0.7rem;
          font-size: 0.66rem;
          font-weight: 600;
        }

        .pf-card-button {
          align-self: flex-start;
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #ffffff 0%, #e7ecff 100%);
          color: #111827;
          cursor: pointer;
          padding: 0.8rem 1.2rem;
          font-weight: 700;
          font-size: 0.82rem;
          box-shadow: 0 12px 25px rgba(255, 255, 255, 0.12);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pf-card-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 30px rgba(255, 255, 255, 0.16);
        }

        .pf-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: rgba(10, 12, 18, 0.7);
          backdrop-filter: blur(10px);
          display: grid;
          place-items: center;
          padding: 1rem;
        }

        .pf-modal {
          position: relative;
          width: min(920px, 100%);
          max-height: min(88vh, 900px);
          overflow: hidden;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 30px 80px rgba(15, 23, 42, 0.32);
        }

        .pf-modal-close {
          position: absolute;
          top: 0.9rem;
          right: 0.9rem;
          z-index: 3;
          width: 2.2rem;
          height: 2.2rem;
          border: none;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.8);
          color: white;
          font-size: 1.4rem;
          line-height: 1;
          cursor: pointer;
        }

        .pf-modal-image-wrap {
          position: relative;
          width: 100%;
          height: 260px;
          background: #e5e7eb;
        }

        .pf-modal-image-wrap img {
          object-fit: cover;
        }

        .pf-modal-body {
          padding: 1.6rem 1.4rem 1.8rem;
          color: #0f172a;
        }

        .pf-modal-tag {
          display: inline-flex;
          padding: 0.42rem 0.72rem;
          border-radius: 999px;
          background: #eef2ff;
          color: #254edb;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pf-modal-title {
          margin-top: 0.9rem;
          font-family: var(--font-display);
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .pf-modal-text {
          margin-top: 1rem;
          color: #374151;
          line-height: 1.8;
          font-size: 0.98rem;
        }

        @media (min-width: 768px) {
          .pf-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .pf-card {
            min-height: 460px;
          }

          .pf-card-content {
            min-height: 460px;
            padding: 1.6rem;
          }

          .pf-modal-image-wrap {
            height: 300px;
          }

          .pf-modal-body {
            padding: 1.8rem 2rem 2rem;
          }
        }
      `}</style>
    </section>
  );
}