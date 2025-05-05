import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Darryl Store - Welcome!",
  description: "Discover the latest trends and exclusive collections at Darryl Store.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title, *products",
  })

  const collectionsWithProducts = collections.filter((col) => (col.products?.length ?? 0) > 0)

  let fallbackProducts = null
  if (collectionsWithProducts.length === 0) {
    const { response } = await listProducts({ regionId: region?.id})
    fallbackProducts = response.products
  }

  if (!region) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <Hero />
      <div>
        {fallbackProducts ? (
          <FeaturedProducts products={fallbackProducts} region={region} />
        ) : (
          <FeaturedProducts collections={collectionsWithProducts} region={region} />
        )}
      </div>
    </div>
  )
}
