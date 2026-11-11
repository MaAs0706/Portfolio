
import React from "react";
import IntroPreview from "./components/intro/IntroPreview";
import nexusImage from "./assets/Nexus.png";
import prosperaImage from "./assets/prospera.png"
import atmosImage from "./assets/foss.png"
import accessImage from "./assets/access.png"
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Feather,
} from "lucide-react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import FieldNotes from "./pages/FieldNotes";
import WritingPage from "./pages/Writing";

/* --------------------------------
   PERSONAL INFORMATION
-------------------------------- */

const profile = {
  name: "Aswanth Madhav",
  location: "Kochi, India",
  github: "https://github.com/MaAs0706",
  linkedin: "https://www.linkedin.com/in/aswanth-madhav-323992322/",
  medium: "https://medium.com/@aswanthmadhav07",
  email: "hello@example.com", // Replace with your email
};

/* --------------------------------
   PROJECT DATA
-------------------------------- */

const projects = [
  {
    number: "01",
    name: "Prospera",
    category: "PRODUCT DEVELOPMENT · FOUNDER",
    description:
      "A lead-generation platform identifying businesses without websites. Validated through real-world usage, reaching 50+ prospects and helping close two paying customers.",
    tags: ["Python", "FastAPI", "Streamlit"],
    visual: "prospera",
    image: prosperaImage
      ,
    featured: true,
    link: profile.github,
  },
  {
  number: "02",
  name: "NEXUS",
  category: "FULL STACK · CAMPUS",
  description:
    "A campus event management platform with authentication, venue availability, approval workflows and role-specific dashboards.",
  tags: ["React", "FastAPI", "MySQL"],
  visual: "nexus",
  image: nexusImage,
  link: profile.github,
},
  {
    number: "03",
    name: "AccessLens",
    category: "AI · CIVIC TECHNOLOGY",
    description:
      "An accessibility reporting platform allowing citizens to report barriers and generate structured complaint text using an LLM.",
    tags: ["React", "Supabase", "Groq"],
    visual: "accesslens",
    image:
      accessImage,
    link: profile.github,
  },
  {
    number: "04",
    name: "AtmosTrack",
    category: "GEOSPATIAL · ENVIRONMENT",
    description:
      "A hyperlocal air-quality platform using monitoring data and spatial interpolation to estimate pollution exposure across Kerala.",
    tags: ["FastAPI", "React", "Leaflet"],
    visual: "atmos",
    image:
      atmosImage,
    link: profile.github,
  },
];

/* --------------------------------
   EXPERIENCE
-------------------------------- */

const experiences = [
  {
    year: "2026",
    role: "Chairperson",
    organisation: "MEC MUN Society",
    description:
      "Leading a student community, coordinating initiatives and creating opportunities for debate and diplomacy.",
    category: "LEADERSHIP",
  },
  {
    year: "2026",
    role: "Campus Director",
    organisation: "Millennium Fellowship",
    description:
      "Supporting student-led initiatives focused on meaningful social impact and community development.",
    category: "COMMUNITY",
  },
  {
    year: "2026",
    role: "Hackathon Mentor",
    organisation: "TinkerHack 4.0",
    description:
      "Helping participants navigate ideas, technical challenges and the process of building projects.",
    category: "MENTORSHIP",
  },
  {
    year: "2026",
    role: "Hackathon Mentor",
    organisation: "Useless Project 3.0",
    description:
      "Helping participants navigate ideas, technical challenges and the process of building projects.",
    category: "MENTORSHIP",
  },
  {
    year: "2026",
    role: "Hackathon Mentor",
    organisation: "MEC LABS 2026",
    description:
      "Helping participants navigate ideas, technical challenges and the process of building projects.",
    category: "MENTORSHIP",
  },
  {
    year: "2025",
    role: "Events Head",
    organisation: "MEC MUN Society",
    description:
      "Leading a student community, coordinating initiatives and creating opportunities for debate and diplomacy.",
    category: "LEADERSHIP",
  },
  {
    year: "2025",
    role: "Event Host",
    organisation: "TEDxMEC",
    description:
      "Taking the stage to help ideas, speakers and stories find their audience.",
    category: "PUBLIC SPEAKING",
  },
];

/* --------------------------------
   ANIMATION
-------------------------------- */

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* --------------------------------
   SMALL COMPONENTS
-------------------------------- */

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <i />
      {children}
    </div>
  );
}

/* --------------------------------
   HERO
-------------------------------- */

function Hero() {
  return (
    <section className="hero editorial-layout" id="home">
      <motion.div
        className="intro-panel"
        initial="hidden"
        animate="visible"
        variants={reveal}
      >
        <div className="panel-top">
          <span>01 — INTRODUCTION</span>
          <span>{profile.location.toUpperCase()}</span>
        </div>

        <div className="intro-main">
          <span className="micro-label">
            ENGINEER / BUILDER / WRITER
          </span>

          <h1>
            A mind that
            <br />
            builds. A heart
            <br />
            that <em>writes.</em>
          </h1>

          <p className="intro-description">
            I'm Aswanth Madhav — a computer science student,
            builder and storyteller. I build products, explore
            technology and occasionally try to make sense of
            the world through words.
          </p>

          <div className="hero-actions">
            <a href="#work" className="discover-link">
              EXPLORE MY WORK <ArrowRight size={14} />
            </a>

            <a href="#about" className="secondary-link">
              GET TO KNOW ME ↗
            </a>
          </div>
        </div>

        <div className="intro-bottom">
          <span>COMPUTER SCIENCE</span>
          <span>CLASS OF 2028</span>
        </div>
      </motion.div>

      <motion.aside
        className="about-panel"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        id="about"
      >
        <div className="panel-top">
          <span>02 — A PERSONAL NOTE</span>
          <span>EST. 2006</span>
        </div>

        <div className="about-grid">
          <div>
            <span className="micro-label">
              THE PERSON BEHIND THE WORK
            </span>

            <h2>
              Aswanth
              <br />
              Madhav<span>.</span>
            </h2>

            <p className="about-role">
              Student
              <br />
              Developer
              <br />
              Storyteller
            </p>
          </div>

          <div className="about-copy">
            <p>
              A computer science student at Model Engineering
              College, Kochi, interested in technology, AI,
              entrepreneurship and building products.
            </p>

            <p>
              Beyond the screen, I write poetry, organise
              communities and explore ideas that don't always
              have a technical explanation.
            </p>

            <p>
              Somewhere between logic and imagination,
              I'm figuring things out.
            </p>
          </div>
        </div>

        <div className="about-bottom">
          <span>CURIOUS BY NATURE.</span>
          <span>ALWAYS IN PROGRESS.</span>
        </div>
      </motion.aside>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={13} />
      </div>
    </section>
  );
}

/* --------------------------------
   PROJECT GALLERY
-------------------------------- */

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className={`editorial-project-card ${
        project.featured ? "featured-project" : ""
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={reveal}
      transition={{ delay: index * 0.08 }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className={`project-image-link visual-${project.visual}`}
        aria-label={`View ${project.name} on GitHub`}
      >
        <img
          src={project.image}
          alt={`${project.name} visual`}
          loading="lazy"
        />

        <div className="visual-overlay" />

        <span className="visual-number">
          {project.number} / 04
        </span>

        <span className="visual-category">
          {project.category}
        </span>

        <h3>{project.name}</h3>

        <span className="visual-arrow">
          <ArrowUpRight size={18} />
        </span>
      </a>

      <div className="editorial-project-info">
        <p>{project.description}</p>

        <div className="editorial-project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function Portfolio() {
  return (
    <section className="portfolio-section section-shell" id="work">
      <div className="panel-top">
        <span>03 — SELECTED WORK</span>
        <span>AN INDEX OF IDEAS</span>
      </div>

      <div className="portfolio-heading">
        <div>
          <span className="micro-label">
            A COLLECTION OF BUILT THINGS
          </span>
          <h2>
            Portfolio<span>.</span>
          </h2>
        </div>

        <span className="work-count">04 / PROJECTS</span>
      </div>

      <div className="filter-line">
        <span>SELECTED PROJECTS</span>
        <span>ENGINEERING · EXPERIMENTS · IDEAS</span>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
          />
        ))}
      </div>

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="all-projects"
      >
        MORE FROM THE WORKSHOP
        <ArrowUpRight size={14} />
      </a>
    </section>
  );
}

/* --------------------------------
   EXPERIENCE
-------------------------------- */

function Experience() {
  return (
    <section
      className="experience-section section-shell"
      id="experience"
    >
      <SectionLabel number="04">
        FOOTNOTES & FIELDWORK
      </SectionLabel>

      <div className="experience-heading">
        <h2>
          Rooms I've
          <br />
          been <em>part of.</em>
        </h2>

        <p>
          Not everything worth learning happens
          outside a classroom.
        </p>
      </div>

      <div className="experience-list">
        {experiences.map((item, index) => (
          <motion.article
            key={`${item.organisation}-${item.year}-${index}`}
            className="experience-row"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="experience-year">
              {item.year}
            </span>

            <div className="experience-detail">
              <h3>{item.role}</h3>
              <span>{item.organisation}</span>
              <p>{item.description}</p>
            </div>

            <span className="experience-category">
              {item.category}
            </span>

            <ArrowUpRight size={15} />
          </motion.article>
        ))}
      </div>

      <div className="achievement-note">
        <span>ALSO IN THE MARGINS</span>
        <p>
          Athletics · 100m Sprint Silver · 400m Relay Silver
        </p>
      </div>
    </section>
  );
}

/* --------------------------------
   HOMEPAGE WRITING TEASER
-------------------------------- */

function Writing() {
  return (
    <section
      className="writing-section section-shell"
      id="writing"
    >
      <div className="panel-top">
        <span>05 — OUTSIDE THE FRAME</span>
        <span>THE WRITER'S DESK</span>
      </div>

      <div className="writing-layout">
        <div className="writing-heading">
          <span className="micro-label">
            NOT EVERYTHING FITS IN CODE
          </span>

          <h2>
            Some things
            <br />
            are better
            <br />
            <em>written.</em>
          </h2>

          <Feather
            className="writing-feather"
            size={32}
            strokeWidth={1}
          />
        </div>

        <div className="writing-content">
          <span className="writing-index">
            NOTES FROM THE MARGINS
          </span>

          <p className="writing-lead">
            There are thoughts that never quite find
            their way into conversation.
          </p>

          <p>
            Poetry, fragments, little stories and the
            occasional line that refuses to leave my head.
            Writing has always been another way for me to
            understand the world.
          </p>

          <p>
            This corner is reserved for the things I write,
            the thoughts I keep, and the words I'm still
            trying to get right.
          </p>

          <a
            href="/writing"
            className="writing-link"
          >
            EXPLORE THE WRITER'S DESK
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <div className="literary-quote">
        <span>AN EXCERPT FROM AN UNFINISHED THOUGHT</span>
        <blockquote>
          "There are things we build with our hands,
          <br />
          and things we build by finding the words."
        </blockquote>
      </div>
    </section>
  );
}

/* --------------------------------
   CONTACT / FOOTER
-------------------------------- */

function Footer() {
  return (
    <footer
      className="contact-section section-shell"
      id="contact"
    >
      <div className="panel-top">
        <span>06 — THE END / THE BEGINNING</span>
        <span>GET IN TOUCH</span>
      </div>

      <div className="footer-content">
        <div>
          <span className="micro-label">
            EVERY STORY BEGINS SOMEWHERE
          </span>

          <h2>
            Let's make
            <br />
            something <em>matter.</em>
          </h2>
        </div>

        <div className="contact-right">
          <p>
            Have an interesting problem, an idea worth
            exploring, or simply want to talk about things
            being made? My inbox is open.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="contact-link"
          >
            START A CONVERSATION
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <a href="/" className="brand">
          AM<span>.</span>
        </a>

        <span>MADE WITH CURIOSITY & INTENT.</span>

        <div className="socials">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>

          <a
            href={profile.medium}
            target="_blank"
            rel="noreferrer"
            aria-label="Medium"
          >
            <Feather />
          </a>

          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
          >
            <Mail />
          </a>
        </div>

        <a href="/" className="back-to-top">
          BACK TO TOP ↑
        </a>
      </div>

      <div className="footer-colophon">
        <span>ASWANTH MADHAV</span>
        <span>AN ONGOING BODY OF WORK · 2026</span>
      </div>
    </footer>
  );
}

/* --------------------------------
   PAGE COMPONENTS
-------------------------------- */

function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Experience />
      <Writing />
      <Footer />
    </>
  );
}

/* --------------------------------
   MAIN APPLICATION
-------------------------------- */

export default function App() {
  return (
    <main className="site">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/work"
          element={
            <>
              <Portfolio />
              <Footer />
            </>
          }
        />

        <Route
          path="/field-notes"
          element={
            <>
              <FieldNotes />
              <Footer />
            </>
          }
        />

        <Route
          path="/writing"
          element={
            <>
              <WritingPage />
              <Footer />
            </>
          }
        />

        {/* Temporary 3D environment preview */}
        <Route
          path="/intro-preview"
          element={<IntroPreview />}
        />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </main>
  );
}
