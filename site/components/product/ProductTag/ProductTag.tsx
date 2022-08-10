import cn from 'clsx'
import { inherits } from 'util'
import { extractValues } from 'utility/extractValues'
import s from './ProductTag.module.css'

interface ProductTagProps {
  className?: string
  name: string
  price: string
  fontSize?: number
  componentStyle: any
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price,
  className = '',
  fontSize = 32,
  componentStyle,
}) => {
  const productTitleName = 'ProductTitle'
  const productTitleCS = componentStyle[productTitleName]

  const productPriceName = 'ProductPrice'
  const productPriceCS = componentStyle[productPriceName]

  let productTitleColor = productTitleCS.fontColor
    ? productTitleCS.fontColor
    : ''
  let productTitleFontWeight = productTitleCS.fontWeight
    ? productTitleCS.fontWeight
    : ''
  let productTitleFontSize = productTitleCS.fontSize
    ? productTitleCS.fontSize
    : ''
  let productTitlePadding = productTitleCS.padding ? productTitleCS.padding : ''
  let productTitleBG = productTitleCS.backgroundColor
    ? productTitleCS.backgroundColor
    : ''

  const productTitleClassName = `${productTitleColor} ${productTitleFontWeight} ${productTitleFontSize} ${productTitlePadding} ${productTitleBG}`

  let productPriceColor = productPriceCS.fontColor
    ? productPriceCS.fontColor
    : ''
  let productPriceFontWeight = productPriceCS.fontWeight
    ? productPriceCS.fontWeight
    : ''
  let productPriceFontSize = productPriceCS.fontSize
    ? productPriceCS.fontSize
    : ''
  let productPricePadding = productPriceCS.padding ? productPriceCS.padding : ''
  let productPriceBG = productPriceCS.backgroundColor
    ? productPriceCS.backgroundColor
    : ''
  let productPriceDisplay = productPriceCS.display ? productPriceCS.display : ''
  const productPriceClassName = `${productPriceColor} ${productPriceFontWeight} ${productPriceFontSize} ${productPricePadding} ${productPriceBG} ${productPriceDisplay}`
  // p-4
  return (
    <div className={cn(s.root, className)}>
      <h3 className={productTitleClassName}>
        <span
          className={cn({ [s.fontsizing]: fontSize < 32 })}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
          }}
        >
          {name}
        </span>
      </h3>
      <div className={productPriceClassName}>{price}</div>
    </div>
  )
}

export default ProductTag
