import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import ProfileDropdown from "@modules/layout/components/profile-dropdown"
import DarkModeToggle from "@modules/layout/components/dark-mode-toggle"
import NavbarScroll from "@modules/layout/components/navbar-scroll"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const customer = await retrieveCustomer()

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <NavbarScroll>
        <header className="relative h-16 mx-auto border-b duration-200 border-ui-border-base dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-lg">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
            <div className="flex-1 basis-0 h-full flex items-center">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>

            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base dark:text-white dark:hover:text-gray-300 uppercase"
                data-testid="nav-store-link"
              >
                Darryl Store
              </LocalizedClientLink>
            </div>

            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                <ProfileDropdown customer={customer} />
              </div>
              <DarkModeToggle />
            </div>
          </nav>
        </header>
      </NavbarScroll>
    </div>
  )
}
