"use client"

import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [orbs, setOrbs] = useState<{ id: number, size: number, color: string, rotation: number, radius: number, animationDuration: number, reverse: boolean, initialPosition: number }[]>([]);

  useEffect(() => {
    const orbCount = 28; 
    const colors = [
      'bg-blue-300', 'bg-purple-300', 'bg-pink-300', 'bg-yellow-300', 'bg-green-300',
      'bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-yellow-200', 'bg-green-200',
      'bg-indigo-300', 'bg-teal-300', 'bg-cyan-300', 'bg-amber-300'
    ];

    const orbitalPaths = [
      { minRadius: 180, maxRadius: 210 },
      { minRadius: 270, maxRadius: 300 },
      { minRadius: 360, maxRadius: 390 },
      { minRadius: 450, maxRadius: 480 },
      { minRadius: 550, maxRadius: 580 },
      { minRadius: 650, maxRadius: 700 },
      { minRadius: 750, maxRadius: 800 }
    ];
    
    const orbsPerPath = 4;

    const newOrbs = Array.from({ length: orbCount }).map((_, index) => {
      const pathIndex = Math.floor(index / orbsPerPath) % orbitalPaths.length;
      const orbitalPath = orbitalPaths[pathIndex];

      const positionInPath = index % orbsPerPath;
      const rotationOffset = (360 / orbsPerPath) * positionInPath;
      
      const initialPosition = Math.floor(Math.random() * 360);

      const pathRange = orbitalPath.maxRadius - orbitalPath.minRadius;
      const radiusStep = pathRange / orbsPerPath;
      const calculatedRadius = orbitalPath.minRadius + (radiusStep * positionInPath) + (radiusStep / 2);

      const isOuterOrb = pathIndex >= 4;
      const minSize = isOuterOrb ? 100 : 70;
      const maxSize = isOuterOrb ? 160 : 120;
      const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;

      const baseAnimationDuration = isOuterOrb ? 35 : 25;
      const animationVariance = isOuterOrb ? 20 : 15;
      const animationDuration = (Math.random() * animationVariance) + baseAnimationDuration;

      return {
        id: index,
        size: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: rotationOffset + (pathIndex * 10),
        radius: calculatedRadius,
        animationDuration: animationDuration,
        reverse: (index % 2 === 0),
        initialPosition: initialPosition
      };
    });

    setOrbs(newOrbs);
  }, []);

  return (
    <div className="h-screen w-full border-b border-ui-border-base relative overflow-hidden bg-white">
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
              transform: `rotate(${orb.initialPosition}deg) translateX(${orb.radius}px) rotate(-${orb.initialPosition}deg)`,
              animationDelay: `-${Math.floor(Math.random() * orb.animationDuration)}s`,
              '--radius': `${orb.radius}px`,
              '--initial-rotation': `${orb.initialPosition}deg`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center small:p-32 gap-8">
        <Heading
          level="h2"
          className="text-6xl md:text-7xl leading-tight font-bold mb-6 text-gray-900 flex items-center justify-center flex-wrap"
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
          className="text-2xl md:text-3xl leading-8 font-medium text-gray-700"
        >
          Belanja Merchandise Darryl disini 🥳
        </Heading>
        
        <LocalizedClientLink href="/store">
          <span className="liquid-btn inline-block relative text-black px-6 py-2">
            <span className="liquid-bg"></span>
            <Button
              variant="primary"
              className="relative z-10 text-md bg-transparent border-none shadow-none transition-none duration-0 liquid-btn-text font-bold tracking-widest"
              style={{ background: "none" }}
            >
              <span className="shake-tilt">Explore Products</span>
            </Button>
          </span>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
