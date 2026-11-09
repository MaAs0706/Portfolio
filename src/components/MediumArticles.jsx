
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMediumArticles } from "../hooks/useMediumArticles";

export default function MediumArticles() {
  const { articles, loading, error } = useMediumArticles();

  if (loading) {
    return (
      <div className="medium-status">
        Gathering thoughts from the archive...
      </div>
    );
  }

  if (error) {
    return (
      <div className="medium-status">
        Unable to load articles at the moment.
        <a
          href="https://medium.com/@aswanthmadhav07"
          target="_blank"
          rel="noreferrer"
        >
          Visit Medium instead ↗
        </a>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="medium-status">
        No published articles found yet.
      </div>
    );
  }

  return (
    <div className="medium-articles">
      {articles.map((article, index) => (
        <motion.article
          key={article.link}
          className="medium-article"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
        >
          {article.image && (
            <a
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="medium-article-image"
            >
              <img src={article.image} alt="" loading="lazy" />
            </a>
          )}

          <div className="medium-article-content">
            <span className="medium-article-date">
              {new Date(article.pubDate).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>

            <h3>{article.title}</h3>

            <p>{article.description}</p>

            <a
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="medium-read-link"
            >
              READ ARTICLE <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
