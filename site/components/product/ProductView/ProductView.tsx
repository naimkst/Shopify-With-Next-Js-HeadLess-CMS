import { FC, useEffect } from 'react'
import type { Product } from '@commerce/types/product'

import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'

import ProductOverview2 from '../ProductOverview2'
import ProductOverview from '../ProductOverview'

import ProductReviews2 from '../ProductReviews2'

import ProductFeatures from '../ProductFeatures'
import RelatedProducts2 from '../RelatedProducts2/RelatedProducts'
import ContactUs from '@components/common/ContactUs/ContactUs'
import Icons from '@components/ui/Icons'
import Content from '@components/common/Content/Content'

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
        <ProductOverview2
          componentStyle={componentStyle}
          product={product}
          adjustmentObject={adjustmentObject}
        />
        <Icons
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        />
        <Content
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        />
        <ProductReviews2
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        />
        <ProductFeatures
          image={product.images[0].url}
          imageAlt={product.images[0].alt || 'Product Image'}
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        />

        <RelatedProducts2
          relatedProducts={relatedProducts.slice(0, 3)}
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        />

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
