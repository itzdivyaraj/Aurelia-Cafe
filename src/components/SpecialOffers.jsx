import { ArrowRight, CalendarHeart } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Reveal from './Reveal';

export default function SpecialOffers({ onSelectEnquiryType }) {
  const { specialOffer } = useSiteConfig();

  const handleOfferCta = (e) => {
    if (specialOffer.enquiryType && onSelectEnquiryType) {
      onSelectEnquiryType(specialOffer.enquiryType);
    }
    const target = document.querySelector(specialOffer.ctaHref || '#enquiry');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="offers"
      aria-labelledby="special-offer-heading"
      className="bg-[var(--color-bg-secondary)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-[#2C211B]/10 bg-[var(--color-dark-surface)] text-[#FFFDF9] shadow-lg">
            <div className="grid items-center lg:grid-cols-12">
              <div className="relative aspect-[16/10] h-full overflow-hidden lg:col-span-6 lg:aspect-auto lg:min-h-[420px]">
                <img
                  src={specialOffer.image}
                  alt={specialOffer.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                {specialOffer.tag && (
                  <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-1.5 text-xs font-semibold tracking-wider text-[#FFFDF9] uppercase shadow-sm">
                    <CalendarHeart className="h-3.5 w-3.5" aria-hidden="true" />
                    {specialOffer.tag}
                  </span>
                )}
              </div>

              <div className="p-8 sm:p-10 lg:col-span-6 lg:p-14">
                <p className="text-xs font-semibold tracking-[0.22em] text-[#E6B89C] uppercase">
                  {specialOffer.eyebrow}
                </p>
                <h2
                  id="special-offer-heading"
                  className="mt-3 font-serif text-3xl leading-tight font-semibold text-[#FFFDF9] sm:text-4xl"
                >
                  {specialOffer.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#D8CCC0]">
                  {specialOffer.description}
                </p>

                {specialOffer.highlights?.length > 0 && (
                  <ul className="mt-6 space-y-2 text-sm text-[#EDE3D8]">
                    {specialOffer.highlights.map((point) => (
                      <li key={point} className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8">
                  <a
                    href={specialOffer.ctaHref || '#enquiry'}
                    onClick={handleOfferCta}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-[#FFFDF9] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)]"
                  >
                    <span>{specialOffer.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
