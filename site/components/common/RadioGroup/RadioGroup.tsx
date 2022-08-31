import React, { FC } from 'react'
import Radio from './Radio'

interface RadioGroupProps {
  radios: { label: string; value: string }[]
  name: string
  onChange: (event: any) => void
}
const RadioGroup: FC<RadioGroupProps> = ({ radios, name, onChange }) => {
  return (
    <fieldset onChange={onChange}>
      {radios.map((radio) => (
        <Radio label={radio.label} value={radio.value} name={name} />
      ))}
    </fieldset>
  )
}
export default RadioGroup
