'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import ProductPreview from '@modules/products/components/product-preview'
import { HttpTypes } from '@medusajs/types'

export default function ProductCarousel({ products, region }: { products: HttpTypes.StoreProduct[], region: HttpTypes.StoreRegion }) {
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
                    <ProductPreview product={product} region={region} />
                </SplideSlide>
            ))}
        </Splide>
    )
}