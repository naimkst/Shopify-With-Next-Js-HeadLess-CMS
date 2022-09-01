export const setAuthInfoInLocalStorage = (payload: {
  cartId?: string
  cehckoutUrl?: string
}) => {
  const cartInfo = {
    cartId: payload.cartId,
    cehckoutUrl: payload.cartId,
  }
  localStorage.setItem('cartInfo', JSON.stringify(cartInfo))
}

export const setCartInLocalStorage = (cartData?: any) => {
  // console.log('storage back', cartData)
  localStorage.setItem('cartData', JSON.stringify(cartData))
}

export const setCostInLocalStorage = (costData?: any) => {
  // console.log('storage back', cartData)
  localStorage.setItem('costData', JSON.stringify(costData))
}

export const setChecloutUpdateLink = (checkOutLink?: any) => {
  localStorage.setItem('checkOutLink', JSON.stringify(checkOutLink))
}

export const allProductData = (allProductData?: any) => {
  localStorage.setItem('allProductData', JSON.stringify(allProductData))
}

export const getLocalStorageData = (key: string) => {
  let data: any =
    typeof window !== 'undefined' ? localStorage.getItem(key) : null
  data = JSON.parse(data)

  return data
}
