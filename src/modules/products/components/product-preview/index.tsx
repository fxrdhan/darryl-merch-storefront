"use client"

import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default function ProductPreview({
  product: initialProduct,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct // Consider renaming or clarifying this prop if it doesn't contain calculated price yet
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // Price calculation should happen in the parent Server Component
  // Assume 'product' prop now potentially includes pre-calculated price info
  // or a separate prop like 'cheapestPriceData' is passed
  const { cheapestPrice } = getProductPrice({ product: initialProduct });
  // If price isn't pre-calculated, this might return null or inaccurate data on client.
  // Prefer passing calculated price data as a prop.

  return (
    <LocalizedClientLink href={`/products/${initialProduct.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={initialProduct.thumbnail}
          images={initialProduct.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">
            {initialProduct.title}
          </Text>
          <div className="flex items-center gap-x-2" data-testid="price-container">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
