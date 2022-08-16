import React, { FC, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
interface NavbarItemsProps {
  item: { name: string; href: string }
}

const NavbarItem: FC<NavbarItemsProps> = ({ item }) => {
  const [showHoverMenu, setShowHoverMenu] = useState(false)
  const menuItems = [
    { href: '/search', name: 'Shop' },
    { href: '/', name: 'Recipes' },
    { href: '/', name: 'Logo' },

    { href: '/', name: 'Reviews' },

    { href: '/', name: 'Our Story' },
  ]
  return (
    <div
      onMouseEnter={() => setShowHoverMenu(true)}
      onMouseLeave={() => setShowHoverMenu(false)}
      className={s.navLinkContaier}
    >
      <div className="absolute w-24 h-10 "></div>
      <Link href={item.href}>
        <a aria-label={item.name} className={s.navLink}>
          {item.name}
        </a>
      </Link>
      {showHoverMenu && (
        <ul className="absolute w-32 font-normal bg-white p-2 px-4 max-w-4xl shadow-lg flex flex-col gap-4 top-[70px] font-campton text-sm">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <a aria-label={item.name}>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default NavbarItem
