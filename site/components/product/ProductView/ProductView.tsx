import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'

import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'

import ProductOverview from '../ProductOverview'
import ProductReviews from '../ProductReviews'

import ProductFeatures from '../ProductFeatures'
import RelatedProducts from '../RelatedProducts/RelatedProducts'
import ContactUs from '@components/common/ContactUs/ContactUs'

interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
  componentStyle: {}
  adjustmentObject: {}
}

const ProductView: FC<ProductViewProps> = ({
  product,
  relatedProducts,
  componentStyle,
  adjustmentObject,
}) => {
  return (
    <>
      <Container className="max-w-none w-full" clean>
        <ProductOverview
          componentStyle={componentStyle}
          product={product}
          adjustmentObject={adjustmentObject}
        />
        <hr className="mt-7 border-accent-2" />
        <ProductFeatures
          image={product.images[0].url}
          imageAlt={product.images[0].alt || 'Product Image'}
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        />
        <hr className="mt-7 border-accent-2" />
        <ProductReviews
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        />
        <hr className="mt-7 border-accent-2" />
        <RelatedProducts relatedProducts={relatedProducts} />
        <hr className="mt-7 border-accent-2" />

        <ContactUs
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        />
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
