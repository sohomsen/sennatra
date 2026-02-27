"use client";

import { motion } from "framer-motion";

// EDIT: Replace these paragraphs with your actual bio.
// Add or remove paragraphs as needed.
const bioParagraphs = [
  "sennatra is a keyboardist, DJ, and producer from New Jersey whose work blends live performance with modern electronic sound. Well known in the Tri-State area for his keyboard skills, he has performed with renowned South Asian artists while continuing to grow as a producer and DJ.",
  "Influenced by artists such as Skrillex, Chris Lake, deadmau5, 6ix, Kenny Beats, Knock2, ISOxo, and legendary composers A.R. Rahman and R.D. Burman, sennatra creates music built on feeling and sound rather than strict genre lines. His performances and releases bring energy, authenticity, and culture to audiences wherever he plays.",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const paraVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function BioParagraphs() {
  return (
    <section
      className="py-16 md:py-0 px-8 md:px-12 md:flex md:flex-col md:justify-center md:min-h-[calc(100vh-60px)] bg-brand-black"
      aria-label="Bio"
    >
      {/* Heading — cinematic H1 */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[0.06em] uppercase leading-tight text-brand-text mb-4"
      >
        The name is Sennatra.
      </motion.h1>

      {/* Red separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-12 h-px bg-brand-red mb-10 origin-left"
        aria-hidden="true"
      />

      {/* Bio paragraphs */}
      <motion.div
        className="flex flex-col gap-6 max-w-lg"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {bioParagraphs.map((para, i) => (
          <motion.p
            key={i}
            variants={paraVariants}
            className="text-brand-subtle text-base md:text-lg leading-relaxed tracking-wide"
          >
            {para}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
}
