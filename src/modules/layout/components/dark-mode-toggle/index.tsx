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
    const text = theme === 'light' ? 'Light' : 'Dark';

    return (
        <Button
            onClick={toggleTheme}
            variant="transparent"
            className="text-ui-fg-base hover:text-ui-fg-muted focus:text-ui-fg-base active:text-ui-fg-base flex items-center gap-x-1 outline-none"
            onMouseDown={(e) => e.preventDefault()}
        >
            <Icon /> <span className="ml-1 transition-all duration-300 ease-in-out group-[.navbar-shrunk]:opacity-0 group-[.navbar-shrunk]:max-w-0 group-[.navbar-shrunk]:ml-0 overflow-hidden whitespace-nowrap">{text}</span>
        </Button>
    );
};

export default DarkModeToggle;
