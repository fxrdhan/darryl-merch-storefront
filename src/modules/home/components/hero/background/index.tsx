"use client"

import { useEffect, useState, useRef } from "react"

type Orb = {
  id: number
  size: number
  color: string
  rotation: number
  radius: number
  animationDuration: number
  reverse: boolean
  initialPosition: number
  animationDelay: number
}

const OrbBackground = () => {
  const [orbs, setOrbs] = useState<Orb[]>([])
  const orbsInitialized = useRef(false)

  useEffect(() => {
    const initializeOrbs = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');

      const lightColors = [
        'bg-blue-300', 'bg-purple-300', 'bg-pink-300', 'bg-yellow-300', 'bg-green-300',
        'bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-yellow-200', 'bg-green-200',
        'bg-indigo-300', 'bg-teal-300', 'bg-cyan-300', 'bg-amber-300'
      ];

      const darkColors = [
        'bg-blue-700', 'bg-purple-700', 'bg-pink-700', 'bg-yellow-700', 'bg-green-700',
        'bg-blue-800', 'bg-purple-800', 'bg-pink-800', 'bg-yellow-800', 'bg-green-800',
        'bg-indigo-700', 'bg-teal-700', 'bg-cyan-700', 'bg-amber-700'
      ];

      const colors = isDarkMode ? darkColors : lightColors;

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
      ]

      let orbId = 0;
      const newOrbs: Orb[] = []
      for (let pathIndex = 0; pathIndex < orbitalPaths.length; pathIndex++) {
        const orbitalPath = orbitalPaths[pathIndex]
        const orbsInCurrentPath = orbitalPath.orbCount
        const pathRange = orbitalPath.maxRadius - orbitalPath.minRadius

        for (let i = 0; i < orbsInCurrentPath; i++) {
          const rotationOffset = (360 / orbsInCurrentPath) * i
          const initialPosition = Math.floor(Math.random() * 360)

          const radiusStep = pathRange / orbsInCurrentPath
          const calculatedRadius = orbitalPath.minRadius + (radiusStep * i) + (radiusStep / 2)

          const isOuterOrb = pathIndex >= 5
          const minSize = isOuterOrb ? 100 : 70
          const maxSize = isOuterOrb ? 160 : 120
          const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

          const baseAnimationDuration = isOuterOrb ? 35 : 20
          const animationVariance = isOuterOrb ? 20 : 15
          const animationDuration = (Math.random() * animationVariance) + baseAnimationDuration
          const animationDelay = -Math.random() * animationDuration

          newOrbs.push({
            id: orbId++,
            size: size,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: rotationOffset + (pathIndex * 5),
            radius: calculatedRadius,
            animationDuration: animationDuration,
            animationDelay: animationDelay,
            reverse: (orbId % 2 === 0),
            initialPosition: initialPosition
          })
        }
      }

      setOrbs(newOrbs)
      orbsInitialized.current = true
    };

    if (!orbsInitialized.current) {
      initializeOrbs();
    }

    const observer = new MutationObserver(initializeOrbs);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={`absolute rounded-full opacity-50 blur-xl ${orb.color} ${orb.reverse ? 'animate-reverse-orbit' : 'animate-orbit'}`}
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            transformOrigin: 'center center',
            animationDuration: `${orb.animationDuration.toFixed(2)}s`,
            animationDelay: `-${orb.animationDelay}s`,
            transform: `rotate(${orb.initialPosition}deg) translateX(${orb.radius}px) rotate(-${orb.initialPosition}deg)`,
            '--radius': `${orb.radius}px`,
            '--initial-rotation': `${orb.initialPosition}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

export default OrbBackground
