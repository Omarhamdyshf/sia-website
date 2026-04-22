import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  const { t } = useTranslation();
  return (
    <section id="contact" aria-labelledby="cta-heading" className="relative bg-[#151516] py-24 lg:py-32 overflow-hidden">
      {/* Emissive glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full emissive-pulse pointer-events-none"
        style={{ opacity: 0.15 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-2xl mx-auto px-6"
      >
        <h2 id="cta-heading" className="text-section font-serif text-white mb-6">
          {t("cta.heading")}
        </h2>
        <p className="text-white/50 text-lg mb-10 font-sans">
          {t("cta.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/investor/login"
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-gold text-charcoal font-semibold rounded-xl hover:bg-gold-light transition-all hover:shadow-gold-glow-lg"
          >
            Join the Investment Bridge
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/investor/login"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 text-white/60 font-medium rounded-xl border border-white/10 hover:border-gold/30 hover:text-white transition-all"
          >
            {t("cta.secondary")}
          </Link>
        </div>

        <p className="text-white/20 text-xs mt-8 font-sans">
          {t("cta.trust")}
        </p>
      </motion.div>
    </section>
  );
}
