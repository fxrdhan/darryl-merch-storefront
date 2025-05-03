"use client"

import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from "react"
import OrbBackground from "./background"

const Hero = () => {
  const emotes = ["🥳", "🤩", "😎", "😋", "🙌", "🔥", "🎉", "🫶"];
  const [currentEmote, setCurrentEmote] = useState(emotes[0]);
  const [animate, setAnimate] = useState(false);

  const handleEmoteClick = () => {
    setAnimate(true);

    setCurrentEmote(prevEmote => {
      const currentIndex = emotes.indexOf(prevEmote);
      const nextIndex = (currentIndex + 1) % emotes.length;
      return emotes[nextIndex];
    });

    setTimeout(() => setAnimate(false), 500);
  };

  return (
    <div className="h-screen w-full border-b border-ui-border-base relative overflow-hidden bg-white dark:bg-gray-900 select-none">
      <OrbBackground />

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center small:p-32 gap-10">
        <Heading
          level="h2"
          className="text-6xl md:text-8xl leading-tight font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center flex-wrap"
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
          className="text-xl md:text-3xl leading-8 font-medium text-gray-700 dark:text-gray-300 flex flex-wrap justify-center items-center"
        >
          Belanja Merchandise Darryl disini{" "}
          <span 
            onClick={handleEmoteClick} 
            className={`cursor-pointer inline-block ${animate ? 'animate-bounce' : ''} md:inline block w-full mt-2 md:mt-0 md:w-auto`}
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
              className="relative z-10 text-base md:text-lg bg-transparent outline-none border-none shadow-none transition-duration-0 liquid-btn-text tracking-widest font-weight-animate"
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
