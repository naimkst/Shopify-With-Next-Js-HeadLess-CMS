import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'
import Instagram from '@components/icons/Instagram'
import Facebook from '@components/icons/Facebook'
import Youtube from '@components/icons/Youtube'
import Twitter from '@components/icons/Twitter'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)
  const footerLinkColumns = [
    {
      links: [
        { name: 'Shop', href: '/' },
        { name: 'FAQ', href: '/' },
        { name: 'Reviews', href: '/' },
        { name: 'Our Team', href: '/' },
        { name: 'Contact Us', href: '/' },
        { name: 'Privacy Policy', href: '/' },
      ],
    },
    {
      links: [
        { name: 'Sustainability', href: '/' },
        { name: 'Our Coffe', href: '/' },
        { name: 'Our Cause', href: '/' },
        { name: 'The Embassy', href: '/' },
        { name: 'Wholesale', href: '/' },
        { name: 'Refer a Friend', href: '/' },
      ],
    },
  ]
  return (
    <footer className={rootClassName}>
      <Container className="flex gap-24 font-campton">
        <div className="flex flex-col justify-between w-36">
          <div className="flex items-center text-accent-1 gap-4">
            <Instagram className="w-6 h-6 text-accent-2" />
            <Facebook className="w-6 h-6 text-accent-2" />
            <Youtube className="w-6 h-6 text-accent-2" />
            <Twitter className="w-6 h-6 text-accent-2" />
          </div>
          <p className="font-americus text-xs">
            Terms and Conditions Site by ROSA & HI-TECH
          </p>
        </div>

        {footerLinkColumns.map((column, idx) => (
          <ul key={idx} className="flex flex-col gap-2 text-accent-2 ">
            {column.links.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <a aria-label={link.name}>{link.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        ))}
        <div>
          <p className="mb-4">Join the explorer movement</p>
          <div className="bg-white rounded-full flex items-center p-1">
            <input
              type="text"
              className="bg-transparent p-2 w-72 outline-none text-black"
              placeholder="Enter Your Email"
            />
            <button className="bg-black rounded-r-full p-2 px-6">
              Join us
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
