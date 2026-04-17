// Corridor section — KSA-Malaysia connection with 2D map and flags
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

// Simplified Middle East + Southeast Asia coastline path (lightweight)
const mapPath =
  "M 30,85 L 45,78 55,80 62,72 70,70 75,65 80,68 88,62 95,65 100,60 108,58 112,62 118,58 125,60 130,55 138,52 142,56 148,50 155,48 160,52 168,55 172,50 178,48 185,52 190,48 195,52 200,55 208,52 215,58 220,62 228,60 235,65 240,62 248,68 255,65 260,70 268,72 275,68 280,75 288,72 295,78 300,75 308,80 315,78 320,82 328,85 335,82 340,88 348,85 355,90 360,88 365,92 370,95";

// Saudi Arabia flag — simplified green with white sword/shahada
function SaudiFlag({ x, y, size = 32 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2.5})`}>
      <rect width={size} height={size * 0.625} rx="2" fill="#006C35" />
      <text
        x={size / 2}
        y={size * 0.4}
        textAnchor="middle"
        fill="white"
        fontSize={size * 0.22}
        fontWeight="bold"
        fontFamily="Inter, sans-serif"
      >
        🇸🇦
      </text>
    </g>
  );
}

// Malaysia flag — simplified stripes with crescent
function MalaysiaFlag({ x, y, size = 32 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2.5})`}>
      <rect width={size} height={size * 0.625} rx="2" fill="#010066" />
      <rect y={size * 0.08} width={size} height={size * 0.07} fill="#CC0001" />
      <rect y={size * 0.22} width={size} height={size * 0.07} fill="white" />
      <rect y={size * 0.36} width={size} height={size * 0.07} fill="#CC0001" />
      <rect y={size * 0.5} width={size} height={size * 0.07} fill="white" />
      <text
        x={size / 2}
        y={size * 0.4}
        textAnchor="middle"
        fill="white"
        fontSize={size * 0.22}
        fontWeight="bold"
        fontFamily="Inter, sans-serif"
      >
        🇲🇾
      </text>
    </g>
  );
}

export function GlobeSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const facts = [
    { label: t("globe.fact1"), detail: t("globe.fact1detail") },
    { label: t("globe.fact2"), detail: t("globe.fact2detail") },
    { label: t("globe.fact3"), detail: t("globe.fact3detail") },
    { label: t("globe.fact4"), detail: t("globe.fact4detail") },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-[#151516] py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Map Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <svg viewBox="0 0 400 240" className="w-full h-auto" fill="none">
                {/* Grid lines */}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 24} x2="400" y2={i * 24} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 17 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="240" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                ))}

                {/* Simplified coastline */}
                <path
                  d={mapPath}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  fill="none"
                />

                {/* $18B+ label — well above the arc */}
                <text x="200" y="22" textAnchor="middle" fill="#C8A951" fontSize="16" fontFamily="Playfair Display, serif" fontWeight="600">
                  $18B+
                </text>
                <text x="200" y="38" textAnchor="middle" fill="white" fontSize="9" fontFamily="Inter, sans-serif" opacity="0.4">
                  bilateral trade corridor
                </text>

                {/* Connection arc — lower, away from text */}
                <motion.path
                  d="M 90 120 Q 200 60 320 140"
                  stroke="#C8A951"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 90 120 Q 200 60 320 140"
                  stroke="#C8A951"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeOpacity="0.06"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                />

                {/* KSA — flag + marker */}
                <SaudiFlag x={90} y={100} size={28} />
                <motion.circle cx="90" cy="120" r="5" fill="#C8A951" opacity="0.15"
                  animate={isInView ? { r: [5, 12, 5], opacity: [0.15, 0, 0.15] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <circle cx="90" cy="120" r="4" fill="#C8A951" />
                <circle cx="90" cy="120" r="1.5" fill="white" opacity="0.9" />
                <text x="90" y="140" textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600" opacity="0.7">
                  Saudi Arabia
                </text>
                <text x="90" y="152" textAnchor="middle" fill="white" fontSize="7" fontFamily="Inter, sans-serif" opacity="0.35">
                  Riyadh
                </text>

                {/* Malaysia — flag + marker */}
                <MalaysiaFlag x={320} y={120} size={28} />
                <motion.circle cx="320" cy="140" r="5" fill="#C8A951" opacity="0.15"
                  animate={isInView ? { r: [5, 12, 5], opacity: [0.15, 0, 0.15] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                />
                <circle cx="320" cy="140" r="4" fill="#C8A951" />
                <circle cx="320" cy="140" r="1.5" fill="white" opacity="0.9" />
                <text x="320" y="160" textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600" opacity="0.7">
                  Malaysia
                </text>
                <text x="320" y="172" textAnchor="middle" fill="white" fontSize="7" fontFamily="Inter, sans-serif" opacity="0.35">
                  Kuala Lumpur
                </text>

                {/* Midpoint indicator */}
                <circle cx="200" cy="78" r="2" fill="#C8A951" opacity="0.4" />
              </svg>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest font-sans">
              {t("globe.label")}
            </p>
            <h2 className="text-section font-serif text-white">
              {t("globe.heading")}{" "}
              <span className="text-gradient-gold">{t("globe.saudi")}</span>
              {" " + t("globe.and") + " "}
              <span className="text-gradient-gold">{t("globe.malaysia")}</span>
            </h2>
            <div className="space-y-4 text-white/50 text-base leading-relaxed font-sans">
              <p>{t("globe.p1")}</p>
              <p>{t("globe.p2")}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="text-sm font-semibold text-white/80 font-sans">
                    {fact.label}
                  </div>
                  <div className="text-xs text-white/35 mt-1 font-sans">
                    {fact.detail}
                  </div>
                </div>
              ))}
            </div>

            <a href="#services" className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all">
              {t("hero.learnMore")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
