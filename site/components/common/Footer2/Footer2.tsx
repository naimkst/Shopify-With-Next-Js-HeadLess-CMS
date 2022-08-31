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
import { extractValues } from 'utility/extractValues'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
  componentStyle: any
  adjustmentObject: any
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({
  className,
  pages,
  componentStyle,
  adjustmentObject,
}) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)
  const footerName = 'Footer2'
  const cs = componentStyle[footerName]
  const ao = adjustmentObject[footerName]

  const socialMediaName = 'SocialMedia'
  const socialMediaCS = cs[socialMediaName]

  const copyrightName = 'Copyright'
  const copyrightCS = cs[copyrightName]

  const linksName = 'Links'
  const linksCS = cs[linksName]

  const newsletterTitleName = 'NewsletterTitle'
  const newsletterTitleCS = cs[newsletterTitleName]

  const newsletterInputContainerName = 'NewsletterInputContainer'
  const newsletterInputContainerCS = cs[newsletterInputContainerName]

  const newsletterInputName = 'NewsletterInput'
  const newsletterInputCS = cs[newsletterInputName]

  const newsletterButtonName = 'NewsletterButton'
  const newsletterButtonCS = cs[newsletterButtonName]

  return (
    <footer className={rootClassName}>
      <Container className="flex gap-24 font-campton">
        <div className="flex flex-col justify-between w-36">
          <div className="flex items-center text-accent-1 gap-4">
            {ao.SocialMedia.map((media: { name: string; href: string }) => (
              <a
                key={media.name}
                href={media.href}
                target="_blank"
                rel="noreferrer"
              >
                {media.name === 'Instagram' && (
                  <Instagram className={extractValues(socialMediaCS)} />
                )}{' '}
                {media.name === 'Facebook' && (
                  <Facebook className={extractValues(socialMediaCS)} />
                )}{' '}
                {media.name === 'Youtube' && (
                  <Youtube className={extractValues(socialMediaCS)} />
                )}{' '}
                {media.name === 'Twitter' && (
                  <Twitter className={extractValues(socialMediaCS)} />
                )}
              </a>
            ))}
          </div>
          <p className={extractValues(copyrightCS)}>{ao.Copyright}</p>
        </div>

        {ao.LinkColumns.map(
          (
            column: { links: { name: string; href: string }[] },
            idx: number
          ) => (
            <ul
              key={idx.toString()}
              className="flex flex-col gap-2 text-accent-2 "
            >
              {column.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a
                      aria-label={link.name}
                      className={extractValues(linksCS)}
                    >
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )
        )}
        <div>
          <p className={extractValues(newsletterTitleCS)}>
            {ao.NewsletterTitle}
          </p>
          <div className={extractValues(newsletterInputContainerCS)}>
            <input
              type="text"
              className={extractValues(newsletterInputCS)}
              placeholder={ao.NewsletterInput.Placeholder}
            />
            <button className={extractValues(newsletterButtonCS)}>
              {ao.NewsletterInput.Button}
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
