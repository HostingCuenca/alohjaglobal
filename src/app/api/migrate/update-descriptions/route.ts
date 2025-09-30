import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST() {
  try {
    const updates = [
      {
        sku: 'CAM',
        description: 'Un café tostado y molido delicado y aromático, de dulzura natural y notas frutales que resaltan su frescura. Ideal para quienes disfrutan de una taza ligera, brillante y llena de matices. Proveniente de las montañas de la parte alta de la provincia de el Oro, rodeado de vegetación frutal y maderable lo hace exquisito y único de esta zona.',
        descriptionEn: 'A delicate and aromatic roasted and ground coffee, with natural sweetness and fruity notes that highlight its freshness. Ideal for those who enjoy a light, bright cup full of nuances. Coming from the mountains of the upper part of El Oro province, surrounded by fruit and timber vegetation, makes it exquisite and unique to this area.'
      },
      {
        sku: 'CCO',
        description: 'Un café tostado y molido intenso y profundo, con cuerpo robusto y dulzura acaramelada. Sus notas a chocolate y frutos secos ofrecen una experiencia elegante y persistente inigualable por la altura a la que se cultiva.',
        descriptionEn: 'An intense and deep roasted and ground coffee, with robust body and caramelized sweetness. Its chocolate and nutty notes offer an elegant and persistent experience unmatched by the altitude at which it is grown.'
      },
      {
        sku: 'CCL200',
        description: 'Este blend permite el equilibrio perfecto entre suavidad y frescura. Sus notas sutiles a miel y flores se combinan con un dulzor ligero que lo convierte en un café ideal para todos los días.',
        descriptionEn: 'This blend allows the perfect balance between smoothness and freshness. Its subtle honey and floral notes combine with a light sweetness that makes it an ideal everyday coffee.'
      },
      {
        sku: 'CCD200',
        description: 'Un perfil tradicional y balanceado, con carácter intenso y dulzura tostada. Su sabor redondo y persistente lo hace un clásico de gran versatilidad.',
        descriptionEn: 'A traditional and balanced profile, with intense character and toasted sweetness. Its round and persistent flavor makes it a classic of great versatility.'
      },
      {
        sku: 'WBL340',
        description: 'Granos seleccionados que conservan toda la frescura y dulzura del origen. Con notas cítricas y florales, ofrece un perfil brillante y delicado al molerlo fresco. Malla de grano entre 14 y 18. Se recomienda una molienda fina para aumentar la superficie de contacto y la tasa de extracción, intensificando el sabor. Ideal para métodos de filtro como V60, Chemex o Aeropress, que permiten extraer los aromas y sabores del grano.',
        descriptionEn: 'Selected beans that preserve all the freshness and sweetness of origin. With citrus and floral notes, it offers a bright and delicate profile when freshly ground. Bean screen size between 14 and 18. Fine grinding is recommended to increase contact surface and extraction rate, intensifying flavor. Ideal for filter methods like V60, Chemex or Aeropress, which allow extracting the aromas and flavors from the bean.'
      },
      {
        sku: 'WBD340',
        description: 'Un café de gran carácter, con notas a cacao y caramelo oscuro. Su dulzura envolvente y su cuerpo intenso son ideales para métodos de extracción más potentes. Malla de grano entre 14 y 18. Se puede usar una molienda media a fina para maximizar la extracción y el cuerpo. Espresso es el método ideal, ya que este tueste está pensado para extracciones rápidas y concentradas, pero también puede utilizarse la moka italiana entre otros.',
        descriptionEn: 'A coffee of great character, with cocoa and dark caramel notes. Its enveloping sweetness and intense body are ideal for more powerful extraction methods. Bean screen size between 14 and 18. Medium to fine grinding can be used to maximize extraction and body. Espresso is the ideal method, as this roast is designed for quick and concentrated extractions, but Italian moka can also be used among others.'
      },
      {
        sku: 'WBL1K',
        description: 'Una mezcla armoniosa de fincas seleccionadas producen granos de café con dulzura natural y notas frutales suaves. Perfecto para quienes buscan frescura en grandes volúmenes, con granos seleccionados que conservan toda la frescura y dulzura del origen. Malla de grano entre 14 y 18. Se recomienda una molienda fina para aumentar la superficie de contacto y la tasa de extracción, intensificando el sabor. Ideal para métodos de filtro como V60, Chemex o Aeropress, que permiten extraer los aromas y sabores del grano.',
        descriptionEn: 'A harmonious blend of selected farms produces coffee beans with natural sweetness and soft fruity notes. Perfect for those seeking freshness in large volumes, with selected beans that preserve all the freshness and sweetness of origin. Bean screen size between 14 and 18. Fine grinding is recommended to increase contact surface and extraction rate, intensifying flavor. Ideal for filter methods like V60, Chemex or Aeropress, which allow extracting aromas and flavors from the bean.'
      },
      {
        sku: 'WBD1K',
        description: 'Una mezcla armoniosa de fincas seleccionadas producen granos de café con dulzura natural y aportando notas achocolatadas y frutales suaves. Un blend de granos que aporta fuerza y complejidad. Con notas intensas de chocolate oscuro y un final prolongado, es la elección de quienes disfrutan de sabores profundos. Malla de grano entre 14 y 18. Se puede usar una molienda media a fina para maximizar la extracción y el cuerpo. Espresso es el método ideal, ya que este tueste está pensado para extracciones rápidas y concentradas, pero también puede utilizarse la moka italiana.',
        descriptionEn: 'A harmonious blend of selected farms produces coffee beans with natural sweetness and chocolatey and soft fruity notes. A blend of beans that provides strength and complexity. With intense dark chocolate notes and a prolonged finish, it is the choice for those who enjoy deep flavors. Bean screen size between 14 and 18. Medium to fine grinding can be used to maximize extraction and body. Espresso is the ideal method, as this roast is designed for quick and concentrated extractions, but Italian moka can also be used.'
      },
      {
        sku: 'GIFT45',
        description: 'Un detalle lleno de aroma y dulzura, perfecto para compartir la esencia de nuestro café en cada ocasión especial. Ideal para regalos corporativos u obsequios personalizados para los amantes del café. Cantidad mínima de 50 unidades.',
        descriptionEn: 'A detail full of aroma and sweetness, perfect for sharing the essence of our coffee on every special occasion. Ideal for corporate gifts or personalized presents for coffee lovers. Minimum quantity of 50 units.'
      },
      {
        sku: 'GREEN1K',
        description: 'Café en grano verde proveniente de una mezcla armoniosa de fincas seleccionadas. Su calidad garantiza dulzura natural, notas vivas y un potencial excepcional para tostadores que buscan cafés únicos y sostenibles 100% ecuatorianos.',
        descriptionEn: 'Green coffee beans from a harmonious blend of selected farms. Its quality guarantees natural sweetness, vivid notes and exceptional potential for roasters seeking unique and sustainable 100% Ecuadorian coffees.'
      },
      {
        sku: 'GREEN5K',
        description: 'Café en grano verde proveniente de una mezcla armoniosa de fincas seleccionadas. Su calidad garantiza dulzura natural, notas vivas y un potencial excepcional para tostadores que buscan cafés únicos y sostenibles 100% ecuatorianos.',
        descriptionEn: 'Green coffee beans from a harmonious blend of selected farms. Its quality guarantees natural sweetness, vivid notes and exceptional potential for roasters seeking unique and sustainable 100% Ecuadorian coffees.'
      }
    ]

    const results = []
    const errors = []

    for (const update of updates) {
      try {
        const result = await query(`
          UPDATE products
          SET description = $1, description_en = $2, updated_at = NOW()
          WHERE sku = $3
          RETURNING sku, name
        `, [update.description, update.descriptionEn, update.sku])

        if (result.rows.length > 0) {
          results.push(result.rows[0])
        } else {
          errors.push({ sku: update.sku, error: 'Product not found' })
        }
      } catch (error) {
        console.error(`Error updating ${update.sku}:`, error)
        errors.push({
          sku: update.sku,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Descriptions updated successfully',
      updated: results,
      errors: errors,
      stats: {
        total: updates.length,
        updated: results.length,
        errors: errors.length
      }
    })

  } catch (error) {
    console.error('Update descriptions error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update descriptions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}