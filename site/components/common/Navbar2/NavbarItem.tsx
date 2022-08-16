import React, { FC, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { extractValues } from 'utility/extractValues'
interface NavbarItemsProps {
  item: {
    name: string
    href: string
    menuItems?: { name: string; href: string }[]
  }
  componentStyle: any
}

const NavbarItem: FC<NavbarItemsProps> = ({ item, componentStyle }) => {
  const [showHoverMenu, setShowHoverMenu] = useState(false)
  const linkName = 'Link'
  const linkCS = componentStyle[linkName]

  const menuItemName = 'MenuItem'
  const menuItemCS = componentStyle[menuItemName]

  return (
    <div
      onMouseEnter={() => setShowHoverMenu(true)}
      onMouseLeave={() => setShowHoverMenu(false)}
      className={s.navLinkContaier}
    >
      <div className="absolute w-24 h-10"></div>
      <Link href={item.href}>
        <a
          aria-label={item.name}
          className={`${s.navLink} ${extractValues(linkCS)}`}
        >
          {item.name}
        </a>
      </Link>
      {showHoverMenu && item.menuItems && (
        <ul className="absolute w-32 font-normal bg-white p-2 px-4 max-w-4xl shadow-lg flex flex-col gap-4 top-[70px] font-campton text-sm">
          {item.menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <a aria-label={item.name} className={extractValues(menuItemCS)}>
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default NavbarItem
