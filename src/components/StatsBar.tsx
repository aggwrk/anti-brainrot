import React from 'react';
import { Wallet, Heart, Briefcase } from 'lucide-react';

interface StatsBarProps {
  wallet: number;
  sanity: number;
  career: number;
  streak: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({ wallet, sanity, career, streak }) => {
  return (
    <div className="w-full max-w-md grid grid-cols-3 gap-2 mb-8">
      <StatItem icon={<Wallet className="w-4 h-4" />} label="Wallet" value={wallet} color="bg-green-300" />
      <StatItem icon={<Heart className="w-4 h-4" />} label="Sanity" value={sanity} color="bg-pink-300" />
      <StatItem icon={<Briefcase className="w-4 h-4" />} label="Career" value={career} color="bg-blue-300" />
      
      {/* Streak Badge */}
      <div className="col-span-3 mt-2 flex justify-center">
        <div className="px-4 py-1 bg-yellow-400 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
          🔥 Streak: {streak} Days
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) => {
  const percentage = Math.max(0, Math.min(100, value));
  
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 font-black text-[10px] uppercase">
        {icon}
        <span>{label}</span>
      </div>
      <div className="h-4 w-full bg-white border-2 border-black relative">
        <div 
          className={`h-full ${color} border-r-2 border-black transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
