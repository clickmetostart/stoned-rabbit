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
    slug: "skull-crossclubs",
    name: "Skull & Crossclubs",
    price: "$58",
    was: "$78",
    img: "/polo-skull.png",
    badge: "NEW DROP",
    category: "Men's Polos",
    shortDesc: "For the golfer who takes their game seriously and themselves not at all.",
    description: "The Skull & Crossclubs polo is built for the player who shows up to every muni with the energy of someone who just found out the course has drink cart service. Neon green skulls on jet black. Loud enough to scare the competition. Comfortable enough to wear all 19 holes.",
    details: [
      "92% Polyester / 8% Spandex performance blend",
      "4-way stretch for full swing mobility",
      "Moisture-wicking & quick-dry fabric",
      "UPF 50+ sun protection",
      "Machine washable — cold water, tumble dry low",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black / Green", hex: "#1a1a1a" },
    ],
    related: ["retro-static", "flamingo-country", "cool-crowd", "range-wrangler"],
  },
  {
    slug: "retro-static",
    name: "Retro Static",
    price: "$58",
    was: "$78",
    img: "/polo-retro.png",
    badge: "BEST SELLER",
    category: "Men's Polos",
    shortDesc: "When your fit hits harder than your drive.",
    description: "The Retro Static polo pulls from the golden era of loud golf fashion — when men wore things that made the tournament officials uncomfortable. Purple, teal, and hot pink in a jagged geometric pattern that looks like it belongs in an 80s ski resort, a Miami nightclub, or your Saturday morning tee time.",
    details: [
      "92% Polyester / 8% Spandex performance blend",
      "4-way stretch for full swing mobility",
      "Moisture-wicking & quick-dry fabric",
      "UPF 50+ sun protection",
      "Machine washable — cold water, tumble dry low",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Purple / Teal / Pink", hex: "#6b35a8" },
    ],
    related: ["skull-crossclubs", "flamingo-country", "cool-crowd", "fly-it-300"],
  },
  {
    slug: "flamingo-country",
    name: "Flamingo Country",
    price: "$58",
    was: "$78",
    img: "/polo-flamingo.png",
    badge: "NEW DROP",
    category: "Men's Polos",
    shortDesc: "Tropical energy. Zero apologies.",
    description: "The Flamingo Country polo is what happens when someone asks 'what if Miami had a golf course?' Pink flamingos, electric blue palm leaves, jet black background. Wear it to the round. Wear it to the bar after. The flamingos don't care where you go.",
    details: [
      "92% Polyester / 8% Spandex performance blend",
      "4-way stretch for full swing mobility",
      "Moisture-wicking & quick-dry fabric",
      "UPF 50+ sun protection",
      "Machine washable — cold water, tumble dry low",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black / Pink / Blue", hex: "#0d1b2a" },
    ],
    related: ["skull-crossclubs", "retro-static", "range-wrangler", "clubhouse-legend-cap"],
  },
  {
    slug: "range-wrangler",
    name: "The Range Wrangler",
    price: "$50",
    was: "$75",
    img: "/product-hat.png",
    badge: "BEST SELLER",
    category: "Headwear",
    shortDesc: "The hat that says 'I've been out here since 6am and I'm not leaving.'",
    description: "The Range Wrangler is the hat you grab before the sun comes up and forget to take off until you're back in the parking lot. Structured 5-panel, embroidered logo, adjustable strap. It survives bad shots, early tee times, and whatever the weather throws at the back nine.",
    details: [
      "100% premium cotton twill",
      "Structured 5-panel construction",
      "Embroidered Almost Elite logo",
      "Adjustable snapback closure",
      "One size fits most",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Forest Green", hex: "#2d5016" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1a2744" },
    ],
    related: ["clubhouse-legend-cap", "scramble-specialist-hat", "skull-crossclubs", "cool-crowd"],
  },
  {
    slug: "fly-it-300",
    name: "Fly It 300",
    price: "$50",
    was: "$75",
    img: "/product-womens.png",
    badge: "NEW DROP",
    category: "Women's",
    shortDesc: "Built for the golfer who actually knows how to play.",
    description: "The Fly It 300 collection is for the women who outdrove everyone in the group and said nothing about it. Performance-ready, fashion-forward, and built for players who care as much about their round as they do about how they look doing it.",
    details: [
      "88% Polyester / 12% Spandex stretch blend",
      "4-way stretch with free-range-of-motion cut",
      "Moisture-wicking technology",
      "UPF 50+ sun protection",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sage", hex: "#7a9e7e" },
      { name: "White", hex: "#f5f5f0" },
    ],
    related: ["skull-crossclubs", "retro-static", "scramble-specialist-hat", "clubhouse-legend-cap"],
  },
  {
    slug: "cool-crowd",
    name: "The Cool Crowd",
    price: "$68",
    img: "/product-polo.png",
    badge: "BEST SELLER",
    category: "Men's Polos",
    shortDesc: "The polo that started the group chat.",
    description: "The Cool Crowd is the go-to polo for the person who shows up to the first tee and immediately makes everyone else feel like they dressed wrong. Clean, confident, effortless. Built for 18 holes and whatever comes after.",
    details: [
      "92% Polyester / 8% Spandex performance blend",
      "4-way stretch for full swing mobility",
      "Moisture-wicking & quick-dry fabric",
      "UPF 50+ sun protection",
      "Machine washable",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#f5f5f0" },
      { name: "Slate", hex: "#708090" },
    ],
    related: ["skull-crossclubs", "retro-static", "flamingo-country", "range-wrangler"],
  },
  {
    slug: "scramble-specialist-hat",
    name: "Scramble Specialist",
    price: "$45",
    img: "/scramble-specialist-hat.jpg",
    badge: "CHARITY DROP",
    category: "Headwear",
    shortDesc: "The official hat of playing well enough to save the team.",
    description: "A limited-edition charity drop supporting the Boys & Girls Club of America. The Scramble Specialist trucker hat was designed for the player who steps up when it counts — picks up the team's worst shot, drains the 8-foot par putt, and buys the first round after. Part of every purchase supports the scramble.",
    details: [
      "Structured foam front panel",
      "Mesh back for breathability",
      "Script embroidery on front",
      "Boys & Girls Club partnership badge",
      "Snapback adjustable closure",
      "One size fits most",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Yellow / Black", hex: "#d4c200" },
    ],
    related: ["range-wrangler", "clubhouse-legend-cap", "skull-crossclubs", "cool-crowd"],
  },
  {
    slug: "clubhouse-legend-cap",
    name: "Clubhouse Legend Cap",
    price: "$42",
    img: "/clubhouse-legend-hat.jpg",
    badge: "NEW",
    category: "Headwear",
    shortDesc: "You don't have to be good. You just have to look like you belong.",
    description: "White structured snapback with Clubhouse Legend script across the front in red embroidery. The hat that says 'I've been at this course since before you got here and I'll be at the bar long after you leave.' Perfect for the round. Perfect for the 19th hole.",
    details: [
      "100% premium white cotton twill",
      "Structured 5-panel construction",
      "Red embroidered script logo",
      "Snapback adjustable closure",
      "One size fits most",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "White / Red", hex: "#f5f5f0" },
    ],
    related: ["range-wrangler", "scramble-specialist-hat", "cool-crowd", "skull-crossclubs"],
  },
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
