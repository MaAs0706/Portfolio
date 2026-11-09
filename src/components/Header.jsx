
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="brand">
        Aswanth Madhav <span>/ AM</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/work">WORK</NavLink>
        <NavLink to="/field-notes">FIELD NOTES</NavLink>
        <NavLink to="/writing">WRITING</NavLink>
      </nav>

      <Link to="/#contact" className="nav-contact">
        LET'S TALK <ArrowUpRight size={13} />
      </Link>
    </header>
  );
}
