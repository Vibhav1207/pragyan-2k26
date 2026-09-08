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

export function App() {
  const navigate = useNavigate();
  const { participant } = useAuth();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
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
      {/* Custom Trailing Cursor */}
      <CustomCursor />

      {/* Sticky Navigation Bar */}
      <Navbar onRegisterClick={handleRegisterClick} />

      {/* SINGLE-PAGE CONTINUOUS EXPERIENTIAL LAYOUT */}
      <main className="w-full pt-20 sm:pt-24">
        {/* 1. HERO SECTION */}
        <Hero
          onRegisterClick={handleRegisterClick}
          onExploreChallenges={handleExploreTracks}
        />

        {/* 2. ABOUT THE HACKATHON */}
        <TheMissionSection />

        {/* 3. HACKATHON TRACKS */}
        <FeaturedChallenges
          onOpenFullChallenges={handleExploreTracks}
          onSelectChallenge={handleExploreTracks}
        />

        {/* 4. EVENT TIMELINE */}
        <SchedulePreview />

        {/* 5. REGISTRATION INFORMATION */}
        <RegistrationSection onRegisterClick={handleRegisterClick} />

        {/* 6. PRIZES & OPPORTUNITIES */}
        <WhyParticipate onRegisterClick={handleRegisterClick} />

        {/* 7. EVENT ORGANIZERS / BRANDING */}
        <OrganizersSection />

        {/* 8. LOCATION */}
        <KopargaonSection onRegisterClick={handleRegisterClick} />

        {/* 9. FAQ SECTION */}
        <FAQ />

        {/* 10. CONTACT SECTION */}
        <ContactSection />
      </main>

      {/* 11. FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
