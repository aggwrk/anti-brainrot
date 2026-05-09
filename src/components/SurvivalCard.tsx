import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { motion } from 'motion/react';
import { Share2, Download, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurvivalCardProps {
  stats: {
    wallet: number;
    sanity: number;
    career: number;
  };
  streak: number;
  onRestart: () => void;
}

export const SurvivalCard: React.FC<SurvivalCardProps> = ({ stats, streak, onRestart }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const averageScore = Math.round((stats.wallet + stats.sanity + stats.career) / 3);
  
  const getRank = () => {
    if (averageScore > 80) return { title: "ADULTING LEGEND", color: "bg-green-400" };
    if (averageScore > 50) return { title: "BARELY SURVIVING", color: "bg-yellow-400" };
    return { title: "RED FLAG IMMINENT", color: "bg-red-400" };
  };

  const rank = getRank();

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `mind-cleanse-status-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download card', err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      <motion.div
        initial={{ rotate: -5, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        ref={cardRef}
        className="w-full bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_#000] flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-1">
            SURVIVAL CARD
          </h1>
          <p className="font-bold text-xs text-gray-500 uppercase">Mind-Cleanse: Adulting Edition</p>
        </div>

        <div className={`py-4 px-2 border-4 border-black ${rank.color} text-center`}>
          <h2 className="text-2xl font-black uppercase">{rank.title}</h2>
        </div>

        <div className="space-y-4">
          <ResultStat label="Wallet / Finance" value={stats.wallet} />
          <ResultStat label="Sanity / Mental" value={stats.sanity} />
          <ResultStat label="Career / Future" value={stats.career} />
        </div>

        <div className="border-t-2 border-dashed border-black pt-4 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-black uppercase text-gray-500">Global Rank</p>
            <p className="text-2xl font-black italic">TOP {100 - averageScore}%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-gray-500">Current Streak</p>
            <p className="text-2xl font-black italic">{streak} DAYS</p>
          </div>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-[8px] font-bold text-gray-400 uppercase italic">
            Shared from Mind-Cleanse App • No-Login adulting guide
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 py-4 bg-purple-400 border-4 border-black font-black text-sm uppercase shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] transition-all"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 py-4 bg-yellow-400 border-4 border-black font-black text-sm uppercase shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Again?
        </button>
      </div>
    </div>
  );
};

const ResultStat = ({ label, value }: { label: string, value: number }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-[10px] font-black uppercase">{label}</span>
      <span className="text-[10px] font-black">{Math.max(0, Math.min(100, value))}%</span>
    </div>
    <div className="h-4 w-full bg-gray-100 border-2 border-black">
      <div 
        className="h-full bg-black transition-all duration-1000" 
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  </div>
);
