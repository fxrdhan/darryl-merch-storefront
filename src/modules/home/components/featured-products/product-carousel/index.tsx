'use client'

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { useRef } from 'react';
import '@splidejs/react-splide/css'
import ProductPreview from '@modules/products/components/product-preview'
import { HttpTypes } from '@medusajs/types'
import { VariantPrice } from "types/global"
import { ChevronLeftMini, ChevronRightMini } from "@medusajs/icons"
import { IconButton } from "@medusajs/ui"

type ProductWithPrice = HttpTypes.StoreProduct & { cheapestPrice?: VariantPrice | null }

export default function ProductCarousel({ products, region }: { products: ProductWithPrice[], region: HttpTypes.StoreRegion }) {
    const splideRef = useRef<Splide>(null);

    const handlePrev = () => {
        splideRef.current?.go('<');
    };
    const handleNext = () => {
        splideRef.current?.go('>');
    };
    return (
        <div className="relative">
            <Splide
                ref={splideRef}
                hasTrack={false}
                options={{
                    type: "loop",
                    perPage: 3,
                    autoplay: true,
                    pagination: false,
                    arrows: false,
                    gap: "1.5rem",
                    breakpoints: { 640: { perPage: 2 }, 768: { perPage: 2 } },
                }}
                aria-label="Featured Products"
            >
                <SplideTrack>
                    {products.map((product) => (
                        <SplideSlide key={product.id}>
                            <ProductPreview
                                product={product}
                                region={region}
                            />
                        </SplideSlide>
                    ))}
                </SplideTrack>
            </Splide>
            <div className="flex justify-center items-center mt-4 gap-x-4">
                <IconButton
                    onClick={handlePrev}
                    variant="transparent"
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:border dark:hover:border-gray-500 rounded-full p-1"
                    aria-label="Previous slide"
                >
                    <ChevronLeftMini />
                </IconButton>
                <IconButton
                    onClick={handleNext}
                    variant="transparent"
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:border dark:hover:border-gray-500 rounded-full p-1"
                    aria-label="Next slide"
                >
                    <ChevronRightMini />
                </IconButton>
            </div>
        </div>
    )
}