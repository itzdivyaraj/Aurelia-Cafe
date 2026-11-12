import heroCafeImg from '../assets/images/hero-cafe.jpg';
import aboutStoryImg from '../assets/images/about-story.jpg';
import galleryInteriorImg from '../assets/images/gallery-interior.jpg';
import galleryCommunityImg from '../assets/images/gallery-community.jpg';
import coffeeLatteImg from '../assets/images/menu-coffee-latte.jpg';
import dessertCroissantImg from '../assets/images/menu-dessert-croissant.jpg';
import dessertCheesecakeImg from '../assets/images/menu-dessert-cheesecake.jpg';
import brunchOfferImg from '../assets/images/offer-brunch.jpg';
import coffeeTonicImg from '../assets/images/menu-coffee-tonic.jpg';

export const GALLERY_IMAGES = [
  {
    id: 'gal-interior-sunlight',
    image: galleryInteriorImg,
    alt: 'Sunlit oak seating corner with olive tree and brass pendant lights',
    category: 'Interiors',
    caption: 'Sun-drenched morning corners built for slow conversations.',
  },
  {
    id: 'gal-barista-pour',
    image: aboutStoryImg,
    alt: 'Barista pouring steamed milk into ceramic espresso cup',
    category: 'Coffee Craft',
    caption: 'Precision microfoam and freshly roasted Chikmagalur single-origin.',
  },
  {
    id: 'gal-community-table',
    image: galleryCommunityImg,
    alt: 'Friends gathered around a sunlit wooden café table enjoying coffee and pastries',
    category: 'Community',
    caption: 'Weekend catch-ups over warm croissants and specialty pours.',
  },
  {
    id: 'gal-pastry-table',
    image: dessertCroissantImg,
    alt: 'Golden butter croissants and chocolate pain au chocolat on linen',
    category: 'Bakery',
    caption: 'Freshly laminated viennoiserie straight out of our deck oven.',
  },
  {
    id: 'gal-weekend-brunch',
    image: brunchOfferImg,
    alt: 'Weekend brunch table spread with skillet shakshuka, sourdough, figs, and coffee',
    category: 'Kitchen',
    caption: 'Seasonal plates crafted from local farms every morning.',
  },
  {
    id: 'gal-basque-cake',
    image: dessertCheesecakeImg,
    alt: 'Burnt Basque cheesecake slice with warm berry compote',
    category: 'Desserts',
    caption: 'Small-batch desserts designed to pair with dark roast pours.',
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: heroCafeImg,
    alt: 'Morning light across the espresso bar and travertine café tables',
  },
  {
    id: 'ig-2',
    image: coffeeLatteImg,
    alt: 'Velvet rosetta latte art in handmade stoneware cup',
  },
  {
    id: 'ig-3',
    image: dessertCroissantImg,
    alt: 'Freshly baked butter croissants on oak wood',
  },
  {
    id: 'ig-4',
    image: coffeeTonicImg,
    alt: 'Chilled blood orange espresso tonic with rosemary',
  },
  {
    id: 'ig-5',
    image: galleryInteriorImg,
    alt: 'Minimal terracotta and oak café interior corner',
  },
  {
    id: 'ig-6',
    image: galleryCommunityImg,
    alt: 'Guests enjoying weekend coffee and brunch together',
  },
];
