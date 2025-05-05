'use client'

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import { useRef } from 'react';
import '@splidejs/react-splide/css'
import ProductPreview from '@modules/products/components/product-preview'
import { HttpTypes } from '@medusajs/types'
import { VariantPrice } from "types/global"
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
                    drag: "free",
                    focus: "center",
                    perPage: 3,
                    pagination: true,
                    arrows: false,
                    gap: "1.5rem",
                    breakpoints: { 640: { perPage: 2 }, 768: { perPage: 2 } },
                    autoScroll: {
                        speed: 0.5,
                    },
                    classes: {
                        pagination: 'splide__pagination dotted-pagination',
                    },
                }}
                extensions={{ AutoScroll }}
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
            <div className="flex justify-between items-center mt-6">
                <IconButton
                    onClick={handlePrev}
                    variant="transparent"
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:border dark:hover:border-gray-500 rounded-full p-2"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 19-7-7 7-7"/>
                        <path d="M25 12H5"/>
                    </svg>
                </IconButton>
                
                {/* Place pagination here to align with arrows */}
                <div className="flex-grow flex justify-center items-center">
                    <div className="splide__pagination dotted-pagination"></div>
                </div>
                
                <IconButton
                    onClick={handleNext}
                    variant="transparent"
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:border dark:hover:border-gray-500 rounded-full p-2"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}>
                        <path d="m12 19-7-7 7-7"/>
                        <path d="M25 12H5"/>
                    </svg>
                </IconButton>
            </div>
        </div>
    )
}