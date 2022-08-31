import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, FieldsetHTMLAttributes, useEffect, useState } from 'react'
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
import Radio from '@components/common/RadioGroup/Radio'
import Dropdown from '@components/common/Dropdown/Dropdown'
import {
  cartLinesAdd,
  cartLinesAddRegularProduct,
  createCartWithChekOutUrl,
  createCartWithRegularPrd,
} from '@lib/shopify'
import axios from 'axios'
import {
  getLocalStorageData,
  setAuthInfoInLocalStorage,
  setCartInLocalStorage,
  setChecloutUpdateLink,
  setCostInLocalStorage,
} from 'utility/helpers'

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
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<any>({})
  const [productData, setProductData] = useState<any>()
  useEffect(() => {
    console.log('product slug', product.slug)
    selectDefaultOptionFromProduct(product, setSelectedOptions)
    const productData = async () => {
      const productGetById: any = await axios.post('/api/productById', {
        body: product.slug,
      })
      setProductData(productGetById)
    }
    productData()
  }, [product, selectedPaymentOption])

  const variant = getProductVariant(product, selectedOptions)

  const addToCart = async () => {
    setLoading(true)
    const getCartInfo = getLocalStorageData('cartInfo')
    if (getCartInfo) {
      const cartLine = await cartLinesAdd({
        cartId: getCartInfo?.cartId,
        lines: {
          quantity: selectedQuantity,
          merchandiseId: productData?.data.variants.edges[1].node.id,
          sellingPlanId:
            selectedPaymentOption === 'subscription'
              ? productData?.data?.sellingPlanGroups?.edges[0]?.node
                  ?.sellingPlans?.edges[0]?.node?.id != undefined
                ? productData?.data?.sellingPlanGroups?.edges[0]?.node
                    ?.sellingPlans?.edges[0]?.node?.id
                : null
              : null,
        },
      })
      setChecloutUpdateLink(cartLine?.data?.cartLinesAdd?.cart?.checkoutUrl)
      setCostInLocalStorage(cartLine?.data?.cartLinesAdd?.cart?.cost)
      setCartInLocalStorage(cartLine?.data?.cartLinesAdd?.cart?.lines.edges)
      console.log(
        'response  Data',
        cartLine?.data?.cartLinesAdd?.cart?.checkoutUrl
      )

      // setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } else {
      // if (selectedPaymentOption === 'subscription') {
      const getProduct = await createCartWithChekOutUrl({
        quantity: selectedQuantity,
        merchandiseId:
          selectedPaymentOption === 'subscription'
            ? productData?.data?.variants?.edges[1]?.node?.id != undefined
              ? productData?.data?.variants?.edges[1]?.node?.id
              : product.variants[0]?.id
            : product.variants[0]?.id
            ? product.variants[0]?.id
            : productData?.data.variants.edges[1].node.id,
        sellingPlanId:
          selectedPaymentOption === 'subscription'
            ? productData?.data?.sellingPlanGroups?.edges[0]?.node?.sellingPlans
                ?.edges[0]?.node?.id
            : null,
      })
      setAuthInfoInLocalStorage({
        cartId: getProduct.data.cartCreate.cart.id,
        cehckoutUrl: getProduct.data.cartCreate.cart.checkoutUrl,
      })
      setChecloutUpdateLink(getProduct.data.cartCreate.cart.checkoutUrl)

      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
      console.log(getProduct.data.cartCreate.cart)
    }
    // else {
    //   const getProduct = await createCartWithChekOutUrl({
    //     quantity: selectedQuantity,
    //     merchandiseId: product.variants[0]?.id,
    //   })
    //   setAuthInfoInLocalStorage({
    //     cartId: getProduct.data.cartCreate.cart.id,
    //     cehckoutUrl: getProduct.data.cartCreate.cart.checkoutUrl,
    //   })
    //   console.log(getProduct.data.cartCreate)
    // }
    // }
  }

  const titleName = 'ProductTitle'
  const titleCS = componentStyle[titleName]

  const descriptionName = 'Description'
  const descriptionCS = componentStyle[descriptionName]

  const productPriceName = 'ProductPrice'
  const productPriceCS = componentStyle[productPriceName]

  const ratingName = 'Rating'
  const ratingAO = adjustmentObject[ratingName]

  const noticeName = 'Notice'
  const noticeAO = adjustmentObject[noticeName]

  const seperatorName = 'Seperator'
  const seperatorAO = adjustmentObject[seperatorName]

  const buttonName = 'Button'
  const buttonAO = adjustmentObject[buttonName]
  const optionContainerName = 'ProductOptionContainer'
  const optionContainerCS = componentStyle[optionContainerName]
  const optionValueName = 'ProductOptionValue'
  const optionValueCS = componentStyle[optionValueName]
  // !bg-accent-9 !text-accent-0 !font-semibold text-5xl break-words font-normal !text-accent-9 font-americus text-emerald-500 w-14 text-[40px]
  const radioChange = (event: any) => {
    setSelectedPaymentOption(event.target.value)
  }
  const radios = [
    { label: 'Subscribe & Save 10% $36.90', value: 'subscription' },
    { label: 'One-time purchase $41.00', value: 'one-time' },
  ]
  return (
    <div className={className}>
      <h1 className={extractValues(titleCS)}>{product.name}</h1>
      <ProductDropdownOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        componentStyle={componentStyle}
      />
      <p className="font-bold ">
        {Object.values(selectedOptions).join(' / ').toUpperCase()}
      </p>
      <div className="flex items-center gap-4 ">
        <div className="flex items-center gap-2">
          <Rating value={ratingAO.rating} className="!text-yellow-300" />
          <p>{ratingAO.reviewAmount} reviews</p>
        </div>
        <p className="bg-accent-2 font-campton rounded-full p-2 px-4 my-2 w-fit">
          {noticeAO.text}
        </p>
      </div>

      <Text
        className={extractValues(descriptionCS)}
        html={product.descriptionHtml || product.description}
      />

      <fieldset className="ml-12 ">
        <div
          className={`px-2 mb-4 flex flex-col gap-4 ${
            selectedPaymentOption === 'subscription' && 'bg-accent-2 py-4'
          }`}
        >
          <Radio
            onChange={radioChange}
            label={radios[0].label}
            value={radios[0].value}
            name="payment"
            defaultChecked
          />
          {/* {selectedPaymentOption === 'subscription' && (
            <div
              className={`${extractValues(optionContainerCS)} bg-white ml-8`}
            >
              <Dropdown
                styles={`${extractValues(optionValueCS)} !text-sm`}
                name="payment"
                options={[
                  { label: 'Deliver every 2 Weeks' },
                  { label: 'Deliver every 4 Weeks' },
                  { label: 'Deliver every 6 Weeks' },

                  { label: 'Deliver every 8 Weeks' },
                ]}
              />
            </div>
          )} */}
        </div>
        <div className="px-2">
          <Radio
            onChange={radioChange}
            label={radios[1].label}
            value={radios[1].value}
            name="payment"
          />
        </div>
      </fieldset>

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
            adjustmentObject={adjustmentObject}
          />
        </div>
      )}
      <Seperator className="" text={seperatorAO.text} />
      <button className="w-full py-2 font-bold text-xl my-4 rounded-full bg-secondary text-secondary">
        {buttonAO.text}
      </button>
    </div>
  )
}

export default ProductSidebar

// const getCartShowData = getLocalStorageData('cartData')

// if (selectedPaymentOption === 'subscription') {
//   if (getCartInfo?.cartId) {
//     console.log('Product update mutation')
//   } else {
//     // const items = {
//     //   quantity: selectedQuantity,
//     //   //@ts-ignore
//     //   merchandiseId: productData?.data.variants.edges[1].node.id,
//     //   sellingPlanId:
//     //     //@ts-ignore

//     //     productData?.data.sellingPlanGroups?.edges[0]?.node?.sellingPlans
//     //       .edges[0].node.id,
//     // }

//     const data = {
//       lines: [
//         {
//           quantity: 1,
//           merchandiseId: 'gid://shopify/ProductVariant/40100028055633',
//           sellingPlanId: 'gid://shopify/SellingPlan/589758545',
//         },
//       ],
//     }

//     const items: any = {
//       merchandiseId: 'gid://shopify/ProductVariant/40100028055633',
//       quantity: 1,
//       sellingPlanId: 'gid://shopify/SellingPlan/589758545',
//     }
//     console.log('innn.,,')
//     const getProduct = await createCartWithChekOutUrl(
//       1,
//       'gid://shopify/ProductVariant/40099784753233',
//       'gid://shopify/SellingPlan/589791313'
//     )
//   }
// } else {
//   const getProduct = await createCartWithChekOutUrl({
//     quantity: selectedQuantity,
//     //@ts-ignore
//     merchandiseId: productData?.data.variants.edges[1].node.id,
//     // //@ts-ignore
//     //  sellingPlanId: productData?.data.sellingPlanGroups?.edges[0]?.node?.sellingPlans.edges[0]
//     //   .node.id
//   })
// }

// if (selectedPaymentOption === 'subscription') {
//   if (getCartInfo?.cartId) {
//     setLoading(true)
//     const updateCart = await cartLinesAdd(
//       getCartInfo?.cartId,
//       selectedQuantity,
//       //@ts-ignore
//       productData?.data.variants.edges[1].node.id || '',
//       //@ts-ignore
//       productData?.data.sellingPlanGroups?.edges[0]?.node?.sellingPlans
//         .edges[0].node.id || ''
//     )
//     const setCatDatas = setCartInLocalStorage({
//       cartData: updateCart.cart,
//     })
//     console.log(
//       'updateCart data insert',
//       updateCart.cart.lines.edges[0].node
//     )
//     setSidebarView('CART_VIEW')
//     openSidebar()
//     setLoading(false)

//     console.log(updateCart)
//   } else {
//     const getProduct = await createCartWithChekOutUrl(
//       selectedQuantity,
//       //@ts-ignore
//       productData?.data.variants.edges[1].node.id || '',
//       //@ts-ignore
//       productData?.data.sellingPlanGroups?.edges[0]?.node?.sellingPlans
//         .edges[0].node.id || ''
//     )
//     console.log(getProduct.cart.checkoutUrl, getProduct.cart.id)
//     const setCatData = setAuthInfoInLocalStorage({
//       cartId: getProduct?.cart.id,
//       cehckoutUrl: getProduct?.cart.checkoutUrl,
//     })
//     const setCatDatas = setCartInLocalStorage({
//       cartData: getProduct.cart,
//     })
//     console.log('getProduct data insert', getProduct.cart)
//     setSidebarView('CART_VIEW')
//     openSidebar()
//     setLoading(false)
//   }
// } else {
//   setLoading(true)
//   if (getCartInfo?.cartId == undefined) {
//     const createRegularPro = await createCartWithRegularPrd(
//       selectedQuantity,
//       //@ts-ignore
//       String(variant ? variant.id : product.variants[0]?.id)
//     )
//     const setCatData = setAuthInfoInLocalStorage({
//       cartId: createRegularPro?.cart.id,
//       cehckoutUrl: createRegularPro?.cart.checkoutUrl,
//     })
//     const setCatDatas = setCartInLocalStorage({
//       cartData: getCartShowData
//         ? getCartShowData?.push([...createRegularPro.cart])
//         : createRegularPro.cart,
//     })
//     console.log('createRegularPro data insert', createRegularPro.cart)
//     setSidebarView('CART_VIEW')
//     openSidebar()
//     setLoading(false)
//   } else {
//     const regularAddTocart = await cartLinesAddRegularProduct(
//       getCartInfo?.cartId,
//       selectedQuantity,
//       //@ts-ignore
//       String(variant ? variant.id : product.variants[0]?.id) || ''
//     )
//     const setCatData = setAuthInfoInLocalStorage({
//       cartId: regularAddTocart?.cart.id,
//       cehckoutUrl: regularAddTocart?.cart.checkoutUrl,
//     })

//     const setCatDatas = setCartInLocalStorage({
//       cartData: regularAddTocart.cart?.lines.edges[0].node,
//     })
//     console.log(
//       'regularAddTocart data insert',
//       regularAddTocart?.cart.lines.edges[0].node
//     )

//     setSidebarView('CART_VIEW')
//     openSidebar()
//     setLoading(false)
//   }
// }

// const res = await addItem({
//   productId: String(product.id),
//   variantId: String(variant ? variant.id : product.variants[0]?.id),
//   quantity: selectedQuantity,
// })
//  const getProduct = await createCartWithChekOutUrl(
//    1,
//    'gid://shopify/ProductVariant/40099784720465',
//    'gid://shopify/SellingPlan/589791313'
//  )
// const getProduct = await createCartWithChekOutUrl(
//   1,
//   'gid://shopify/ProductVariant/40099784720465',
//   'gid://shopify/SellingPlan/589791313'
// )
// const productByHanlde = await getProductByHandle(product.slug)
// console.log(productByHanlde)
// const response = await fetch('/api/admindata', {
//   method: 'POST',
//   body: product.slug,
// })
// }
