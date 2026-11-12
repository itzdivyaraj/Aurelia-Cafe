import heroCafeImg from '../assets/images/hero-cafe.jpg';
import aboutStoryImg from '../assets/images/about-story.jpg';
import brunchOfferImg from '../assets/images/offer-brunch.jpg';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { GALLERY_IMAGES, INSTAGRAM_POSTS } from '../data/galleryData';
import { TESTIMONIALS } from '../data/testimonials';

/**
 * Centralized Client Configuration
 * --------------------------------
 * Customize this single file to rebrand the entire website for any café,
 * bakery, or hospitality business.
 */
export const siteConfig = {
  business: {
    name: 'Aurelia Café & Roastery',
    shortName: 'Aurelia',
    logoSubtext: 'Roastery & Kitchen',
    logoUrl: '', // Optional custom image logo URL; defaults to custom SVG mark when empty
    tagline: 'Good Coffee. Great Food. Even Better Moments.',
    footerDescription:
      'An independent specialty coffee house and all-day kitchen in Indiranagar, crafted around small-lot Indian roasts, sourdough baking, and unhurried hospitality.',
  },

  theme: {
    colors: {
      primaryBg: '#F8F3EA',
      secondaryBg: '#FFFDF9',
      primaryText: '#2C211B',
      secondaryText: '#75665B',
      accent: '#B66A45',
      accentHover: '#9D5736',
      darkSurface: '#241A16',
    },
  },

  /**
   * Toggle any section on or off per client project requirements.
   */
  sections: {
    about: { enabled: true },
    menu: { enabled: true },
    whyChooseUs: { enabled: true },
    gallery: { enabled: true },
    testimonials: { enabled: true },
    specialOffers: { enabled: true },
    enquiry: { enabled: true },
    contact: { enabled: true },
    instagram: { enabled: true },
  },

  navigation: {
    ctaLabel: 'Book a Table',
    ctaHref: '#enquiry',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Our Story', href: '#story', sectionKey: 'about' },
      { label: 'Menu', href: '#menu', sectionKey: 'menu' },
      { label: 'Gallery', href: '#gallery', sectionKey: 'gallery' },
      { label: 'Testimonials', href: '#testimonials', sectionKey: 'testimonials' },
      { label: 'Contact', href: '#contact', sectionKey: 'contact' },
    ],
  },

  hero: {
    eyebrow: 'A Little Taste of Happiness',
    headline: 'Good Coffee. Great Food. Even Better Moments.',
    description:
      'From 100% single-estate Chikmagalur espresso and morning sourdough viennoiserie to unhurried evening plates — welcome to your neighborhood sanctuary.',
    primaryCtaLabel: 'Explore Our Menu',
    primaryCtaHref: '#menu',
    secondaryCtaLabel: 'Find Our Café',
    secondaryCtaHref: '#contact',
    image: heroCafeImg,
    imageAlt:
      'Sunlit interior of Aurelia Café & Roastery with oak tables, latte art, and fresh croissants',
  },

  about: {
    eyebrow: 'Our Story',
    title: 'More Than Just Coffee',
    image: aboutStoryImg,
    imageAlt:
      'Artisan barista pouring silky microfoam into a stoneware cup at the espresso bar',
    badge: {
      label: 'Small-Batch Roasted',
      value: '100% Single-Estate',
      caption: 'Ethically sourced Arabica roasted weekly for peak sweetness.',
    },
    paragraphs: [
      'Born from a love for slow mornings and honest ingredients, Aurelia Café & Roastery blends precision coffee craft with the warmth of a sunlit neighborhood dining room.',
      'Every cup is dialed in using shade-grown beans from Chikmagalur estates, while our kitchen ferments 48-hour sourdough, laminates French butter pastries at dawn, and sources seasonal produce from local organic farms.',
      'Whether you arrive for a quiet espresso before work, a celebratory weekend brunch, or late-afternoon cake with friends, every corner is designed to make you feel unhurried and at home.',
    ],
    highlights: [
      {
        icon: 'coffee',
        title: 'Freshly Brewed Coffee',
        description: 'Dialed-in espresso, manual V60 pours, and cold brews steeped 18 hours.',
      },
      {
        icon: 'dessert',
        title: 'Handcrafted Desserts',
        description: 'San Sebastián cheesecake and laminated pastries baked fresh daily.',
      },
      {
        icon: 'leaf',
        title: 'Locally Sourced Produce',
        description: 'Organic farm greens, artisanal cheeses, and heritage Indian spices.',
      },
      {
        icon: 'ambience',
        title: 'Comfortable Ambience',
        description: 'Warm acoustics, sunlit greenery, and power-ready corners for work or leisure.',
      },
    ],
  },

  menu: {
    eyebrow: 'Curated Offerings',
    title: 'Crafted Fresh From Dawn to Dusk',
    description:
      'Explore our seasonal selection of specialty pours, stone-ground matcha, all-day sourdough plates, and small-batch bakes.',
    fullMenuCtaLabel: 'View Full Menu',
    categories: MENU_CATEGORIES,
    items: MENU_ITEMS,
  },

  whyChooseUs: {
    eyebrow: 'The Aurelia Experience',
    title: 'Thoughtfully Crafted in Every Detail',
    description:
      'We pair specialty hospitality standards with neighborhood warmth — creating a space people return to every week.',
    items: [
      {
        icon: 'fresh',
        title: 'Freshly Prepared Food',
        description:
          'Every flatbread, tartine, and sauce is cooked to order in our open kitchen — never pre-packaged.',
      },
      {
        icon: 'ingredients',
        title: 'Premium Ingredients',
        description:
          'Cultured French butter, single-origin chocolate, cold-pressed olive oil, and farm-fresh eggs.',
      },
      {
        icon: 'coffee',
        title: 'Specialty Coffee Bar',
        description:
          'Custom roasted estate beans, precision grinders, and trained baristas passionate about flavor.',
      },
      {
        icon: 'atmosphere',
        title: 'Warm, Sunlit Atmosphere',
        description:
          'Natural oak furniture, soft morning daylight, terracotta warmth, and thoughtfully curated playlists.',
      },
      {
        icon: 'service',
        title: 'Genuinely Friendly Service',
        description:
          'Attentive table hospitality that welcomes regulars by name and guides newcomers effortlessly.',
      },
      {
        icon: 'space',
        title: 'Friends, Family & Work Ready',
        description:
          'Fast fiber Wi-Fi and quiet booths by weekday; lively communal brunch tables on weekends.',
      },
    ],
  },

  gallery: {
    eyebrow: 'Inside Our Space',
    title: 'Moments Around the Table',
    description:
      'A glimpse into our morning pours, sunlit dining corners, and dishes freshly plated in our kitchen.',
    items: GALLERY_IMAGES,
  },

  testimonials: {
    eyebrow: 'Guest Notes',
    title: 'Loved by Coffee & Food Lovers',
    description:
      'See how guests experience our morning pours, warm hospitality, and neighborhood atmosphere.',
    demoNotice: 'Sample Demo Testimonials — Replace with verified client reviews before launch',
    items: TESTIMONIALS,
  },

  specialOffer: {
    eyebrow: 'Weekend Ritual',
    tag: 'Every Sat & Sun · 9 AM – 2 PM',
    title: 'Slow Weekend Brunch & Bottomless Pour-Over Pairing',
    description:
      'Gather your favorite people for our chef’s weekend brunch table — featuring cast-iron shakshuka, freshly laminated croissants, seasonal fruit, and curated coffee flights.',
    highlights: [
      'Complimentary estate filter refill with any two brunch plates',
      'Curated group tables available for birthdays & weekend catch-ups',
      'Custom dessert platters available on 24-hour prior request',
    ],
    ctaLabel: 'Reserve Your Brunch Table',
    ctaHref: '#enquiry',
    enquiryType: 'Table Reservation',
    image: brunchOfferImg,
    imageAlt:
      'Weekend brunch table with skillet shakshuka, sourdough, fresh figs, cold brew, and cappuccino',
  },

  enquiry: {
    eyebrow: 'Reservations & Events',
    title: 'Book a Table or Plan a Gathering',
    description:
      'Reserve a sunlit table, inquire about birthday celebrations, private acoustic evenings, or bulk pastry & coffee catering.',
    submitLabel: 'Submit Enquiry',
    requireEmail: false,
    /**
     * Set to your backend endpoint (e.g. 'https://api.yourdomain.com/api/enquiries')
     * when connecting FastAPI or another backend. Leave empty ('') for honest Demo Mode.
     */
    apiEndpoint: '',
    types: [
      'Table Reservation',
      'Birthday Party',
      'Private Event',
      'Bulk Order',
      'General Enquiry',
    ],
  },

  contact: {
    eyebrow: 'Visit Us',
    title: 'Find Your Table in Indiranagar',
    description:
      'Step off 100 Feet Road into a quiet courtyard filled with the aroma of fresh espresso and warm sourdough.',
    shortAddress: '12th Main, Indiranagar, Bengaluru',
    fullAddress:
      'No. 42, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    addressLines: {
      street: 'No. 42, 12th Main Road, HAL 2nd Stage, Indiranagar',
      city: 'Bengaluru',
      state: 'KA',
      postalCode: '560038',
      countryCode: 'IN',
    },
    phone: '+91 80 4123 8910',
    phoneHref: '+918041238910',
    email: 'hello@aureliaroastery.example.com',
    whatsappNumber: '919876543210',
    whatsappMessage:
      'Hello! I visited your website and would like to know more about your café.',
    googleMapsLink:
      'https://www.google.com/maps/search/?api=1&query=Indiranagar+12th+Main+Bengaluru',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Indiranagar,Bengaluru&output=embed',
  },

  hours: {
    summary: 'Open Daily · 8:00 AM – 10:30 PM',
    schemaOpeningHours: ['Mo-Fr 08:00-22:30', 'Sa-Su 08:00-23:00'],
    schedule: [
      { days: 'Monday – Friday', time: '8:00 AM – 10:30 PM' },
      { days: 'Saturday – Sunday', time: '8:00 AM – 11:00 PM' },
      { days: 'Breakfast Service', time: '8:00 AM – 12:30 PM' },
    ],
  },

  social: {
    instagramUrl: 'https://instagram.com/aureliaroastery',
    facebookUrl: 'https://facebook.com/aureliaroastery',
  },

  instagram: {
    handle: '@aureliaroastery',
    title: 'Fresh From Our Roastery Feed',
    description:
      'Seasonal pour-overs, oven-warm bakes, and golden hour moments shared daily from our café floor.',
    ctaLabel: 'Follow Us',
    previewNote:
      'Curated static feed preview — link your live Instagram display widget or API when deploying.',
    posts: INSTAGRAM_POSTS,
  },

  seo: {
    title: 'Aurelia Café & Roastery | Artisanal Coffee & Kitchen in Bengaluru',
    description:
      'Aurelia Café & Roastery in Indiranagar, Bengaluru — specialty single-origin coffee, handcrafted pastries, and seasonal all-day dining in a warm sunlit space.',
    canonicalUrl: 'https://example-cafe-domain.com/',
    priceRange: '₹₹',
    servesCuisine: ['Specialty Coffee', 'Artisanal Bakery', 'All-Day Café'],
  },
};
