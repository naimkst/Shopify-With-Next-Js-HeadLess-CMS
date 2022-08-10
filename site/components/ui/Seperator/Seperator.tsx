import { FC } from 'react'

interface SeperatorProps {
  text: string
  className: string
}

// eslint-disable-next-line react/display-name
const Seperator: FC<SeperatorProps> = ({ text, className }) => {
  return (
    <div className="flex items-center">
      <div className="h-[1px] w-full bg-black"></div>
      <p className="w-fit flex-shrink-0 mx-2 text-lg">{text}</p>
      <div className="h-[1px] w-full bg-black"></div>
    </div>
  )
}

export default Seperator
