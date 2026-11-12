import { ExternalLink, Instagram } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Reveal from './Reveal';

export default function InstagramSection() {
  const { instagram, social } = useSiteConfig();

  return (
    <section
      id="instagram"
      aria-labelledby="instagram-heading"
      className="bg-[var(--color-bg-primary)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span>{instagram.handle}</span>
              </div>
              <h2
                id="instagram-heading"
                className="mt-2 font-serif text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl"
              >
                {instagram.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                {instagram.description}
              </p>
            </div>

            <a
              href={social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-dark-surface)] px-6 py-3 text-sm font-semibold text-[#FFFDF9] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent)]"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              <span>{instagram.ctaLabel || 'Follow Us'}</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-75" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {instagram.posts.map((post, idx) => (
            <Reveal key={post.id} delay={idx * 40}>
              <a
                href={social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View post on Instagram: ${post.alt}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-[#EAE1D5]"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-[#1A120E]/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Instagram className="h-6 w-6 text-[#FFFDF9]" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {instagram.previewNote && (
          <p className="mt-5 text-center text-xs text-[var(--color-text-secondary)]">
            {instagram.previewNote}
          </p>
        )}
      </div>
    </section>
  );
}
