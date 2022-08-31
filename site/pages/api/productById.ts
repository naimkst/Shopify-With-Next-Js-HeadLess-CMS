import axios from 'axios'

export default async function handler(req: any, res: any) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const shopifyAdminToken = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
  const { body } = req.body
  const query = `query {
     productByHandle(handle: "${body}"){
    id
    requiresSellingPlan
    sellingPlanGroups(first:5){
      edges{
        node{
          id
          name
          sellingPlans(first:3){
            edges{
              node{
                id
                name
              }
            }
          }
        }
      }
    }
    variants(first:5){
      edges{
        node{
          id
          title
        }
      }
    }
  }
  }`

  axios
    .post(`https://${domain}/admin/api/2022-07/graphql.json`, query, {
      headers: {
        'X-Shopify-Access-Token': shopifyAdminToken || '',
        'Content-Type': 'application/graphql',
      },
    })
    .catch((err) => {
      res.status(200).json(err)
    })
    .then((response) => {
      try {
        res.status(200).json(response?.data?.data.productByHandle)
      } catch (error) {
        res.status(200).json(error)
      }
    })
}
