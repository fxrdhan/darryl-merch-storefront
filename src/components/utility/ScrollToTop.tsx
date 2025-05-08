"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
    const pathname = usePathname();

    // Scroll to top when pathname changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const timer = setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
            
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return null; // No UI rendered
};

export default ScrollToTop;