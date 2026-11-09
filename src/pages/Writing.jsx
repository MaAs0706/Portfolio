
import { motion } from "framer-motion";
import { ArrowUpRight, Feather, BookOpen } from "lucide-react";
import { articles, mediumProfile } from "../data/articles";

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

      <div className="archive-toolbar">
        <span>SELECTED WRITING</span>
        <span>{String(articles.length).padStart(2, "0")} ENTRIES</span>
      </div>

      {articles.length > 0 ? (
        <div className="article-list">
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="article-row"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <span className="article-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="article-main">
                <div className="article-meta">
                  <span>{article.category}</span>
                  <span>{article.date}</span>
                </div>

                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>

                <span className="read-time">
                  {article.readTime}
                </span>
              </div>

              <ArrowUpRight className="article-arrow" />
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="writing-empty">
          <BookOpen size={27} strokeWidth={1} />
          <h2>The first page is waiting.</h2>
          <p>
            The collection is being assembled. In the
            meantime, you can find my writing on Medium.
          </p>
          <a
            href={mediumProfile}
            target="_blank"
            rel="noreferrer"
          >
            EXPLORE MY MEDIUM PROFILE <ArrowUpRight size={14}/>
          </a>
        </div>
      )}
    </main>
  );
}
