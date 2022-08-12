import { Button, Rating } from '@components/ui'
import ReviewItem from './ReviewItem/ReviewItem'
import * as React from 'react'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { extractValues } from 'utility/extractValues'

interface ProductreviewsProps {
  componentStyle: any
  adjustmentObject: any
}

const ProductReviews: React.FC<ProductreviewsProps> = ({
  componentStyle,
  adjustmentObject,
}) => {
  const productReviewsName = 'ProductReviews2'
  const cs = componentStyle[productReviewsName]
  const ao = adjustmentObject[productReviewsName]

  const contentName = 'Content'
  const contentAO = ao[contentName]

  const reviewsName = 'Reviews'
  const reviewsAO = ao[reviewsName]
  const reviewsCS = cs[reviewsName]

  const titleName = 'Title'
  const titleCS = cs[titleName]

  const textName = 'Text'
  const textCS = cs[textName]

  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: 'snap',

      slides: {
        perView: 'auto',
        spacing: 5,
        origin: 'center',
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ]
  )

  return (
    <div className="flex flex-col items-center bg-accent-1 lg:p-12 py-12 px-4 ">
      <h1 className={extractValues(titleCS)}>{contentAO.title}</h1>
      <Rating value={5} className="!text-yellow-300" />
      <p className={extractValues(textCS)}>{contentAO.text}</p>
      <div ref={ref} className="keen-slider">
        {reviewsAO.map((review: any, idx: number) => (
          <ReviewItem index={idx} review={review} />
        ))}
      </div>
    </div>
  )
}
export default ProductReviews
