
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { fieldNotes, fieldCategories } from "../data/fieldNotes";

export default function FieldNotes() {
  const [active, setActive] = useState("ALL");

  const filtered = fieldNotes.filter((item) => {
    if (active === "ALL") return true;
    return item.type === active;
  });

  return (
    <main className="archive-page">
      <div className="archive-intro">
        <span className="micro-label">AN INDEX OF EXPERIENCES · 01</span>
        <h1>
          Field <em>Notes.</em>
        </h1>
        <p>
          Places I've been, people I've met, ideas I've
          explored and experiences that left something behind.
        </p>
      </div>

      <div className="archive-toolbar">
        <span>THE EXPERIENCE ARCHIVE</span>
        <span>{String(filtered.length).padStart(2, "0")} ENTRIES</span>
      </div>

      <div className="archive-filters">
        {fieldCategories.map((category) => (
          <button
            key={category}
            className={active === category ? "active" : ""}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="field-grid">
        {filtered.map((item, index) => (
          <motion.article
            className="field-card"
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
          >
            <div className="field-image">
              <img src={item.image} alt={item.name} loading="lazy" />
              <span>{item.year}</span>
            </div>

            <div className="field-meta">
              <span>{item.type}</span>
              <span><MapPin size={11} /> {item.location}</span>
            </div>

            <h2>{item.name}</h2>
            <p>{item.description}</p>

            <span className="field-index">
              FIELD NOTE / {item.id.toUpperCase()}
            </span>
          </motion.article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>More notes from this chapter are on their way.</p>
        </div>
      )}
    </main>
  );
}
