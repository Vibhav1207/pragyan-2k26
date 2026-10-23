import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import { CustomCursor } from './components/ui/CustomCursor';
import { DailyIntroLoader } from './components/ui/DailyIntroLoader';
import { RedesignedNavbar } from './components/sections/redesign/RedesignedNavbar';
import { RedesignedHero } from './components/sections/redesign/RedesignedHero';
import { RedesignedMissionSection } from './components/sections/redesign/RedesignedMissionSection';
import { RedesignedFeaturedChallenges } from './components/sections/redesign/RedesignedFeaturedChallenges';
import { RedesignedSchedulePreview } from './components/sections/redesign/RedesignedSchedulePreview';
import { RedesignedWhyParticipate } from './components/sections/redesign/RedesignedWhyParticipate';
import { RedesignedOrganizersSection } from './components/sections/redesign/RedesignedOrganizersSection';
import { RedesignedKopargaonSection } from './components/sections/redesign/RedesignedKopargaonSection';
import { RedesignedFAQ } from './components/sections/redesign/RedesignedFAQ';
import { RedesignedContactSection, RedesignedFooter } from './components/sections/redesign/RedesignedFooter';

export function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let reqId: number;
    function raf(time: number) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }
    reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  const handleRegisterClick = () => {
    const psElem = document.getElementById('problem-statements');
    if (psElem) {
      psElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreTracks = () => {
    const tracksElem = document.getElementById('tracks');
    if (tracksElem) {
      tracksElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F4EA] text-[#050C0C] relative font-sans overflow-x-hidden selection:bg-[#162E28] selection:text-[#E5BE61]">
      <DailyIntroLoader />
      <CustomCursor />
      <RedesignedNavbar onRegisterClick={handleRegisterClick} />

      <main className="w-full pt-28 sm:pt-36">
        <RedesignedHero
          onRegisterClick={handleRegisterClick}
          onExploreChallenges={handleExploreTracks}
        />
        <RedesignedMissionSection />
        <RedesignedFeaturedChallenges />
        <RedesignedSchedulePreview />
        <RedesignedWhyParticipate onRegisterClick={handleRegisterClick} />
        <RedesignedOrganizersSection />
        <RedesignedKopargaonSection onRegisterClick={handleRegisterClick} />
        <RedesignedFAQ />
        <RedesignedContactSection />
      </main>

      <RedesignedFooter />
    </div>
  );
}

export default App;
