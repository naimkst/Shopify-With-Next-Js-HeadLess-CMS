import axios from 'axios'

export default async function handler(req: any, res: any) {
  const domain = 'country-name-change.myshopify.com'
  const storefrontAccessToken = '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'
  const query = `query {
     products(first: 10) {
      edges {
        node {
          handle
          id
        }
      }
    }
  }`
  axios
    .post(`https://${domain}/admin/api/2022-07/graphql.json`, query, {
      headers: {
        'X-Shopify-Access-Token': storefrontAccessToken,
        'Content-Type': 'application/graphql',
      },
    })
    .catch((err) => {
      console.error(err)
    })
    .then((response) => {
      res.status(200).json(response?.data?.data.products.edges)
    })
}
