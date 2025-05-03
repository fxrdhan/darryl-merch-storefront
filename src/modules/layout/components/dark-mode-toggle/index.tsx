"use client";

import { useState, useEffect } from 'react';
import { Sun, Moon } from '@medusajs/icons';
import { IconButton } from '@medusajs/ui';

const DarkModeToggle = () => {
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
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

    return (
        <IconButton onClick={toggleTheme} variant="transparent" className="text-ui-fg-muted hover:text-ui-fg-base">
            {theme === 'light' ? <Moon /> : <Sun />}
        </IconButton>
    );
};

export default DarkModeToggle;
