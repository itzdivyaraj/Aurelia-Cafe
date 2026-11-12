import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function Contact() {
  const { contact, hours, business } = useSiteConfig();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[var(--color-bg-secondary)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div id="contact-heading">
            <SectionHeader
              eyebrow={contact.eyebrow}
              title={contact.title}
              description={contact.description}
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Contact Details & Hours Card */}
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-[#2C211B]/10 bg-[var(--color-bg-primary)] p-7 sm:p-9">
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/12 text-[var(--color-accent)]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
                      Visit Us
                    </h3>
                    <address className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)] not-italic">
                      {contact.fullAddress}
                    </address>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/12 text-[var(--color-accent)]">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
                      Get in Touch
                    </h3>
                    <div className="mt-1 space-y-1 text-sm">
                      <p>
                        <a
                          href={`tel:${contact.phoneHref}`}
                          className="font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
                        >
                          {contact.phone}
                        </a>
                      </p>
                      <p className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="transition-colors hover:text-[var(--color-accent)]"
                        >
                          {contact.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/12 text-[var(--color-accent)]">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
                      Opening Hours
                    </h3>
                    <dl className="mt-2 space-y-1.5 text-sm">
                      {hours.schedule.map((row) => (
                        <div
                          key={row.days}
                          className="flex items-center justify-between gap-4 border-b border-[#2C211B]/8 pb-1.5 last:border-b-0 last:pb-0"
                        >
                          <dt className="text-[var(--color-text-secondary)]">{row.days}</dt>
                          <dd className="font-medium text-[var(--color-text-primary)]">
                            {row.time}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={contact.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)]"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`tel:${contact.phoneHref}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#2C211B]/20 bg-[var(--color-bg-secondary)] px-6 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map Embed Card */}
          <Reveal delay={90} className="lg:col-span-7">
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-3xl border border-[#2C211B]/10 bg-[#EAE1D5] shadow-xs sm:min-h-[420px]">
              <iframe
                title={`${business.name} location map`}
                src={contact.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[340px] w-full border-0 sm:min-h-[420px]"
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-end">
                <a
                  href={contact.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#241A16]/90 px-4 py-2 text-xs font-semibold text-[#FFFDF9] shadow-md backdrop-blur-xs transition-colors hover:bg-[var(--color-accent)]"
                >
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
