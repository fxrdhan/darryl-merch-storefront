'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import ProductPreview from '@modules/products/components/product-preview'
import { HttpTypes } from '@medusajs/types'
import { VariantPrice } from "types/global" // Assuming VariantPrice type exists

type ProductWithPrice = HttpTypes.StoreProduct & { cheapestPrice?: VariantPrice | null }

export default function ProductCarousel({ products, region }: { products: ProductWithPrice[], region: HttpTypes.StoreRegion }) {
    return (
        <Splide
            options={{
                type: "loop",
                perPage: 3,
                autoplay: true,
                gap: "1rem",
                pagination: false,
                breakpoints: { 640: { perPage: 1 }, 768: { perPage: 2 } },
            }}
            aria-label="Featured Products"
        >
            {products.map((product) => (
                <SplideSlide key={product.id}>
                    <ProductPreview
                        product={product}
                        region={region}
                        // Pass the pre-calculated price if available
                        // cheapestPrice={product.cheapestPrice} // Adjust prop name if needed in ProductPreview
                    />
                </SplideSlide>
            ))}
        </Splide>
    )
}