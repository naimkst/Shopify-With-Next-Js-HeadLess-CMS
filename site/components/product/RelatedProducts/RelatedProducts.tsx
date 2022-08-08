import { ProductCard } from '@components/product'
import { Text } from '@components/ui'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import s from '../ProductView/ProductView.module.css'

interface ProductViewProps {
  relatedProducts: Product[]
}

const RelatedProducts: FC<ProductViewProps> = ({ relatedProducts }) => {
  return (
    <section className="py-12 px-6 mb-10">
      <Text variant="sectionHeading">Related Products</Text>
      <div className={s.relatedProductsGrid}>
        {relatedProducts.map((p) => (
          <div
            key={p.path}
            className="animated fadeIn bg-accent-0 border border-accent-2"
          >
            <ProductCard
              noNameTag
              product={p}
              key={p.path}
              variant="simple"
              className="animated fadeIn"
              imgProps={{
                width: 300,
                height: 300,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
export default RelatedProducts
