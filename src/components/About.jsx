import { Coffee, Croissant, Leaf, Armchair } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const ICON_MAP = {
  coffee: Coffee,
  dessert: Croissant,
  leaf: Leaf,
  ambience: Armchair,
};

export default function About() {
  const { about } = useSiteConfig();

  return (
    <section
      id="story"
      aria-labelledby="about-heading"
      className="bg-[var(--color-bg-secondary)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Photography */}
          <Reveal className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-[#EAE1D5] shadow-md">
                <img
                  src={about.image}
                  alt={about.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>

              {about.badge && (
                <div className="mt-4 rounded-2xl border border-[#2C211B]/10 bg-[var(--color-bg-primary)] p-5 shadow-sm sm:absolute sm:-right-6 sm:bottom-8 sm:mt-0 sm:max-w-xs">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">
                    {about.badge.label}
                  </p>
                  <p className="mt-1 font-serif text-xl font-semibold text-[var(--color-text-primary)]">
                    {about.badge.value}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {about.badge.caption}
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Story & Philosophy */}
          <Reveal delay={100} className="lg:col-span-6">
            <div id="about-heading">
              <SectionHeader
                eyebrow={about.eyebrow}
                title={about.title}
                align="left"
              />
            </div>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-[1.05rem]">
              {about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* 4 Key Highlights */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {about.highlights.map((item) => {
                const Icon = ICON_MAP[item.icon] || Coffee;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3.5 rounded-2xl border border-[#2C211B]/8 bg-[var(--color-bg-primary)] p-4 transition-colors duration-200 hover:border-[var(--color-accent)]/35"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/12 text-[var(--color-accent)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-semibold text-[var(--color-text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
