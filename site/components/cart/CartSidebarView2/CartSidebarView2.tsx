import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from './CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import Lock from '@components/icons/Lock'

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const itemsTotal = data?.lineItems.reduce(
    (total, item) => item.quantity + total,
    0
  )

  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const error = null
  const success = null

  return (
    <div className={'h-full font-campton flex flex-col'}>
      <div className="flex-shrink-0 sticky z-20 top-0 w-full right-0 left-0 ">
        <div className="flex justify-between items-center p-4 bg-primary">
          <div className="w-6 h-6" />
          <h1 className="font-americus text-2xl">Your Cart</h1>
          <Cross onClick={handleClose} className="w-6 h-6 cursor-pointer" />
        </div>
        <p className="text-center bg-accent-2 py-2 text-sm">
          Free U.S. Shipping 🚚 (Except Free Trial)
        </p>
      </div>

      {isLoading || isEmpty ? (
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
          <div className="px-4 sm:px-6 ">
            <ul className="overflow-y-auto ">
              {data!.lineItems.map((item: any) => (
                <>
                  <CartItem
                    key={item.id}
                    item={item}
                    currencyCode={data!.currency.code}
                  />
                  <div className="h-[1px] bg-accent-2 w-full" />
                </>
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t mt-auto">
            <h1 className="text-center font-camptonBold text-lg mb-2">
              Subtotal ({itemsTotal} items) {subTotal}
            </h1>
            <a href="/checkout">
              <button className="bg-secondary text-secondary w-full py-3 px-4 rounded-full text-center mb-2 flex justify-center items-center gap-2">
                <Lock className="w-4 h-4 fill-primary" /> <p>Checkout</p>
              </button>
            </a>

            <button
              onClick={handleClose}
              className="bg-primary text-primary border-2 border-secondary w-full py-3 px-4 rounded-full text-center"
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebarView
