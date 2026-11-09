import React ,{ useCallback, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Github, Linkedin, Mail, Bookmark } from "lucide-react";

const projects = [
  {
    number: "01",
    name: "Niva",
    type: "Product concept · Personal safety",
    description:
      "A silent safety companion designed around trusted circles, route planning and thoughtful emergency escalation.",
    stack: ["Kotlin", "Android", "Maps"],
    link: "https://github.com/MaAs0706"
  },
  {
    number: "02",
    name: "Forge",
    type: "AI · Project mentorship",
    description:
      "An AI-powered project mentor that helps student teams validate ideas, plan roadmaps and move from concepts to execution.",
    stack: ["React", "FastAPI", "LLMs"],
    link: "https://github.com/MaAs0706"
  },
  {
    number: "03",
    name: "NEXUS",
    type: "Full-stack · Campus platform",
    description:
      "A campus event management platform with role-based access, approval workflows, venue booking and attendance tracking.",
    stack: ["React", "FastAPI", "MySQL"],
    link: "https://github.com/MaAs0706"
  },
  {
    number: "04",
    name: "AtmosTrack",
    type: "Data · Civic technology",
    description:
      "A hyperlocal air-quality decision system exploring how environmental data can become useful local insight.",
    stack: ["Python", "Data", "Visualisation"],
    link: "https://github.com/MaAs0706"
  }
];

const Page = ({ children, className = "" }, ref) => (
  <div className={`paper-page ${className}`} ref={ref}>
    <div className="paper-grain" />
    <div className="page-content">{children}</div>
  </div>
);
const BookPage = React.forwardRef(Page);

const Cover = React.forwardRef(function Cover({ back = false }, ref) {
  return (
    <div ref={ref} className={`book-cover ${back ? "book-cover-back" : ""}`}>
      <div className="cover-spine" />
      <div className="cover-border">
        {!back ? (
          <>
            <p className="cover-kicker">A PERSONAL COLLECTION</p>
            <div className="cover-rule" />
            <h1>Aswanth<br /><em>Madhav</em></h1>
            <p className="cover-subtitle">A life between lines</p>
            <div className="cover-ornament">✦</div>
            <p className="cover-edition">ENGINEER · BUILDER · STORYTELLER</p>
            <p className="cover-open">OPEN THE BOOK <span>↗</span></p>
          </>
        ) : (
          <>
            <div className="cover-ornament">✦</div>
            <p className="cover-back-quote">“There is still so much<br />left to write.”</p>
            <div className="cover-rule" />
            <p className="cover-edition">END OF THIS EDITION</p>
          </>
        )}
      </div>
    </div>
  );
});

const FolioPage = React.forwardRef(function FolioPage(
  { eyebrow, title, children, pageNo, className = "" },
  ref
) {
  return (
    <BookPage ref={ref} className={className}>
      <div className="page-heading">
        <span>{eyebrow}</span>
        <span className="page-heading-mark">✦</span>
      </div>
      <h2>{title}</h2>
      <div className="page-body">{children}</div>
      <div className="page-footer"><span>ASWANTH MADHAV</span><span>{pageNo}</span></div>
    </BookPage>
  );
});

function App() {
  const bookRef = useRef(null);
  const [page, setPage] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const next = useCallback(() => bookRef.current?.pageFlip()?.flipNext(), []);
  const prev = useCallback(() => bookRef.current?.pageFlip()?.flipPrev(), []);

  const onFlip = useCallback((event) => setPage(event.data), []);

  return (
    <main className="scene">
      <div className="ambient-glow" />
      <div className="lamp-glow" />
      <div className="dust dust-one" />
      <div className="dust dust-two" />

      <header className="topbar">
        <a className="wordmark" href="#top">AM<span>.</span></a>
        <div className="topbar-note"><span className="status-dot" /> AN OPEN BOOK, IN PROGRESS</div>
        <a className="skip-link" href="mailto:hello@example.com">SAY HELLO <ArrowRight size={13} /></a>
      </header>

      <section className="intro" id="top">
        <p className="overline">THE PERSONAL PORTFOLIO OF</p>
        <h2>Some stories are written.<br /><em>Others are built.</em></h2>
        <p className="intro-copy">A collection of things I have made, people I have met,<br className="desktop-break" /> and thoughts I have kept along the way.</p>
      </section>

      <section className="book-stage" aria-label="Interactive portfolio book">
        <div className="book-shadow" />
        <div className="book-wrap">
          <HTMLFlipBook
            ref={bookRef}
            width={390}
            height={540}
            size="stretch"
            minWidth={290}
            maxWidth={460}
            minHeight={410}
            maxHeight={620}
            maxShadowOpacity={0.48}
            showCover
            mobileScrollSupport
            drawShadow
            flippingTime={850}
            usePortrait
            startPage={0}
            onFlip={onFlip}
            onInit={() => setIsReady(true)}
            className="portfolio-book"
            style={{ margin: "0 auto" }}
          >
            <Cover />
            <FolioPage eyebrow="PROLOGUE" title={<>A little about<br /><em>the author.</em></>} pageNo="01">
              <p className="dropcap">I am Aswanth Madhav — a computer science student, builder and curious mind who finds joy in turning ideas into things people can use.</p>
              <p>I enjoy working at the intersection of technology, people and imagination. Some days that means writing code; other days, organising a room full of people around an idea, or trying to find the right words for a feeling.</p>
              <p className="handwritten">Still learning. Still becoming.</p>
            </FolioPage>
            <FolioPage eyebrow="CHAPTER I · THE CRAFT" title={<>Things I've<br /><em>built.</em></>} pageNo="02">
              <p className="chapter-intro">A few experiments, ideas and attempts to make something useful.</p>
              <div className="project-list">
                {projects.slice(0, 2).map((project) => (
                  <article className="project-entry" key={project.number}>
                    <span className="project-number">{project.number}</span>
                    <div>
                      <h3>{project.name}</h3>
                      <small>{project.type}</small>
                      <p>{project.description}</p>
                      <div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </article>
                ))}
              </div>
            </FolioPage>
            <FolioPage eyebrow="CHAPTER I · CONTINUED" title={<>More pages,<br /><em>more making.</em></>} pageNo="03">
              <div className="project-list">
                {projects.slice(2).map((project) => (
                  <article className="project-entry" key={project.number}>
                    <span className="project-number">{project.number}</span>
                    <div>
                      <h3>{project.name}</h3>
                      <small>{project.type}</small>
                      <p>{project.description}</p>
                      <div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </article>
                ))}
              </div>
              <a className="text-link" href="https://github.com/MaAs0706" target="_blank" rel="noreferrer">VISIT THE WORKSHOP <ArrowRight size={12} /></a>
            </FolioPage>
            <FolioPage eyebrow="CHAPTER II · IN COMPANY" title={<>Beyond the<br /><em>screen.</em></>} pageNo="04">
              <p className="dropcap">The best work rarely happens alone. Some of my most formative experiences have come from bringing people together, making decisions under pressure and helping ideas find their footing.</p>
              <div className="timeline">
                <div><span>2026</span><p><strong>Events Head</strong><br />MEC MUN — helping bring a student-led conference to life.</p></div>
                <div><span>2025</span><p><strong>TEDxMEC Host</strong><br />Taking the stage and helping ideas travel further.</p></div>
                <div><span>2026</span><p><strong>Campus Director</strong><br />Millennium Fellowship — supporting student impact initiatives.</p></div>
              </div>
            </FolioPage>
            <FolioPage eyebrow="CHAPTER III · BETWEEN THE LINES" title={<>The things<br /><em>I write.</em></>} pageNo="05">
              <p className="dropcap">Not everything I want to say belongs in a commit message. I write poetry, fragments and little stories — often trying to give language to things that are difficult to name.</p>
              <blockquote className="poem">“Somewhere between<br />what I meant to say<br />and what I left unsaid,<br />a whole little world<br />learned how to live.”</blockquote>
              <p className="poem-note">A small original fragment · from the notebook</p>
              <p>More writing will find its way onto these pages.</p>
            </FolioPage>
            <FolioPage eyebrow="THE LAST PAGE" title={<>Every story<br /><em>continues.</em></>} pageNo="06">
              <p className="dropcap">If something here made you curious, I'd be glad to hear from you. I'm always open to thoughtful conversations, interesting problems and good collaborations.</p>
              <div className="contact-list">
                <a href="mailto:hello@example.com"><Mail size={15} /> hello@example.com</a>
                <a href="https://github.com/MaAs0706" target="_blank" rel="noreferrer"><Github size={15} /> github.com/MaAs0706</a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
              </div>
              <p className="handwritten closing">Until the next chapter.</p>
            </FolioPage>
            <Cover back />
          </HTMLFlipBook>
        </div>
      </section>

      <nav className="book-controls" aria-label="Book controls">
        <button onClick={prev} disabled={page === 0} aria-label="Previous page"><ArrowLeft size={17} /></button>
        <div className="page-indicator"><Bookmark size={13} /><span>{String(Math.max(0, page)).padStart(2, "0")}</span><i>/</i><span>07</span></div>
        <button onClick={next} disabled={page >= 7} aria-label="Next page"><ArrowRight size={17} /></button>
      </nav>
      <p className="interaction-hint"><BookOpen size={13} /> TURN THE PAGE TO EXPLORE <span>·</span> USE THE ARROWS OR SWIPE</p>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} ASWANTH MADHAV</span>
        <span>MADE WITH CURIOSITY & A LITTLE INK</span>
      </footer>

      <AnimatePresence>
        {!isReady && (
          <motion.div className="loading-note" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Preparing the pages…
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
