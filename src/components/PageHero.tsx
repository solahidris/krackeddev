"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  backgroundImage?: string;
}

const TypingAnimation = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayText("");
    setIsTyping(true);
  }, [text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, 50);
      } else {
        setIsTyping(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  );
};

const PageHero = ({
  title,
  subtitle,
  children,
  backgroundImage,
}: PageHeroProps) => {
  const words = title.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background overflow-hidden">
      {/* Matrix Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#15803d1a_1px,transparent_1px),linear-gradient(to_bottom,#15803d1a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-green-700/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-neon" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-green-700/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-neon" />

      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="relative z-10 container px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl space-y-8 md:space-y-10 lg:space-y-12">
          <motion.div
            className="relative"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter relative z-10 leading-tight">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={child}
                  className="inline-block mr-2 md:mr-4 last:mr-0 text-zinc-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  {word.toLowerCase() === "kracked" ? (
                    <span className="text-green-600 brightness-150 drop-shadow-[0_0_20px_rgba(21,128,61,0.3)]">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>
            {/* Glitch overlay effect - Hidden on mobile to save performance/space */}
            <div
              className="absolute inset-0 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter opacity-30 pointer-events-none hidden md:block"
              aria-hidden="true"
            >
              <span className="glitch-text" data-text={title}>
                {title}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="text-lg md:text-2xl text-zinc-50 max-w-[800px] mx-auto font-light tracking-wide min-h-[4rem] md:min-h-[3rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="text-green-700/80 mr-2">&gt;</span>
            <TypingAnimation text={subtitle} />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 w-full pt-2 md:pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PageHero;
