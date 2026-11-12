import { useEffect, useState } from 'react';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { siteConfig } from './config/siteConfig';
import { applySeoAndStructuredData, applyThemeColors } from './utils/seo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedMenu from './components/FeaturedMenu';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import SpecialOffers from './components/SpecialOffers';
import EnquiryForm from './components/EnquiryForm';
import Contact from './components/Contact';
import InstagramSection from './components/InstagramSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [activeMenuCategory, setActiveMenuCategory] = useState('All');
  const [selectedEnquiryType, setSelectedEnquiryType] = useState(
    siteConfig.enquiry.types[0]
  );

  useEffect(() => {
    applyThemeColors(siteConfig.theme?.colors);
    applySeoAndStructuredData(siteConfig);
  }, []);

  const { sections } = siteConfig;

  return (
    <SiteConfigProvider config={siteConfig}>
      <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-dark-surface)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#FFFDF9]"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">
          <Hero />

          {sections.about?.enabled !== false && <About />}

          {sections.menu?.enabled !== false && (
            <FeaturedMenu
              activeCategory={activeMenuCategory}
              onCategoryChange={setActiveMenuCategory}
            />
          )}

          {sections.whyChooseUs?.enabled !== false && <WhyChooseUs />}

          {sections.gallery?.enabled !== false && <Gallery />}

          {sections.testimonials?.enabled !== false && <Testimonials />}

          {sections.specialOffers?.enabled !== false && (
            <SpecialOffers onSelectEnquiryType={setSelectedEnquiryType} />
          )}

          {sections.enquiry?.enabled !== false && (
            <EnquiryForm selectedEnquiryType={selectedEnquiryType} />
          )}

          {sections.contact?.enabled !== false && <Contact />}

          {sections.instagram?.enabled !== false && <InstagramSection />}
        </main>

        <Footer onSelectMenuCategory={setActiveMenuCategory} />

        <WhatsAppButton />
      </div>
    </SiteConfigProvider>
  );
}
