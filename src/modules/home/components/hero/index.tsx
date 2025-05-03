"use client"

import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [orbs, setOrbs] = useState<{ id: number, size: number, color: string, rotation: number, radius: number, animationDuration: number, reverse: boolean, initialPosition: number, animationDelay: number }[]>([]);
  const emotes = ["🥳", "🤩", "😎", "😋", "🙌", "🔥", "🎉", "🫶"];
  const [currentEmote, setCurrentEmote] = useState(emotes[0]);
  const [animate, setAnimate] = useState(false);
  const orbsInitialized = useRef(false);

  const handleEmoteClick = () => {
    setAnimate(true);

    setCurrentEmote(prevEmote => {
      const currentIndex = emotes.indexOf(prevEmote);
      const nextIndex = (currentIndex + 1) % emotes.length;
      return emotes[nextIndex];
    });

    setTimeout(() => setAnimate(false), 500);
  };

  useEffect(() => {
    if (orbsInitialized.current) return;
    
    const initializeOrbs = () => {
      const colors = [
        'bg-blue-300', 'bg-purple-300', 'bg-pink-300', 'bg-yellow-300', 'bg-green-300',
        'bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-yellow-200', 'bg-green-200',
        'bg-indigo-300', 'bg-teal-300', 'bg-cyan-300', 'bg-amber-300'
      ];

      const orbitalPaths = [
        { minRadius: 150, maxRadius: 180, orbCount: 3 },
        { minRadius: 220, maxRadius: 250, orbCount: 4 },
        { minRadius: 290, maxRadius: 320, orbCount: 5 },
        { minRadius: 360, maxRadius: 390, orbCount: 6 },
        { minRadius: 430, maxRadius: 460, orbCount: 7 },
        { minRadius: 500, maxRadius: 530, orbCount: 8 },
        { minRadius: 570, maxRadius: 600, orbCount: 9 },
        { minRadius: 650, maxRadius: 680, orbCount: 10 },
        { minRadius: 730, maxRadius: 760, orbCount: 11 },
        { minRadius: 810, maxRadius: 840, orbCount: 12 },
        { minRadius: 890, maxRadius: 920, orbCount: 13 }
      ];
      
      const totalOrbs = orbitalPaths.reduce((sum, path) => sum + path.orbCount, 0);
      
      let orbIndex = 0;
      const newOrbs = [];
      
      for (let pathIndex = 0; pathIndex < orbitalPaths.length; pathIndex++) {
        const orbitalPath = orbitalPaths[pathIndex];
        const orbsInCurrentPath = orbitalPath.orbCount;
        const pathRange = orbitalPath.maxRadius - orbitalPath.minRadius;
        
        for (let i = 0; i < orbsInCurrentPath; i++) {
          const rotationOffset = (360 / orbsInCurrentPath) * i;
          const initialPosition = Math.floor(Math.random() * 360);
          
          const radiusStep = pathRange / orbsInCurrentPath;
          const calculatedRadius = orbitalPath.minRadius + (radiusStep * i) + (radiusStep / 2);
          
          const isOuterOrb = pathIndex >= 5;
          const minSize = isOuterOrb ? 100 : 70;
          const maxSize = isOuterOrb ? 160 : 120;
          const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
          
          const baseAnimationDuration = isOuterOrb ? 35 : 25;
          const animationVariance = isOuterOrb ? 20 : 15;
          const animationDuration = (Math.random() * animationVariance) + baseAnimationDuration;
          const animationDelay = Math.random() * animationDuration;
          
          newOrbs.push({
            id: orbIndex++,
            size: size,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: rotationOffset + (pathIndex * 10),
            radius: calculatedRadius,
            animationDuration: animationDuration,
            animationDelay: animationDelay,
            reverse: (orbIndex % 2 === 0),
            initialPosition: initialPosition
          });
        }
      }

      setOrbs(newOrbs);
      orbsInitialized.current = true;
    };

    initializeOrbs();
  }, []);

  return (
    <div className="h-screen w-full border-b border-ui-border-base relative overflow-hidden bg-white dark:bg-gray-900 select-none">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className={`absolute rounded-full opacity-50 blur-xl ${orb.color} ${orb.reverse ? 'animate-reverse-orbit' : 'animate-orbit'}`}
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              transformOrigin: 'center center',
              animationDuration: `${orb.animationDuration}s`,
              animationDelay: `-${orb.animationDelay}s`,
              transform: `rotate(${orb.initialPosition}deg) translateX(${orb.radius}px) rotate(-${orb.initialPosition}deg)`,
              '--radius': `${orb.radius}px`,
              '--initial-rotation': `${orb.initialPosition}deg`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center small:p-32 gap-10">
        <Heading
          level="h2"
          className="text-7xl md:text-8xl leading-tight font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center flex-wrap"
        >
          Welcome to Darryl&nbsp;
          <div className="text-slide-container">
            <div className="text-slide-wrapper">
              <span className="animated-gradient-text-blue">Store</span>
              <span className="animated-gradient-text-purple">Merch</span>
              <span className="animated-gradient-text-blue">Store</span>
            </div>
          </div>
        </Heading>
        <Heading
          level="h3"
          className="text-2xl md:text-3xl leading-8 font-medium text-gray-700 dark:text-gray-300"
        >
          Belanja Merchandise Darryl disini{" "}
          <span 
            onClick={handleEmoteClick} 
            className={`cursor-pointer inline-block ${animate ? 'animate-bounce' : ''}`}
            style={{ transition: "transform 0.3s" }}
          >
            {currentEmote}
          </span>
        </Heading>
        
        <LocalizedClientLink href="/store" className="relative group">
          <span className="liquid-btn inline-block relative text-black dark:text-white px-6 py-2 outline-none border-none">
            <span className="liquid-bg"></span>
            <Button
              variant="primary"
              className="relative z-10 text-lg bg-transparent outline-none border-none shadow-none transition-duration-0 liquid-btn-text tracking-widest font-weight-animate"
              style={{ background: "none", transition: "font-weight 0.3s cubic-bezier(0.4,0,0.2,1)" }}
            >
              <span className="shake-tilt text-black dark:text-white group-hover:font-bold group-hover:text-white dark:group-hover:text-zinc-200">Explore Products</span>
            </Button>
          </span>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
