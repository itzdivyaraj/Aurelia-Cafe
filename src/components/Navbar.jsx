import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { useScrollPosition } from '../hooks/useScrollPosition';

function BrandMark({ isLight }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <rect
        width="36"
        height="36"
        rx="10"
        className={isLight ? 'fill-[#FFFDF9]/15 stroke-[#FFFDF9]/30' : 'fill-[#241A16]'}
        strokeWidth={isLight ? '1' : '0'}
      />
      <path
        d="M11 16h11.5v6.5a5.75 5.75 0 0 1-11.5 0V16Zm11.5 1.75h2.25a2.25 2.25 0 0 1 0 4.5H22.5v-4.5Z"
        stroke="#B66A45"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 11.5c0-1.2 1.2-1.8 1.2-3m4 3c0-1.2 1.2-1.8 1.2-3"
        stroke="#D6926F"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const { business, navigation, sections } = useSiteConfig();
  const isScrolled = useScrollPosition(40);
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleLinks = navigation.links.filter((link) => {
    if (!link.sectionKey) return true;
    return sections[link.sectionKey]?.enabled !== false;
  });

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const showLightText = !isScrolled && !mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled || mobileOpen
          ? 'border-b border-[#2C211B]/10 bg-[#F8F3EA]/95 shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-b from-[#1A120E]/65 via-[#1A120E]/30 to-transparent'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none"
        >
          {business.logoUrl ? (
            <img
              src={business.logoUrl}
              alt={`${business.name} logo`}
              className="h-9 w-9 rounded-lg object-cover"
            />
          ) : (
            <BrandMark isLight={showLightText} />
          )}
          <div className="flex flex-col">
            <span
              className={`font-serif text-lg font-semibold tracking-tight transition-colors sm:text-xl ${
                showLightText ? 'text-[#FFFDF9]' : 'text-[var(--color-text-primary)]'
              }`}
            >
              {business.shortName || business.name}
            </span>
            {business.logoSubtext && (
              <span
                className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors ${
                  showLightText ? 'text-[#E7DDD3]' : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {business.logoSubtext}
              </span>
            )}
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          <ul className="flex items-center gap-6">
            {visibleLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-[var(--color-accent)] ${
                    showLightText ? 'text-[#F8F3EA]/90' : 'text-[var(--color-text-primary)]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {sections.enquiry?.enabled !== false && (
            <a
              href={navigation.ctaHref || '#enquiry'}
              onClick={(e) => handleNavClick(e, navigation.ctaHref || '#enquiry')}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[#FFFDF9] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)]"
            >
              {navigation.ctaLabel || 'Book a Table'}
            </a>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-panel"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
            showLightText
              ? 'text-[#FFFDF9] hover:bg-[#FFFDF9]/15'
              : 'text-[var(--color-text-primary)] hover:bg-[#2C211B]/8'
          }`}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile navigation drawer */}
      <div
        id="mobile-navigation-panel"
        aria-hidden={!mobileOpen}
        className={`overflow-hidden border-t border-[#2C211B]/10 bg-[#F8F3EA] transition-[max-height,opacity] duration-200 lg:hidden ${
          mobileOpen
            ? 'visible max-h-[30rem] opacity-100'
            : 'pointer-events-none invisible max-h-0 border-t-0 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pt-3 pb-6 sm:px-6">
          {visibleLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={mobileOpen ? 0 : -1}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-xl px-4 py-3 text-base font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[#2C211B]/5 hover:text-[var(--color-accent)]"
            >
              {link.label}
            </a>
          ))}

          {sections.enquiry?.enabled !== false && (
            <div className="mt-3 pt-2">
              <a
                href={navigation.ctaHref || '#enquiry'}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={(e) => handleNavClick(e, navigation.ctaHref || '#enquiry')}
                className="flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-base font-semibold text-[#FFFDF9] shadow-sm transition-colors hover:bg-[var(--color-accent-hover)]"
              >
                {navigation.ctaLabel || 'Book a Table'}
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
