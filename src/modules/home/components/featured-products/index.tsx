import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import ProductPreview from "@modules/products/components/product-preview"
import ProductCarousel from "./product-carousel";

export default async function FeaturedProducts({
  collections,
  products,
  region,
}: {
  collections?: HttpTypes.StoreCollection[]
  products?: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}) {
  if (products && products.length > 0) {
    const productsWithPrice = products.map(product => {
      const { cheapestPrice } = getProductPrice({ product });
      return {
        ...product,
        cheapestPrice,
      };
    });

    return (
      <div className="py-8 md:py-12">
        <ProductCarousel products={productsWithPrice} region={region} />
      </div>
    );
  } else if (collections && collections.length > 0) {
    const firstCollectionWithProducts = collections.find(col => (col.products?.length ?? 0) > 0);

    if (!firstCollectionWithProducts || !firstCollectionWithProducts.products) {
      return null;
    }

    return (
      <div className="py-0 md:py-12">
        <div className="content-container">
          <h2 className="text-2xl-regular mb-8 lg:text-4xl text-center">{firstCollectionWithProducts.title}</h2>
        </div>
        <ProductCarousel products={firstCollectionWithProducts.products as HttpTypes.StoreProduct[]} region={region} />
      </div>
    );
  }
  return null
}