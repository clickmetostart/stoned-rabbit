export interface Product {
  slug: string;
  name: string;
  price: string;
  was?: string;
  img: string;
  badge?: string;
  category: string;
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
    shortDesc: "Heavyweight cotton with graffiti street art print.",
    description: "The Neon Dreams Tee is built for the night owls. Thick 100% cotton, relaxed fit, and a bold neon green graffiti rabbit on the back. It glows under blacklight, just in case you find yourself at the right kind of party.",
    details: [
      "100% heavyweight ringspun cotton",
      "Relaxed, oversized fit",
      "UV-reactive neon puff print",
      "Pre-shrunk to minimize shrinkage",
      "Machine wash cold, air dry",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal Black", hex: "#1a1a1a" },
    ],
    related: ["acid-wash-hoodie", "classic-stash-jar", "rabbit-hole-beanie", "street-grinder"],
  },
  {
    slug: "acid-wash-hoodie",
    name: "Acid Wash Pullover",
    price: "$85",
    img: "/acid_wash_hoodie.png",
    badge: "BEST SELLER",
    category: "Apparel",
    shortDesc: "The hoodie you'll never want to take off.",
    description: "A premium heavyweight acid wash hoodie featuring the Stoned Rabbit tag embroidered in electric pink. French terry interior keeps you warm without overheating during your sesh.",
    details: [
      "400gsm heavyweight French Terry",
      "Custom acid wash dye process (each piece is unique)",
      "High-density embroidery on chest",
      "Double-lined hood",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Acid Black", hex: "#2a2a2a" },
    ],
    related: ["neon-dreams-tee", "rabbit-hole-beanie", "classic-stash-jar", "street-grinder"],
  },
  {
    slug: "rabbit-hole-beanie",
    name: "Rabbit Hole Beanie",
    price: "$25",
    img: "/rabbit_hole_beanie.png",
    badge: "NEW",
    category: "Headwear",
    shortDesc: "Keep it lowkey. Stay warm.",
    description: "Classic fisherman-style beanie with a folded cuff and neon green Stoned Rabbit woven label. Fits snug, looks good with everything.",
    details: [
      "100% hypoallergenic acrylic",
      "Fisherman style short fit",
      "Woven logo label",
      "One size fits most",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Neon Green", hex: "#39ff14" },
    ],
    related: ["acid-wash-hoodie", "neon-dreams-tee", "street-grinder", "classic-stash-jar"],
  },
  {
    slug: "street-grinder",
    name: "Street Art Grinder",
    price: "$40",
    img: "/street_grinder.png",
    badge: "BEST SELLER",
    category: "Accessories",
    shortDesc: "Aircraft-grade aluminum. Effortless grind.",
    description: "A 4-piece, 2.5-inch grinder made from aerospace-grade aluminum. Features sharp diamond-shaped teeth, a mesh kief screen, and a magnetic top. The lid features our signature graffiti rabbit engraved in neon.",
    details: [
      "4-piece aluminum construction",
      "Diamond-cut teeth for a fluffy grind",
      "Stainless steel pollen screen",
      "Magnetic lid",
      "Includes mini scraper",
    ],
    sizes: ["2.5 Inch"],
    colors: [
      { name: "Matte Black", hex: "#1a1a1a" },
    ],
    related: ["classic-stash-jar", "neon-dreams-tee", "rabbit-hole-beanie", "acid-wash-hoodie"],
  },
  {
    slug: "classic-stash-jar",
    name: "UV Glass Stash Jar",
    price: "$20",
    img: "/classic_stash_jar.png",
    category: "Glass",
    shortDesc: "Keep it fresh. Keep it dark.",
    description: "Premium UV-resistant dark violet glass jar that blocks harmful light from degrading your stash. Airtight seal keeps odors locked in and freshness intact.",
    details: [
      "250ml capacity (holds approx 1/2 oz)",
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
    badge: "LIMITED",
    category: "Glass",
    shortDesc: "12-inch heavy beaker with custom sandblasted graffiti.",
    description: "This isn't just glass, it's art. A 12-inch heavy-duty borosilicate glass beaker bong with a wide base and ice pinch. Features custom sandblasted Stoned Rabbit graffiti that wraps around the neck.",
    details: [
      "12 inches tall",
      "7mm thick borosilicate glass",
      "14mm female joint with diffused downstem",
      "Ice catcher",
      "Custom sandblasted design",
    ],
    sizes: ["12 Inch"],
    colors: [
      { name: "Clear", hex: "#ffffff" },
    ],
    related: ["street-grinder", "classic-stash-jar", "neon-dreams-tee", "acid-wash-hoodie"],
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((s) => ALL_PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);
}
