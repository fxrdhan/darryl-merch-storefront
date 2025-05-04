import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi dark:text-gray-200">Need help?</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col dark:text-gray-400">
          <li>
            <LocalizedClientLink href="/contact" className="hover:text-ui-fg-interactive-hover dark:hover:text-blue-400">Contact</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact" className="hover:text-ui-fg-interactive-hover dark:hover:text-blue-400">
              Returns & Exchanges
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
