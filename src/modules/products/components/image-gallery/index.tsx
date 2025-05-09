"use client";

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { motion } from "framer-motion"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              {!!image.url && (
                <motion.div
                  initial={{ scale: 1.1, filter: "blur(10px)", opacity: 0 }}
                  animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={image.url}
                    priority={index <= 2 ? true : false}
                    className="absolute inset-0 rounded-rounded"
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
