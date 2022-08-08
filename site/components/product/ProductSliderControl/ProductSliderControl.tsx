import { FC, MouseEventHandler, memo } from 'react'
import cn from 'clsx'
import s from './ProductSliderControl.module.css'
import { ArrowLeft, ArrowRight } from '@components/icons'

interface ProductSliderControl {
  onPrev: MouseEventHandler<HTMLButtonElement>
  onNext: MouseEventHandler<HTMLButtonElement>
  componentStyle: any
}

const ProductSliderControl: FC<ProductSliderControl> = ({
  onPrev,
  onNext,
  componentStyle,
}) => {
  const sliderControlsName = 'SliderControl'
  const sliderControlCS = componentStyle[sliderControlsName]
  let sliderControlBG = sliderControlCS.backgroundColor
    ? sliderControlCS.backgroundColor
    : ''
  let sliderControlColor = sliderControlCS.fontColor
    ? sliderControlCS.fontColor
    : ''

  // border-accent-0
  let sliderControlBorderColor = sliderControlCS.borderColor
    ? sliderControlCS.borderColor
    : ''
  const sliderControlClassName = `${sliderControlBG} ${sliderControlColor} ${sliderControlBorderColor}`

  return (
    <div className={`${s.control} ${sliderControlClassName}`}>
      <button
        className={cn(s.leftControl)}
        onClick={onPrev}
        aria-label="Previous Product Image"
      >
        <ArrowLeft />
      </button>
      <button
        className={cn(s.rightControl)}
        onClick={onNext}
        aria-label="Next Product Image"
      >
        <ArrowRight />
      </button>
    </div>
  )
}

export default memo(ProductSliderControl)
