"use client";

import { motion } from "framer-motion";
import { HttpTypes } from "@medusajs/types";
import ProductCarousel from "../product-carousel";

interface FeaturedProductsAnimatorProps {
    products: (HttpTypes.StoreProduct & { cheapestPrice: any })[]; // Sesuaikan tipe jika perlu
    region: HttpTypes.StoreRegion;
    collectionTitle?: string;
}

const FeaturedProductsAnimator: React.FC<FeaturedProductsAnimatorProps> = ({ products, region, collectionTitle }) => {

    const animationVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        },
    };

    return (
        <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Animasi hanya sekali, saat 20% terlihat
            variants={animationVariants}
        >
            {collectionTitle && (
                <div className="content-container">
                    <h2 className="text-2xl-regular mb-8 lg:text-4xl text-center">{collectionTitle}</h2>
                </div>
            )}
            <ProductCarousel products={products} region={region} />
        </motion.div>
    );
};

export default FeaturedProductsAnimator;