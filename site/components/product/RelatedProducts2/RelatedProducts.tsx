import { ProductCard } from '@components/product'
import { Text } from '@components/ui'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import s from '../ProductView/ProductView.module.css'
import { extractValues } from 'utility/extractValues'

interface ProductViewProps {
  relatedProducts: Product[]
  componentStyle: any
  adjustmentObject: any
}

const RelatedProducts: FC<ProductViewProps> = ({
  relatedProducts,
  componentStyle,
  adjustmentObject,
}) => {
  const relatedProductsName = 'RelatedProducts2'
  const cs = componentStyle[relatedProductsName]
  const ao = adjustmentObject[relatedProductsName]

  const titleName = 'Title'
  const titleAO = ao[titleName]
  const titleCS = cs[titleName]

  const productNameName = 'ProductName'
  const productNameCS = cs[productNameName]

  const priceName = 'Price'
  const priceCS = cs[priceName]

  return (
    <section className="py-12 px-6 mb-10 flex gap-10 flex-col items-center justify-center">
      <h1 className={extractValues(titleCS)}>{titleAO.text}</h1>
      <div className="flex gap-10">
        {relatedProducts.map((p) => (
          <a key={p.id} href={`/product/${p.path}`}>
            <div
              key={p.path}
              className="animated fadeIn flex flex-col gap-2 text-center"
            >
              <img
                className="w-96 h-96 rounded-md"
                src={p.images[0].url}
                alt={p.images[0].alt}
              />
              <h2 className={extractValues(productNameCS)}>{p.name}</h2>
              <p className={extractValues(priceCS)}>${p.price.value}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
export default RelatedProducts
