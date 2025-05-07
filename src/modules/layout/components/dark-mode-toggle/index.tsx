"use client";

import { useState, useEffect } from 'react';
import { Sun, Moon } from '@medusajs/icons';
import { Button } from '@medusajs/ui';
import { motion, AnimatePresence } from 'framer-motion';

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
        <Button
            onClick={toggleTheme}
            variant="transparent"
            className="text-ui-fg-base flex items-center justify-center w-10 h-10 outline-none group-[.navbar-shrunk]:px-2 hover:bg-transparent active:bg-transparent focus:shadow-none"
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={0}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            data-testid="dark-mode-toggle-button"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme === 'light' ? 'moon' : 'sun'}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg"
                >
                    {theme === 'light' ? <Moon /> : <Sun />}
                </motion.div>
            </AnimatePresence>
        </Button>
    );
};

export default DarkModeToggle;
