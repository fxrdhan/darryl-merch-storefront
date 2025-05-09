// src/app/[countryCode]/(main)/store/StoreMotionWrapper.tsx
"use client"

import { motion, usePresence } from "framer-motion"
import React from "react"

type StoreMotionWrapperProps = {
    children: React.ReactNode
    animateOnlyThumbnails?: boolean
}

const StoreMotionWrapper: React.FC<StoreMotionWrapperProps> = ({ children, animateOnlyThumbnails = false }) => {
    const [isPresent, safeToRemove] = usePresence()

    if (animateOnlyThumbnails) {
        // If animateOnlyThumbnails is true, do not wrap children with motion.div
        // Animation will be handled specifically on product thumbnail components
        return <>{children}</>
    }

    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", transform: "scale(0.9)" }}
            animate={{ opacity: 1, filter: "blur(0px)", transform: "scale(1)" }}
            exit={{ opacity: 0, filter: "blur(12px)", transform: "scale(0.9)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="animate-blur-zoom-in"
        >
            {children}
        </motion.div>
    )
}

export default StoreMotionWrapper