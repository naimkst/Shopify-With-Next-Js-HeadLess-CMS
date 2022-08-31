import { FC } from 'react'

interface DropdownOptionsProps {
  styles?: string
  name: string
  onChange?: (event: any) => any
  options: { label: string }[]
}
const Dropdown: FC<DropdownOptionsProps> = ({
  styles,
  name,
  onChange,
  options,
}) => {
  return (
    <select className={styles} name={name} id={name} onChange={onChange}>
      {options.map((option, i: number) => {
        return (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        )
      })}
    </select>
  )
}
export default Dropdown
