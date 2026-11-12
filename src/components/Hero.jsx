import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Hero() {
  const { hero, contact, hours } = useSiteConfig();

  const scrollToTarget = (e, selector) => {
    if (!selector.startsWith('#')) return;
    const el = document.querySelector(selector);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Welcome"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-[var(--color-dark-surface)] pt-20 pb-14 sm:min-h-screen sm:pt-24 sm:pb-16"
    >
      {/* Background photography */}
      <div className="absolute inset-0">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#1A120E]/88 via-[#1A120E]/65 to-[#1A120E]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1A120E]/75 via-transparent to-[#1A120E]/30"
        />
      </div>

      {/* Foreground editorial content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="hero-animate mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFFDF9]/20 bg-[#241A16]/50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.24em] text-[#E6B89C] uppercase backdrop-blur-xs">
            {hero.eyebrow}
          </p>

          <h1 className="hero-animate-delay-1 font-serif text-4xl leading-[1.1] font-semibold text-[#FFFDF9] sm:text-5xl md:text-6xl lg:text-[4rem]">
            {hero.headline}
          </h1>

          <p className="hero-animate-delay-2 mt-6 max-w-xl text-base leading-relaxed text-[#EDE3D8] sm:text-lg">
            {hero.description}
          </p>

          <div className="hero-animate-delay-3 mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <a
              href={hero.primaryCtaHref || '#menu'}
              onClick={(e) => scrollToTarget(e, hero.primaryCtaHref || '#menu')}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)] sm:text-base"
            >
              <span>{hero.primaryCtaLabel || 'Explore Our Menu'}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href={hero.secondaryCtaHref || '#contact'}
              onClick={(e) => scrollToTarget(e, hero.secondaryCtaHref || '#contact')}
              className="inline-flex items-center justify-center rounded-full border border-[#FFFDF9]/40 bg-[#FFFDF9]/10 px-7 py-3.5 text-sm font-semibold text-[#FFFDF9] backdrop-blur-xs transition-all duration-200 hover:border-[#FFFDF9]/75 hover:bg-[#FFFDF9]/20 sm:text-base"
            >
              {hero.secondaryCtaLabel || 'Find Our Café'}
            </a>
          </div>

          {/* Quick Hospitality Details */}
          <div className="hero-animate-delay-3 mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#FFFDF9]/15 pt-6 text-xs text-[#E3D8CD] sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#D6926F]" aria-hidden="true" />
              <span>{hours.summary}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#D6926F]" aria-hidden="true" />
              <span>{contact.shortAddress}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
