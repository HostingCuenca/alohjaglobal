import { Product } from '@/types/cart'

export const products: Product[] = [
  {
    id: "coffee-alta-montana",
    sku: "CAM",
    name: "Café molido tueste claro (Café alta montaña)",
    nameEn: "Ground coffee light roast (High Mountain Coffee)",
    description: "Delicado y aromático, dulzor natural con notas frutales. Origen: Portovelo – El Oro. Variedad: Typica. Secado: Natural. Altitud: 1200–1600 msnm. Tostado: medio (Cinnamon).",
    descriptionEn: "Delicate and aromatic, natural sweetness with fruity notes. Origin: Portovelo – El Oro. Variety: Typica. Process: Natural. Altitude: 1200–1600 masl. Roast: medium (Cinnamon).",
    longDescription: "Un café delicado y aromático que resalta el dulzor natural de su origen. Las notas frutales se combinan con una brillantez característica, ideal para quienes buscan un perfil suave y elegante en cada taza.",
    longDescriptionEn: "A delicate and aromatic coffee that highlights the natural sweetness of its origin. Fruity notes combine with characteristic brightness, ideal for those seeking a smooth and elegant profile in every cup.",
    weightGrams: 250,
    roastLevel: "light",
    grindType: "ground",
    packagingType: "bag",
    priceUsd: 6.80,
    priceLocal: 6.80,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/1. cafe alta montaña/4. 250 gr.png",
    galleryImages: [
      "/assets/nuevosproductos/1. cafe alta montaña/4. 250 gr.png",
      "/assets/nuevosproductos/1. cafe alta montaña/5. 340 gr.png",
      "/assets/nuevosproductos/1. cafe alta montaña/2. en español.png",
      "/assets/nuevosproductos/1. cafe alta montaña/1. en ingles.png"
    ],
    weightOptions: [
      { weight: 250, price: 6.80, sku: "CAM250", image: "/assets/nuevosproductos/1. cafe alta montaña/4. 250 gr.png" },
      { weight: 340, price: 8.70, sku: "CAM340", image: "/assets/nuevosproductos/1. cafe alta montaña/5. 340 gr.png" }
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["aromático", "frutal", "ligero"],
    flavorNotes: ["Frutal", "Dulzor natural", "Brillante"],
    brewingRecommendations: "Filtro: V60, Chemex o prensa francesa. Agua 90–95 °C; molienda media-fina.",
    variety: { name: "Typica" }
  },
  {
    id: "coffee-cordillera",
    sku: "CCO",
    name: "Café molido tueste oscuro (Café Cordillera)",
    nameEn: "Ground coffee dark roast (Cordillera Coffee)",
    description: "Intenso y profundo, cuerpo robusto y dulzura acaramelada con notas a chocolate y frutos secos. Origen: Catacocha – Loja. Variedad: Bourbon. Secado: Natural. Altitud: 1650–1800 msnm. Tostado: medio-oscuro (American).",
    descriptionEn: "Intense and deep, robust body and caramel-like sweetness with chocolate and nutty notes. Origin: Catacocha – Loja. Variety: Bourbon. Process: Natural. Altitude: 1650–1800 masl. Roast: medium-dark (American).",
    longDescription: "Un café intenso y profundo, con un cuerpo robusto que aporta dulzura acaramelada. Las notas a chocolate y frutos secos crean un perfil complejo y satisfactorio, perfecto para quienes disfrutan de una experiencia más intensa.",
    longDescriptionEn: "An intense and deep coffee with a robust body that brings caramelized sweetness. Chocolate and nutty notes create a complex and satisfying profile, perfect for those who enjoy a more intense experience.",
    weightGrams: 250,
    roastLevel: "dark",
    grindType: "ground",
    packagingType: "bag",
    priceUsd: 7.50,
    priceLocal: 7.50,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/2. cafe cordillera/7. 250 gr.png",
    galleryImages: [
      "/assets/nuevosproductos/2. cafe cordillera/7. 250 gr.png",
      "/assets/nuevosproductos/2. cafe cordillera/8. 340 gr.png",
      "/assets/nuevosproductos/2. cafe cordillera/2. en español.png",
      "/assets/nuevosproductos/2. cafe cordillera/cafe cordillera parte de atras.png"
    ],
    weightOptions: [
      { weight: 250, price: 7.50, sku: "CCO250", image: "/assets/nuevosproductos/2. cafe cordillera/7. 250 gr.png" },
      { weight: 340, price: 9.30, sku: "CCO340", image: "/assets/nuevosproductos/2. cafe cordillera/8. 340 gr.png" }
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["intenso", "chocolate", "frutos-secos"],
    flavorNotes: ["Chocolate", "Frutos secos", "Caramelo"],
    brewingRecommendations: "Excelente para espresso o moka. Para filtro, usar molienda media.",
    variety: { name: "Bourbon" }
  },
  {
    id: "coffee-classic-light-200",
    sku: "CCL200",
    name: "Café molido clásico claro 200 gr (Clásico café de valle)",
    nameEn: "Classic ground coffee light 200 g (Valley Classic)",
    description: "Blend equilibrado con suavidad y frescura; notas sutiles a miel y flores. Origen: Cariamanga – Loja. Variedades: Typica-Bourbon. Secado: Natural. Altitud: 1650–1700 msnm. Tostado: medio (City).",
    descriptionEn: "Balanced blend with smoothness and freshness; subtle honey and floral notes. Origin: Cariamanga – Loja. Varieties: Typica-Bourbon. Process: Natural. Altitude: 1650–1700 masl. Roast: medium (City).",
    longDescription: "Este blend permite el equilibrio perfecto entre suavidad y frescura. Sus notas sutiles a miel y flores se combinan con un dulzor ligero que lo convierte en un café ideal para todos los días.",
    longDescriptionEn: "This blend achieves the perfect balance between smoothness and freshness. Its subtle honey and floral notes combine with a light sweetness that makes it an ideal everyday coffee.",
    weightGrams: 200,
    roastLevel: "light",
    grindType: "ground",
    packagingType: "bag",
    priceUsd: 4.50,
    priceLocal: 4.50,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/5. Clasico cafe de valle/3.png",
    galleryImages: [
      "/assets/nuevosproductos/5. Clasico cafe de valle/3.png",
      "/assets/nuevosproductos/5. Clasico cafe de valle/2. en español.png",
      "/assets/nuevosproductos/5. Clasico cafe de valle/1. en ingles.png",
      "/assets/nuevosproductos/5. Clasico cafe de valle/4.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["miel", "floral", "suave"],
    flavorNotes: ["Miel", "Floral", "Dulzor ligero"],
    variety: { name: "Typica-Bourbon" }
  },
  {
    id: "coffee-classic-dark-200",
    sku: "CCD200",
    name: "Café molido clásico oscuro 200 gr (Café oscuro blend)",
    nameEn: "Classic ground coffee dark 200 g (Dark Blend)",
    description: "Perfil tradicional y balanceado, carácter intenso y dulzura tostada. Origen: Cariamanga – Loja. Variedades: Typica-Bourbon. Secado: Natural. Altitud: 1650–1700 msnm. Tostado: medio-oscuro (Full City).",
    descriptionEn: "Traditional, balanced profile with intense character and toasted sweetness. Origin: Cariamanga – Loja. Varieties: Typica-Bourbon. Process: Natural. Altitude: 1650–1700 masl. Roast: medium-dark (Full City).",
    longDescription: "Un café con perfil tradicional y balanceado, que aporta carácter intenso sin perder su dulzura tostada. Su cuerpo medio lo hace versátil y apropiado para distintas preparaciones.",
    longDescriptionEn: "A coffee with a traditional and balanced profile that delivers intense character without losing its toasted sweetness. Its medium body makes it versatile and suitable for different brewing methods.",
    weightGrams: 200,
    roastLevel: "dark",
    grindType: "ground",
    packagingType: "bag",
    priceUsd: 4.80,
    priceLocal: 4.80,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/6. Clasico cafe oscuro blend/3.png",
    galleryImages: [
      "/assets/nuevosproductos/6. Clasico cafe oscuro blend/3.png",
      "/assets/nuevosproductos/6. Clasico cafe oscuro blend/2. en español.png",
      "/assets/nuevosproductos/6. Clasico cafe oscuro blend/1. en ingles.png",
      "/assets/nuevosproductos/6. Clasico cafe oscuro blend/4.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["tradicional", "balanceado"],
    flavorNotes: ["Dulzor tostado", "Cuerpo medio", "Clásico"],
    variety: { name: "Typica-Bourbon" }
  },
  {
    id: "whole-bean-light-340",
    sku: "WBL340",
    name: "Café en grano tueste claro 340 gr (Café Origen Profundo)",
    nameEn: "Whole bean light roast 340 g (Deep Origin Coffee)",
    description: "Granos seleccionados con notas cítricas y florales. Origen: Nanegal – Pichincha. Variedades: Bourbon–Typica. Secado: Natural. Altitud: 1200–1600 msnm. Tostado: medio (Cinnamon). Malla 14–18.",
    descriptionEn: "Selected beans with citrus and floral notes. Origin: Nanegal – Pichincha. Varieties: Bourbon–Typica. Process: Natural. Altitude: 1200–1600 masl. Roast: medium (Cinnamon). Screen size 14–18.",
    longDescription: "Granos de alta calidad con un perfil cítrico y floral que destacan en métodos de filtro. Su dulzor natural y acidez brillante lo convierten en un café perfecto para los amantes de perfiles complejos y limpios.",
    longDescriptionEn: "High-quality beans with a citrus and floral profile that excel in filter methods. Its natural sweetness and bright acidity make it a perfect coffee for lovers of complex and clean profiles.",
    weightGrams: 340,
    roastLevel: "light",
    grindType: "whole_bean",
    packagingType: "bag",
    priceUsd: 8.90,
    priceLocal: 8.90,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/3. cafe origen profundo/340 gr claro.png",
    galleryImages: [
      "/assets/nuevosproductos/3. cafe origen profundo/340 gr claro.png",
      "/assets/nuevosproductos/3. cafe origen profundo/1. en español.png",
      "/assets/nuevosproductos/3. cafe origen profundo/2. en ingles.png",
      "/assets/nuevosproductos/3. cafe origen profundo/340 gramos claro atras.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["cítrico", "floral", "filtro"],
    flavorNotes: ["Cítrico", "Floral", "Dulce"],
    brewingRecommendations: "Ideal para V60, Chemex o Aeropress; moler fino para mayor extracción."
  },
  {
    id: "whole-bean-dark-340",
    sku: "WBD340",
    name: "Café en grano tueste oscuro 340 gr (Café Selva Negra)",
    nameEn: "Whole bean dark roast 340 g (Black Forest Coffee)",
    description: "Notas a cacao y caramelo oscuro; cuerpo intenso. Origen: Pichincha–Loja. Variedades: Bourbon–Typica. Secado: Natural. Altitud: 1200–1600 msnm. Tostado: medio-oscuro (American). Malla 14–18.",
    descriptionEn: "Cocoa and dark caramel notes; intense body. Origin: Pichincha–Loja. Varieties: Bourbon–Typica. Process: Natural. Altitude: 1200–1600 masl. Roast: medium-dark (American). Screen 14–18.",
    longDescription: "Un café intenso con notas profundas a cacao y caramelo oscuro. Su cuerpo robusto lo hace ideal para espresso y métodos que resaltan la concentración de sabores. Una experiencia intensa y memorable.",
    longDescriptionEn: "An intense coffee with deep cocoa and dark caramel notes. Its robust body makes it ideal for espresso and methods that highlight flavor concentration. An intense and memorable experience.",
    weightGrams: 340,
    roastLevel: "dark",
    grindType: "whole_bean",
    packagingType: "bag",
    priceUsd: 9.40,
    priceLocal: 9.40,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/4. Cafe selva negra/13. solo en 340 gr.png",
    galleryImages: [
      "/assets/nuevosproductos/4. Cafe selva negra/13. solo en 340 gr.png",
      "/assets/nuevosproductos/4. Cafe selva negra/2. en español.png",
      "/assets/nuevosproductos/4. Cafe selva negra/1. en ingles.png",
      "/assets/nuevosproductos/4. Cafe selva negra/14.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["cacao", "caramelo", "espresso"],
    flavorNotes: ["Cacao", "Caramelo oscuro", "Cuerpo intenso"],
    brewingRecommendations: "Óptimo para espresso y moka; también válido en filtro con molienda media-fina."
  },
  {
    id: "whole-bean-light-1000-blend",
    sku: "WBL1K",
    name: "Café en grano tueste claro 1 kg (blend)",
    nameEn: "Whole bean light roast 1 kg (blend)",
    description: "Mezcla de fincas (Pichincha–Loja–Portovelo) con dulzura natural y notas frutales suaves. Variedades: Bourbon–Typica. Secado: Natural. Altitud: 1200–1600 msnm. Tostado: medio (Cinnamon). Malla 14–18.",
    descriptionEn: "Multi-farm blend (Pichincha–Loja–Portovelo) with natural sweetness and soft fruity notes. Varieties: Bourbon–Typica. Process: Natural. Altitude: 1200–1600 masl. Roast: medium (Cinnamon). Screen 14–18.",
    longDescription: "Blend de múltiples fincas que combina lo mejor de cada región. Su dulzura natural y notas frutales suaves lo hacen versátil para diferentes métodos de preparación. Ideal para cafeterías y consumo diario.",
    longDescriptionEn: "Multi-farm blend that combines the best of each region. Its natural sweetness and soft fruity notes make it versatile for different brewing methods. Ideal for coffee shops and daily consumption.",
    weightGrams: 1000,
    roastLevel: "light",
    grindType: "whole_bean",
    packagingType: "bag",
    priceUsd: 26.70,
    priceLocal: 26.70,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/8. cafe tueste claro grano kilogramo/23.png",
    galleryImages: [
      "/assets/nuevosproductos/8. cafe tueste claro grano kilogramo/23.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["blend", "filtro"],
    flavorNotes: ["Frutal suave", "Dulzor natural"]
  },
  {
    id: "whole-bean-dark-1000-blend",
    sku: "WBD1K",
    name: "Café en grano tueste oscuro 1 kg (blend)",
    nameEn: "Whole bean dark roast 1 kg (blend)",
    description: "Blend con fuerza y complejidad; notas intensas de chocolate oscuro y final prolongado. Origen: Pichincha–Loja–Portovelo. Variedades: Bourbon–Typica. Secado: Natural. Altitud: 1200–1600 msnm. Tostado: medio-oscuro (American).",
    descriptionEn: "Bold, complex blend with intense dark-chocolate notes and a long finish. Origin: Pichincha–Loja–Portovelo. Varieties: Bourbon–Typica. Process: Natural. Altitude: 1200–1600 masl. Roast: medium-dark (American).",
    longDescription: "Un blend potente y complejo con notas intensas de chocolate oscuro y un final prolongado. Su cuerpo alto lo hace perfecto para espresso y métodos de inmersión. Ideal para negocios y consumo en grandes volúmenes.",
    longDescriptionEn: "A bold and complex blend with intense dark chocolate notes and a long finish. Its full body makes it perfect for espresso and immersion methods. Ideal for businesses and high-volume consumption.",
    weightGrams: 1000,
    roastLevel: "dark",
    grindType: "whole_bean",
    packagingType: "bag",
    priceUsd: 27.50,
    priceLocal: 27.50,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/9. Cafe tueste oscuro grano kilogramo/21.png",
    galleryImages: [
      "/assets/nuevosproductos/9. Cafe tueste oscuro grano kilogramo/21.png",
      "/assets/nuevosproductos/9. Cafe tueste oscuro grano kilogramo/22.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["blend", "espresso"],
    flavorNotes: ["Chocolate oscuro", "Cuerpo alto"],
    brewingRecommendations: "Ideal para espresso y moka; en filtro usar molienda media."
  },
  {
    id: "whole-bean-origin-light-1000",
    sku: "WBO-L1K",
    name: "Café en grano 1 kg origen (tueste claro)",
    nameEn: "Whole bean 1 kg origin (light roast)",
    description: "Producto de origen único (especificaciones en preparación).",
    descriptionEn: "Single-origin product (specifications to be added).",
    longDescription: "Café de origen único de alta calidad. Las especificaciones detalladas estarán disponibles próximamente.",
    longDescriptionEn: "High-quality single-origin coffee. Detailed specifications will be available soon.",
    weightGrams: 1000,
    roastLevel: "light",
    grindType: "whole_bean",
    packagingType: "bag",
    priceUsd: 0,
    priceLocal: 0,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/11. café de origen/29.png",
    galleryImages: [
      "/assets/nuevosproductos/11. café de origen/29.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["origen-único"]
  },
  {
    id: "whole-bean-origin-dark-1000",
    sku: "WBO-D1K",
    name: "Café en grano 1 kg origen (tueste oscuro)",
    nameEn: "Whole bean 1 kg origin (dark roast)",
    description: "Producto de origen único (especificaciones en preparación).",
    descriptionEn: "Single-origin product (specifications to be added).",
    longDescription: "Café de origen único de alta calidad. Las especificaciones detalladas estarán disponibles próximamente.",
    longDescriptionEn: "High-quality single-origin coffee. Detailed specifications will be available soon.",
    weightGrams: 1000,
    roastLevel: "dark",
    grindType: "whole_bean",
    packagingType: "bag",
    priceUsd: 0,
    priceLocal: 0,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/11. café de origen/30.png",
    galleryImages: [
      "/assets/nuevosproductos/11. café de origen/30.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["origen-único"]
  },
  {
    id: "gift-corporate-45",
    sku: "GIFT45",
    name: "Café regalo corporativo 45 gr",
    nameEn: "Corporate gift coffee 45 g",
    description: "Detalle aromático para ocasiones especiales. Origen: Pichincha–Loja–Portovelo. Variedades: Bourbon–Typica. Secado: Natural. Tostado: medio-oscuro (American). Pedido mínimo 50 unidades.",
    descriptionEn: "Aromatic gift for special occasions. Origin: Pichincha–Loja–Portovelo. Varieties: Bourbon–Typica. Process: Natural. Roast: medium-dark (American). Minimum order 50 units.",
    longDescription: "Presentación especial para regalos corporativos y ocasiones especiales. Un detalle aromático que refleja la calidad de nuestro café ecuatoriano. Pedido mínimo de 50 unidades, ideal para eventos y obsequios empresariales.",
    longDescriptionEn: "Special presentation for corporate gifts and special occasions. An aromatic detail that reflects the quality of our Ecuadorian coffee. Minimum order of 50 units, ideal for events and business gifts.",
    weightGrams: 45,
    grindType: "ground",
    packagingType: "bag",
    priceUsd: 1.25,
    priceLocal: 1.25,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/7. cafe regalo corporativo/25.png",
    galleryImages: [
      "/assets/nuevosproductos/7. cafe regalo corporativo/25.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["corporativo", "detalle"]
  },
  {
    id: "green-coffee-1000",
    sku: "GREEN1K",
    name: "Café en oro (grano verde) 1 kg",
    nameEn: "Green coffee (unroasted) 1 kg",
    description: "Grano verde de mezcla de fincas Pichincha–Loja–Portovelo. Variedades: Bourbon–Typica. Secado: Natural. Excelente base para tostadores.",
    descriptionEn: "Unroasted green beans from a blend of farms in Pichincha–Loja–Portovelo. Varieties: Bourbon–Typica. Natural process. Great for roasters.",
    longDescription: "Café verde sin tostar de mezcla de nuestras mejores fincas. Ideal para tostadores que buscan desarrollar sus propios perfiles. Conserva todas las características naturales del grano, listo para ser transformado según tu preferencia.",
    longDescriptionEn: "Unroasted green coffee from a blend of our best farms. Ideal for roasters looking to develop their own profiles. Preserves all the natural characteristics of the bean, ready to be transformed according to your preference.",
    weightGrams: 1000,
    grindType: "whole_bean",
    packagingType: "bag",
    priceUsd: 26.00,
    priceLocal: 26.00,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/10. Café en verde kilo y 5 kilos/3.png",
    galleryImages: [
      "/assets/nuevosproductos/10. Café en verde kilo y 5 kilos/3.png",
      "/assets/nuevosproductos/10. Café en verde kilo y 5 kilos/2. en español.png",
      "/assets/nuevosproductos/10. Café en verde kilo y 5 kilos/1. en ingles.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["grano-verde", "para-tostar"]
  },
  {
    id: "green-coffee-5000",
    sku: "GREEN5K",
    name: "Café en oro (grano verde) 5 kg",
    nameEn: "Green coffee (unroasted) 5 kg",
    description: "Grano verde mezcla de fincas Pichincha–Loja–Portovelo. Variedades: Bourbon–Typica. Secado: Natural.",
    descriptionEn: "Unroasted green beans blend from Pichincha–Loja–Portovelo. Varieties: Bourbon–Typica. Natural process.",
    longDescription: "Presentación de 5 kilos de café verde para tostadores profesionales y comercios. Blend de nuestras mejores fincas con características consistentes. Ideal para producción a escala y desarrollo de productos personalizados.",
    longDescriptionEn: "5-kilogram presentation of green coffee for professional roasters and businesses. Blend from our best farms with consistent characteristics. Ideal for scale production and custom product development.",
    weightGrams: 5000,
    grindType: "whole_bean",
    packagingType: "bag",
    priceUsd: 120.00,
    priceLocal: 120.00,
    currencyLocal: "USD",
    primaryImageUrl: "/assets/nuevosproductos/10. Café en verde kilo y 5 kilos/3.png",
    galleryImages: [
      "/assets/nuevosproductos/10. Café en verde kilo y 5 kilos/3.png",
      "/assets/nuevosproductos/10. Café en verde kilo y 5 kilos/2. en español.png",
      "/assets/nuevosproductos/10. Café en verde kilo y 5 kilos/1. en ingles.png"
    ],
    isActive: true,
    stockQuantity: 0,
    tags: ["grano-verde", "mayorista"]
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getRelatedProducts(currentProductId: string, limit: number = 4): Product[] {
  const currentProduct = getProductById(currentProductId)
  if (!currentProduct) return []

  return products
    .filter(product =>
      product.id !== currentProductId &&
      (product.roastLevel === currentProduct.roastLevel ||
       product.grindType === currentProduct.grindType)
    )
    .slice(0, limit)
}