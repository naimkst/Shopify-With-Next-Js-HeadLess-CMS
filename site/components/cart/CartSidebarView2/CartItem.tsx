import { LineItem } from '@commerce/types/cart'
import { Minus, Plus, Trash } from '@components/icons'

import { extractValues } from 'utility/extractValues'
import { FC, ChangeEvent, FocusEventHandler, useEffect, useState } from 'react'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.css'
import { useUI } from '@components/ui/context'

import usePrice from '@framework/product/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import Quantity from '@components/ui/Quantity'

interface CartItemProps {
  item: LineItem
  currencyCode: string
  componentStyle: any
  adjustmentObject: any
}
const CartItem: FC<CartItemProps> = ({
  item,
  currencyCode,
  componentStyle,
  adjustmentObject,
}) => {
  const options =
    item.options &&
    item.options
      .map((option) => {
        return option.value
      })
      .join(' / ')

  const { closeSidebarIfPresent } = useUI()
  const [removing, setRemoving] = useState(false)
  const [quantity, setQuantity] = useState<number>(Number(item.quantity))
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem({ item })

  const { price } = usePrice({
    amount: item?.variant?.price || 0 * item?.quantity || 0,
    baseAmount: item?.variant?.listPrice || 0 * item?.quantity || 0,
    currencyCode,
  })

  const quantityChangeHandler = async () => {
    await updateItem({ quantity })
  }

  const handleRemove = async () => {
    setRemoving(true)
    try {
      await removeItem(item)
    } catch (error) {
      setRemoving(false)
    }
  }

  console.log('cart items', item.node.merchandise.product.title)
  useEffect(() => {
    if (quantity) {
      quantityChangeHandler()
    }
  }, [quantity])

  const productTitleName = 'ProductTitle'
  const productTitleCS = componentStyle[productTitleName]
  const productOptionsName = 'ProductOptions'
  const productOptionsCS = componentStyle[productOptionsName]
  const productPriceName = 'ProductPrice'
  const productPriceCS = componentStyle[productPriceName]
  return (
    <li
      className={`flex my-4 gap-3 ${
        removing && 'opacity-50 pointer-events-none'
      }`}
    >
      <Link href={`/product/${item.path}`}>
        <img
          onClick={() => closeSidebarIfPresent()}
          src={item?.node?.merchandise?.product?.featuredImage.url || ''}
          alt={item?.node?.merchandise?.product?.title || 'Product Image'}
          className="h-24 w-24 cursor-pointer"
        />
      </Link>
      <div className="w-full flex flex-col justify-between overflow-hidden">
        <div>
          <div className="flex justify-between gap-4">
            <Link href={`/product/${item.path}`}>
              <h2
                onClick={() => closeSidebarIfPresent()}
                className={extractValues(productTitleCS)}
                title={item?.node?.merchandise?.product?.title}
              >
                {item?.node?.merchandise?.product?.title}
              </h2>
            </Link>
            <button onClick={handleRemove} type="button">
              <Trash className="flex-shrink-0 h-5 w-5 text-accent-3" />
            </button>
          </div>
          {options && (
            <p className={extractValues(productOptionsCS)}>{options}</p>
          )}
        </div>
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center border font-camptonBold text-xs border-accent-2 w-fit rounded-full">
            <button
              type="button"
              onClick={() => setQuantity(Number(item?.node?.quantity) - 1)}
              style={{ marginLeft: '-1px' }}
              disabled={quantity <= 1}
              className="border-r border-accent-2 py-1 px-2"
            >
              <Minus width={18} height={18} />
            </button>
            <p className="py-1 px-2">{item?.node.quantity}</p>
            <button
              type="button"
              onClick={() => setQuantity(Number(item?.node?.quantity) + 1)}
              disabled={quantity < 1}
              className="border-l border-accent-2 py-1 px-2"
            >
              <Plus width={18} height={18} />
            </button>
          </div>
          <p className={extractValues(productPriceCS)}>
            {
              item?.node?.merchandise?.product?.priceRange?.maxVariantPrice
                .amount
            }
          </p>
        </div>
      </div>
    </li>
  )
}
export default CartItem
