import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';

import { CustomCursor } from './components/ui/CustomCursor';
import { RedesignedNavbar } from './components/sections/redesign/RedesignedNavbar';
import { RedesignedHero } from './components/sections/redesign/RedesignedHero';
import { RedesignedMissionSection } from './components/sections/redesign/RedesignedMissionSection';
import { RedesignedFeaturedChallenges } from './components/sections/redesign/RedesignedFeaturedChallenges';
import { RedesignedSchedulePreview } from './components/sections/redesign/RedesignedSchedulePreview';
import { RedesignedRegistrationSection } from './components/sections/redesign/RedesignedRegistrationSection';
import { RedesignedWhyParticipate } from './components/sections/redesign/RedesignedWhyParticipate';
import { RedesignedOrganizersSection } from './components/sections/redesign/RedesignedOrganizersSection';
import { RedesignedKopargaonSection } from './components/sections/redesign/RedesignedKopargaonSection';
import { RedesignedFAQ } from './components/sections/redesign/RedesignedFAQ';
import { RedesignedContactSection, RedesignedFooter } from './components/sections/redesign/RedesignedFooter';
import { useAuth } from './context/AuthContext';
import { apiService } from './services/api';

export function App() {
  const navigate = useNavigate();
  const { participant } = useAuth();

  useEffect(() => {
    apiService.fetchTeamsAsync();

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

  const handleRegisterClick = () => {
    if (participant) {
      if (participant.teamId) {
        navigate('/dashboard');
      } else {
        navigate('/register');
      }
    } else {
      navigate('/login');
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
      <CustomCursor />
      <RedesignedNavbar onRegisterClick={handleRegisterClick} />

      <main className="w-full pt-24 sm:pt-28">
        <RedesignedHero
          onRegisterClick={handleRegisterClick}
          onExploreChallenges={handleExploreTracks}
        />
        <RedesignedMissionSection />
        <RedesignedFeaturedChallenges
          onOpenFullChallenges={handleExploreTracks}
          onSelectChallenge={handleExploreTracks}
        />
        <RedesignedSchedulePreview />
        <RedesignedRegistrationSection onRegisterClick={handleRegisterClick} />
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
