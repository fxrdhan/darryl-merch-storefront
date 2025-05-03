"use client";

import { useState, useEffect } from 'react';
import { Sun, Moon } from '@medusajs/icons'; // Asumsi ikon tersedia
import { IconButton } from '@medusajs/ui';

const DarkModeToggle = () => {
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        // Baca tema dari localStorage saat komponen dimuat di client
        const storedTheme = localStorage.getItem('theme');
        const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(initialTheme);
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Jangan render di server, tunggu hingga client-side hydration
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <IconButton onClick={toggleTheme} variant="transparent" className="text-ui-fg-muted hover:text-ui-fg-base">
            {theme === 'light' ? <Moon /> : <Sun />}
        </IconButton>
    );
};

export default DarkModeToggle;
