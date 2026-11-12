import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const { testimonials } = useSiteConfig();
  const items = testimonials.items;
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = Math.min(3, items.length);
  const visibleItems = Array.from({ length: visibleCount }, (_, offset) => {
    return items[(startIndex + offset) % items.length];
  });

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-[var(--color-bg-primary)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div id="testimonials-heading">
            <SectionHeader
              eyebrow={testimonials.eyebrow}
              title={testimonials.title}
              description={testimonials.description}
            />
          </div>

          {testimonials.demoNotice && (
            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center rounded-full border border-[#2C211B]/12 bg-[var(--color-bg-secondary)] px-4 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
                {testimonials.demoNotice}
              </span>
            </div>
          )}
        </Reveal>

        {/* Testimonial Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-[#2C211B]/8 bg-[var(--color-bg-secondary)] p-7 shadow-xs transition-all duration-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div
                    className="flex items-center gap-1 text-[var(--color-accent)]"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`h-4 w-4 ${
                          starIdx < item.rating
                            ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                            : 'text-[#2C211B]/20'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <Quote
                    className="h-5 w-5 text-[var(--color-accent)]/35"
                    aria-hidden="true"
                  />
                </div>

                <blockquote className="mt-5 text-sm leading-relaxed text-[var(--color-text-primary)] sm:text-[0.95rem]">
                  “{item.quote}”
                </blockquote>
              </div>

              <div className="mt-6 flex items-center gap-3.5 border-t border-[#2C211B]/8 pt-5">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 font-serif text-sm font-semibold text-[var(--color-accent)]"
                  >
                    {getInitials(item.name)}
                  </div>
                )}

                <div>
                  <p className="font-serif text-base font-semibold text-[var(--color-text-primary)]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {item.context}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Navigation */}
        {items.length > visibleCount && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonials"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2C211B]/15 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2" aria-hidden="true">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStartIndex(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    idx === startIndex
                      ? 'w-6 bg-[var(--color-accent)]'
                      : 'w-2 bg-[#2C211B]/20 hover:bg-[#2C211B]/40'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonials"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2C211B]/15 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
