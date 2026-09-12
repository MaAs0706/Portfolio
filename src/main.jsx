import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LightRays from './LightRays'
import './styles.css'

const projects = [
  { id: '01', name: 'Prospera', kind: 'Lead generation tool', desc: 'Finds businesses without a website and helps freelance designers focus on leads with a real reason to talk.', tags: 'FastAPI · React · Google Maps API · PostgreSQL', link: 'https://maps-scrapper-hjwgmxj6crp4uueis8nrgi.streamlit.app', live: true },
  { id: '02', name: 'CV Roaster', kind: 'AI feedback tool', desc: 'Upload a résumé and get direct, useful feedback. Built in an evening to learn what an AI feature feels like when it earns its place.', tags: 'Python · Streamlit · Llama 3.3 · Groq API', link: 'https://cv-roaster.streamlit.app/', live: true },
  { id: '03', name: 'Chat with Notes', kind: 'RAG experiment', desc: 'A way to query PDFs with ordinary language, using retrieval to bring the relevant passages closer.', tags: 'Python · ChromaDB · SentenceTransformers · Groq API', link: 'https://github.com/MaAs0706/Chat_with_Notes' },
  { id: '04', name: 'AtmosTrack', kind: 'FossHack project', desc: 'A hyperlocal air-quality map made with a three-person team, using IDW interpolation to make scattered readings easier to understand.', tags: 'FastAPI · React · Leaflet.js · WAQI API', link: 'https://github.com/MaAs0706/AtmosTrack' },
]

function App() {
  return <main>
    <nav><a className="mark" href="#top">AM<span>.</span></a><div><a href="#work">Work</a><a href="#now">Now</a><a href="#contact">Contact ↗</a></div></nav>
    <section className="hero" id="top">
      <LightRays />
      <p className="eyebrow">Aswanth Madhav / Kochi, India</p>
      <div className="hero-copy"><h1>Builder.<br /><i>Reader.</i><br />Writer.</h1><p>I’m a CS student at Model Engineering College. I build software to learn how things work, and write to make sense of what I find.</p></div>
      <div className="hero-footer"><span>Independent work<br />2025—26</span><a href="#work">Scroll for projects <b>↓</b></a></div>
    </section>
    <section className="intro"><p className="eyebrow">A quick note</p><p className="big-copy">I’m interested in technology that <i>does something clear</i> for somebody. The kind with a useful beginning, an honest constraint, and a person on the other side of it.</p></section>
    <section className="work" id="work"><div className="section-title"><p className="eyebrow">Selected work</p><h2>Built from<br /><i>questions.</i></h2></div><div className="project-list">{projects.map(project => <a className="project" href={project.link} target="_blank" rel="noreferrer" key={project.id}><span className="project-id">{project.id}</span><div><p className="project-kind">{project.kind}{project.live ? ' · Live' : ''}</p><h3>{project.name}</h3><p className="project-desc">{project.desc}</p><p className="project-tags">{project.tags}</p></div><span className="project-arrow">↗</span></a>)}</div></section>
    <section className="now" id="now"><p className="eyebrow">Currently</p><div className="now-layout"><h2>Learning how to<br />make useful things<br /><i>with AI.</i></h2><div className="now-notes"><p>I’m rebuilding NEXUS, an event management platform for Model Engineering College. It has the messy part I like: real people, permissions, workflows, and consequences.</p><p>I’m also looking for an internship where I can contribute early and learn from people with high standards.</p><span>CS / Year 2 / CGPA 7.87</span></div></div></section>
    <section className="contact" id="contact"><p className="eyebrow">Open to a good conversation</p><h2>If you’re building<br />something worth<br /><i>caring about, say hello.</i></h2><a className="email" href="mailto:aswanthmadhav07@gmail.com">aswanthmadhav07@gmail.com ↗</a><footer><a href="https://github.com/MaAs0706" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/aswanth-madhav-323992322" target="_blank" rel="noreferrer">LinkedIn</a><span>© 2026</span></footer></section>
  </main>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
