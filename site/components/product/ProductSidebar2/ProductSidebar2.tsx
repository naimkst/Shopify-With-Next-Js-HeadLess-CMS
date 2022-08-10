import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductDropdownOptions } from '@components/product'
import { ProductQuantityATC } from '@components/product'

import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import { extractValues } from 'utility/extractValues'
import Seperator from '@components/ui/Seperator'

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
  const [selectedQuantity, setSelectedQuantity] = useState(1)
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
        quantity: selectedQuantity,
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const titleName = 'ProductTitle'
  const titleCS = componentStyle[titleName]

  const descriptionName = 'Description'
  const descriptionCS = componentStyle[descriptionName]

  const productPriceName = 'ProductPrice'
  const productPriceCS = componentStyle[productPriceName]

  // !bg-accent-9 !text-accent-0 !font-semibold text-5xl break-words font-normal !text-accent-9 font-americus

  return (
    <div className={className}>
      <h1 className={extractValues(titleCS)}>{product.name}</h1>
      <ProductDropdownOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        componentStyle={componentStyle}
      />
      <p className="font-bold">
        {Object.values(selectedOptions).join(' / ').toUpperCase()}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Rating value={5} className="!text-yellow-300" />
          <p>10 review</p>
        </div>
        <p className="bg-accent-2 rounded-full p-2 px-4 my-2 w-fit">
          Makes 20 cups of cold brew / 30 servings of Elixir
        </p>
      </div>

      <Text
        className={extractValues(descriptionCS)}
        html={product.descriptionHtml || product.description}
      />
      {process.env.COMMERCE_CART_ENABLED && (
        <div className="flex items-center gap-6">
          <p className={extractValues(productPriceCS)}>
            {variant && `$${variant.price * selectedQuantity}`}
          </p>
          <ProductQuantityATC
            setSelectedQuantity={setSelectedQuantity}
            addToCart={addToCart}
            loading={loading}
            componentStyle={componentStyle}
          />
        </div>
      )}
      <Seperator className="" text="Just browsing?" />
      <button className="w-full py-2 font-bold text-xl my-4 rounded-full bg-secondary text-secondary">
        Text Me This Item
      </button>
    </div>
  )
}

export default ProductSidebar
