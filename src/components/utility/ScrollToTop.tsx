// src/components/utility/ScrollToTop.tsx
"use client";

import { useEffect } from "react";

const ScrollToTop = () => {
    // Force scroll to top on initial load client-side
    useEffect(() => {
        // Pastikan hanya berjalan di browser
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, []);

    return null; // Komponen ini tidak merender UI apa pun
};

export default ScrollToTop;