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
            className="text-ui-fg-muted hover:text-ui-fg-base flex items-center gap-x-1"
        >
            <Icon /> <span className="group-[.navbar-shrunk]:hidden">{text}</span>
        </Button>
    );
};

export default DarkModeToggle;
