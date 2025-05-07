"use client"

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@medusajs/ui';
import { ArrowsPointingOut } from '@medusajs/icons';

const FullScreenToggle = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const checkFullScreenStatus = useCallback(() => {
        const isCurrentlyFullScreen = !!(
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).mozFullScreenElement ||
            (document as any).msFullscreenElement
        );
        setIsFullScreen(isCurrentlyFullScreen);
    }, []);

    useEffect(() => {
        checkFullScreenStatus();
        document.addEventListener('fullscreenchange', checkFullScreenStatus);
        document.addEventListener('webkitfullscreenchange', checkFullScreenStatus);
        document.addEventListener('mozfullscreenchange', checkFullScreenStatus);
        document.addEventListener('MSFullscreenChange', checkFullScreenStatus);

        return () => {
            document.removeEventListener('fullscreenchange', checkFullScreenStatus);
            document.removeEventListener('webkitfullscreenchange', checkFullScreenStatus);
            document.removeEventListener('mozfullscreenchange', checkFullScreenStatus);
            document.removeEventListener('MSFullscreenChange', checkFullScreenStatus);
        };
    }, [checkFullScreenStatus]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            const element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen().catch(err => {
                    console.error(`FS Error: ${err.message} (${err.name})`);
                });
            } else if ((element as any).webkitRequestFullscreen) {
                (element as any).webkitRequestFullscreen();
            } else if ((element as any).mozRequestFullScreen) {
                (element as any).mozRequestFullScreen();
            } else if ((element as any).msRequestFullscreen) {
                (element as any).msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        }
    };

    const Icon = ArrowsPointingOut;
    const label = isFullScreen ? 'Exit full screen' : 'Enter full screen';

    return (
        <Button
            onClick={toggleFullScreen}
            variant="transparent"
            className="text-ui-fg-base flex items-center gap-x-1 outline-none group-[.navbar-shrunk]:px-2 hover:bg-transparent active:bg-transparent focus:shadow-none"
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={0}
            aria-label={label}
            aria-pressed={isFullScreen}
            data-testid="fullscreen-toggle-button"
        >
            <Icon />
        </Button>
    );
};

export default FullScreenToggle;
