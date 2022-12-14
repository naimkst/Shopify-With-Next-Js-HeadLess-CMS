import { Fetcher } from '@vercel/commerce/utils/types'

export const fetcher: Fetcher = async () => {
  const res = await fetch('./data.json')
  if (res.ok) {
    const { data } = await res.json()
    return data
  }
  throw res
}
