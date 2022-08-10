import { useKeenSlider } from 'keen-slider/react'
import React, {
  Children,
  isValidElement,
  useState,
  useRef,
  useEffect,
} from 'react'
import cn from 'clsx'
import { a } from '@react-spring/web'
import s from './ProductSlider.module.css'
import ProductSliderControl from '../ProductSliderControl'
import { ArrowLeft, ArrowRight } from '@components/icons'

interface ProductSliderProps {
  children: React.ReactNode[]
  className?: string
  componentStyle: any
  thumbControls?: boolean
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  children,
  className = '',
  componentStyle,
  thumbControls = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const thumbsContainerRef = useRef<HTMLDivElement>(null)

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    created: () => setIsMounted(true),
    slideChanged(s) {
      const slideNumber = s.track.details.rel
      setCurrentSlide(slideNumber)

      if (thumbsContainerRef.current) {
        const $el = document.getElementById(`thumb-${slideNumber}`)
        if (slideNumber >= 3) {
          thumbsContainerRef.current.scrollLeft = $el!.offsetLeft
        } else {
          thumbsContainerRef.current.scrollLeft = 0
        }
      }
    },
  })

  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    const preventNavigation = (event: TouchEvent) => {
      // Center point of the touch area
      const touchXPosition = event.touches[0].pageX
      // Size of the touch area
      const touchXRadius = event.touches[0].radiusX || 0

      // We set a threshold (10px) on both sizes of the screen,
      // if the touch area overlaps with the screen edges
      // it's likely to trigger the navigation. We prevent the
      // touchstart event in that case.
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault()
    }

    const slider = sliderContainerRef.current!

    slider.addEventListener('touchstart', preventNavigation)

    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', preventNavigation)
      }
    }
  }, [])

  const onPrev = React.useCallback(() => slider.current?.prev(), [slider])
  const onNext = React.useCallback(() => slider.current?.next(), [slider])

  const sliderName = 'SliderContainer'
  const sliderCS = componentStyle[sliderName]

  const sliderAlbumName = 'SliderAlbum'
  const sliderAlbumCS = componentStyle[sliderAlbumName]

  const sliderThumbName = 'SliderThumb'
  const sliderThumbCS = componentStyle[sliderThumbName]

  let sliderBG = sliderCS.backgroundColor ? sliderCS.backgroundColor : ''

  // bg-violet-dark !h-[76px]
  let sliderAlbumBG = sliderAlbumCS.backgroundColor
    ? sliderAlbumCS.backgroundColor
    : ''
  let sliderAlbumHeight = sliderAlbumCS.height ? sliderAlbumCS.height : ''
  let sliderAlbumMargin = sliderAlbumCS.margin ? sliderAlbumCS.margin : ''

  // !w-[76px]
  let sliderThumbWidth = sliderThumbCS.width ? sliderThumbCS.width : ''
  let sliderThumbMargin = sliderThumbCS.margin ? sliderThumbCS.margin : ''

  const sliderClassName = `${sliderBG}`
  const sliderAlbumClassName = `${sliderAlbumBG} ${sliderAlbumHeight} ${sliderAlbumMargin}`
  const sliderThumbClassName = `${sliderThumbWidth} ${sliderThumbMargin}`

  return (
    <div
      className={`flex items-center justify-center overflow-x-hidden ${sliderClassName}`}
    >
      <div className={cn(s.root, className)} ref={sliderContainerRef}>
        <div
          ref={ref}
          className={cn(s.slider, { [s.show]: isMounted }, 'keen-slider')}
        >
          {slider && !thumbControls && (
            <ProductSliderControl
              onPrev={onPrev}
              onNext={onNext}
              componentStyle={componentStyle}
            />
          )}
          {Children.map(children, (child) => {
            // Add the keen-slider__slide className to children
            if (isValidElement(child)) {
              return {
                ...child,
                props: {
                  ...child.props,
                  className: `${
                    child.props.className ? `${child.props.className} ` : ''
                  }keen-slider__slide`,
                },
              }
            }
            return child
          })}
        </div>
        <div className={`${thumbControls && 'flex mx-4'}`}>
          {thumbControls && (
            <button
              className="mx-2"
              onClick={onPrev}
              aria-label="Previous Product Image"
            >
              <ArrowLeft />
            </button>
          )}
          <a.div
            className={`${s.album} ${sliderAlbumClassName}`}
            ref={thumbsContainerRef}
          >
            {slider &&
              Children.map(children, (child, idx) => {
                if (isValidElement(child)) {
                  return {
                    ...child,
                    props: {
                      ...child.props,
                      className: `${cn(child.props.className, s.thumb, {
                        [s.selected]: currentSlide === idx,
                      })} ${sliderThumbClassName}`,
                      id: `thumb-${idx}`,
                      onClick: () => {
                        slider.current?.moveToIdx(idx)
                      },
                    },
                  }
                }
                return child
              })}
          </a.div>
          {thumbControls && (
            <button
              className="mx-2"
              onClick={onNext}
              aria-label="Next Product Image"
            >
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductSlider
