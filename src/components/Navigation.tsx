import "./Navigation.scss";
import { useEffect, useState } from "react";

const NAV_ITEMS: [string, string][] = [
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(([, id]) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <button className="nav__brand" onClick={() => goTo("hero")}>
          AG
        </button>

        <nav className="nav__links" aria-label="Primary">
          {NAV_ITEMS.map(([label, id]) => (
            <button
              key={id}
              className={`nav__link ${active === id ? "is-active" : ""}`}
              onClick={() => goTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className={`nav__toggle ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__mobile ${menuOpen ? "is-open" : ""}`}>
        {NAV_ITEMS.map(([label, id]) => (
          <button key={id} onClick={() => goTo(id)}>
            {label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Navigation;
