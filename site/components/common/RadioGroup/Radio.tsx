import { FC } from 'react'

interface RadioProps {
  label: string
  name: string
  value: string
  defaultChecked?: boolean
  onChange?: (event: any) => any
}
const Radio: FC<RadioProps> = ({ label, name, value, onChange }) => {
  return (
    <label className="radio-button">
      <input
        type="radio"
        className="radio-button__input"
        value={value}
        name={name}
        defaultChecked
        onChange={onChange}
      />
      <span className="radio-button__control"></span>
      <span className="radio-button__label">{label}</span>
    </label>
  )
}
export default Radio
