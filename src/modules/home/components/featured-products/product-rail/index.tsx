import { listProducts } from "@lib/data/products"
import { FindParams, HttpTypes, StoreProductParams } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: [collection.id],
      fields: "*variants.calculated_price",
    } as FindParams & StoreProductParams & { collection_id?: string[] },
  })

  if (!products || products.length === 0) {
    return null
  }

  const productsWithPrice = products.map(product => {
    const { cheapestPrice } = getProductPrice({ product });
    return { ...product, cheapestPrice };
  })

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {productsWithPrice &&
          productsWithPrice.map((product) => (
            <li key={product.id}>
              <ProductPreview
                product={product}
                region={region}
                isFeatured
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
