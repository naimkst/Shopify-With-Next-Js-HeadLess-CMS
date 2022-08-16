import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import { Cross } from '@components/icons'
import { useRouter } from 'next/router'
import NavbarItem from './NavbarItem'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

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
              <div className="flex items-center w-16">
                <UserNav />
              </div>
            </>
          )}
        </div>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
