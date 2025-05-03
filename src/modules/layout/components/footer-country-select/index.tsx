// src/modules/layout/components/footer-country-select/index.tsx
"use client"

import { HttpTypes } from "@medusajs/types"
import { clx, useToggleState } from "@medusajs/ui"
import CountrySelect from "@modules/layout/components/country-select"
import { ArrowRightMini } from "@medusajs/icons"

export default function FooterCountrySelect({ regions }: { regions: HttpTypes.StoreRegion[] }) {
  const toggleState = useToggleState()

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={toggleState.open}
      onMouseLeave={toggleState.close}
    >
      <CountrySelect toggleState={toggleState} regions={regions} />
      <ArrowRightMini
        className={clx(
          "transition-transform duration-300",
          toggleState.state ? "-rotate-90" : ""
        )}
      />
    </div>
  )
}