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
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product: initialProduct });

  return (
    <LocalizedClientLink href={`/products/${initialProduct.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={initialProduct.thumbnail}
          images={initialProduct.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex flex-col md:flex-row md:justify-between txt-compact-medium mt-4">
          <Text className="text-ui-fg-subtle text-sm md:text-base" data-testid="product-title">
            {initialProduct.title}
          </Text>
          <div className="flex items-center gap-x-2 mt-1 md:mt-0 self-start text-xs md:text-sm" data-testid="price-container">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
