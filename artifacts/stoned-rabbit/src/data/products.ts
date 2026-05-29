export interface Product {
  slug: string;
  name: string;
  price: string;
  was?: string;
  img: string;
  badge?: string;
  category: string;
  collection: string;
  vault?: boolean;
  shortDesc: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  related: string[];
}

export const ALL_PRODUCTS: Product[] = [
  {
    slug: "neon-dreams-tee",
    name: "Neon Dreams Tee",
    price: "$35",
    was: "$45",
    img: "/neon_dreams_tee.png",
    badge: "NEW DROP",
    category: "Apparel",
    collection: "nocturne",
    shortDesc: "Heavyweight cotton with a UV-reactive rabbit print.",
    description: "The Neon Dreams Tee is built for the ones who move when the city gets quiet. Thick 100% cotton, relaxed fit, UV-reactive rabbit mark on the back. Minimal on the front. Everything on the back.",
    details: [
      "100% heavyweight ringspun cotton",
      "Relaxed, oversized fit",
      "UV-reactive puff print",
      "Pre-shrunk to minimize shrinkage",
      "Machine wash cold, air dry",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal Black", hex: "#1a1a1a" },
    ],
    related: ["signature-hoodie", "classic-stash-jar", "rabbit-hole-cap", "street-grinder"],
  },
  {
    slug: "signature-hoodie",
    name: "Stoned Rabbit Hoodie",
    price: "$85",
    img: "/Stoned Rabbit Logo - hoodie 1.png",
    badge: "BEST SELLER",
    category: "Apparel",
    collection: "signature",
    shortDesc: "Heavyweight organic cotton French terry with the signature embroidered rabbit.",
    description: "The Stoned Rabbit Hoodie is a premium heavyweight streetwear essential. Knit from 450gsm organic cotton French terry, it features a structured, relaxed silhouette that holds its shape. Complete with a double-lined crossover hood, ribbed side panels for comfort, and the iconic Stoned Rabbit logo meticulously embroidered on the chest.",
    details: [
      "450gsm heavyweight organic cotton French terry",
      "Classic relaxed fit",
      "High-density embroidered logo on chest",
      "Double-lined crossover hood (no drawstrings) for a clean look",
      "Ribbed cuffs, hem, and side gussets",
      "Pre-shrunk to fit perfectly",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal Black", hex: "#1a1a1a" },
    ],
    related: ["neon-dreams-tee", "rabbit-hole-cap", "classic-stash-jar", "street-grinder"],
  },
  {
    slug: "rabbit-hole-cap",
    name: "Rabbit Hole Cap",
    price: "$25",
    img: "/Stoned Rabbit Womens Hoodie and Hat.png",
    badge: "NEW",
    category: "Headwear",
    collection: "signature",
    shortDesc: "Keep it low. Block the sun.",
    description: "Classic structured 6-panel snapback cap with a curved brim and woven SR label. Looks good with everything, says nothing to people who don't already know.",
    details: [
      "100% premium cotton twill",
      "Classic 6-panel structured design",
      "Adjustable plastic snap closure",
      "Woven logo patch",
      "One size fits most",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Ash", hex: "#3a3a3a" },
    ],
    related: ["signature-hoodie", "neon-dreams-tee", "street-grinder", "classic-stash-jar"],
  },
  {
    slug: "street-grinder",
    name: "SR Grinder",
    price: "$40",
    img: "/street_grinder.png",
    badge: "BEST SELLER",
    category: "Accessories",
    collection: "everyday",
    shortDesc: "Aircraft-grade aluminum. Effortless grind.",
    description: "A 4-piece, 2.5-inch grinder machined from aerospace-grade aluminum. Sharp diamond-cut teeth, stainless kief screen, magnetic top. The SR mark is laser-etched — not painted.",
    details: [
      "4-piece aluminum construction",
      "Diamond-cut teeth for a fluffy, consistent grind",
      "Stainless steel pollen screen",
      "Magnetic lid",
      "Includes mini scraper",
    ],
    sizes: ["2.5 Inch"],
    colors: [
      { name: "Matte Black", hex: "#1a1a1a" },
    ],
    related: ["classic-stash-jar", "neon-dreams-tee", "rabbit-hole-cap", "signature-hoodie"],
  },
  {
    slug: "classic-stash-jar",
    name: "UV Glass Stash Jar",
    price: "$20",
    img: "/classic_stash_jar.png",
    category: "Accessories",
    collection: "everyday",
    shortDesc: "Keep it fresh. Keep it dark.",
    description: "Premium UV-blocking violet glass jar. Airtight seal, odor-proof, blocks light degradation. Sits on your shelf and looks like it belongs there.",
    details: [
      "250ml capacity",
      "UV-blocking violet glass",
      "Airtight screw-top lid",
      "Odor proof",
    ],
    sizes: ["250ml"],
    colors: [
      { name: "Violet Glass", hex: "#2b00ff" },
    ],
    related: ["street-grinder", "rabbit-hole-beanie", "acid-wash-hoodie", "neon-dreams-tee"],
  },
  {
    slug: "graffiti-bong",
    name: "The Tag Beaker",
    price: "$120",
    img: "/graffiti_bong.png",
    badge: "VAULT",
    category: "Glass",
    collection: "vault",
    vault: true,
    shortDesc: "12-inch heavy beaker with custom sandblasted SR tag.",
    description: "This isn't just glass — it's a piece. A 12-inch heavy-duty borosilicate beaker with wide base and ice pinch. Custom sandblasted Stoned Rabbit tag wraps the neck. Limited run. No reprints.",
    details: [
      "12 inches tall",
      "7mm thick borosilicate glass",
      "14mm female joint with diffused downstem",
      "Ice catcher",
      "Custom sandblasted design — no two exactly alike",
    ],
    sizes: ["12 Inch"],
    colors: [
      { name: "Clear", hex: "#ffffff" },
    ],
    related: ["street-grinder", "classic-stash-jar", "neon-dreams-tee", "signature-hoodie"],
  }
];

export const COLLECTIONS = [
  {
    slug: "signature",
    name: "Signature Series",
    sub: "The core line. Always available, always right.",
    description: "The foundation of Stoned Rabbit. Understated apparel built for the person who doesn't need to explain their taste.",
    img: "/Stoned Rabbit Logo - hoodie 1.png",
    count: ALL_PRODUCTS.filter(p => p.collection === "signature").length,
  },
  {
    slug: "nocturne",
    name: "Nocturne",
    sub: "For when the city gets quiet.",
    description: "Dark colorways and UV-reactive details. Built for late nights and early mornings — whenever you're most yourself.",
    img: "/neon_dreams_tee.png",
    count: ALL_PRODUCTS.filter(p => p.collection === "nocturne").length,
  },
  {
    slug: "everyday",
    name: "Everyday Carry",
    sub: "The essentials. Never leave without them.",
    description: "Grinders, stash jars, and accessories for the person who has a system. Precision-built. Quietly premium.",
    img: "/classic_stash_jar.png",
    count: ALL_PRODUCTS.filter(p => p.collection === "everyday").length,
  },
];

export const VAULT_PRODUCTS = ALL_PRODUCTS.filter(p => p.vault);

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((s) => ALL_PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return ALL_PRODUCTS.filter(p => p.collection === collectionSlug);
}
