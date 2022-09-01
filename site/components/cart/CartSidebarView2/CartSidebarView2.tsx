import cn from 'clsx'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from './CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import Lock from '@components/icons/Lock'
import { extractValues } from 'utility/extractValues'
import RecommandationItem from './RecommandationItem'
import { getLocalStorageData } from 'utility/helpers'
import { cartLinesRemove } from '@lib/shopify'

const CartSidebarView: FC<{
  componentStyle: any
  adjustmentObject: any
}> = ({ componentStyle, adjustmentObject }) => {
  const [productRecommendation, setProductRecommendation] = useState([])
  const { closeSidebar, setSidebarView, closeSidebarIfPresent } = useUI()
  const { data, isLoading, isEmpty } = useCart()
  const cartData = getLocalStorageData('cartData')
  const costData = getLocalStorageData('costData')
  const checkOutLink = getLocalStorageData('checkOutLink')

  console.log(checkOutLink)
  const { price: subTotal } = usePrice(
    data && {
      amount: Number(costData?.totalAmount?.amount),
      currencyCode: costData?.totalAmount?.currencyCode,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(costData?.totalAmount?.amount),
      currencyCode: costData?.totalAmount?.currencyCode,
    }
  )
  const itemsTotal = data?.lineItems.reduce(
    (total, item) => item.quantity + total,
    0
  )

  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const cars = ['Saab', 'Volvo', 'BMW']
  const error = null
  const success = null

  useEffect(() => {
    // ;(async () => {
    //   const cartItemIds = data?.lineItems
    //     .map((item) => item.productId)
    //     .join(', ')
    //   if (process.env.NEXT_PUBLIC_REBUY_API_KEY) {
    //     const requestParameters = new URLSearchParams({
    //       key: process.env.NEXT_PUBLIC_REBUY_API_KEY,
    //       query: '',
    //     })
    //     const fetchRequest = await fetch(
    //       `https://rebuyengine.com/api/v1/products/search?${requestParameters}`
    //     )
    //     const response = await fetchRequest.json()
    //     setProductRecommendation(response.data)
    //   }
    // })()
  }, [])

  const cartName = 'Cart2'
  const cs = componentStyle[cartName]
  const ao = adjustmentObject[cartName]

  const titleName = 'Title'
  const titleCS = cs[titleName]

  const noticeName = 'Notice'
  const noticeCS = cs[noticeName]

  const subtotalName = 'Subtotal'
  const subtotalCS = cs[subtotalName]

  const checkoutButtonName = 'CheckoutButton'
  const checkoutButtonCS = cs[checkoutButtonName]

  const closeButtonName = 'CloseButton'
  const closeButtonCS = cs[closeButtonName]

  const productTitleName = 'ProductTitle'
  const productTitleCS = cs[productTitleName]
  console.log(productRecommendation)
  return (
    <div className={'h-full font-campton flex flex-col'}>
      <div className="flex-shrink-0 sticky z-20 top-0 w-full right-0 left-0 ">
        <div className="flex justify-between items-center p-4 bg-primary">
          <div className="w-6 h-6" />
          <h1 className={extractValues(titleCS)}>{ao.Title}</h1>
          <Cross onClick={handleClose} className="w-6 h-6 cursor-pointer" />
        </div>
        <p className={extractValues(noticeCS)}>{ao.Notice}</p>
      </div>

      {cartData.length == 0 ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div>
            <div className="px-4 sm:px-6 ">
              <ul className="overflow-y-auto ">
                {cartData?.map((item: any, index: number) => (
                  <div key={item.id}>
                    <CartItem
                      key={index}
                      item={item}
                      currencyCode={costData?.totalAmount?.currencyCode}
                      componentStyle={cs}
                      adjustmentObject={ao}
                    />
                    <div className="h-[1px] bg-accent-2 w-full" />
                  </div>
                ))}
              </ul>
            </div>
            <div className="bg-accent-2 flex flex-col pt-12 pb-6">
              {/* <h1 className="font-americus text-center mb-6">
                PAIRS WELL WITH
              </h1> */}
              <ul className="px-10 flex flex-col gap-6">
                {/* {productRecommendation.map((item: any) => (
                  <RecommandationItem
                    item={item}
                    currencyCode={data!.currency.code}
                    componentStyle={cs}
                    adjustmentObject={ao}
                  />
                ))} */}
              </ul>
            </div>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t mt-auto">
            {/* <h1 className={extractValues(subtotalCS)}>
              Subtotal ({itemsTotal} items) {subTotal}
            </h1> */}
            <a href={checkOutLink}>
              <button
                className={`${extractValues(
                  checkoutButtonCS
                )} w-full flex justify-center items-center gap-2`}
              >
                <Lock className="w-4 h-4 fill-primary" />{' '}
                <p>{ao.CheckoutButton}</p>
              </button>
            </a>

            <button
              onClick={handleClose}
              className={extractValues(closeButtonCS)}
            >
              {ao.CloseButton}{' '}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebarView
