import { Button, Rating } from '@components/ui'

interface ReviewItemProps {
  index: number
  review: any
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, index }) => {
  return (
    <div
      className={`keen-slider__slide number-slide${index} flex justify-center items-center`}
      style={{ maxWidth: 450, minWidth: 450 }}
    >
      <div className={`bg-primary border-2 border-secondary p-4 pt-2`}>
        <div className="flex items-center gap-4">
          <img className="w-24" src={review.image} />
          <div className="lg:w-64 lg:h-64 h-80 w-52">
            <div className="lg:h-48 h-64 overflow-auto">
              <Rating value={review.rating} className="!text-yellow-300" />
              <h1 className="truncate font-bold text-lg">{review.title}</h1>
              <p>{review.description}</p>
            </div>

            <h1 className="truncate font-bold mt-2">{review.name}</h1>
            <p className="truncate text-sm">{review.product}</p>
            <p className="text-sm italic">{review.date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReviewItem
