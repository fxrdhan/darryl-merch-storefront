'use client'

import { useEffect, useState, ReactNode } from 'react'

type NavbarScrollProps = {
    children: ReactNode
}

const NavbarScroll = ({ children }: NavbarScrollProps) => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={`transition-all duration-300 ${isScrolled ? 'px-4' : ''}`}>
            <div
                className={`transition-all duration-300 ${isScrolled
                        ? 'rounded-lg shadow-md mx-2 mt-2 border border-ui-border-base dark:border-gray-700'
                        : ''
                    }`}
            >
                {children}
            </div>
        </div>
    )
}

export default NavbarScroll
