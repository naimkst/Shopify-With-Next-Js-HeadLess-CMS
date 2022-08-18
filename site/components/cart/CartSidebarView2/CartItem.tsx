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
}
const CartItem: FC<CartItemProps> = ({ item, currencyCode }) => {
  const options =
    item.options &&
    item.options
      .map((option) => {
        return option.value
      })
      .join(' / ')

  const { closeSidebarIfPresent } = useUI()
  const [removing, setRemoving] = useState(false)
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem({ item })

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
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

  useEffect(() => {
    if (quantity) {
      quantityChangeHandler()
    }
  }, [quantity])
  return (
    <li
      className={`flex my-4 gap-3 ${
        removing && 'opacity-50 pointer-events-none'
      }`}
    >
      <Link href={`/product/${item.path}`}>
        <img
          onClick={() => closeSidebarIfPresent()}
          src={item.variant.image?.url || ''}
          alt={item.variant.image?.altText || 'Product Image'}
          className="h-24 w-24 cursor-pointer"
        />
      </Link>
      <div className="w-full flex flex-col justify-between overflow-hidden">
        <div>
          <div className="flex justify-between gap-4">
            <Link href={`/product/${item.path}`}>
              <h2
                onClick={() => closeSidebarIfPresent()}
                className="font-camptonBold text-sm  max-h-10 overflow-hidden cursor-pointer"
                title={item.name}
              >
                {item.name}
              </h2>
            </Link>
            <button onClick={handleRemove} type="button">
              <Trash className="flex-shrink-0 h-5 w-5 text-accent-3" />
            </button>
          </div>
          {options && <p className="text-xs">{options}</p>}
        </div>
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center border font-camptonBold text-xs border-accent-2 w-fit rounded-full">
            <button
              type="button"
              onClick={() => setQuantity(quantity - 1)}
              style={{ marginLeft: '-1px' }}
              disabled={quantity <= 1}
              className="border-r border-accent-2 py-1 px-2"
            >
              <Minus width={18} height={18} />
            </button>
            <p className="py-1 px-2">{quantity}</p>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity < 1}
              className="border-l border-accent-2 py-1 px-2"
            >
              <Plus width={18} height={18} />
            </button>
          </div>
          <p className="text-xs text-emerald-500">{price}</p>
        </div>
      </div>
    </li>
  )
}
export default CartItem
