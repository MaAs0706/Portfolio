import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, Play } from "lucide-react";

const navItems = [
  { label: "HOME", to: "/" },
  { label: "WORK", to: "/work" },
  { label: "FIELD NOTES", to: "/field-notes" },
  { label: "WRITING", to: "/writing" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="header">
        <Link className="brand" to="/" aria-label="Aswanth Madhav home">
          Aswanth Madhav<span> / PORTFOLIO</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="replay-intro-link" to="/intro-preview">
            <Play size={11} strokeWidth={1.7} />
            <span>REPLAY INTRO</span>
          </Link>
          <Link className="nav-contact" to="/#contact">
            LET'S TALK <ArrowUpRight size={12} />
          </Link>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          <span className="mobile-menu-kicker">NAVIGATION / 2026</span>
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-menu-number">0{index + 1}</span>
              <span>{item.label}</span>
              <ArrowUpRight size={17} />
            </NavLink>
          ))}
          <Link
            className="mobile-replay-intro"
            to="/intro-preview"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            <Play size={14} />
            <span>REPLAY THE INTRODUCTION</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link
            className="mobile-menu-contact"
            to="/#contact"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            LET'S TALK <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
