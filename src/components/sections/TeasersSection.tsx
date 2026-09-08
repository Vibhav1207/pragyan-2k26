import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PragyanButton } from '../ui/PragyanButton';

interface TeasersSectionProps {
  onRegisterClick?: () => void;
}

export const TeasersSection: React.FC<TeasersSectionProps> = ({ onRegisterClick }) => {
  return (
    <section className="w-full py-16 px-4 bg-[#F3F1EC] text-[#050505] border-b-3 border-[#050505]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="space-y-1">
          <span className="font-mono text-xs font-black text-[#FC3D21]">NATIONAL HACKATHON INVITATION</span>
          <h3 className="font-space font-black text-2xl sm:text-3xl uppercase">PRAGYAN 2K26 BY SANJIVANI UNIVERSITY</h3>
        </div>
        {onRegisterClick && (
          <PragyanButton onClick={onRegisterClick} variant="red" icon={<ArrowUpRight className="w-4 h-4" />}>
            REGISTER NOW
          </PragyanButton>
        )}
      </div>
    </section>
  );
};
