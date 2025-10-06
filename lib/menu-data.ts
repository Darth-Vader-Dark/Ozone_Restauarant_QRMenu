export interface MenuItem {
  id: string
  name: string
  description: string
  descriptionRw: string
  price: number
  image: string
}

export interface MenuCategory {
  id: string
  name: string
  nameRw: string
  items: MenuItem[]
}

export const menuData: MenuCategory[] = [
  {
    id: "rwandan",
    name: "Rwandan Dishes 🇷🇼",
    nameRw: "Ibiryo bya Rwanda",
    items: [
      {
        id: "isombe",
        name: "Isombe",
        description: "Cassava leaves cooked in rich peanut sauce with garlic and onions",
        descriptionRw: "Amababi y'imyumbati atekwa mu isosi y'ibishyimbo",
        price: 2500,
        image: "https://images.unsplash.com/photo-1604908177522-050e8c91ef9b?w=800&q=80",
      },
      {
        id: "ugali-goat",
        name: "Ugali with Goat Stew",
        description: "Traditional cornmeal porridge served with tender goat meat stew",
        descriptionRw: "Ubugali n'isosi y'ihene",
        price: 3500,
        image: "https://images.unsplash.com/photo-1617196039897-5cf6f0d34c20?w=800&q=80",
      },
      {
        id: "brochettes",
        name: "Brochettes",
        description: "Grilled beef or goat skewers marinated in traditional spices",
        descriptionRw: "Inyama y'inka cyangwa ihene ku nkoni",
        price: 2000,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
      },
      {
        id: "sambaza",
        name: "Sambaza",
        description: "Fried small fish from Lake Kivu, crispy and flavorful",
        descriptionRw: "Amafi mato yo mu kiyaga cya Kivu",
        price: 3000,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
      },
    ],
  },
  {
    id: "sudanese",
    name: "Sudanese Dishes 🇸🇩",
    nameRw: "Ibiryo bya Sudani",
    items: [
      {
        id: "kisra",
        name: "Kisra with Stew",
        description: "Fermented sorghum flatbread served with rich meat and vegetable stew",
        descriptionRw: "Umugati wa sorghum n'isosi",
        price: 3000,
        image: "https://images.unsplash.com/photo-1543353071-087092ec393b?w=800&q=80",
      },
      {
        id: "mullah-bamya",
        name: "Mullah Bamya",
        description: "Traditional okra stew with lamb in tomato-based sauce",
        descriptionRw: "Isosi y'intoryi n'inyama y'intama",
        price: 4500,
        image: "https://images.unsplash.com/photo-1589308078056-f7d2d0b5f25d?w=800&q=80",
      },
      {
        id: "ful-medames",
        name: "Ful Medames",
        description: "Slow-cooked fava beans with olive oil, garlic, and lemon",
        descriptionRw: "Ibishyimbo bitoshye n'amavuta ya elayo",
        price: 2800,
        image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=800&q=80",
      },
      {
        id: "shaiyah",
        name: "Shaiyah",
        description: "Grilled meat with traditional Sudanese spice blend",
        descriptionRw: "Inyama yokoye n'ibirungo bya Sudani",
        price: 4000,
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
      },
    ],
  },
  {
    id: "south-sudanese",
    name: "South Sudanese Dishes 🇸🇸",
    nameRw: "Ibiryo bya Sudani y'Amajyepfo",
    items: [
      {
        id: "asida",
        name: "Asida",
        description: "Smooth sorghum porridge served with savory meat sauce",
        descriptionRw: "Umutsima wa sorghum n'isosi y'inyama",
        price: 3000,
        image: "https://images.unsplash.com/photo-1613145993489-8f7d6aab8a6a?w=800&q=80",
      },
      {
        id: "kudura",
        name: "Kudura",
        description: "Mixed greens cooked in creamy peanut sauce",
        descriptionRw: "Imboga zitandukanye mu isosi y'ibishyimbo",
        price: 2800,
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80",
      },
      {
        id: "kawari",
        name: "Kawari",
        description: "Dried meat stew with traditional spices and vegetables",
        descriptionRw: "Isosi y'inyama yumye n'imboga",
        price: 4200,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
      },
      {
        id: "moukhbaza",
        name: "Moukhbaza",
        description: "Mashed banana with peanut butter and spices",
        descriptionRw: "Ibitoki byasukuwe n'ibishyimbo",
        price: 2500,
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80",
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks 🍹",
    nameRw: "Ibinyobwa",
    items: [
      {
        id: "passion-juice",
        name: "Fresh Passion Juice",
        description: "Freshly squeezed passion fruit juice, naturally sweet",
        descriptionRw: "Umutobe w'ipasiyo mushya",
        price: 2000,
        image: "https://images.unsplash.com/photo-1617191512364-8e0a7f5db3f0?w=800&q=80",
      },
      {
        id: "rwandan-coffee",
        name: "Rwandan Coffee",
        description: "Premium locally-grown coffee, rich and aromatic",
        descriptionRw: "Ikawa yo mu Rwanda",
        price: 2500,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
      },
      {
        id: "tamarind-juice",
        name: "Tamarind Juice",
        description: "Refreshing tamarind drink with a perfect sweet-sour balance",
        descriptionRw: "Umutobe wa tamarind",
        price: 1800,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&q=80",
      },
      {
        id: "hibiscus-tea",
        name: "Hibiscus Tea (Karkade)",
        description: "Traditional red hibiscus tea, served hot or cold",
        descriptionRw: "Icyayi cya hibiscus",
        price: 1500,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
      },
      {
        id: "mango-juice",
        name: "Fresh Mango Juice",
        description: "Sweet and tropical mango juice made from ripe mangoes",
        descriptionRw: "Umutobe w'imyembe",
        price: 2000,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80",
      },
      {
        id: "ginger-tea",
        name: "Ginger Tea",
        description: "Warming ginger tea with honey and lemon",
        descriptionRw: "Icyayi cya tangawizi",
        price: 1500,
        image: "https://images.unsplash.com/photo-1597318181274-17e0ca2cd01d?w=800&q=80",
      },
    ],
  },
  {
    id: "pastries-desserts",
    name: "Pastries & Desserts 🍰",
    nameRw: "Imigati n'Ibiryoha",
    items: [
      {
        id: "mandazi",
        name: "Mandazi",
        description: "East African sweet fried dough, lightly spiced with cardamom",
        descriptionRw: "Umugati ukonje w'Afurika y'Iburasirazuba",
        price: 1500,
        image: "https://images.unsplash.com/photo-1612182062631-5e6c4e8e4e8e?w=800&q=80",
      },
      {
        id: "chapati-honey",
        name: "Chapati with Honey",
        description: "Soft layered flatbread drizzled with local honey",
        descriptionRw: "Chapati n'ubuki",
        price: 2000,
        image: "https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=800&q=80",
      },
      {
        id: "banana-cake",
        name: "Banana Cake",
        description: "Moist homemade cake made with ripe local bananas",
        descriptionRw: "Keke y'ibitoki",
        price: 2500,
        image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=800&q=80",
      },
      {
        id: "sweet-potato-pudding",
        name: "Sweet Potato Pudding",
        description: "Creamy sweet potato dessert with cinnamon and vanilla",
        descriptionRw: "Pudding y'ibijumba",
        price: 2200,
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80",
      },
      {
        id: "coconut-macaroons",
        name: "Coconut Macaroons",
        description: "Sweet coconut cookies, crispy outside and chewy inside",
        descriptionRw: "Kuki za kokonayi",
        price: 1800,
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      },
      {
        id: "fruit-salad",
        name: "Fresh Fruit Salad",
        description: "Seasonal tropical fruits with a hint of lime and mint",
        descriptionRw: "Salade y'imbuto",
        price: 2800,
        image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=800&q=80",
      },
      {
        id: "peanut-brittle",
        name: "Peanut Brittle",
        description: "Crunchy caramelized peanut candy, a local favorite",
        descriptionRw: "Ibishyimbo byakonje",
        price: 1500,
        image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800&q=80",
      },
    ],
  },
]
