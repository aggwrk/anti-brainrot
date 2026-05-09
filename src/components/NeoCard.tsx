import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Scenario } from '../types';

interface NeoCardProps {
  scenario: Scenario;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const NeoCard: React.FC<NeoCardProps> = ({ scenario, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const leftOpacity = useTransform(x, [-150, -50], [1, 0]);
  const rightOpacity = useTransform(x, [50, 150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100) {
      onSwipe('left');
    } else if (info.offset.x > 100) {
      onSwipe('right');
    }
  };

  return (
    <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000">
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 1.05 }}
        className="absolute inset-0 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
      >
        {/* Category Badge */}
        <div className="self-start px-3 py-1 bg-yellow-300 border-2 border-black font-bold text-xs uppercase tracking-wider">
          {scenario.category}
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center text-center">
          <h2 className="text-2xl font-black leading-tight h-auto">
            {scenario.question}
          </h2>
        </div>

        {/* Swipe Indicators (Overlay) */}
        <motion.div 
          style={{ opacity: leftOpacity }}
          className="absolute inset-0 bg-red-400/80 flex items-center justify-center p-8 pointer-events-none border-4 border-black"
        >
          <span className="text-white font-black text-3xl text-center uppercase drop-shadow-[2px_2px_0px_#000]">
            {scenario.leftChoice.text}
          </span>
        </motion.div>

        <motion.div 
          style={{ opacity: rightOpacity }}
          className="absolute inset-0 bg-green-400/80 flex items-center justify-center p-8 pointer-events-none border-4 border-black"
        >
          <span className="text-white font-black text-3xl text-center uppercase drop-shadow-[2px_2px_0px_#000]">
            {scenario.rightChoice.text}
          </span>
        </motion.div>

        {/* Footer info */}
        <div className="text-center font-bold text-gray-400 text-xs italic">
          Swipe Left or Right
        </div>
      </motion.div>
    </div>
  );
};
