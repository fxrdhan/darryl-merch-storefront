import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import ProductPreview from "@modules/products/components/product-preview"

export default async function FeaturedProducts({
  collections,
  products,
  region,
}: {
  collections?: HttpTypes.StoreCollection[]
  products?: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}) {
  if (products) {
    return (
      <div className="content-container py-12 small:py-24">
        <h2 className="text-2xl-semi mb-8">Check out our products</h2>
        <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
          {products.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} />
            </li>
          ))}
        </ul>
      </div>
    )
  } else if (collections) {
    return (
      <ul className="flex flex-col gap-y-6">
        {collections.map((collection) => (
          <li key={collection.id}>
            <ProductRail collection={collection} region={region} />
          </li>
        ))}
      </ul>
    )
  }
  return null
}
