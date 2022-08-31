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
import axios from 'axios'

import { useRebuyData } from '@frontend-sdk/rebuy'

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
  useEffect(() => {
    ;(async () => {
      if (product.variants[0]) {
        const variantId: any = product.variants[0].id
        const requestParameters = new URLSearchParams({
          key: 'bb76a728340579caaa9f22367165ad3f001068d6',
          address_id: '54887',
          next_charge_scheduled_at: 'tomorrow',
          quantity: '1',
          order_interval_unit: 'Month',
          order_interval_frequency: '1',
          shopify_variant_id: variantId,
          charge_interval_frequency: '1',
        })
        const body = {}
        const fetchRequest = await fetch(
          `https://rebuyengine.com/api/v1/recharge/subscribe?${requestParameters}`,
          {
            method: 'POST',
            mode: 'cors',
            // body: JSON.stringify({}),
            // headers: {
            //   'Content-Type': 'application/json',
            // },
          }
        )

        console.log(fetchRequest, 'dddaaaaa', 'rreeeeessss')
        // console.log(response, 'RESPONSE Subscribe', getResponse)
      }

      const requestParameters = new URLSearchParams({
        key: 'bb76a728340579caaa9f22367165ad3f001068d6',
        address_id: '54887',
        next_charge_scheduled_at: 'tomorrow',
        quantity: '1',
        order_interval_unit: 'Month',
        order_interval_frequency: '1',
        shopify_variant_id: '7330020720829',
        charge_interval_frequency: '1',
      })

      const options = {
        method: 'POST',
        url: `https://rebuyengine.com/api/v1/recharge/subscribe?${requestParameters}`,
        headers: { Accept: 'application/json' },
      }

      axios
        .request(options)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.error(error)
        })
    })()
  }, [])

  // console.log(Rechange)

  return (
    <>
      <div className="rc-widget-injection-parent"></div>

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

        <RelatedProducts2
          relatedProducts={relatedProducts.slice(0, 3)}
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        />

        {/* <ContactUs
          componentStyle={componentStyle}
          adjustmentObject={adjustmentObject}
        /> */}
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
