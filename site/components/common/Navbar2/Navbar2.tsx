import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container, useUI } from '@components/ui'

import { Cross } from '@components/icons'
import { useRouter } from 'next/router'
import NavbarItem from './NavbarItem'
import useCart from '@framework/cart/use-cart'
import { LineItem } from '@commerce/types/cart'
import User from '@components/icons/User'
import Cart from '@components/icons/Cart'
import {
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
  Button,
} from '@components/ui'
import CustomerMenuContent from '../UserNav/CustomerMenuContent'
import useCustomer from '@framework/customer/use-customer'
import React from 'react'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}
const countItem = (count: number, item: LineItem) => count + item.quantity

const Navbar: FC<NavbarProps> = ({ links }) => {
  const router = useRouter()

  const [showSearchBar, setShowSearchBar] = useState(false)

  const [query, setQuery] = useState('')
  const searchQueryHandler = () => {
    if (query) {
      router.push(
        {
          pathname: `/search`,
          query: query ? { query } : {},
        },
        undefined,
        { shallow: true }
      )
    }
  }
  const navItems = [
    { href: '/search', name: 'Shop' },
    { href: '/', name: 'Recipes' },
    { href: '/', name: 'Logo' },

    { href: '/', name: 'Reviews' },

    { href: '/', name: 'Our Story' },
  ]
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()

  const { openModal, setSidebarView, openSidebar } = useUI()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0
  const DropdownTrigger = isCustomerLoggedIn
    ? DropdownTriggerInst
    : React.Fragment
  console.log(itemsCount)
  return (
    <NavbarRoot>
      <Container clean className="max-w-8xl px-12 ">
        <div className={s.nav}>
          {process.env.COMMERCE_SEARCH_ENABLED && (
            <div className=" w-16">
              <svg
                className={'w-6 h-6 cursor-pointer'}
                onClick={() => {
                  if (!showSearchBar) {
                    setShowSearchBar(true)
                  } else {
                    searchQueryHandler()
                  }
                }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                />
              </svg>
            </div>
          )}
          {showSearchBar ? (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  searchQueryHandler()
                }}
                className="flex-1"
              >
                <input
                  type="text"
                  className="bg-transparent outline-none w-full text-lg"
                  placeholder="Search our store"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </form>
              <Cross
                className="cursor-pointer"
                onClick={() => setShowSearchBar(false)}
              />
            </>
          ) : (
            <>
              <nav className="flex items-center gap-8 font-bold">
                {navItems.map((item) => (
                  <>
                    {item.name === 'Logo' ? (
                      <Link key={item.name} href="/">
                        <a aria-label="Logo" className={s.navLink}>
                          <div className={s.navLinkContaier}>
                            <img
                              src="https://cdn.shopify.com/s/files/1/0265/3709/9354/files/New_Explorer_Black_Logo_Straight_version-_1000_x_500_UPDATED_110x@2x.png?v=1634700562"
                              alt="Logo"
                              className="w-28 h-16"
                            />
                          </div>
                        </a>
                      </Link>
                    ) : (
                      <NavbarItem key={item.name} item={item} />
                    )}{' '}
                  </>
                ))}
              </nav>
              <div className="flex gap-4 items-center w-16">
                {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
                  <Dropdown>
                    <DropdownTrigger>
                      <button
                        onClick={() =>
                          isCustomerLoggedIn ? null : openModal()
                        }
                      >
                        <User
                          className="w-8 h-8"
                          fill="transparent"
                          stroke="black"
                          strokeWidth={3}
                        />
                        {itemsCount > 0 && <span></span>}
                      </button>
                    </DropdownTrigger>
                    <CustomerMenuContent />
                  </Dropdown>
                )}
                {process.env.COMMERCE_CART_ENABLED && (
                  <button
                    onClick={() => {
                      setSidebarView('CART_VIEW')
                      openSidebar()
                    }}
                    className="relative"
                  >
                    <Cart
                      className="w-8 h-8"
                      fill="transparent"
                      stroke="black"
                      strokeWidth={3}
                    />
                    {itemsCount > 0 && (
                      <span className="w-3 h-3 rounded-full  bg-rose-600 absolute top-1 left-5 border-2 border-white" />
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
