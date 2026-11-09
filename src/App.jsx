
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const projects = [
  {
    number: "01",
    name: "Niva",
    category: "PERSONAL SAFETY",
    description: "A silent safety companion.",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900",
    tags: "KOTLIN · ANDROID",
  },
  {
    number: "02",
    name: "Forge",
    category: "ARTIFICIAL INTELLIGENCE",
    description: "An AI mentor for ideas taking shape.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900",
    tags: "REACT · FASTAPI · AI",
  },
  {
    number: "03",
    name: "NEXUS",
    category: "CAMPUS TECHNOLOGY",
    description: "A better way to bring campus events together.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",
    tags: "REACT · MYSQL",
  },
  {
    number: "04",
    name: "AtmosTrack",
    category: "ENVIRONMENTAL DATA",
    description: "Making environmental data meaningful.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900",
    tags: "PYTHON · DATA",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function ProjectCard({ project, index }) {
  return (
    <motion.a
      href="https://github.com/MaAs0706"
      target="_blank"
      rel="noreferrer"
      className="project-card"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div className="project-image">
        <img src={project.image} alt="" loading="lazy" />
        <span className="project-number">{project.number}</span>
        <span className="project-open"><ArrowUpRight size={17}/></span>
      </div>

      <div className="project-info">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.tags}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
    </motion.a>
  );
}

function Header() {
  return (
    <header className="header">
      <a href="#home" className="brand">Aswanth Madhav <span>/ AM</span></a>

      <nav>
        <a href="#about">ABOUT</a>
        <a href="#work">WORK</a>
        <a href="#writing">WRITING</a>
        <a href="#contact">CONTACT</a>
      </nav>

      <span className="header-index">PORTFOLIO — 2026</span>
    </header>
  );
}

function Introduction() {
  return (
    <section className="intro-panel" id="home">
      <div className="intro-top">
        <span>01 — INTRODUCTION</span>
        <span>KOCHI, INDIA</span>
      </div>

      <div className="intro-main">
        <span className="micro-label">ENGINEER / BUILDER / WRITER</span>

        <h1>
          Color in
          <br />
          the <em>Dark.</em>
        </h1>

        <p className="intro-description">
          I build things with technology, explore ideas
          with curiosity, and write about the things
          that words sometimes struggle to explain.
        </p>

        <a href="#work" className="discover-link">
          DISCOVER MY WORK <ArrowDownIcon />
        </a>
      </div>

      <div className="intro-bottom">
        <span>COMPUTER SCIENCE UNDERGRADUATE</span>
        <span>MODEL ENGINEERING COLLEGE</span>
      </div>
    </section>
  );
}

function ArrowDownIcon() {
  return <ArrowRight size={14} />;
}

function AboutPanel() {
  return (
    <section className="about-panel" id="about">
      <div className="panel-top">
        <span>02 — THE AUTHOR</span>
        <span>ABOUT ME</span>
      </div>

      <div className="about-grid">
        <div>
          <span className="micro-label">A LITTLE CONTEXT</span>
          <h2>Aswanth<br />Madhav<span>.</span></h2>
          <p className="about-role">Student · Developer · Storyteller</p>
        </div>

        <div className="about-copy">
          <p>
            A computer science student at Model Engineering
            College, Kochi, interested in technology, AI,
            entrepreneurship and building products.
          </p>
          <p>
            Beyond code, I find myself writing poetry,
            organising communities and exploring ideas
            that don't always have a technical explanation.
          </p>
        </div>
      </div>

      <div className="about-bottom">
        <span>CURIOUS BY NATURE.</span>
        <span>ALWAYS IN PROGRESS.</span>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="portfolio-section" id="work">
      <div className="portfolio-heading">
        <div>
          <span className="micro-label">03 — SELECTED WORK</span>
          <h2>Portfolio<span>.</span></h2>
        </div>

        <span className="work-count">04 / PROJECTS</span>
      </div>

      <div className="filter-line">
        <span>ALL PROJECTS</span>
        <span>ENGINEERING · EXPERIMENTS · IDEAS</span>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index}/>
        ))}
      </div>

      <a
        href="https://github.com/MaAs0706"
        target="_blank"
        rel="noreferrer"
        className="all-projects"
      >
        MORE FROM THE WORKSHOP <ArrowUpRight size={14}/>
      </a>
    </section>
  );
}

function Experience() {
  const items = [
    ["2026", "Events Head", "MEC MUN"],
    ["2026", "Campus Director", "Millennium Fellowship"],
    ["2025", "Host", "TEDxMEC"],
  ];

  return (
    <section className="experience-section" id="experience">
      <div className="panel-top">
        <span>04 — EXPERIENCE</span>
        <span>SELECTED FOOTNOTES</span>
      </div>

      <h2>Rooms I've<br/><em>been part of.</em></h2>

      <div className="experience-list">
        {items.map(([year, role, place]) => (
          <div className="experience-row" key={place}>
            <span>{year}</span>
            <strong>{role}</strong>
            <span>{place}</span>
            <ArrowUpRight size={14}/>
          </div>
        ))}
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section className="writing-section" id="writing">
      <div className="panel-top">
        <span>05 — OUTSIDE THE FRAME</span>
        <span>THE WRITER'S DESK</span>
      </div>

      <div className="writing-content">
        <div>
          <span className="micro-label">NOT EVERYTHING FITS IN CODE</span>
          <h2>Some things<br/>are better <em>written.</em></h2>
        </div>

        <div className="writing-description">
          <p>
            Poetry, fragments, stories and thoughts
            I've collected along the way.
          </p>
          <p>
            A little corner for the things I create
            when I'm not building something.
          </p>
          <span>WORDS I'VE KEPT — A COLLECTION IN PROGRESS</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact">
      <div className="panel-top">
        <span>06 — THE END / THE BEGINNING</span>
        <span>GET IN TOUCH</span>
      </div>

      <div className="footer-content">
        <h2>Let's make<br/>something <em>matter.</em></h2>

        <a href="mailto:hello@example.com" className="contact-link">
          START A CONVERSATION <ArrowUpRight size={16}/>
        </a>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ASWANTH MADHAV</span>

        <div className="socials">
          <a href="https://github.com/MaAs0706" target="_blank" rel="noreferrer"><Github/></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin/></a>
          <a href="mailto:hello@example.com"><Mail/></a>
        </div>

        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="site">
      <Header/>

      <div className="editorial-layout">
        <Introduction/>
        <AboutPanel/>
      </div>

      <Portfolio/>
      <Experience/>
      <Writing/>
      <Footer/>
    </main>
  );
}
