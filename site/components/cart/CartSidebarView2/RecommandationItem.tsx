import { extractValues } from 'utility/extractValues'
import { FC, ChangeEvent, FocusEventHandler, useEffect, useState } from 'react'

import Link from 'next/link'

import { useUI } from '@components/ui/context'

import usePrice from '@framework/product/use-price'
import Dropdown from '@components/common/Dropdown/Dropdown'

interface RecommandationItemProps {
  item: any
  currencyCode: string
  componentStyle: any
  adjustmentObject: any
}
const RecommandationItem: FC<RecommandationItemProps> = ({
  item,
  currencyCode,
  componentStyle,
  adjustmentObject,
}) => {
  const { closeSidebarIfPresent } = useUI()
  const [showOptions, setShowOptions] = useState(false)
  const { price } = usePrice({
    amount: Number(item.variants[0].price),
    baseAmount: Number(item.variants[0].price),
    currencyCode,
  })

  const productTitleName = 'ProductTitle'
  const productTitleCS = componentStyle[productTitleName]
  const optionValueName = 'ProductOptionValue'
  const optionValueCS = componentStyle[optionValueName]
  const productPriceName = 'ProductPrice'
  const productPriceCS = componentStyle[productPriceName]
  const optionContainerName = 'ProductOptionContainer'
  const optionContainerCS = componentStyle[optionContainerName]
  const options = item.variants.map((option: any) => {
    return { label: option.option1 }
  })
  console.log(optionContainerCS)
  return (
    <li key={item.id} className="">
      <div className="flex gap-4">
        <Link href={`/product/${item.path}`}>
          <img
            onClick={() => closeSidebarIfPresent()}
            src={item.image?.src || ''}
            alt={item.image?.altText || 'Product Image'}
            className="h-24 w-24 cursor-pointer"
          />
        </Link>
        <div className="w-full flex flex-col justify-between overflow-hidden">
          <div>
            <div className="">
              <Link href={`/product/${item.path}`}>
                <h2
                  onClick={() => closeSidebarIfPresent()}
                  className={extractValues(productTitleCS)}
                  title={item.name}
                >
                  {item.title}
                </h2>
              </Link>
              <p className="text-emerald-500 mt-2 font-campton text-sm">
                {price}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="text-secondary bg-secondary font-campton p-1 px-2 rounded-lg text-sm mt-2"
        onClick={() => {
          setShowOptions(true)
        }}
      >
        Options
      </button>
      {showOptions && (
        <div className={`${extractValues(optionContainerCS)} bg-white ml-8`}>
          <Dropdown
            options={options}
            name="recommandations"
            styles={extractValues(optionValueCS)}
          />
        </div>
      )}
    </li>
  )
}
export default RecommandationItem
