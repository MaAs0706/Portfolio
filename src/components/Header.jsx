
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { number: "01", label: "HOME", path: "/" },
  { number: "02", label: "WORK", path: "/work" },
  { number: "03", label: "FIELD NOTES", path: "/field-notes" },
  { number: "04", label: "WRITER'S DESK", path: "/writing" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling while the menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Allow Escape to close the menu.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="header">
        <Link to="/" className="brand">
          Aswanth Madhav <span>/ AM</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>HOME</NavLink>
          <NavLink to="/work">WORK</NavLink>
          <NavLink to="/field-notes">FIELD NOTES</NavLink>
          <NavLink to="/writing">WRITING</NavLink>
        </nav>

        <Link to="/#contact" className="nav-contact">
          LET'S TALK <ArrowUpRight size={13} />
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </header>

      {/* Mobile navigation overlay */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-menu-header">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            Aswanth Madhav <span>/ AM</span>
          </Link>

          <button
            className="mobile-menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={23} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mobile-menu-content">
          <span className="mobile-menu-label">NAVIGATION / 2026</span>

          <nav className="mobile-nav-links">
            {navigation.map((item) => (
              <NavLink
                key={item.number}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  isActive ? "mobile-nav-link active" : "mobile-nav-link"
                }
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-nav-number">{item.number}</span>
                <span className="mobile-nav-name">{item.label}</span>
                <ArrowUpRight className="mobile-nav-arrow" size={19} />
              </NavLink>
            ))}

            <Link
              to="/#contact"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-nav-number">05</span>
              <span className="mobile-nav-name">LET'S TALK</span>
              <ArrowUpRight className="mobile-nav-arrow" size={19} />
            </Link>
          </nav>
        </div>

        <div className="mobile-menu-footer">
          <span>KOCHI, INDIA</span>
          <span>BUILDING THINGS. KEEPING WORDS.</span>
        </div>
      </div>
    </>
  );
}
