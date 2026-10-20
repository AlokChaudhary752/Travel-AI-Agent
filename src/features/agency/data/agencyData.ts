export interface PackageItem {
  id: string;
  title: string;
  tagline: string;
  destination: string;
  region: "Domestic" | "International";
  theme: "Honeymoon & Romance" | "Family Escapes" | "Alpine Ski & Adventure" | "Royal Heritage";
  duration: string;
  priceInr: string;
  pricePer: string;
  image: string;
  featured?: boolean;
  highlights: string[];
  inclusions: string[];
}

export interface DestinationItem {
  id: string;
  name: string;
  stateOrCountry: string;
  badge: string;
  tripLength: string;
  priceFromInr: string;
  description: string;
  image: string;
  featuredLarge?: boolean;
  idealFor: string;
  bestSeason: string;
}

export interface TestimonialItem {
  id: string;
  names: string;
  city: string;
  tripTaken: string;
  travelDate: string;
  rating: number;
  quote: string;
  photo: string;
}

export interface ItineraryDayItem {
  day: number;
  title: string;
  location: string;
  highlights: string[];
  meals: string;
  stay: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Booking" | "Dining & Logistics" | "Flexibility";
}

export const AGENCY_DETAILS = {
  name: "Voyara Journeys",
  tagline: "Private Luxury & Bespoke Travel Curators",
  phoneDisplay: "+91 98200 86927",
  phoneRaw: "+919820086927",
  whatsappLink: "https://wa.me/919820086927?text=Hello%20Voyara%20Journeys%2C%20I%20would%20like%20to%20plan%20a%20bespoke%20trip.",
  email: "curators@voyarajourneys.com",
  gstNumber: "27AABCV8942K1ZX",
  iataCode: "IATA-91284712",
  ministryReg: "MOT/IND/VIP/2012/882",
  yearsInBusiness: "14+",
  travelersServed: "4,800+",
  googleRating: "4.97 / 5.0",
  offices: [
    { city: "Mumbai", address: "One BKC, G Block, Bandra Kurla Complex, Mumbai 400051" },
    { city: "New Delhi", address: "The Oberoi Arcade, Dr. Zakir Hussain Marg, New Delhi 110003" },
  ],
};

export const FEATURED_DESTINATIONS: DestinationItem[] = [
  {
    id: "dest-kashmir",
    name: "Kashmir & Gulmarg",
    stateOrCountry: "Jammu & Kashmir, India",
    badge: "Flagship Winter & Spring",
    tripLength: "6–8 Days",
    priceFromInr: "₹1,85,000",
    description:
      "Drift across Dal Lake on a private century-old cedarwood houseboat, take first tracks down the Gulmarg Gondola Phase II with an avalanche-certified mountain guide, and unwind in secluded pine cottages in Pahalgam.",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85",
    featuredLarge: true,
    idealFor: "Couples, Luxury Families & Ski Aficionados",
    bestSeason: "October to April",
  },
  {
    id: "dest-switzerland",
    name: "Swiss Alps & Engadin",
    stateOrCountry: "St. Moritz & Zermatt, Switzerland",
    badge: "Alpine Sanctuary",
    tripLength: "7–10 Days",
    priceFromInr: "₹3,40,000",
    description:
      "First-class Glacier Express Excellence Class panoramic trains, horse-drawn sleigh rides through Val Roseg, and suites at Badrutt's Palace with lake views.",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=85",
    idealFor: "Milestone Anniversaries & Epicurean Escapes",
    bestSeason: "December to March & June to September",
  },
  {
    id: "dest-maldives",
    name: "Baa & Noonu Atolls",
    stateOrCountry: "Republic of Maldives",
    badge: "Overwater Villas",
    tripLength: "5–7 Days",
    priceFromInr: "₹4,20,000",
    description:
      "Private seaplane transfers, UNESCO Biosphere manta ray snorkeling, and barefoot sunset dinners on private sandbanks with your own sommelier.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=85",
    idealFor: "Honeymooners & Restorative Luxury",
    bestSeason: "November to May",
  },
  {
    id: "dest-rajasthan",
    name: "Royal Rajasthan Palaces",
    stateOrCountry: "Udaipur, Jodhpur & Jaipur, India",
    badge: "Heritage Grandeur",
    tripLength: "6–9 Days",
    priceFromInr: "₹1,65,000",
    description:
      "Arrive by private ceremonial boat at Lake Pichola palaces, exclusive after-hours access to royal vintage car collections, and private tiger safaris in Ranthambore.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=85",
    idealFor: "Multi-Generational Families & Culture Connoisseurs",
    bestSeason: "October to March",
  },
];

export const CURATED_PACKAGES: PackageItem[] = [
  {
    id: "pkg-kashmir-flagship",
    title: "Secret Valleys of Kashmir & Gulmarg Alpine Retreat",
    tagline: "Handcrafted for travelers seeking untouched stillness, heated cedarwood houseboats, and snow-draped pine valleys.",
    destination: "Srinagar • Gulmarg • Pahalgam",
    region: "Domestic",
    theme: "Family Escapes",
    duration: "7 Days / 6 Nights",
    priceInr: "₹1,95,000",
    pricePer: "per couple (all-inclusive)",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
    featured: true,
    highlights: [
      "Exclusive 2 nights in private heritage houseboat with butler",
      "Gondola Phase II VIP lift passes & private ski instructor",
      "Fireside Wazwan or Sattvic vegetarian dinner curated by master waza",
      "Private 4x4 snow chauffeurs throughout the valley",
    ],
    inclusions: ["Chauffeured 4x4", "5-Star Resorts & Palace Houseboat", "Daily Breakfast & Wazwan Dinners", "All Permits & Gondola Passes"],
  },
  {
    id: "pkg-swiss-winter",
    title: "Engadin Valley & Matterhorn Winter Panorama",
    tagline: "The golden age of Swiss luxury travel, reimagined with Excellence Class rail and five-star alpine sanctuaries.",
    destination: "Zurich • St. Moritz • Zermatt",
    region: "International",
    theme: "Alpine Ski & Adventure",
    duration: "8 Days / 7 Nights",
    priceInr: "₹4,85,000",
    pricePer: "per couple",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=85",
    highlights: [
      "Glacier Express Excellence Class with 5-course wine pairing",
      "Lake-facing suite at Badrutt's Palace St. Moritz",
      "Private helicopter panoramic flight around Matterhorn summit",
      "Guaranteed reservations at 2-Star Michelin Da Vittorio",
    ],
    inclusions: ["First Class Swiss Rail Pass", "5-Star Superior Hotels", "Private Mountain Guide", "Visa Concierge & Schengen Priority"],
  },
  {
    id: "pkg-maldives-honeymoon",
    title: "Private Sandbank & Lagoon Overwater Sanctuary",
    tagline: "Pure Indian Ocean seclusion with dedicated thakuru (butler), dolphin sunset cruises, and reef exploration.",
    destination: "Baa Atoll, Maldives",
    region: "International",
    theme: "Honeymoon & Romance",
    duration: "5 Days / 4 Nights",
    priceInr: "₹3,90,000",
    pricePer: "per couple",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=85",
    highlights: [
      "Sunset Overwater Pool Villa with glass floor lounge",
      "Private chartered seaplane roundtrip transfers",
      "Intimate candlelight castaway sandbank dinner",
      "Daily 60-minute Ayurvedic couples massage in overwater pavilion",
    ],
    inclusions: ["Trans Maldivian Seaplane", "All-Inclusive Dining & Rare Cellar Wines", "Couples Spa Ritual", "Green Tax & Speedboat Charters"],
  },
  {
    id: "pkg-rajasthan-heritage",
    title: "Palaces of Mewar & Marwar Royal Circuit",
    tagline: "Experience the timeless grandeur of Udaipur and Jodhpur through private lake cruises and royal residence suites.",
    destination: "Udaipur • Jodhpur • Ranthambore",
    region: "Domestic",
    theme: "Royal Heritage",
    duration: "6 Days / 5 Nights",
    priceInr: "₹1,85,000",
    pricePer: "per couple",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=900&q=85",
    highlights: [
      "Stay at The Oberoi Udaivilas with direct semi-private pool access",
      "Private evening royal boat charter on Lake Pichola with champagne",
      "Exclusive after-hours walkthrough of Mehrangarh Fort with curator",
      "Two private jeep safaris in Ranthambore National Park Zone 1–5",
    ],
    inclusions: ["Luxury Toyota Vellfire Chauffeur", "Palace Heritage Suites", "Private Local Historians", "All National Park Permits"],
  },
  {
    id: "pkg-kashmir-honeymoon",
    title: "Moonlit Dal Lake & Pahalgam Whispering Pines",
    tagline: "Designed specifically for newly-weds seeking romantic stillness, shikaras lined with flowers, and fireplace evenings.",
    destination: "Srinagar • Pahalgam",
    region: "Domestic",
    theme: "Honeymoon & Romance",
    duration: "5 Days / 4 Nights",
    priceInr: "₹1,45,000",
    pricePer: "per couple",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=900&q=85",
    highlights: [
      "Private sunrise floating vegetable market shikara with hot saffron kahwa",
      "Riverfront wooden chalet overlooking the Lidder River in Pahalgam",
      "Private candlelit dinner under walnut trees with live Santoor recital",
      "Curated shopping tour of certified GI-tagged Pashmina ateliers",
    ],
    inclusions: ["Dedicated Chauffeur", "Boutique Pine Chalets", "Flower Shikara Rituals", "All Taxes & Airport VIP Meet-and-Greet"],
  },
  {
    id: "pkg-bhutan-sanctuary",
    title: "Kingdom of Bhutan: Tiger's Nest & Punakha Valleys",
    tagline: "A spiritually grounding journey through ancient Dzongs, Himalayan ridges, and Six Senses sanctuaries.",
    destination: "Paro • Thimphu • Punakha",
    region: "International",
    theme: "Family Escapes",
    duration: "7 Days / 6 Nights",
    priceInr: "₹3,80,000",
    pricePer: "per couple",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=85",
    highlights: [
      "Tiger's Nest Monastery private hike with sunrise monk blessing",
      "Suspension bridge crossing to riverside farmhouse picnic in Punakha",
      "All-inclusive Bhutan Sustainable Development Fee ($100/day) included",
      "Local expert guide fluent in English and Hindi",
    ],
    inclusions: ["Drukair Flight Assistance", "Luxury Lodge Stays", "Bhutan SDF Royalty & Permits", "Private Chauffeur & English Guide"],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    names: "Vikram & Radhika Singhania",
    city: "New Delhi",
    tripTaken: "7 Days Kashmir & Gulmarg Winter Sanctuary",
    travelDate: "January 2026",
    rating: 5,
    quote:
      "Planning a luxury trip to Kashmir with elderly parents and children can be overwhelming, but Voyara handled every single detail with breathtaking precision. From the heated cedarwood houseboat on Nigeen Lake to the VIP gondola boarding in Gulmarg, our dedicated WhatsApp concierge, Sameer, responded within thirty seconds every time. It was flawless.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "test-2",
    names: "Dr. Aakash & Neha Mehta",
    city: "Mumbai",
    tripTaken: "8 Days Swiss Alps & Matterhorn Panorama",
    travelDate: "December 2025",
    rating: 5,
    quote:
      "As strictly vegetarian travelers from Mumbai, dining in the European Alps often felt like an afterthought on past trips. Voyara not only booked our Excellence Class Glacier Express seats months in advance, but they also pre-coordinated with the hotel chefs in Zermatt and St. Moritz. We had warm, authentic Jain-friendly gourmet meals waiting for us every single evening.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "test-3",
    names: "Capt. Rajesh & Sunita Kapoor",
    city: "Chandigarh",
    tripTaken: "Royal Mewar Palaces & Ranthambore",
    travelDate: "February 2026",
    rating: 5,
    quote:
      "We celebrated our 25th wedding anniversary with Voyara across Udaipur and Ranthambore. The private boat charter on Lake Pichola with candlelight and musicians was pure poetry. There was zero stress, no hidden invoices, and the chauffeur was exceptionally courteous and knowledgeable.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
];

export const FLAGSHIP_ITINERARY: ItineraryDayItem[] = [
  {
    day: 1,
    title: "Arrival in Srinagar & Sunset Shikara on Dal Lake",
    location: "Srinagar, Kashmir",
    highlights: [
      "VIP tarmac welcome and private 4x4 transfer to your heritage cedarwood houseboat on tranquil Nigeen Lake",
      "Traditional Kahwa welcome infused with saffron and crushed almonds",
      "Private twilight Shikara cruise through floating lotus gardens as the Pir Panjal peaks turn gold",
    ],
    meals: "Traditional Kashmiri Wazwan or Sattvic Vegetarian Dinner",
    stay: "Sukoon Heritage Houseboat (Lakefront Master Suite)",
  },
  {
    day: 2,
    title: "The Old City Artisans & Mughal Terraced Gardens",
    location: "Srinagar, Kashmir",
    highlights: [
      "Private walking exploration of Srinagar's heritage wooden mosques and copper artisan lanes",
      "Visit to a 4th-generation Pashmina weaver atelier with certified GI-tag provenance",
      "Afternoon tea at Nishat and Shalimar Mughal Gardens with views across the water",
    ],
    meals: "Breakfast & Curated Garden Luncheon",
    stay: "Sukoon Heritage Houseboat",
  },
  {
    day: 3,
    title: "Ascent into the Pine Forests of Pahalgam",
    location: "Pahalgam, Kashmir",
    highlights: [
      "Scenic chauffeured drive along saffron fields of Pampore and Apple Orchards of Bijbehara",
      "Arrival at riverside pine chalet overlooking the rushing glacial waters of Lidder River",
      "Leisurely afternoon walk through Betaab Valley and Aru pine clearings",
    ],
    meals: "Breakfast & Riverside Fireside Dinner",
    stay: "The Chinar Resort & Spa or Pine Palace Chalet",
  },
  {
    day: 4,
    title: "The Alpine Slopes of Gulmarg & Phase II Gondola",
    location: "Gulmarg, Kashmir",
    highlights: [
      "Morning 4x4 transfer to Gulmarg (2,650m) through snow-dusted fir forests",
      "Skip-the-queue VIP boarding on the world's highest gondola to Apharwat Peak (3,980m)",
      "Private ski or snowshoeing lesson with certified mountain guides",
    ],
    meals: "Breakfast & Mountain Hut Luncheon",
    stay: "The Khyber Himalayan Resort & Spa (Premier Pine View)",
  },
  {
    day: 5,
    title: "Winter Wonderland & The Khyber L'Occitane Spa",
    location: "Gulmarg, Kashmir",
    highlights: [
      "Morning guided snow-scooter safari to the Frozen Strawberry Valley",
      "Afternoon hot stone massage at the L'Occitane Spa overlooking snow-capped peaks",
      "Evening cigar & single malt tasting by the hearth in the Calabash Lounge",
    ],
    meals: "Breakfast & Chef's Special 4-Course Tasting",
    stay: "The Khyber Himalayan Resort & Spa",
  },
  {
    day: 6,
    title: "Return to Srinagar & Crafts Emporium Salon",
    location: "Srinagar, Kashmir",
    highlights: [
      "Descend to Srinagar with private stop at saffron cooperatives in Pampore",
      "Private appointment at Kashmir's premier walnut wood carving studio",
      "Farewell rooftop dinner overlooking illuminated Shankaracharya Hill",
    ],
    meals: "Breakfast & Farewell Dinner",
    stay: "Vivanta Dal View or Heritage Bungalow",
  },
  {
    day: 7,
    title: "Farewell Kashmir: Expedited VIP Departure",
    location: "Srinagar Airport (SXR)",
    highlights: [
      "Final lakeside breakfast with freshly baked Kashmiri girda and nun chai",
      "Chauffeured airport transfer with luggage assistance and expedited security check-in",
    ],
    meals: "Breakfast",
    stay: "Departure Flight Home",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "How does booking a trip with Voyara Journeys work?",
    answer:
      "It starts with a simple conversation. You can send an enquiry through our website, message us directly on WhatsApp, or try our AI Concierge. Within 24 hours, an experienced senior travel specialist curates a complete, day-by-day tailored itinerary with hotel suites, private transfers, and confirmed pricing in ₹ INR. Once you review and refine it to your exact liking, a 20% deposit secures all reservations.",
    category: "General",
  },
  {
    question: "Do you cater to specific dietary preferences such as Jain, pure vegetarian, or Halal?",
    answer:
      "Yes, completely. Over 65% of our guests have specific culinary preferences. In destinations like Switzerland, Maldives, and Kashmir, we pre-coordinate with executive hotel chefs before your arrival so that your breakfast, excursions, and dinners have authentic, freshly prepared Jain, pure vegetarian, or vegan options waiting for you without any awkwardness.",
    category: "Dining & Logistics",
  },
  {
    question: "What is your on-trip support like once we depart?",
    answer:
      "You are assigned a dedicated on-trip human concierge who is connected with you via WhatsApp 24/7 throughout your journey. Whether you need a sudden table reservation change, weather re-routing, additional luggage transfers, or doctor-on-call assistance, you have a real person who knows your itinerary inside out answering within minutes.",
    category: "General",
  },
  {
    question: "Are your prices truly all-inclusive with no hidden costs?",
    answer:
      "Yes. Every proposal from Voyara Journeys outlines every single inclusion with total transparency. All 5-star hotel taxes, mandatory green taxes (e.g. in Maldives), GST, chauffeur allowances, highway tolls, national park permits, and internal scenic train tickets are included upfront. What you see is what you pay.",
    category: "Booking",
  },
  {
    question: "Can we make changes to the dates if our schedule changes?",
    answer:
      "We understand that work and family calendars can shift. Our bespoke private packages are built with maximum flexibility. Wherever possible, we select refundable rates and flexible hotel booking tiers. If you need to postpone, our team works with our airline and hotel partners to transfer your booking with minimal or zero amendment penalties.",
    category: "Flexibility",
  },
  {
    question: "Do you assist with Schengen visas and travel documentation?",
    answer:
      "Yes. For all our international journeys (including Switzerland and Europe), our in-house documentation desk prepares your visa cover letters, day-by-day itinerary manifests, confirmed hotel vouchers, and medical insurance, and coordinates your VFS appointment slots.",
    category: "Booking",
  },
];

export const SAMPLE_ITINERARY_DAYS = FLAGSHIP_ITINERARY;
export const FAQ_ITEMS = FAQS;
