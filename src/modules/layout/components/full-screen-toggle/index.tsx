"use client"

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@medusajs/ui';
import { TbMaximize, TbMinimize } from "react-icons/tb";
import { motion, AnimatePresence } from 'framer-motion';

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
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isFullScreen ? 'minimize' : 'maximize'}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg"
                >
                    {isFullScreen ? <TbMinimize /> : <TbMaximize />}
                </motion.div>
            </AnimatePresence>
        </Button>
    );
};

export default FullScreenToggle;
