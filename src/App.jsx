import { useState, useEffect } from 'react';
import './index.css';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import CommunityArea from './Components/CommunityArea';
import Carousel from './Components/Crausal';
import MissionPage from './Components/MissionPage';
import TeamDetail from './Components/TeamDetail';
import Footer from './Components/footer';
import ContactUs from './Components/Contactus';
import Course_section from './Components/Course_section';
import ProfessionalCorner from './Components/ProfessionalCorner';
import KnowledgeHub from './Components/KnowledgeHub';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [activeItem, setActiveItem] = useState('Home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    // Create the Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize Lenis scrolling with ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Feed Lenis RAF into the GSAP ticker
    const gsapTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // Clean up on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
    };
  }, [activePage]);

  const handleNavClick = (item) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveItem(item);
      if (item === 'Professional Corner' || item === 'Knowledge Hub') {
        setActivePage(item);
        window.scrollTo({ top: 0 });
      } else {
        setActivePage('Home');
        setTimeout(() => {
          const elementId = item === 'About us' ? 'about-us' : item === 'Student Corner' ? 'StudentCorner' : 'Home';
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      }
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Navbar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        activePage={activePage}
        setActivePage={setActivePage}
        onNavClick={handleNavClick}
      />
      
      <main className={`flex-grow transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {activePage === 'Home' ? (
          <>
            <Hero onExploreKnowledgeHub={() => handleNavClick('Knowledge Hub')} />
            <CommunityArea />
            <Carousel />
            <Course_section />
            <MissionPage />
            <TeamDetail />
            <ContactUs />
          </>
        ) : activePage === 'Professional Corner' ? (
          <ProfessionalCorner />
        ) : (
          <KnowledgeHub />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
