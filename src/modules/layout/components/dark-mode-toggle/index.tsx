"use client";

import { useState, useEffect } from 'react';
import { Sun, Moon } from '@medusajs/icons';
import { Button, clx } from '@medusajs/ui';

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

    const Icon = theme === 'light' ? Moon : Sun;

    return (
        <Button
            onClick={toggleTheme}
            variant="transparent"
            className="text-ui-fg-base flex items-center gap-x-1 outline-none group-[.navbar-shrunk]:px-2 hover:bg-transparent active:bg-transparent focus:shadow-none"
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={0}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <Icon />
        </Button>
    );
};

export default DarkModeToggle;
