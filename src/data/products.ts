import { Product, FAQItem } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'kerala-pepper-curry-leaf',
    name: 'Kerala Pepper & Curry Leaf',
    tagline: 'Coastal spice warmth with aromatic fried curry leaves.',
    collection: 'Regional Rasa',
    description: 'Inspired by the lush spice hills of Kerala — crushed black tellicherry pepper, aromatic fried curry leaves, and a punchy coastal crunch.',
    longStory: 'Straight from God’s Own Country, this flavour captures the magic of Malabar black tellicherry peppercorns roasted to perfection and combined with crisp, sun-dried curry leaves. It is earthy, intensely aromatic, and finishes with a slow, tingling peppery warmth that keeps you reaching for one more chip.',
    packagingColor: {
      primary: '#1A4329',
      secondary: '#286B3E',
      text: '#E8F5E9',
      accent: '#FACC15',
      bgGradient: 'from-[#143520] via-[#1A4329] to-[#255C37]'
    },
    spiceLevel: 3,
    heatDescriptor: 'Warm & Aromatic Malabar Pepper Kick',
    caloriesPerServing: 146,
    sizes: [
      { size: 'Snack Pack', weight: '30g', price: 10 },
      { size: 'Solo Crunch', weight: '60g', price: 20 },
      { size: 'Party Share', weight: '150g', price: 50 },
    ],
    ingredients: [
      'Fresh Farm Potatoes',
      'Cold-Pressed High-Oleic Sunflower Oil',
      'Crushed Tellicherry Black Pepper',
      'Crisp Curry Leaf Flakes',
      'Rock Salt',
      'Roasted Cumin',
      'Pomegranate Powder'
    ],
    keyHighlights: [
      'Regional Rasa Collection',
      'Malabar Black Pepper Kick',
      '100% Real Sun-Dried Curry Leaves',
      'Zero Palm Oil'
    ],
    hasNoPalmOil: true,
    regionalOrigin: 'Malabar Coast, Kerala',
    idealPairing: 'Iced filter coffee, nimbu soda, or rainy-afternoon chai.',
    crunchRating: 5
  },
  {
    id: 'bengal-kasundi-mustard',
    name: 'Bengal Kasundi Mustard',
    tagline: 'Pungent, sharp, tangy fermented mustard punch.',
    collection: 'Regional Rasa',
    description: 'Inspired by the distinctive taste of Bengali mustard relish — sharp mustard warmth balanced with tangy green mango notes.',
    longStory: 'Kasundi is Bengal’s culinary crown jewel: a regal fermented mustard paste that hits your senses with instant sharp pungency and tart tang. We micro-ground indigenous yellow and black mustard seeds with raw green mango notes and mild spices, coating every crinkle-cut ridge in authentic Kolkata street nostalgia.',
    packagingColor: {
      primary: '#B45309',
      secondary: '#D97706',
      text: '#FFFBEB',
      accent: '#FEF08A',
      bgGradient: 'from-[#92400E] via-[#B45309] to-[#D97706]'
    },
    spiceLevel: 4,
    heatDescriptor: 'Sharp, Pungent & Signature Mustard Zing',
    caloriesPerServing: 152,
    sizes: [
      { size: 'Snack Pack', weight: '30g', price: 10 },
      { size: 'Solo Crunch', weight: '60g', price: 20 },
      { size: 'Party Share', weight: '150g', price: 50 },
    ],
    ingredients: [
      'Fresh Farm Potatoes',
      'Cold-Pressed High-Oleic Sunflower Oil',
      'Ground Yellow & Black Mustard Seeds',
      'Dehydrated Green Mango Powder (Aamchur)',
      'Black Salt',
      'Turmeric',
      'Dry Ginger Powder'
    ],
    keyHighlights: [
      'Regional Rasa Collection',
      'Stone-Ground Indigenous Mustard',
      'Tangy Fermented Mango Notes',
      'Zero Palm Oil'
    ],
    hasNoPalmOil: true,
    regionalOrigin: 'Kolkata, West Bengal',
    idealPairing: 'Chilled lemonade, Kolkata roll dip, or evening street food spreads.',
    crunchRating: 5
  },
  {
    id: 'gujarat-khatta-meetha',
    name: 'Gujarat Khatta Meetha',
    tagline: 'A playful dance of sweet jaggery and lip-smacking raw mango tang.',
    collection: 'Regional Rasa',
    description: 'A sweet-and-tangy flavour concept celebrating Gujarati street snacks — raw mango zing, roasted cumin, jaggery sweetness, and crispy potato crunch.',
    longStory: 'In Gujarat, snacks are an art of sweet-tangy counterpoint. This signature flavour blends caramelized organic jaggery powder with sour aamchur, roasted jeera, and mild red chilli. Every crunch is an instant celebration — sweet on first bite, delightfully sour in the middle, and ending with a warm spiced crunch.',
    packagingColor: {
      primary: '#C2410C',
      secondary: '#EA580C',
      text: '#FFF7ED',
      accent: '#FDE047',
      bgGradient: 'from-[#9A3412] via-[#C2410C] to-[#EA580C]'
    },
    spiceLevel: 2,
    heatDescriptor: 'Sweet, Tangy & Mild Spiced Harmony',
    caloriesPerServing: 148,
    sizes: [
      { size: 'Snack Pack', weight: '30g', price: 10 },
      { size: 'Solo Crunch', weight: '60g', price: 20 },
      { size: 'Party Share', weight: '150g', price: 50 },
    ],
    ingredients: [
      'Fresh Farm Potatoes',
      'Cold-Pressed High-Oleic Sunflower Oil',
      'Organic Jaggery Powder',
      'Raw Mango Flakes',
      'Dry Roasted Cumin',
      'Rock Salt',
      'Mild Kashmiri Chilli'
    ],
    keyHighlights: [
      'Regional Rasa Collection',
      'Sweet Jaggery & Aamchur Zing',
      'Inspired by Ahmedabad Farsan Culture',
      'Zero Palm Oil'
    ],
    hasNoPalmOil: true,
    regionalOrigin: 'Ahmedabad, Gujarat',
    idealPairing: 'Hot masala chai, spiced buttermilk (chaas), or midnight study sessions.',
    crunchRating: 4
  },
  {
    id: 'olive-oil-sea-salt',
    name: 'Olive Oil & Sea Salt',
    tagline: 'Simple, pure, golden kettle chips cooked in cold-pressed olive oil.',
    collection: 'Olive Oil',
    description: 'A simple olive oil and sea salt flavour crafted with cold-pressed olive oil and hand-harvested mineral sea salt flakes.',
    longStory: 'For the purist who appreciates true potato character. We slice hand-selected golden potatoes slightly thicker, cook them slowly in 100% Spanish cold-pressed olive oil, and gently tumble them with pristine Himalayan pink and sea salt crystals. Golden, nutty, delicate, and deeply satisfying.',
    packagingColor: {
      primary: '#4D6B2B',
      secondary: '#6E8E3E',
      text: '#F7FEE7',
      accent: '#BEF264',
      bgGradient: 'from-[#3A521F] via-[#4D6B2B] to-[#6E8E3E]'
    },
    spiceLevel: 1,
    heatDescriptor: 'Mellow Nutty Notes & Delicate Sea Salt Flakes',
    caloriesPerServing: 138,
    sizes: [
      { size: 'Snack Pack', weight: '30g', price: 15 },
      { size: 'Solo Crunch', weight: '60g', price: 35 },
      { size: 'Party Share', weight: '150g', price: 80 },
    ],
    ingredients: [
      'Specially Grown Golden Potatoes',
      '100% Spanish Cold-Pressed Olive Oil',
      'Hand-Harvested Sea Salt Flakes',
      'Pink Himalayan Rock Salt',
      'Cracked White Pepper (Trace)'
    ],
    keyHighlights: [
      'Olive Oil Collection',
      '100% Cold-Pressed Olive Oil',
      'Mineral Sea Salt Flakes',
      'Zero Palm Oil'
    ],
    hasNoPalmOil: true,
    idealPairing: 'Sparkling water, artisanal sandwiches, or charcuterie boards.',
    crunchRating: 5
  },
  {
    id: 'tangy-tomato-masala',
    name: 'Tangy Tomato Masala',
    tagline: 'Protein-boosted chatpata crunch with sun-ripened tomatoes.',
    collection: 'Protein+',
    description: 'A tangy tomato-inspired flavour with rich desi spice notes and boosted plant-forward protein power.',
    longStory: 'A burst of tangy sun-ripened tomatoes meets an electrifying medley of Indian chatpata spices: anardana (wild pomegranate), dried ginger, and roasted fennel. Specially enriched with golden pea protein for a satisfying crunch that fuels your busy day without empty compromises.',
    packagingColor: {
      primary: '#1E3A8A',
      secondary: '#2563EB',
      text: '#EFF6FF',
      accent: '#F97316',
      bgGradient: 'from-[#172554] via-[#1E3A8A] to-[#2563EB]'
    },
    spiceLevel: 3,
    heatDescriptor: 'Chatpata Tomato Zing with Spiced Warmth',
    caloriesPerServing: 142,
    sizes: [
      { size: 'Snack Pack', weight: '30g', price: 15 },
      { size: 'Solo Crunch', weight: '60g', price: 30 },
      { size: 'Party Share', weight: '150g', price: 70 },
    ],
    ingredients: [
      'Fresh Farm Potatoes',
      'High-Oleic Sunflower Oil',
      'Sun-Ripened Tomato Powder',
      'Golden Pea Protein Crisp Blend (8g per 60g)',
      'Wild Pomegranate Seed Powder',
      'Black Salt',
      'Coriander & Chilli'
    ],
    keyHighlights: [
      'Protein+ Collection',
      '8g Plant Protein per 60g Pack',
      'Sun-Ripened Tomato Burst',
      'Zero Palm Oil'
    ],
    hasNoPalmOil: true,
    hasProteinBadge: true,
    idealPairing: 'Post-workout snack breaks, gaming sessions, or college canteen chats.',
    crunchRating: 5
  },
  {
    id: 'classic-salted',
    name: 'Classic Salted',
    tagline: 'Simple. Salty. Seriously Crunchy.',
    collection: 'Classic',
    description: 'The quintessential crunch. Thin golden potato slices sprinkled with pure rock salt. Made with zero palm oil for clean, light, unadulterated crunchiness.',
    longStory: 'The benchmark of every chips brand, perfected. We take farm-fresh, high-starch potatoes, slice them whisper-thin, and kettle-cook them to a golden bubble. No palm oil. No artificial preservatives. Just pure potato, heart-healthy high-oleic sunflower oil, and fine rock salt. It crunch you can hear from across the room.',
    packagingColor: {
      primary: '#8B1E29',
      secondary: '#C22B38',
      text: '#FFF5F5',
      accent: '#FACC15',
      bgGradient: 'from-[#65141D] via-[#8B1E29] to-[#C22B38]'
    },
    spiceLevel: 0,
    heatDescriptor: 'Pristine Pure Rock Salt & Golden Potato',
    caloriesPerServing: 140,
    sizes: [
      { size: 'Snack Pack', weight: '30g', price: 10 },
      { size: 'Solo Crunch', weight: '60g', price: 20 },
      { size: 'Party Share', weight: '150g', price: 50 },
    ],
    ingredients: [
      'Hand-Selected High-Starch Potatoes',
      'Cold-Pressed High-Oleic Sunflower Oil',
      'Refined Mineral Rock Salt'
    ],
    keyHighlights: [
      'Classic Collection',
      'NO PALM OIL Certified',
      'Just 3 Honest Ingredients',
      'Grams Up Front'
    ],
    hasNoPalmOil: true,
    idealPairing: 'Classic cola, cold brew, burger night, or just straight from the pack.',
    crunchRating: 5
  }
];

export const BRAND_STATS = [
  { value: '89%', label: 'reach for chips to de-stress' },
  { value: '70%', label: 'hang out with friends over chips' },
  { value: '68%', label: 'want classic + extra spice' },
  { value: '0%', label: 'Palm Oil in any of our packs' }
];

export const BRAND_HIGHLIGHTS = [
  {
    title: 'Bold & Exciting Flavours',
    description: 'We don’t do bland. Every seasoning is crafted with stone-ground spices, vibrant textures, and unexpected regional nuances that excite your palate.'
  },
  {
    title: 'Inspired by Regional India',
    description: 'From Malabar Tellicherry pepper to Kolkata Kasundi and Ahmedabad Khatta Meetha, we bring authentic cultural spice profiles to modern snackers.'
  },
  {
    title: 'Made for Every Craving',
    description: 'Whether it is a late-night study grind, road trip snacking, or movie marathon with friends, there is a CHIPAS crunch dialed exactly for you.'
  },
  {
    title: 'A Crunch Worth Sharing',
    description: 'Crisped to perfection with an audible snap. Plus our built-in Clean Grabber means greasy keyboards and smudged phone screens are history.'
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    category: 'Products',
    question: 'What flavours are currently available in the CHIPAS lineup?',
    answer: 'We feature six signature varieties across our curated collections: Classic Salted (Classic Collection), Kerala Pepper & Curry Leaf (Regional Rasa), Bengal Kasundi Mustard (Regional Rasa), Gujarat Khatta Meetha (Regional Rasa), Olive Oil & Sea Salt (Olive Oil Collection), and Tangy Tomato Masala (Protein+ Collection).'
  },
  {
    category: 'Ingredients',
    question: 'Why does CHIPAS emphasize "NO PALM OIL"?',
    answer: 'Traditional commercial snack brands rely heavily on cheap, saturated palm oil. CHIPAS uses pure high-oleic sunflower oil and cold-pressed olive oil, giving a cleaner mouthfeel, lighter texture, and letting the natural potato and spice flavours shine without heavy grease coating.'
  },
  {
    category: 'Packaging & Grabber',
    question: 'How does the "Pull. Unfold. Pinch" clean-finger grabber work?',
    answer: 'Every CHIPAS pack features a perforated corner tab on the top-right. Simply pull the corner along the dotted line, unfold the flexible food-grade grabber strip, and pinch your chips cleanly. Your keyboard, phone screen, gaming controller, and notes stay 100% grease-free!'
  },
  {
    category: 'Products',
    question: 'What does "Grams Up Front" mean?',
    answer: 'We believe in honest labeling. Instead of hiding net weight in fine print at the bottom edge, we display the actual chip grams clearly on the front of the pack so you always know exactly what you are paying for.'
  },
  {
    category: 'Ordering',
    question: 'Where can I buy CHIPAS right now?',
    answer: 'CHIPAS is available through partner quick-commerce platforms like Blinkit and Zepto in select university campuses and metropolitan areas, as well as select modern retail supermarkets and campus hubs. Visit our "Where to Buy" page to search your PIN code!'
  },
  {
    category: 'Ingredients',
    question: 'Are CHIPAS chips vegetarian and gluten-free?',
    answer: 'Yes! All CHIPAS varieties are 100% vegetarian, made using pure farm potatoes, vegetable oils, and authentic natural spices.'
  }
];
