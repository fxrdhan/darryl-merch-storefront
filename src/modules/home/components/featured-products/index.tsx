import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import FeaturedProductsAnimator from "./animator";

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
      <FeaturedProductsAnimator products={productsWithPrice} region={region} />
    );
  } else if (collections && collections.length > 0) {
    const firstCollectionWithProducts = collections.find(col => (col.products?.length ?? 0) > 0);

    if (!firstCollectionWithProducts || !firstCollectionWithProducts.products) {
      return null;
    }

    const productsWithPriceFromCollection = firstCollectionWithProducts.products.map(product => {
      const { cheapestPrice } = getProductPrice({ product });
      return {
        ...product,
        cheapestPrice,
      };
    });

    return (
      <FeaturedProductsAnimator products={productsWithPriceFromCollection}
        region={region}
        collectionTitle={firstCollectionWithProducts.title}
      />
    );
  }
  return null
}