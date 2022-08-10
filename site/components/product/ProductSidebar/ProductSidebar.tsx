import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import { extractValues } from 'utility/extractValues'

interface ProductSidebarProps {
  product: Product
  className?: string
  componentStyle: any
  adjustmentObject: any
}

const ProductSidebar: FC<ProductSidebarProps> = ({
  product,
  className,
  componentStyle,
  adjustmentObject,
}) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const addToCartName = 'AddToCart'
  const addToCartCS = componentStyle[addToCartName]
  const addToCartAO = adjustmentObject[addToCartName]

  const descriptionName = 'Description'
  const descriptionCS = componentStyle[descriptionName]

  const accordionName = 'Accordion'
  const accordionAO = adjustmentObject[accordionName]

  let addToCartColor = addToCartCS.fontColor ? addToCartCS.fontColor : ''
  let addToCartFontWeight = addToCartCS.fontWeight ? addToCartCS.fontWeight : ''
  let addToCartBG = addToCartCS.backgroundColor
    ? addToCartCS.backgroundColor
    : ''
  let addToCartWidth = addToCartCS.width ? addToCartCS.width : ''
  let addToCartRounded = addToCartCS.rounded ? addToCartCS.rounded : ''

  // !bg-accent-9 !text-accent-0 !font-semibold
  const addToCartClassName = `${addToCartColor} ${addToCartFontWeight} ${addToCartBG} ${addToCartWidth} ${addToCartRounded}`

  let descriptionColor = descriptionCS.fontColor ? descriptionCS.fontColor : ''
  let descriptionFontWeight = descriptionCS.fontWeight
    ? descriptionCS.fontWeight
    : ''
  let descriptionPadding = descriptionCS.padding ? descriptionCS.padding : ''
  let descriptionOverflowWrap = descriptionCS.overflowWrap
    ? descriptionCS.overflowWrap
    : ''

  // break-words font-normal !text-accent-9
  const descriptionClassName = `${descriptionColor} ${descriptionFontWeight} ${descriptionPadding} ${descriptionOverflowWrap} `
  return (
    <div className={className}>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <Text
        className={descriptionClassName}
        html={product.descriptionHtml || product.description}
      />
      <div className="flex flex-row justify-between items-center">
        <Rating value={5} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div>
      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label={addToCartAO.text}
            type="button"
            className={addToCartClassName}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : addToCartAO.text}
          </Button>
        )}
      </div>
      <div className="mt-6">
        {accordionAO.map(
          (accordion: { title: string; text: string; iD: string }) => (
            <Collapse
              key={accordion.iD}
              title={accordion.title}
              componentStyle={componentStyle}
            >
              {accordion.text}
            </Collapse>
          )
        )}
      </div>
    </div>
  )
}

export default ProductSidebar
