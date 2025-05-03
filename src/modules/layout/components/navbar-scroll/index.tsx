'use client'

import { useEffect, useState, ReactNode, useRef } from 'react'

type NavbarScrollProps = {
    children: ReactNode
}

const NavbarScroll = ({ children }: NavbarScrollProps) => {
    const [isNavbarShrunk, setIsNavbarShrunk] = useState(false)
    const lastScrollY = useRef(0)
    const shrinkThreshold = 50
    const expandThreshold = 150

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY.current && currentScrollY > shrinkThreshold) {
                setIsNavbarShrunk(true)
            } else if (currentScrollY < lastScrollY.current) {
                if (currentScrollY < expandThreshold) {
                    setIsNavbarShrunk(false)
                }
            } else if (currentScrollY <= shrinkThreshold) {
                setIsNavbarShrunk(false)
            }
            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [shrinkThreshold, expandThreshold])

    return (
        <>
            {isNavbarShrunk && (
                <div className="h-4 transition-all duration-300" />
            )}
            <div className={`transition-all duration-300 ${isNavbarShrunk ? 'px-4' : ''}`}>
                <div
                    className={`transition-all duration-300 ${isNavbarShrunk
                        ? 'rounded-lg shadow-md mx-2 mt-2 overflow-hidden border border-ui-border-base dark:border-gray-700'
                        : 'border-b border-transparent' 
                    }`}
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export default NavbarScroll
