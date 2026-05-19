export enum Rarity {
  COMMON = "Common",
  UNCOMMON = "Uncommon",
  RARE = "Rare",
  LEGENDARY = "Legendary",
  MYTHICAL = "Mythical"
}

export enum FruitType {
  NATURAL = "Natural",
  ELEMENTAL = "Elemental",
  BEAST = "Beast"
}

export interface Fruit {
  id: string;
  name: string;
  rarity: Rarity;
  type: FruitType;
  price: number;
  description: string;
  color: string;
  image: string;
}

export const BLOX_FRUITS: Fruit[] = [
  // Mythical
  {
    id: "kitsune",
    name: "Kitsune",
    rarity: Rarity.MYTHICAL,
    type: FruitType.BEAST,
    price: 8000000,
    description: "Converts into a legendary Kitsune with overwhelming power.",
    color: "#ff3e81",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "leopard",
    name: "Leopard",
    rarity: Rarity.MYTHICAL,
    type: FruitType.BEAST,
    price: 5000000,
    description: "Transforms into a fast and powerful leopard.",
    color: "#ffcc00",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "dragon",
    name: "Dragon",
    rarity: Rarity.MYTHICAL,
    type: FruitType.BEAST,
    price: 3500000,
    description: "Breath of fire and absolute dominance over the skies.",
    color: "#e60000",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "dough",
    name: "Dough",
    rarity: Rarity.MYTHICAL,
    type: FruitType.ELEMENTAL,
    price: 2800000,
    description: "Manipulate dough for sticky and explosive attacks.",
    color: "#f5e1da",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "spirit",
    name: "Spirit",
    rarity: Rarity.MYTHICAL,
    type: FruitType.NATURAL,
    price: 3400000,
    description: "Summon spirits to aid you in battle.",
    color: "#00d4ff",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "venom",
    name: "Venom",
    rarity: Rarity.MYTHICAL,
    type: FruitType.NATURAL,
    price: 3000000,
    description: "Poisonous clouds and transformation into a three-headed hydra.",
    color: "#9900cc",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },

  // Legendary
  {
    id: "t-rex",
    name: "T-Rex",
    rarity: Rarity.LEGENDARY,
    type: FruitType.BEAST,
    price: 2700000,
    description: "Dominate the prehistoric era with pure muscle.",
    color: "#4b5320",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "mammoth",
    name: "Mammoth",
    rarity: Rarity.LEGENDARY,
    type: FruitType.BEAST,
    price: 2700000,
    description: "Crush your enemies with massive weight.",
    color: "#a67c52",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "magma",
    name: "Magma",
    rarity: Rarity.RARE, // Magma is Rare usually, but in Blox Fruits V2 it's very strong. Let's stick to conventional rarities.
    type: FruitType.ELEMENTAL,
    price: 850000,
    description: "High damage output with molten lava.",
    color: "#cc3300",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "light",
    name: "Light",
    rarity: Rarity.RARE,
    type: FruitType.ELEMENTAL,
    price: 650000,
    description: "Blinding speed and precision strikes.",
    color: "#ffff99",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "buddha",
    name: "Buddha",
    rarity: Rarity.RARE,
    type: FruitType.BEAST,
    price: 1200000,
    description: "Grow in size and gain exceptional defense.",
    color: "#ffd700",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "portal",
    name: "Portal",
    rarity: Rarity.LEGENDARY,
    type: FruitType.NATURAL,
    price: 1900000,
    description: "Teleport and manipulate space.",
    color: "#3300cc",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "gravity",
    name: "Gravity",
    rarity: Rarity.MYTHICAL, // Gravity is often Mythical/Legendary depending on update
    type: FruitType.NATURAL,
    price: 2500000,
    description: "Control the forces of weight itself.",
    color: "#2c2c2c",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },

  // Rare
  {
    id: "ice",
    name: "Ice",
    rarity: Rarity.RARE,
    type: FruitType.ELEMENTAL,
    price: 350000,
    description: "Freeze the ground and walk on water.",
    color: "#afeeee",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "dark",
    name: "Dark",
    rarity: Rarity.RARE,
    type: FruitType.ELEMENTAL,
    price: 500000,
    description: "Endless darkness and black holes.",
    color: "#1a1a1a",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },

  // Common
  {
    id: "rocket",
    name: "Rocket",
    rarity: Rarity.COMMON,
    type: FruitType.NATURAL,
    price: 5000,
    description: "Classic movement and explosive power.",
    color: "#6b7280",
    image: "https://i.imgur.com/PW3IbtQ.png"
  },
  {
    id: "spin",
    name: "Spin",
    rarity: Rarity.COMMON,
    type: FruitType.NATURAL,
    price: 7500,
    description: "Infinite spinning action.",
    color: "#9ca3af",
    image: "https://i.imgur.com/PW3IbtQ.png"
  }
];

export const getRarityWeight = (rarity: Rarity): number => {
  switch (rarity) {
    case Rarity.COMMON: return 100;
    case Rarity.UNCOMMON: return 50;
    case Rarity.RARE: return 20;
    case Rarity.LEGENDARY: return 5;
    case Rarity.MYTHICAL: return 1;
    default: return 1;
  }
};
