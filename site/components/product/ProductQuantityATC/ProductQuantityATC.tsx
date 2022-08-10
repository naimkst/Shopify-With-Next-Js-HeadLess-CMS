import { FC, useEffect, useRef, useState } from 'react'
import s from './ProductQuantityATC.module.css'
import cn from 'clsx'
import { LoadingDots } from '@components/ui'

interface Props {
  setSelectedQuantity: (value: number) => void
  addToCart: () => void
  loading: boolean
  componentStyle: any
}

const ProductQuantityATC: FC<Props> = ({
  setSelectedQuantity,
  addToCart,
  loading,
  componentStyle,
}) => {
  const [inputValue, setInputValue] = useState(1)
  const inputChangeHandler = (type: string) => {
    if (type === 'INCREASE') {
      setInputValue(+inputValue + 1)
    }
    if (type === 'DECREASE') {
      if (+inputValue <= 1) return
      setInputValue(+inputValue - 1)
    }
  }
  useEffect(() => {
    if (inputValue <= 1) {
      setSelectedQuantity(1)
    } else {
      setSelectedQuantity(inputValue)
    }
  }, [inputValue])

  const addToCartName = 'AddToCart'
  const addToCartCS = componentStyle[addToCartName]
  //  const addToCartAO = adjustmentObject[addToCartName]

  return (
    <div className="flex items-center border-4 border-secondary w-fit rounded-full my-4">
      <div className="px-4">
        <button onClick={() => inputChangeHandler('DECREASE')}>-</button>
        <input
          value={inputValue}
          onChange={(event) => setInputValue(+event.target.value)}
          type="number"
          min={1}
          className={`${cn(s.input)} bg-transparent w-10 text-center`}
        />
        <button onClick={() => inputChangeHandler('INCREASE')}>+</button>
      </div>

      <button
        className="bg-secondary text-secondary py-2 px-10 rounded-r-full text-lg font-bold flex items-center"
        onClick={addToCart}
        disabled={loading}
      >
        Add to cart
        {loading && (
          <i className="pl-2 m-0 flex">
            <LoadingDots />
          </i>
        )}
      </button>
    </div>
  )
}

export default ProductQuantityATC
