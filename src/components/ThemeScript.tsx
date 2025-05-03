import React from 'react';

const ThemeScript = () => {
    const script = `
        (function() {
        function getInitialTheme() {
            const persistedTheme = window.localStorage.getItem('theme');
            if (persistedTheme) {
            return persistedTheme;
            }
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return systemPrefersDark ? 'dark' : 'light';
        }
        const theme = getInitialTheme();
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        })();
    `;
    return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default ThemeScript;
