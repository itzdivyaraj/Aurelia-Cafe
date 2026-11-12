import { useState } from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import PrivacyModal from './PrivacyModal';

export default function Footer({ onSelectMenuCategory }) {
  const { business, navigation, menu, contact, hours, social, sections } =
    useSiteConfig();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const quickLinks = navigation.links.filter((link) => {
    if (!link.sectionKey) return true;
    return sections[link.sectionKey]?.enabled !== false;
  });

  const menuCategories = menu.categories.filter((c) => c !== 'All');

  const handleAnchor = (e, href) => {
    if (!href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMenuCategoryClick = (e, category) => {
    e.preventDefault();
    if (onSelectMenuCategory) {
      onSelectMenuCategory(category);
    }
    const menuEl = document.querySelector('#menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[var(--color-dark-surface)] text-[#E6DDD3]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => handleAnchor(e, '#home')}
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFFDF9]/10 font-serif text-lg font-bold text-[#D6926F]">
                {business.name.charAt(0)}
              </span>
              <div>
                <p className="font-serif text-xl font-semibold text-[#FFFDF9]">
                  {business.name}
                </p>
                {business.logoSubtext && (
                  <p className="text-[10px] tracking-[0.2em] text-[#B8ABA0] uppercase">
                    {business.logoSubtext}
                  </p>
                )}
              </div>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#C7BBAE]">
              {business.footerDescription}
            </p>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">
              {social.instagramUrl && (
                <a
                  href={social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFFDF9]/15 text-[#EDE3D8] transition-colors hover:border-[#B66A45] hover:bg-[#B66A45] hover:text-white"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {social.facebookUrl && (
                <a
                  href={social.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFFDF9]/15 text-[#EDE3D8] transition-colors hover:border-[#B66A45] hover:bg-[#B66A45] hover:text-white"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-base font-semibold text-[#FFFDF9]">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchor(e, link.href)}
                    className="text-[#C7BBAE] transition-colors hover:text-[#E6B89C]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Category Links */}
          {sections.menu?.enabled !== false && (
            <div className="lg:col-span-2">
              <h3 className="font-serif text-base font-semibold text-[#FFFDF9]">
                Our Menu
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {menuCategories.map((category) => (
                  <li key={category}>
                    <a
                      href="#menu"
                      onClick={(e) => handleMenuCategoryClick(e, category)}
                      className="text-[#C7BBAE] transition-colors hover:text-[#E6B89C]"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact & Hours */}
          <div className="lg:col-span-4">
            <h3 className="font-serif text-base font-semibold text-[#FFFDF9]">
              Visit &amp; Hours
            </h3>
            <div className="mt-4 space-y-3 text-sm text-[#C7BBAE]">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D6926F]" aria-hidden="true" />
                <span>{contact.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#D6926F]" aria-hidden="true" />
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="transition-colors hover:text-[#FFFDF9]"
                >
                  {contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#D6926F]" aria-hidden="true" />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-[#FFFDF9]"
                >
                  {contact.email}
                </a>
              </p>
            </div>

            <div className="mt-5 border-t border-[#FFFDF9]/10 pt-4 text-xs text-[#B8ABA0]">
              {hours.schedule.map((row) => (
                <div key={row.days} className="flex justify-between py-0.5">
                  <span>{row.days}</span>
                  <span className="text-[#EDE3D8]">{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#FFFDF9]/10 pt-8 text-xs text-[#A89B8F] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="transition-colors hover:text-[#FFFDF9]"
            >
              Privacy Policy
            </button>
            <a
              href="#enquiry"
              onClick={(e) => handleAnchor(e, '#enquiry')}
              className="transition-colors hover:text-[#FFFDF9]"
            >
              Reservations &amp; Events
            </a>
          </div>
        </div>
      </div>

      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}
