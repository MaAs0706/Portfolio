
import { motion } from "framer-motion";
import { ArrowUpRight, Feather, BookOpen } from "lucide-react";
import { articles, mediumProfile } from "../data/articles";
import MediumArticles from "../components/MediumArticles";


 function ManuscriptAnimation() {
  const lines = [
    "Some thoughts are never spoken.",
    "Some feelings never find a name.",
    "And some words...",
    "are simply left on the page."
  ];

  return (
    <div className="manuscript-scene">
      <motion.div
        className="manuscript"
        initial={{ opacity: 0, y: 30, rotate: 3 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        animate={{ y: [0, -7, 0] }}
      >
        <span className="manuscript-label">
          FRAGMENTS / NO. 001
        </span>

        <div className="manuscript-rule" />

        <div className="manuscript-lines">
          {lines.map((line, index) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8 + index * 0.65,
                duration: 0.8
              }}
            >
              {line}
              {index === lines.length - 1 && (
                <span className="ink-cursor" />
              )}
            </motion.p>
          ))}
        </div>

        <div className="manuscript-footer">
          <span>A THOUGHT, IN PASSING</span>
          <span>AM — 001</span>
        </div>
      </motion.div>

      <motion.span
        className="manuscript-orbit"
        animate={{ rotate: 360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        WORDS · THOUGHTS · FRAGMENTS ·
      </motion.span>
    </div>
  );
}

export default function Writing() {
  return (
    <main className="archive-page writing-page">
      <div className="archive-intro">
        <span className="micro-label">AN INDEX OF WORDS · 02</span>
        <h1>
          The Writer's <em>Desk.</em>
        </h1>
        <p>
          Essays, poetry, fragments and thoughts that
          found their way onto a page.
        </p>
      </div>

      <div className="writing-banner">
        <Feather size={24} strokeWidth={1} />
        <div>
          <span>WORDS I'VE KEPT</span>
          <p>
            Some thoughts are too important to leave
            unwritten. Others are too difficult to say aloud.
          </p>
        </div>
        <a
          href={mediumProfile}
          target="_blank"
          rel="noreferrer"
        >
          MEDIUM <ArrowUpRight size={15} />
        </a>
      </div>
      <section className="writing-archive">
  <div className="panel-top">
    <span>01 — THE ARCHIVE</span>
    <span>WORDS PUBLISHED</span>
  </div>

  <MediumArticles />
</section>

      
      
    
    </main>
  );
}
