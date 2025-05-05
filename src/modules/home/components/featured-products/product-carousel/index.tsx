"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { HttpTypes } from "@medusajs/types";
import ProductPreview from "@modules/products/components/product-preview";
import { getProductPrice } from "@lib/util/get-product-price";

interface ProductCarouselProps {
    products: HttpTypes.StoreProduct[];
    region: HttpTypes.StoreRegion;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, region }) => {
    const [mounted, setMounted] = useState(false);
    
    const productsWithPrice = products.map(product => {
        const { cheapestPrice } = getProductPrice({ product });
        return { ...product, cheapestPrice };
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000, 
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: false,
        swipe: false,
        draggable: false,
        touchMove: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                }
            }
        ]
    };

    if (!productsWithPrice || productsWithPrice.length === 0) {
        return null;
    }

    if (!mounted) {
        return (
            <div className="product-carousel-container">
                <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-4">
                    {productsWithPrice.slice(0, 4).map((product) => (
                        <div key={product.id} className="px-2">
                            <ProductPreview product={product} region={region} isFeatured />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="product-carousel-container relative overflow-hidden" data-testid="featured-products-carousel">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 lg:w-64 z-10 pointer-events-none
                            bg-gradient-to-r from-white to-transparent
                            dark:from-gray-900 dark:to-transparent">
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 lg:w-64 z-10 pointer-events-none
                            bg-gradient-to-l from-white to-transparent
                            dark:from-gray-900 dark:to-transparent">
            </div>
            <Slider {...settings}>
                {productsWithPrice.map((product) => (
                    <div key={product.id} className="px-2 md:px-3 lg:px-4 py-2">
                        <div className="h-full">
                            <ProductPreview product={product} region={region} isFeatured />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductCarousel;
