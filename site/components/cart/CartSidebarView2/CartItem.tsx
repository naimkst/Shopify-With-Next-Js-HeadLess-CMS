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
import { cartLinesAdd, cartLinesRemove, cartLinesUpdate } from '@lib/shopify'
import {
  getLocalStorageData,
  setCartInLocalStorage,
  setChecloutUpdateLink,
  setCostInLocalStorage,
} from 'utility/helpers'
import axios from 'axios'

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
  const allProductData = getLocalStorageData('allProductData')
  const cartData = getLocalStorageData('cartData')
  const { openSidebar, setSidebarView } = useUI()

  const { price } = usePrice({
    amount: item?.variant?.price || 0 * item?.quantity || 0,
    baseAmount: item?.variant?.listPrice || 0 * item?.quantity || 0,
    currencyCode,
  })

  const quantityChangeHandler = async () => {
    await updateItem({ quantity })
  }

  const itemAdd = async () => {
    try {
      setRemoving(true)
      const producthandle = item?.node?.merchandise.product?.handle
      const productGetById: any = await axios.post('/api/productById', {
        body: producthandle,
      })
      const planId =
        productGetById?.data?.sellingPlanGroups?.edges[0]?.node?.sellingPlans
          ?.edges[0]?.node?.id

      const getCartInfo = getLocalStorageData('cartInfo')

      const cartLine = await cartLinesAdd({
        cartId: getCartInfo?.cartId,
        lines: {
          quantity: 1,
          merchandiseId: item?.node?.merchandise?.id,
          sellingPlanId: planId ? planId : null,
        },
      })
      // allProductData(cartLine?.data)
      setChecloutUpdateLink(cartLine?.data?.cartLinesAdd?.cart?.checkoutUrl)
      setCostInLocalStorage(cartLine?.data?.cartLinesAdd?.cart?.cost)
      setCartInLocalStorage(cartLine?.data?.cartLinesAdd?.cart?.lines.edges)
      setSidebarView('CART_VIEW')
      openSidebar()
      setRemoving(false)
    } catch (error) {
      setRemoving(false)
    }
  }

  const itemUpdate = async () => {
    try {
      setRemoving(true)
      const producthandle = item?.node?.merchandise.product?.handle
      const productGetById: any = await axios.post('/api/productById', {
        body: producthandle,
      })
      const planId =
        productGetById?.data?.sellingPlanGroups?.edges[0]?.node?.sellingPlans
          ?.edges[0]?.node?.id

      const getCartInfo = getLocalStorageData('cartInfo')

      if (item?.node.quantity != 1) {
        const cartLine = await cartLinesUpdate({
          cartId: getCartInfo?.cartId,
          lines: {
            id: item?.node.id,
            quantity: Number(item?.node.quantity) - 1,
            merchandiseId: item?.node?.merchandise?.id,
            sellingPlanId: planId ? planId : null,
          },
        })
        setChecloutUpdateLink(
          cartLine?.data?.cartLinesUpdate?.cart?.checkoutUrl
        )
        setCostInLocalStorage(cartLine?.data?.cartLinesUpdate?.cart?.cost)
        setCartInLocalStorage(
          cartLine?.data?.cartLinesUpdate?.cart?.lines.edges
        )
        setSidebarView('CART_VIEW')
        openSidebar()
        setRemoving(false)
      } else {
        setRemoving(true)
        try {
          const variables = {
            cartId: allProductData?.cartLinesAdd?.cart?.id,
            lineIds: item?.node?.id,
          }
          const removRes = await cartLinesRemove(variables)
          setCartInLocalStorage(
            removRes?.data?.cartLinesRemove?.cart?.lines.edges
          )
          setSidebarView('CART_VIEW')
          openSidebar()
          setRemoving(false)
        } catch (error) {
          setRemoving(false)
        }
      }
    } catch (error) {
      setRemoving(false)
    }
  }

  const handleRemove = async () => {
    setRemoving(true)
    try {
      const variables = {
        cartId: allProductData?.cartLinesAdd?.cart?.id,
        lineIds: item?.node?.id,
      }
      const removRes = await cartLinesRemove(variables)
      setCartInLocalStorage(removRes?.data?.cartLinesRemove?.cart?.lines.edges)
      setSidebarView('CART_VIEW')
      openSidebar()
      setRemoving(false)
    } catch (error) {
      setRemoving(false)
    }
  }

  useEffect(() => {
    if (quantity) {
      quantityChangeHandler()
    }
  }, [quantity, cartData])

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
              onClick={itemUpdate}
              style={{ marginLeft: '-1px' }}
              disabled={quantity <= 1}
              className="border-r border-accent-2 py-1 px-2"
            >
              <Minus width={18} height={18} />
            </button>
            <p className="py-1 px-2">{item?.node.quantity}</p>
            <button
              type="button"
              onClick={itemAdd}
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
function setSidebarView(arg0: string) {
  throw new Error('Function not implemented.')
}

function closeSidebar() {
  throw new Error('Function not implemented.')
}
