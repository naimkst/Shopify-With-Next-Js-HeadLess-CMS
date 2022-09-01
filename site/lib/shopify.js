import gql from 'graphql-tag'
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
async function ShopifyData(query) {
  const URL = `https://${domain}/api/2022-07/graphql.json`

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json()
    })

    return data
  } catch (error) {
    throw new Error('Products not fetched')
  }
}

export async function getProductsInCollection() {
  const query = `
  {
    collectionByHandle(handle: "frontpage") {
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const allProducts = response.data.collectionByHandle.products.edges
    ? response.data.collectionByHandle.products.edges
    : []

  return allProducts
}

export async function getAllProducts() {
  const query = `{
    products(first: 250) {
      edges {
        node {
          handle
          id
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  const slugs = response.data.products.edges ? response.data.products.edges : []
  return slugs
}

export async function getProduct(handle) {
  const query = `
  {
    productByHandle(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  totalInventory
                  images(first: 5) {
                    edges {
                      node {
                        originalSrc
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              originalSrc
              altText
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const product = response.data.productByHandle
    ? response.data.productByHandle
    : []

  return product
}

export async function getProductByHandle(handle) {
  const query = `
  {
  product(handle: "${handle}"){
    id
    title
    priceRange{
      maxVariantPrice{
        amount
      }
      minVariantPrice{
        amount
      }
    }
    variants(first:3){
      edges{
        node{
          id
          title
          priceV2{
            amount
          }
        }
      }
    }
  }
}`

  const response = await ShopifyData(query)

  // const product = response.data.product ? response.data.product : []

  return response
}

// export async function createCartWithChekOutUrl(
//   quantity,
//   merchandiseId,
//   sellingPlanId
// ) {
//   const query = `
//   mutation {
//       cartCreate(
//         input: {
//           lines: [
//             {
//               quantity: ${quantity}
//               merchandiseId: "${merchandiseId}"
//               sellingPlanId: "${sellingPlanId}"
//             }
//           ]
//         }
//       ) {
//         cart {
//           id
//           attributes {
//             key
//             value
//           }
//           checkoutUrl
//           lines(first: 10) {
//             edges {
//               node {
//                 sellingPlanAllocation {
//                   sellingPlan {
//                     id
//                     name
//                   }
//                 }
//               }
//             }
//           }
//         }
//         userErrors {
//           code
//           field
//         }
//       }
//     }`

//   const response = await ShopifyData(query)
//   const product = response.data.cartCreate ? response.data.cartCreate : []
//   return product
// }

// export async function createCartWithChekOutUrlWorking(
//   quantity,
//   merchandiseId,
//   sellingPlanId
// ) {
//   const query = `
//   mutation {cartCreate(input: {lines: [{quantity: 1, merchandiseId: "${merchandiseId}", sellingPlanId: "${sellingPlanId}"
// }]}) {
//     cart {
//       id
//       totalQuantity
//       attributes {
//         key
//         value
//       }
//       checkoutUrl
//       lines(first: 4) {
//         edges {
//           node {
//             sellingPlanAllocation {
//               sellingPlan {
//                 id
//                 name
//               }
//             }
//           }
//         }
//       }
//     }
//     userErrors {
//       code
//       field
//     }
//   }}`

//   const response = await ShopifyData(query)
//   // const product = response.data.cartCreate ? response.data.cartCreate : []
//   return response
// }

export async function createCartWithChekOutUrl(variables) {
  const URL = `https://${domain}/api/2022-07/graphql.json`
  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation AddToCart(
          $quantity: Int
          $merchandiseId: ID!
          $sellingPlanId: ID
        ) {
          cartCreate(
            input: {
              lines: [
                {
                  quantity: $quantity
                  merchandiseId: $merchandiseId
                  sellingPlanId: $sellingPlanId
                }
              ]
            }
          ) {
            cart {
              id
              totalQuantity
              attributes {
                key
                value
              }
              checkoutUrl
              lines(first: 4) {
                edges {
                  node {
                    sellingPlanAllocation {
                      sellingPlan {
                        id
                        name
                      }
                    }

                    id
                    quantity
                    merchandise {
                      ... on Node {
                        id
                        ... on CheckoutLineItem {
                          id
                          title
                          unitPrice {
                            amount
                          }
                          quantity
                          variant{
                    id
                    unitPrice{
                      amount
                    }
                  }
                        }
                        ... on Checkout {
                          lineItems {
                            edges {
                              node {
                                id
                                title
                                unitPrice {
                                  amount
                                }
                                variant {
                                  id
                                  title
                                  unitPrice {
                                    amount
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      ... on ProductVariant {
                        product {
                          title
                          id
                          priceRange {
                            maxVariantPrice {
                              amount
                            }
                          }
                          featuredImage {
                            url
                          }
                        }
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
            userErrors {
              code
              field
            }
          }
        }
      `,
      variables: {
        quantity: variables.quantity,
        merchandiseId: variables.merchandiseId,
        sellingPlanId: variables.sellingPlanId && variables.sellingPlanId,
      },
    }),
  }
  const data = await fetch(URL, options).then((response) => {
    return response.json()
  })

  return data
}

export async function createCartWithRegularPrd(quantity, merchandiseId) {
  const query = `
  mutation {
      cartCreate(
        input: {
          lines: [
            {
              quantity: ${quantity}
              merchandiseId: "${merchandiseId}"
            }
          ]
        }
      ) {
        cart {
          id
          attributes {
            key
            value
          }
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                sellingPlanAllocation {
                  sellingPlan {
                    id
                    name
                  }
                }
              }
            }
          }
        }
        userErrors {
          code
          field
        }
      }
    }`

  const response = await ShopifyData(query)
  const product = response.data.cartCreate ? response.data.cartCreate : []
  return product
}

export async function cartLinesAdd(variables) {
  const URL = `https://${domain}/api/2022-07/graphql.json`
  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation CartLineUpdate(
          $cartId: ID!
          $quantity: Int
          $sellingPlanId: ID
        ) {
          cartLinesAdd(
            cartId: $cartId
            lines: { quantity: $quantity, merchandiseId: "${variables?.lines.merchandiseId}", sellingPlanId: $sellingPlanId }
          ) {
              cart {
      id
      checkoutUrl
      createdAt
      updatedAt
      totalQuantity
      cost{
        totalAmount{
          amount
          currencyCode
        }
        subtotalAmount{
          amount
          currencyCode
        }
      }
           lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on Node{
                id
                ... on CheckoutLineItem{
                  id
                  title
                  unitPrice{
                    amount
                  }
                  quantity
                  variant{
                    id
                    unitPrice{
                      amount
                    }
                  }
                }
                ... on Checkout{
                  lineItems{
                    edges{
                      node{
                        id
                        title
                        unitPrice{
                          amount
                        }
                        variant{
                          id
                          title
                          unitPrice{
                            amount
                          }
                          
                        }
                      }
                    }
                  }
                }
              }
              ... on ProductVariant {
                product {
                  title
                  id
                  priceRange {
                    maxVariantPrice {
                      amount
                    }
                  }
                  featuredImage {
                    url
                  }
                }
                id
                title
              }
            }
          }
        }
      }
    }	
          }
        }
      `,
      variables: {
        cartId: variables?.cartId,
        quantity: variables.lines.quantity,
        merchandiseId: variables.lines.merchandiseId,
        sellingPlanId: variables.lines.sellingPlanId,
      },
    }),
  }
  const data = await fetch(URL, options).then((response) => {
    return response.json()
  })

  return data
}

export async function cartLinesAddBackup(variables) {
  const URL = `https://${domain}/api/2022-07/graphql.json`
  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation CartLineUpdate(
          $cartId: ID!
          $quantity: Int
          $sellingPlanId: ID
        ) {
          cartLinesAdd(
            cartId: $cartId
            lines: { quantity: $quantity, merchandiseId: "${variables?.lines.merchandiseId}", sellingPlanId: $sellingPlanId }
          ) {
              cart {
      id
      checkoutUrl
      createdAt
      updatedAt
      totalQuantity
      cost{
        totalAmount{
          amount
          currencyCode
        }
        subtotalAmount{
          amount
          currencyCode
        }
      }
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                product {
                  title
                  id
                  priceRange{
                    maxVariantPrice{
                      amount
                    }
                  }
                  featuredImage{
                    url
                  }
                }
                id
                title
              }
            }
          }
        }
      }
    }	
          }
        }
      `,
      variables: {
        cartId: variables?.cartId,
        quantity: variables.lines.quantity,
        merchandiseId: variables.lines.merchandiseId,
        sellingPlanId: variables.lines.sellingPlanId,
      },
    }),
  }
  const data = await fetch(URL, options).then((response) => {
    return response.json()
  })

  return data
}

export async function cartLinesRemove(variables) {
  console.log('========', variables)
  const URL = `https://${domain}/api/2022-07/graphql.json`
  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation cartLinesRemove {
          cartLinesRemove(cartId: "${variables?.cartId}", lineIds: "${variables.lineIds}") {
            cart {
      id
      checkoutUrl
      createdAt
      updatedAt
      totalQuantity
      cost{
        totalAmount{
          amount
          currencyCode
        }
        subtotalAmount{
          amount
          currencyCode
        }
      }
           lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on Node{
                id
                ... on CheckoutLineItem{
                  id
                  title
                  unitPrice{
                    amount
                  }
                  quantity
                  variant{
                    id
                    unitPrice{
                      amount
                    }
                  }
                }
                ... on Checkout{
                  lineItems{
                    edges{
                      node{
                        id
                        title
                        unitPrice{
                          amount
                        }
                        variant{
                          id
                          title
                          unitPrice{
                            amount
                          }
                          
                        }
                      }
                    }
                  }
                }
              }
              ... on ProductVariant {
                product {
                  title
                  id
                  priceRange {
                    maxVariantPrice {
                      amount
                    }
                  }
                  featuredImage {
                    url
                  }
                }
                id
                title
              }
            }
          }
        }
      }
    }	
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        cartId: variables?.cartId,
        lineIds: variables?.lineIds,
      },
    }),
  }
  const data = await fetch(URL, options).then((response) => {
    return response.json()
  })

  return data
}

export async function cartLinesAddRegularProduct(
  cartId,
  quantity,
  merchandiseId
) {
  const query = `
  mutation {
      cartLinesAdd(cartId: "${cartId}", lines: {quantity: ${quantity}, merchandiseId: "${merchandiseId}"}){
    cart{
      checkoutUrl
      lines(first:4){
        edges{
          node{
            id
            quantity
          }
        }
      }
    }
  }
    }`

  const response = await ShopifyData(query)
  const product = response.data.cartLinesAdd ? response.data.cartLinesAdd : []
  return product
}

// export async function getProductSubscriptionPlanWithId() {
//   const query = `{
//   product(id: "gid://shopify/Product/6977877311569"){
//     id
//     title
//     sellingPlanGroups(first: 3){
//       edges{
//         node{
//           id
//           name
//           sellingPlans(first: 3){
//             edges{
//               node{
//                 id
//                 name
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }`

//   const response = await ShopifyData(query)

//   // const product = response.data.cartCreate ? response.data.cartCreate : []

//   return response
// }

// =====

// const query = gql`
//   mutation AddToCart(
//     $quantity: Int
//     $merchandiseId: ID!
//     $sellingPlanId: ID
//   ) {
//     cartCreate(
//       input: {
//         lines: [
//           {
//             quantity: $quantity
//             merchandiseId: $merchandiseId
//             sellingPlanId: $sellingPlanId
//           }
//         ]
//       }
//     ) {
//       cart {
//         id
//         totalQuantity
//         attributes {
//           key
//           value
//         }
//         checkoutUrl
//         lines(first: 4) {
//           edges {
//             node {
//               sellingPlanAllocation {
//                 sellingPlan {
//                   id
//                   name
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         code
//         field
//       }
//     }
//   }
// `

// const response = await ShopifyData(query)
// // const product = response.data.cartCreate ? response.data.cartCreate : []
// return response
