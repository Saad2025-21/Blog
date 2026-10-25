import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Find", path: "/search" },
  { label: "Blog", path: "/blogs" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const profile = JSON.parse(localStorage.getItem("user"));
  
  const {user} = useSelector(store => store.auth)
  console.log(user)
  return (
    <header className="editorial-nav w-full">
      <div className="editorial-header-inner">
        <div className="editorial-publication">
          <div className="publication-side">
            <span>Special edition</span>
            <span>Nature · Science · Ideas</span>
          </div>
          <div className="publication-title">
            <span className="publication-est">EST. 2024</span>
            <h1>
              <a href="/">The Nature Ledger</a>
            </h1>
            <p>Curious minds. A closer look at the living world.</p>
          </div>
          <div className="publication-side publication-date">
            <span>THE DAILY EDITION</span>
            <span>
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="editorial-nav-row">
          <nav className="editorial-nav-links hidden md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.path}
                className="editorial-nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {profile ? (
            <div className="editorial-auth-links hidden md:flex">
              <a href="/login" className="editorial-nav-link">
                hi
              </a>
              <a href="/signup" className="editorial-signup">
                hi
              </a>
            </div>
          ) : (
            <div className="editorial-auth-links hidden md:flex">
              <a href="/login" className="editorial-nav-link">
                Log in
              </a>
              <a href="/signup" className="editorial-signup">
                Sign up
              </a>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="editorial-menu-toggle md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="editorial-mobile-menu md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="editorial-mobile-link"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="editorial-mobile-actions">
            <a
              href="#login"
              onClick={() => setIsOpen(false)}
              className="editorial-mobile-link"
            >
              Log in
            </a>
            <a
              href="#signup"
              onClick={() => setIsOpen(false)}
              className="editorial-mobile-signup"
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
