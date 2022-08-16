import cn from 'clsx'
import Image from 'next/image'
import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider } from '@components/product'

import ProductSidebar2 from '../ProductSidebar2'

interface ProductViewProps {
  product: Product

  componentStyle: any
  adjustmentObject: any
}
const ProductOverview: FC<ProductViewProps> = ({
  product,
  adjustmentObject,
  componentStyle,
}) => {
  const componentName = 'ProductOverview2'
  const cs = componentStyle[componentName]
  const ao = adjustmentObject[componentName]
  return (
    <div className={cn(s.root, 'fit')}>
      <div className={cn(s.main, 'fit')}>
        <ProductSlider thumbControls key={product.id} componentStyle={cs}>
          {product.images.map((image, i) => (
            <div key={image.url} className={s.imageContainer}>
              <Image
                className={s.img}
                src={image.url!}
                alt={image.alt || 'Product Image'}
                width={700}
                height={700}
                priority={i === 0}
                quality="85"
              />
            </div>
          ))}
        </ProductSlider>

        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <WishlistButton
            className={s.wishlistButton}
            productId={product.id}
            variant={product.variants[0]}
          />
        )}
      </div>

      <ProductSidebar2
        key={product.id}
        product={product}
        className={s.sidebar}
        componentStyle={cs}
        adjustmentObject={ao}
      />
    </div>
  )
}
export default ProductOverview
