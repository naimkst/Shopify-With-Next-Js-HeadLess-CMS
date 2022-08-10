import { memo } from 'react'
import { Swatch } from '@components/product'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import { extractValues } from 'utility/extractValues'

interface ProductDropdownOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
  componentStyle: any
}

const ProductDropdownOptions: React.FC<ProductDropdownOptionsProps> = ({
  options,
  selectedOptions,
  componentStyle,
  setSelectedOptions,
}) => {
  const optionLabelName = 'ProductOptionLabel'
  const optionLabelCS = componentStyle[optionLabelName]
  const optionContainerName = 'ProductOptionContainer'
  const optionContainerCS = componentStyle[optionContainerName]
  const optionValueName = 'ProductOptionValue'
  const optionValueCS = componentStyle[optionValueName]
  // w-fit px-2 py-2
  return (
    <div>
      {options.map((opt) => (
        <div className="pb-4" key={opt.displayName}>
          <h2 className={extractValues(optionLabelCS)}>{opt.displayName}</h2>
          <div className={extractValues(optionContainerCS)}>
            <select
              className={extractValues(optionValueCS)}
              name={opt.displayName}
              id={opt.displayName}
              onChange={(event) => {
                setSelectedOptions((selectedOptions) => {
                  return {
                    ...selectedOptions,
                    [opt.displayName.toLowerCase()]:
                      event.target.value.toLowerCase(),
                  }
                })
              }}
            >
              {opt.values.map((v, i: number) => {
                return (
                  <option key={v.label} value={v.label}>
                    {v.label}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(ProductDropdownOptions)
