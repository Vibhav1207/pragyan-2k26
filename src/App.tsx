import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';

import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { TheMissionSection } from './components/sections/TheMissionSection';
import { FeaturedChallenges } from './components/sections/FeaturedChallenges';
import { SchedulePreview } from './components/sections/SchedulePreview';
import { RegistrationSection } from './components/sections/RegistrationSection';
import { WhyParticipate } from './components/sections/WhyParticipate';
import { OrganizersSection } from './components/sections/OrganizersSection';
import { KopargaonSection } from './components/sections/KopargaonSection';
import { FAQ } from './components/sections/FAQ';
import { ContactSection, Footer } from './components/sections/Footer';
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
    <div className="min-h-screen bg-[#F0F4FA] text-[#0B192C] relative font-sans overflow-x-hidden selection:bg-[#1D4ED8] selection:text-white">
      <CustomCursor />
      <Navbar onRegisterClick={handleRegisterClick} />

      <main className="w-full pt-24 sm:pt-28">
        <Hero
          onRegisterClick={handleRegisterClick}
          onExploreChallenges={handleExploreTracks}
        />
        <TheMissionSection />
        <FeaturedChallenges
          onOpenFullChallenges={handleExploreTracks}
          onSelectChallenge={handleExploreTracks}
        />
        <SchedulePreview />
        <RegistrationSection onRegisterClick={handleRegisterClick} />
        <WhyParticipate onRegisterClick={handleRegisterClick} />
        <OrganizersSection />
        <KopargaonSection onRegisterClick={handleRegisterClick} />
        <FAQ />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
