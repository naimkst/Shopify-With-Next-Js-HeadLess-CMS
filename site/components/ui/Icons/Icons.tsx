import React, { FC } from 'react'
import { Container } from '@components/ui'
import { ArrowRight } from '@components/icons'
import s from './Icons.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { extractValues } from 'utility/extractValues'
interface IconsProps {
  componentStyle: any
  adjustmentObject: any
}

const Icons: FC<IconsProps> = ({ componentStyle, adjustmentObject }) => {
  const iconsName = 'Icons'
  const iconsAO = adjustmentObject[iconsName]
  const iconsCS = componentStyle[iconsName]

  const iconsListName = 'Icons'
  const iconsListAO = iconsAO[iconsListName]

  const iconName = 'Icon'
  const iconCS = iconsCS[iconName]

  const textName = 'Text'
  const textCS = iconsCS[textName]

  return (
    <div className="flex justify-center gap-y-10 items-center bg-accent-2 px-12 py-12 flex-wrap">
      {iconsListAO.map((icon: { text: string; image: string }) => (
        <div className="flex justify-center items-center flex-col gap-4 w-64">
          <img
            className={extractValues(iconCS)}
            width={80}
            height={80}
            src={icon.image}
          />

          <p className={extractValues(textCS)}>{icon.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Icons
