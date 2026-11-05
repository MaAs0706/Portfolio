import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  { rune: 'I', title: 'Prospera', type: 'A tool for finding the right door', body: 'A lead-generation tool that finds local businesses without websites, then helps freelance designers focus on the ones worth reaching out to.', stack: 'FastAPI · React · Maps API · PostgreSQL', href: 'https://maps-scrapper-hjwgmxj6crp4uueis8nrgi.streamlit.app', live: true },
  { rune: 'II', title: 'CV Roaster', type: 'A small machine for honest feedback', body: 'Upload a résumé and get direct, specific feedback. Built in one evening to learn what it takes to make an AI feature actually useful.', stack: 'Python · Streamlit · Llama 3.3 · Groq', href: 'https://cv-roaster.streamlit.app/', live: true },
  { rune: 'III', title: 'Chat with Notes', type: 'A way to ask your archive questions', body: 'A RAG experiment that lets a PDF answer in plain language, bringing the relevant parts of a long document closer.', stack: 'Python · ChromaDB · SentenceTransformers · Groq', href: 'https://github.com/MaAs0706/Chat_with_Notes' },
  { rune: 'IV', title: 'AtmosTrack', type: 'A map for what the air remembers', body: 'A hyperlocal air-quality platform using real-time interpolation. Built with a three-person team for FossHack.', stack: 'FastAPI · React · Leaflet.js · WAQI API', href: 'https://github.com/MaAs0706/AtmosTrack' },
]

function App() {
  const [active, setActive] = useState(0)
  const [lantern, setLantern] = useState({ x: 68, y: 31 })
  const project = projects[active]

  useEffect(() => {
    const move = event => setLantern({ x: Math.round((event.clientX / window.innerWidth) * 100), y: Math.round((event.clientY / window.innerHeight) * 100) })
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return <main style={{ '--lantern-x': `${lantern.x}%`, '--lantern-y': `${lantern.y}%` }}>
    <nav className="nav"><a className="sigil" href="#top" aria-label="Back to top">AM<span>✦</span></a><div><a href="#codex">Codex</a><a href="#about">About</a><a href="#contact">Contact</a></div></nav>
    <header className="hero" id="top"><div className="stars" aria-hidden="true" /><p className="chapter">Portfolio of<br />Aswanth Madhav</p><div className="hero-copy"><p className="eyebrow">Volume one · Kochi, India</p><h1>Builds for<br /><em>the curious.</em></h1><p className="hero-note">Computer science student, product builder, and collector of questions worth turning into software.</p><a className="summon" href="#codex">Open the codex <span>↓</span></a></div><p className="hero-side">Scroll slowly<br />The story unfolds</p></header>
    <section className="prologue" id="about"><p className="eyebrow">A brief prologue</p><div><h2>Some things are learned in books.<br /><em>The rest, by making.</em></h2><p>I’m a second-year CS student at Model Engineering College. I got tired of holding ideas in my head, so I started giving them a shape: tools, experiments, rough first versions, and better second ones.</p></div></section>
    <section className="codex" id="codex"><div className="codex-heading"><p className="eyebrow">The working codex</p><h2>Four things<br />I’ve set in motion.</h2></div><div className="codex-layout"><div className="rune-list" role="tablist" aria-label="Project chapters">{projects.map((item, index) => <button key={item.title} className={index === active ? 'active' : ''} onClick={() => setActive(index)} role="tab" aria-selected={index === active}><span>{item.rune}</span>{item.title}<i>↗</i></button>)}</div><article className="relic" key={project.title} role="tabpanel"><div className="relic-mark"><span>{project.rune}</span><i>{project.live ? '✦' : '✧'}</i></div><p className="eyebrow">{project.type}</p><h3>{project.title}</h3><p>{project.body}</p><small>{project.stack}</small><a href={project.href} target="_blank" rel="noreferrer">{project.live ? 'Enter the project' : 'Read the source'} <span>↗</span></a></article></div></section>
    <section className="ledger"><p className="eyebrow">The ledger, as of now</p><div className="ledger-grid"><p><b>02</b><span>Years of<br />computer science</span></p><p><b>7.87</b><span>Current<br />CGPA</span></p><p><b>∞</b><span>Questions<br />left to follow</span></p></div></section>
    <section className="now" id="now"><p className="eyebrow">Current chapter</p><div><h2>Learning how to make technology feel <em>less distant.</em></h2><p>I’m rebuilding NEXUS, a campus event system where the difficult part is not the code—it’s understanding the people and workflows behind it. I’m also looking for an internship where I can contribute from day one.</p></div></section>
    <section className="contact" id="contact"><p className="eyebrow">Leave a message by the fire</p><h2>Have a project,<br />an idea, or a<br /><em>problem to solve?</em></h2><a className="email" href="mailto:aswanthmadhav07@gmail.com">aswanthmadhav07@gmail.com ↗</a><footer><a href="https://github.com/MaAs0706" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/aswanth-madhav-323992322" target="_blank" rel="noreferrer">LinkedIn</a><span>© 2026 · AM</span></footer></section>
  </main>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
