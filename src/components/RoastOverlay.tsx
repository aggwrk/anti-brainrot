import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface RoastOverlayProps {
  roast: string | null;
  onContinue: () => void;
}

export const RoastOverlay: React.FC<RoastOverlayProps> = ({ roast, onContinue }) => {
  return (
    <AnimatePresence>
      {roast && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="w-full max-w-sm bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
          >
            {/* Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24 stroke-[4]" />
            </div>

            <div className="relative z-10">
              <div className="px-3 py-1 bg-purple-400 border-2 border-black inline-block font-black text-xs uppercase mb-4 shadow-[3px_3px_0px_0px_#000]">
                Roast Master Says:
              </div>
              
              <p className="text-xl font-black italic mb-8 leading-tight">
                "{roast}"
              </p>

              <button
                onClick={onContinue}
                className="w-full py-4 bg-yellow-400 border-4 border-black font-black text-xl uppercase hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000] transition-all shadow-[6px_6px_0px_0px_#000]"
              >
                NEXT Card →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
