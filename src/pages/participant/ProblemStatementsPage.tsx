import React, { useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { RedesignedNavbar } from '../../components/sections/redesign/RedesignedNavbar';
import { RedesignedFooter } from '../../components/sections/redesign/RedesignedFooter';
import { RedesignedProblemStatements } from '../../components/sections/redesign/RedesignedProblemStatements';
import { CustomCursor } from '../../components/ui/CustomCursor';

export const ProblemStatementsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { trackId } = useParams();

  const activeTrack = trackId || searchParams.get('track') || 'all';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTrack]);

  return (
    <div className="min-h-screen bg-[#F9F4EA] text-[#050C0C] relative font-sans overflow-x-hidden selection:bg-[#162E28] selection:text-[#E5BE61]">
      <CustomCursor />
      <RedesignedNavbar />

      <main className="w-full pt-28 sm:pt-36">
        {/* Navigation Breadcrumb */}
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-2">
          <Link
            to="/#tracks"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#7B8379] hover:text-[#162E28] uppercase tracking-wider transition-colors bg-[#E9E1D2] hover:bg-[#D2CAB6] px-4 py-2 rounded-xl border border-[#D2CAB6]"
          >
            <ArrowLeft className="w-4 h-4 text-[#A77A1C]" />
            <span>← Return to Tracks on Main Website</span>
          </Link>
        </div>

        <RedesignedProblemStatements 
          key={activeTrack}
          id="problem-statements-page" 
          initialTrackFilter={activeTrack} 
        />
      </main>

      <RedesignedFooter />
    </div>
  );
};

export default ProblemStatementsPage;
