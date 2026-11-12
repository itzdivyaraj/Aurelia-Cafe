import coffeeLatteImg from '../assets/images/menu-coffee-latte.jpg';
import coffeeTonicImg from '../assets/images/menu-coffee-tonic.jpg';
import matchaChaiImg from '../assets/images/menu-matcha-chai.jpg';
import avocadoToastImg from '../assets/images/menu-breakfast-avocado.jpg';
import mainFlatbreadImg from '../assets/images/menu-main-flatbread.jpg';
import dessertCheesecakeImg from '../assets/images/menu-dessert-cheesecake.jpg';
import dessertCroissantImg from '../assets/images/menu-dessert-croissant.jpg';
import brunchOfferImg from '../assets/images/offer-brunch.jpg';
import aboutStoryImg from '../assets/images/about-story.jpg';

export const MENU_CATEGORIES = [
  'All',
  'Coffee',
  'Beverages',
  'Breakfast',
  'Main Course',
  'Desserts',
];

export const MENU_ITEMS = [
  {
    id: 'velvet-cortado',
    name: 'Single-Origin Velvet Cortado',
    category: 'Coffee',
    price: 260,
    description:
      'Double ristretto pulled from Chikmagalur estate beans, balanced with silky textured milk.',
    image: coffeeLatteImg,
    imageAlt: 'Single-origin velvet cortado with rosetta latte art in ceramic cup',
    isVeg: true,
    isBestseller: true,
    featured: true,
    dietaryNote: 'Oat or almond milk available',
  },
  {
    id: 'blood-orange-espresso-tonic',
    name: 'Blood Orange Espresso Tonic',
    category: 'Coffee',
    price: 310,
    description:
      'Bright floral espresso layered over botanical tonic water, charred orange peel, and fresh rosemary.',
    image: coffeeTonicImg,
    imageAlt: 'Iced espresso tonic with blood orange slice and rosemary sprig',
    isVeg: true,
    isBestseller: false,
    featured: true,
    dietaryNote: 'Served chilled · Naturally dairy-free',
  },
  {
    id: 'ceremonial-matcha-kulhad-chai',
    name: 'Uji Ceremonial Matcha Oat Latte',
    category: 'Beverages',
    price: 340,
    description:
      'First-harvest stone-ground Uji matcha hand-whisked over oat milk with subtle wildflower honey.',
    image: matchaChaiImg,
    imageAlt: 'Iced ceremonial matcha oat latte beside warm spiced chai',
    isVeg: true,
    isBestseller: true,
    featured: true,
    dietaryNote: 'Vegan option available',
  },
  {
    id: 'avocado-dukkah-tartine',
    name: 'Sourdough Avocado & Dukkah Tartine',
    category: 'Breakfast',
    price: 490,
    description:
      '48-hour fermented country sourdough, smashed Hass avocado, poached free-range egg, and chili oil.',
    image: avocadoToastImg,
    imageAlt: 'Artisanal sourdough avocado toast topped with poached egg and dukkah',
    isVeg: false,
    isBestseller: true,
    featured: true,
    dietaryNote: 'Available without egg for pure vegetarian',
  },
  {
    id: 'truffle-burrata-flatbread',
    name: 'Wild Mushroom & Burrata Flatbread',
    category: 'Main Course',
    price: 680,
    description:
      'Hand-stretched sourdough crust baked with roasted cremini, caramelized onions, fresh thyme, and creamy burrata.',
    image: mainFlatbreadImg,
    imageAlt: 'Sourdough truffle mushroom and burrata flatbread on wooden board',
    isVeg: true,
    isBestseller: true,
    featured: true,
    dietaryNote: 'Baked fresh to order',
  },
  {
    id: 'burnt-basque-cheesecake',
    name: 'San Sebastián Basque Cheesecake',
    category: 'Desserts',
    price: 420,
    description:
      'Caramelized crust with a velvety custard center, paired with warm spiced berry compote.',
    image: dessertCheesecakeImg,
    imageAlt: 'Slice of burnt Basque cheesecake with berry compote on ceramic plate',
    isVeg: true,
    isBestseller: true,
    featured: true,
    dietaryNote: 'Eggless option on weekends',
  },
  {
    id: 'french-butter-croissant',
    name: 'Cultured Butter Croissant & Pain au Chocolat',
    category: 'Desserts',
    price: 290,
    description:
      '27-layer laminated French butter pastry baked every morning until crisp, golden, and honeycombed.',
    image: dessertCroissantImg,
    imageAlt: 'Freshly baked golden butter croissant and chocolate pain au chocolat',
    isVeg: true,
    isBestseller: false,
    featured: true,
    dietaryNote: 'Baked fresh at 8:00 AM daily',
  },
  // Full-Menu-Only Additional Items
  {
    id: 'spiced-assam-masala-chai',
    name: 'Single-Estate Spiced Masala Chai',
    category: 'Beverages',
    price: 220,
    description:
      'Second-flush Assam leaves simmered with crushed green cardamom, fresh ginger, and cinnamon.',
    image: matchaChaiImg,
    imageAlt: 'Spiced Assam masala chai served warm in clay cup',
    isVeg: true,
    isBestseller: false,
    featured: false,
  },
  {
    id: 'v60-pour-over',
    name: 'Hario V60 Estate Pour-Over',
    category: 'Coffee',
    price: 280,
    description:
      'Hand-brewed filter coffee showcasing tasting notes of roasted hazelnut, jaggery, and stone fruit.',
    image: aboutStoryImg,
    imageAlt: 'Artisan barista preparing hand-poured coffee',
    isVeg: true,
    isBestseller: false,
    featured: false,
  },
  {
    id: 'harissa-shakshuka-skillet',
    name: 'Smoked Harissa Shakshuka Skillet',
    category: 'Breakfast',
    price: 520,
    description:
      'Slow-simmered San Marzano tomato sauce, roasted bell peppers, farm eggs, feta, and grilled sourdough.',
    image: brunchOfferImg,
    imageAlt: 'Skillet shakshuka served with sourdough toast and fresh herbs',
    isVeg: false,
    isBestseller: true,
    featured: false,
  },
  {
    id: 'roasted-garlic-pesto-pasta',
    name: 'Burnt Garlic & Basil Pesto Rigatoni',
    category: 'Main Course',
    price: 620,
    description:
      'Artisanal bronze-die pasta tossed in fresh basil-walnut pesto, confit cherry tomatoes, and aged parmesan.',
    image: mainFlatbreadImg,
    imageAlt: 'Artisanal main course dish served warm',
    isVeg: true,
    isBestseller: false,
    featured: false,
  },
];
