import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import FooterCountrySelect from "@modules/layout/components/footer-country-select"
import { ArrowRightMini } from "@medusajs/icons"

const MenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

export default async function Footer({ regions }: { regions?: HttpTypes.StoreRegion[] | null }) {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-ui-border-base w-full bg-ui-bg-subtle dark:bg-gray-900 dark:border-gray-800"> 
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-20">
          <div className="flex flex-col gap-y-4">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base dark:text-ui-fg-muted dark:hover:text-ui-fg-base uppercase"
            >
              Darryl Store
            </LocalizedClientLink>
            
            <div className="mt-6">
              <span className="txt-small-plus txt-ui-fg-base dark:text-ui-fg-base mb-4 block">
                Navigation
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle dark:text-ui-fg-muted txt-small">
                {Object.entries(MenuItems).map(([name, href]) => (
                  <li key={name}>
                    <LocalizedClientLink
                      href={href}
                      className="hover:text-ui-fg-base dark:hover:text-ui-fg-base"
                      data-testid={`${name.toLowerCase()}-link`}
                    >
                      {name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base dark:text-ui-fg-base">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle!,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle dark:text-ui-fg-muted txt-small"
                        key={c.id!}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base dark:hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Collections
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-2 text-ui-fg-subtle dark:text-ui-fg-muted txt-small", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                  data-testid="footer-collections"
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base dark:text-ui-fg-base">Darryl</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle dark:text-ui-fg-muted txt-small">
                <li>
                  <a
                    href="https://www.instagram.com/darrylstr/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base dark:hover:text-ui-fg-base"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-8 justify-between text-ui-fg-muted dark:text-ui-fg-muted">
          <div className="flex flex-col gap-y-4">
            <MedusaCTA />
            <Text className="txt-compact-small">
              © {new Date().getFullYear()} Darryl Store. All rights reserved.
            </Text>
          </div>
          
          {regions && (
            <div className="flex items-center">
              <FooterCountrySelect regions={regions} />
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
