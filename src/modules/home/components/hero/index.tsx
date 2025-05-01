"use client"

import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useEffect, useState } from "react";

const Hero = () => {
  // Orb state: each orb has visual and animation properties
  const [orbs, setOrbs] = useState<{ id: number, size: number, color: string, rotation: number, radius: number, animationDuration: number, reverse: boolean, initialPosition: number }[]>([]);

  useEffect(() => {
    const orbCount = 28; // Total number of orbs
    const colors = [
      'bg-blue-300', 'bg-purple-300', 'bg-pink-300', 'bg-yellow-300', 'bg-green-300',
      'bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-yellow-200', 'bg-green-200',
      'bg-indigo-300', 'bg-teal-300', 'bg-cyan-300', 'bg-amber-300'
    ];

    // Orbital paths define the distance from the center for each ring of orbs
    const orbitalPaths = [
      { minRadius: 180, maxRadius: 210 },    // Inner ring
      { minRadius: 270, maxRadius: 300 },    // Middle-inner ring
      { minRadius: 360, maxRadius: 390 },    // Middle ring
      { minRadius: 450, maxRadius: 480 },    // Middle-outer ring
      { minRadius: 550, maxRadius: 580 },    // Outer ring
      { minRadius: 650, maxRadius: 700 },    // Far outer ring
      { minRadius: 750, maxRadius: 800 }     // Edge ring
    ];
    
    const orbsPerPath = 4; // Number of orbs per orbital path

    const newOrbs = Array.from({ length: orbCount }).map((_, index) => {
      // Assign orb to a path based on its index
      const pathIndex = Math.floor(index / orbsPerPath) % orbitalPaths.length;
      const orbitalPath = orbitalPaths[pathIndex];

      // Calculate position within the path
      const positionInPath = index % orbsPerPath;
      const rotationOffset = (360 / orbsPerPath) * positionInPath;
      
      // Random initial position (0-360 degrees) for each orb
      const initialPosition = Math.floor(Math.random() * 360);

      // Calculate radius more evenly within the path range
      const pathRange = orbitalPath.maxRadius - orbitalPath.minRadius;
      const radiusStep = pathRange / orbsPerPath;
      const calculatedRadius = orbitalPath.minRadius + (radiusStep * positionInPath) + (radiusStep / 2);

      // Larger size range for orbs based on their path
      const isOuterOrb = pathIndex >= 4; // For the outer paths
      const minSize = isOuterOrb ? 100 : 70; // Minimum size
      const maxSize = isOuterOrb ? 160 : 120; // Maximum size
      const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;

      // Slower animation for larger orbs
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
    <div className="h-[85vh] w-full border-b border-ui-border-base relative overflow-hidden bg-white">
      {/* Orbs are absolutely positioned around the center */}
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
              // CSS variables for animation (if needed in CSS)
              '--radius': `${orb.radius}px`,
              '--initial-rotation': `${orb.initialPosition}deg`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center small:p-32 gap-8">
        <Heading
          level="h2"
          className="text-6xl md:text-7xl leading-tight font-bold mb-6 text-gray-900"
        >
          Welcome to Darryl Store
        </Heading>
        <Heading
          level="h3"
          className="text-2xl md:text-3xl leading-8 font-medium text-gray-700"
        >
          Discover the Best Products Here
        </Heading>
        
        <LocalizedClientLink href="/store">
          <Button variant="primary">Explore Products</Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
