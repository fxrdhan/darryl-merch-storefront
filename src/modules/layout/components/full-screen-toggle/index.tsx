"use client"

import { useState, useEffect, useCallback } from 'react';
import { clx } from '@medusajs/ui';

const FullScreenToggle = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const checkFullScreenStatus = useCallback(() => {
        const isCurrentlyFullScreen = !!document.fullscreenElement;
        setIsFullScreen(isCurrentlyFullScreen);
    }, []);

    useEffect(() => {
        checkFullScreenStatus(); // Check on mount
        document.addEventListener('fullscreenchange', checkFullScreenStatus);

        return () => {
            document.removeEventListener('fullscreenchange', checkFullScreenStatus);
        };
    }, [checkFullScreenStatus]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <button
            onClick={toggleFullScreen}
            className={clx(
                "text-xs md:text-sm cursor-pointer text-ui-fg-muted hover:text-ui-fg-interactive focus:outline-none hover:underline",
                "dark:text-ui-fg-muted dark:hover:text-ui-fg-interactive-hover"
            )}
            aria-pressed={isFullScreen}
            data-testid="fullscreen-toggle-button"
        >
            {isFullScreen ? 'Exit full screen' : 'Enter full screen'}
        </button>
    );
};

export default FullScreenToggle;
