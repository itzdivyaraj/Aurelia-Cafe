/**
 * Applies centralized theme colors from siteConfig to CSS custom properties
 * and injects SEO metadata + JSON-LD structured data for the local café/restaurant.
 */
export function applyThemeColors(colors) {
  if (!colors || typeof document === 'undefined') return;
  const root = document.documentElement;
  const map = {
    '--color-bg-primary': colors.primaryBg,
    '--color-bg-secondary': colors.secondaryBg,
    '--color-text-primary': colors.primaryText,
    '--color-text-secondary': colors.secondaryText,
    '--color-accent': colors.accent,
    '--color-accent-hover': colors.accentHover,
    '--color-dark-surface': colors.darkSurface,
  };

  Object.entries(map).forEach(([key, value]) => {
    if (value) root.style.setProperty(key, value);
  });
}

export function applySeoAndStructuredData(siteConfig) {
  if (typeof document === 'undefined') return;

  const { seo, business, contact, hours, social } = siteConfig;

  if (seo?.title) {
    document.title = seo.title;
  }

  const setMeta = (selector, attr, value) => {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', seo?.description);
  setMeta('meta[property="og:title"]', 'content', seo?.title);
  setMeta('meta[property="og:description"]', 'content', seo?.description);
  setMeta('meta[property="og:site_name"]', 'content', business?.name);
  setMeta('meta[property="og:url"]', 'content', seo?.canonicalUrl);
  setMeta('link[rel="canonical"]', 'href', seo?.canonicalUrl);

  const schemaId = 'cafe-structured-data';
  let script = document.getElementById(schemaId);
  if (!script) {
    script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: business.name,
    description: seo?.description || business.tagline,
    url: seo?.canonicalUrl,
    telephone: contact.phone,
    email: contact.email,
    priceRange: seo?.priceRange || '₹₹',
    servesCuisine: seo?.servesCuisine || ['Specialty Coffee', 'Artisanal Bakery', 'All-Day Café'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.addressLines.street,
      addressLocality: contact.addressLines.city,
      addressRegion: contact.addressLines.state,
      postalCode: contact.addressLines.postalCode,
      addressCountry: contact.addressLines.countryCode || 'IN',
    },
    openingHours: hours?.schemaOpeningHours || ['Mo-Fr 08:00-22:30', 'Sa-Su 08:00-23:00'],
    sameAs: [social?.instagramUrl, social?.facebookUrl].filter(Boolean),
  };

  script.textContent = JSON.stringify(structuredData);
}
