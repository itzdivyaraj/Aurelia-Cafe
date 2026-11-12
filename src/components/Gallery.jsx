import { useCallback, useState } from 'react';
import { Expand } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Lightbox from './Lightbox';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function Gallery() {
  const { gallery } = useSiteConfig();
  const [activeIndex, setActiveIndex] = useState(null);

  const images = gallery.items;

  const handleClose = useCallback(() => setActiveIndex(null), []);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);
  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  }, [images.length]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-[var(--color-bg-secondary)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div id="gallery-heading">
            <SectionHeader
              eyebrow={gallery.eyebrow}
              title={gallery.title}
              description={gallery.description}
            />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {images.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 45}>
              <button
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Expand gallery photo: ${item.alt}`}
                className={`group relative block w-full overflow-hidden rounded-2xl bg-[#EAE1D5] text-left shadow-xs focus-visible:outline-none ${
                  item.featured ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Hover overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-[#1A120E]/80 via-[#1A120E]/15 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <div className="flex justify-end">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF9]/90 text-[var(--color-text-primary)] shadow-sm">
                      <Expand className="h-4 w-4" />
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#E6B89C] uppercase">
                      {item.category}
                    </p>
                    <p className="mt-1 font-serif text-lg font-medium text-[#FFFDF9]">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        activeIndex={activeIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
