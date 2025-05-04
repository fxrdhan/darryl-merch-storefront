import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import ProductCarousel from "@modules/home/components/featured-products/product-carousel"

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
      <div className="content-container py-12 small:py-24" data-testid="featured-products-container">
        <h2 className="text-2xl-semi mb-8">Check out our products</h2>
        <ProductCarousel products={products} region={region} />
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