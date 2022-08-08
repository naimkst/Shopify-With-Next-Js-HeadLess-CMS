import { Button, Rating } from '@components/ui'

interface ProductreviewsProps {
  componentStyle: any
  adjustmentObject: any
}

const ProductReviews: React.FC<ProductreviewsProps> = ({
  componentStyle,
  adjustmentObject,
}) => {
  const productReviewsName = 'ProductReviews'
  const cs = componentStyle[productReviewsName]
  const ao = adjustmentObject[productReviewsName]

  const titleName = 'Title'
  const titleCS = cs[titleName]

  const textName = 'Text'
  const textCS = cs[textName]

  const reviewsName = 'Reviews'
  const reviewsCS = cs[reviewsName]

  const reviewsTextName = 'ReviewsText'
  const reviewsTextCS = cs[reviewsTextName]

  const btnTextName = 'BtnText'
  const btnTextCS = cs[btnTextName]

  let titleColor = titleCS.fontColor ? titleCS.fontColor : ''
  let titleFontWeight = titleCS.fontWeight ? titleCS.fontWeight : ''
  let titleFontSize = titleCS.fontSize ? titleCS.fontSize : ''

  const titleClassName = `${titleColor} ${titleFontWeight} ${titleFontSize}`

  let reviewsTextFontWeight = reviewsTextCS.fontWeight
    ? reviewsTextCS.fontWeight
    : ''

  const reviewsTextClassName = ` ${reviewsTextFontWeight}`

  let textSize = textCS.fontSize ? textCS.fontSize : ''
  let textFontWeight = textCS.fontWeight ? textCS.fontWeight : ''
  let textMargin = textCS.margin ? textCS.margin : ''

  const textClassName = `${textSize} ${textFontWeight} ${textMargin}`

  let subTextColor = textCS.fontColor ? textCS.fontColor : ''

  const subTextClassName = `${subTextColor}`

  let btnTextColor = btnTextCS.fontColor ? btnTextCS.fontColor : ''
  let btnTextFontSize = btnTextCS.fontSize ? btnTextCS.fontSize : ''
  let btnTextMargin = btnTextCS.margin ? btnTextCS.margin : ''
  let btnTextWidth = btnTextCS.width ? btnTextCS.width : ''
  let btnTextPadding = btnTextCS.padding ? btnTextCS.padding : ''
  let btnTextBG = btnTextCS.backgroundColor ? btnTextCS.backgroundColor : ''

  const btnTextClassName = `${btnTextColor} ${btnTextFontSize} ${btnTextMargin} ${btnTextWidth} ${btnTextPadding} ${btnTextBG}`

  let reviewsTitleSize = reviewsCS.Title.fontSize
    ? reviewsCS.Title.fontSize
    : ''
  let reviewsTitleFontWeight = reviewsCS.Title.fontWeight
    ? reviewsCS.Title.fontWeight
    : ''
  const reviewsTitleClassName = `${reviewsTitleSize} ${reviewsTitleFontWeight}`

  let reviewsTextColor = reviewsCS.Text.fontColor
    ? reviewsCS.Text.fontColor
    : ''

  let reviewsTextMargin = reviewsCS.Text.margin ? reviewsCS.Text.margin : ''

  const reviewsDescriptionClassName = `${reviewsTextColor} ${reviewsTextMargin}`
  // p-2 text-black my-4
  return (
    <div className="max-w-2xl mx-auto py-24 px-4 grid grid-cols-1 gap-y-16 gap-x-12 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8 lg:grid-cols-3 ">
      <div>
        <h2 className={titleClassName}>{ao.Content.title}</h2>
        <div className="flex items-center gap-4">
          <Rating value={4} />
          <p className={reviewsTextClassName}>{ao.Content.reviewsText}</p>
        </div>
        <h2 className={textClassName}>{ao.Content.text}</h2>
        <p className={subTextClassName}>{ao.Content.subText}</p>
        <button className={btnTextClassName}>{ao.Content.btnText}</button>
      </div>
      <div className="h-[60vh] overflow-y-scroll pr-6 grid col-span-2">
        {ao.Reviews.map(
          (
            review: { name: string; rating: number; description: string },
            index: number
          ) => (
            <div className="mb-4" key={index}>
              <p className={reviewsTitleClassName}>{review.name}</p>
              <Rating value={review.rating} />
              <p className={reviewsDescriptionClassName}>
                {review.description}
              </p>
              <hr className="mt-7 border-accent-2" />
            </div>
          )
        )}
      </div>
    </div>
  )
}
export default ProductReviews
