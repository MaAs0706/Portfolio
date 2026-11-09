
import { ArrowUpRight, Feather, BookOpen } from "lucide-react";
import MediumArticles from "../components/MediumArticles";

export default function Writing() {
  return (
    <main className="archive-page writing-page">

      {/* PAGE INTRO */}
      <div className="archive-intro">
        <span className="micro-label">
          AN INDEX OF WORDS · 02
        </span>

        <h1>
          The Writer's <em>Desk.</em>
        </h1>

        <p>
          Essays, poetry, fragments and thoughts that
          found their way onto a page.
        </p>
      </div>

      {/* INTRODUCTORY BANNER */}
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
          href="https://medium.com/@aswanthmadhav07"
          target="_blank"
          rel="noopener noreferrer"
        >
          MEDIUM <ArrowUpRight size={15} />
        </a>
      </div>

      {/* POETRY ARCHIVE */}
      <section className="poetry-archive-section">

        <div className="panel-top">
          <span>01 — POETRY</span>
          <span>WORDS THAT STAY</span>
        </div>

        <div className="poetry-archive-content">

          <div className="poetry-archive-heading">
            <span className="micro-label">
              A SEPARATE CORNER OF MY WORLD
            </span>

            <h2>
              Poetry<span>.</span>
            </h2>

            <p>
              Some feelings find their way into verses.
              Some memories become metaphors. And some
              things are easier to write than to say.
            </p>

            <a
              href="https://poetry.aswanth.me"
              target="_blank"
              rel="noopener noreferrer"
              className="writing-destination-link"
            >
              ENTER THE POETRY ARCHIVE
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="poetry-visual">
            <BookOpen
              size={75}
              strokeWidth={0.65}
            />

            <span>AN ARCHIVE OF VERSES</span>
            <span>POETRY.ASWANTH.ME</span>
          </div>

        </div>
      </section>

      {/* MEDIUM ARTICLES */}
      <section className="writing-archive">

        <div className="panel-top">
          <span>02 — ARTICLES & ESSAYS</span>
          <span>WORDS PUBLISHED</span>
        </div>

        <div className="medium-section-heading">
          <div>
            <span className="micro-label">
              THOUGHTS, IDEAS & OBSERVATIONS
            </span>

            <h2>
              Published <em>works.</em>
            </h2>
          </div>

          <a
            href="https://medium.com/@aswanthmadhav07"
            target="_blank"
            rel="noopener noreferrer"
            className="writing-destination-link"
          >
            VIEW MEDIUM
            <ArrowUpRight size={15} />
          </a>
        </div>

        <MediumArticles />

      </section>

    </main>
  );
}
