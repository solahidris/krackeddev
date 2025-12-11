"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SplitTextAnimationProps {
  text: string;
  onComplete?: () => void;
}

export default function SplitTextAnimation({
  text,
  onComplete,
}: SplitTextAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const characters = text.split("");

  // Find the position of "Kracked" in the text
  const krackedStartIndex = text.toLowerCase().indexOf("kracked");
  const krackedEndIndex = krackedStartIndex + "kracked".length;

  const isKrackedChar = (index: number) => {
    return index >= krackedStartIndex && index < krackedEndIndex;
  };

  useEffect(() => {
    // Start fade out after animation completes + brief display time
    const fadeOutTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    return () => clearTimeout(fadeOutTimer);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      return () => clearTimeout(hideTimer);
    }
  }, [isExiting]);

  useEffect(() => {
    if (!isVisible && onComplete) {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(completeTimer);
    }
  }, [isVisible, onComplete]);

  // Trigger audio unlock on any interaction with animation
  useEffect(() => {
    const handleInteraction = () => {
      // Dispatch event to unlock audio
      window.dispatchEvent(new CustomEvent("unlockAudio"));
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen fixed inset-0 z-50 bg-background cursor-pointer"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => window.dispatchEvent(new CustomEvent("unlockAudio"))}
    >
      <motion.div
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        initial="hidden"
        animate={isExiting ? "exit" : "visible"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.1,
            },
          },
          exit: {
            transition: {
              staggerChildren: 0.02,
              staggerDirection: -1,
            },
          },
        }}
      >
        {characters.map((char, index) => {
          const isKracked = isKrackedChar(index);
          return (
            <motion.span
              key={index}
              className={`inline-block ${
                isKracked
                  ? "text-green-600 brightness-150 drop-shadow-[0_0_20px_rgba(21,128,61,0.3)]"
                  : "text-zinc-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              }`}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 80,
                  scale: 0.3,
                  filter: "blur(10px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                  },
                },
                exit: {
                  opacity: 0,
                  y: -30,
                  scale: 0.8,
                  filter: "blur(8px)",
                  transition: {
                    duration: 0.4,
                    ease: [0.4, 0, 1, 1],
                  },
                },
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
