import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KolkataSkyline from './KolkataSkyline';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


const TramCar = ({ isFront }) => (
  <svg 
            className="h-full w-[180px] drop-shadow-[0_8px_16px_rgba(204,0,0,0.25)]" 
            viewBox="0 0 320 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Premium metallic glossy Oracle red paint */}
              <linearGradient id="bodyBase" x1="0" y1="50" x2="320" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3a0007" />
                <stop offset="25%" stopColor="#7a0010" />
                <stop offset="50%" stopColor="#cc0000" />
                <stop offset="75%" stopColor="#ff3d47" />
                <stop offset="100%" stopColor="#540003" />
              </linearGradient>
              {/* Retro Cream paint for window band */}
              <linearGradient id="creamPanel" x1="0" y1="35" x2="0" y2="58" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fffaec" />
                <stop offset="50%" stopColor="#f5ebcf" />
                <stop offset="100%" stopColor="#e3d6b3" />
              </linearGradient>
              {/* Clerestory roof red */}
              <linearGradient id="clerestoryRed" x1="0" y1="16" x2="0" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#aa0000" />
                <stop offset="100%" stopColor="#550000" />
              </linearGradient>
              {/* 3D volumetric highlights */}
              <linearGradient id="bodyHighlight" x1="160" y1="22" x2="160" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="20%" stopColor="rgba(255, 255, 255, 0)" />
                <stop offset="70%" stopColor="rgba(0,0,0,0)" />
                <stop offset="85%" stopColor="rgba(0,0,0,0.3)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.75)" />
              </linearGradient>
              {/* Metallic Chrome Trim */}
              <linearGradient id="chromeMetal" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="20%" stopColor="#ececec" />
                <stop offset="45%" stopColor="#a3a3a3" />
                <stop offset="50%" stopColor="#5c5c5c" />
                <stop offset="55%" stopColor="#969696" />
                <stop offset="80%" stopColor="#e3e3e3" />
                <stop offset="100%" stopColor="#707070" />
              </linearGradient>
              {/* Premium Tinted Glass */}
              <linearGradient id="windowGlass" x1="0" y1="38" x2="0" y2="56" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1a1c24" />
                <stop offset="50%" stopColor="#0b0c10" />
                <stop offset="100%" stopColor="#020203" />
              </linearGradient>
              {/* Soft Light Cone */}
              <radialGradient id="headlightBeam" cx="0%" cy="50%" r="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 220, 0.65)" />
                <stop offset="40%" stopColor="rgba(255, 220, 140, 0.2)" />
                <stop offset="75%" stopColor="rgba(255, 180, 90, 0.03)" />
                <stop offset="100%" stopColor="rgba(255, 180, 90, 0)" />
              </radialGradient>
              {/* Hubcap Chrome */}
              <radialGradient id="hubcapChrome" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#cccccc" />
                <stop offset="85%" stopColor="#777777" />
                <stop offset="100%" stopColor="#444444" />
              </radialGradient>
              {/* Soft Shadow Underneath */}
              <radialGradient id="tramShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(204, 0, 0, 0.3)" />
                <stop offset="60%" stopColor="rgba(0, 0, 0, 0.2)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
            </defs>

            {/* Headlight Ray Cone */}
            {isFront && <path d="M 279 73 L 420 40 L 420 110 L 279 80 Z" fill="url(#headlightBeam)" opacity="0.65" />}

            {/* Soft Shadow Grounding the Tram */}
            <ellipse cx="160" cy="103" rx="132" ry="5" fill="url(#tramShadow)" opacity="0.8" />

            {/* Spark Glow - Flickers dynamically during scroll movement */}
            {isFront && <g className="pantograph-spark" opacity="0" style={{ transformOrigin: '160px 5px' }}>
              <circle cx="160" cy="5" r="8" fill="#80e5ff" opacity="0.6" />
              <circle cx="160" cy="5" r="3" fill="#ffffff" />
              <path d="M 160 5 L 155 1 M 160 5 L 165 -1 M 160 5 L 157 9 M 160 5 L 164 10" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            </g>}

            {/* Pantograph (Electric Collector) */}
            {isFront && <g stroke="url(#chromeMetal)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="154" y="20" width="12" height="2.5" fill="#222" stroke="none" />
              {/* Lower scissor arms */}
              <line x1="156" y1="20" x2="148" y2="13" />
              <line x1="164" y1="20" x2="172" y2="13" />
              <line x1="148" y1="13" x2="172" y2="13" strokeWidth="0.8" stroke="rgba(255,255,255,0.4)" />
              {/* Upper scissor arms */}
              <line x1="148" y1="13" x2="160" y2="5" />
              <line x1="172" y1="13" x2="160" y2="5" />
              {/* Contact bow / shoe touching overhead line */}
              <path d="M 148 5 L 172 5 C 172 5, 174 5, 174 3 M 148 5 C 148 5, 146 5, 146 3" strokeWidth="2" />
            </g>}

            {/* Symmetrical Clerestory Raised Roof Section */}
            <path d="M 70 22 C 70 22, 75 16, 85 16 L 235 16 C 245 16, 250 22, 250 22 Z" fill="url(#clerestoryRed)" stroke="#131313" strokeWidth="1" />
            {/* Clerestory vents */}
            <rect x="90" y="18" width="8" height="2" fill="#121212" />
            <rect x="115" y="18" width="8" height="2" fill="#121212" />
            <rect x="140" y="18" width="8" height="2" fill="#121212" />
            <rect x="165" y="18" width="8" height="2" fill="#121212" />
            <rect x="190" y="18" width="8" height="2" fill="#121212" />
            <rect x="215" y="18" width="8" height="2" fill="#121212" />

            {/* Chassis Undercarriage frames (behind skirts but on top of wheels) */}
            <rect x="68" y="88" width="48" height="5" fill="#1e1e1e" rx="1.5" />
            <rect x="204" y="88" width="48" height="5" fill="#1e1e1e" rx="1.5" />

            {/* Cowcatchers */}
            <path d="M 272 90 L 285 90 L 282 96 L 270 96 Z" fill="#222" stroke="url(#chromeMetal)" strokeWidth="0.8" />
            <path d="M 48 90 L 35 90 L 38 96 L 50 96 Z" fill="#222" stroke="url(#chromeMetal)" strokeWidth="0.8" />

            {/* Main Symmetrical Tram Body Shell */}
            <path d="M 45 90 L 45 42 C 45 32, 55 25, 65 25 L 255 25 C 265 25, 275 32, 275 42 L 275 90 L 265 92 L 246 92 C 242 80, 214 80, 210 92 L 110 92 C 106 80, 78 80, 74 92 L 55 92 L 45 90 Z" fill="url(#bodyBase)" />
            <path d="M 45 90 L 45 42 C 45 32, 55 25, 65 25 L 255 25 C 265 25, 275 32, 275 42 L 275 90 L 265 92 L 246 92 C 242 80, 214 80, 210 92 L 110 92 C 106 80, 78 80, 74 92 L 55 92 L 45 90 Z" fill="url(#bodyHighlight)" />

            {/* Two-tone retro Cream horizontal panel stripe for passenger windows */}
            <path d="M 45 35 L 275 35 L 275 58 L 45 58 Z" fill="url(#creamPanel)" />
            
            {/* Chrome belt line dividers */}
            <line x1="45" y1="35" x2="275" y2="35" stroke="url(#chromeMetal)" strokeWidth="1.2" />
            <line x1="45" y1="58" x2="275" y2="58" stroke="url(#chromeMetal)" strokeWidth="1.5" />

            {/* Passenger Windows (Obsidian tinted glass + passenger silhouettes) */}
            <rect x="80" y="38" width="20" height="17" rx="2" fill="url(#windowGlass)" stroke="#111" strokeWidth="0.8" />
            <path d="M 82 39 L 92 53" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
            <circle cx="90" cy="46" r="3" fill="rgba(255,255,255,0.12)" />
            
            <rect x="108" y="38" width="20" height="17" rx="2" fill="url(#windowGlass)" stroke="#111" strokeWidth="0.8" />
            <path d="M 110 39 L 120 53" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
            
            <rect x="136" y="38" width="20" height="17" rx="2" fill="url(#windowGlass)" stroke="#111" strokeWidth="0.8" />
            <path d="M 138 39 L 148 53" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
            <circle cx="146" cy="45" r="3.2" fill="rgba(255,255,255,0.15)" />
            
            <rect x="164" y="38" width="20" height="17" rx="2" fill="url(#windowGlass)" stroke="#111" strokeWidth="0.8" />
            <path d="M 166 39 L 176 53" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
            
            <rect x="192" y="38" width="20" height="17" rx="2" fill="url(#windowGlass)" stroke="#111" strokeWidth="0.8" />
            <path d="M 194 39 L 204 53" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
            <circle cx="202" cy="46" r="2.8" fill="rgba(255,255,255,0.12)" />
            
            <rect x="220" y="38" width="20" height="17" rx="2" fill="url(#windowGlass)" stroke="#111" strokeWidth="0.8" />
            <path d="M 222 39 L 232 53" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />

            {/* Operator Cab Windows (Front and Rear) */}
            <rect x="54" y="38" width="18" height="17" rx="2" fill="url(#windowGlass)" stroke="#111" strokeWidth="0.8" />
            <path d="M 56 39 L 64 53" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
            <rect x="248" y="38" width="18" height="17" rx="2" fill="url(#windowGlass)" stroke="#111" strokeWidth="0.8" />
            <path d="M 250 39 L 258 53" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />

            {/* Vertical Body Panel Grooves (Section Dividers) */}
            <line x1="74" y1="25" x2="74" y2="92" stroke="#1c0002" strokeWidth="1" opacity="0.65" />
            <line x1="130" y1="25" x2="130" y2="92" stroke="#1c0002" strokeWidth="1" opacity="0.65" />
            <line x1="190" y1="25" x2="190" y2="92" stroke="#1c0002" strokeWidth="1" opacity="0.65" />
            <line x1="246" y1="25" x2="246" y2="92" stroke="#1c0002" strokeWidth="1" opacity="0.65" />

            {/* Symmetrical double doors (Middle entrance style) */}
            <rect x="157" y="58" width="6" height="34" fill="#141414" stroke="url(#chromeMetal)" strokeWidth="0.8" />
            <line x1="160" y1="58" x2="160" y2="92" stroke="#121212" strokeWidth="1" />

            {/* Destination Board (Branded Gold/Chrome) */}
            <rect x="142" y="66" width="36" height="8" rx="1" fill="#111" stroke="url(#chromeMetal)" strokeWidth="1" />
            <text x="160" y="72.5" fill="#ffd700" fontSize="5.2" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.6">ORACLE</text>

            {/* Front Headlamp assembly */}
            <path d="M 275 70 L 279 70 L 279 76 L 275 76 Z" fill="url(#chromeMetal)" />
            <circle cx="279" cy="73" r="4.5" fill="url(#chromeMetal)" stroke="#111" strokeWidth="0.5" />
            <circle cx="278.5" cy="73" r="3.2" fill="#ffffff" />
            <circle cx="277.5" cy="72" r="1.2" fill="#ffffff" opacity="0.9" />

            {/* Front Amber marker under headlight */}
            <circle cx="278" cy="80" r="1.8" fill="#ff9900" stroke="#111" strokeWidth="0.5" />

            {/* Rear Taillight */}
            <circle cx="41.5" cy="73" r="2.5" fill="#cc0000" stroke="#111" strokeWidth="0.5" />
            <circle cx="41.5" cy="73" r="1.2" fill="#ff6666" />

            {/* Chrome Grab Handles/Rings for Operators */}
            <path d="M 271 60 L 271 66" stroke="url(#chromeMetal)" strokeWidth="1" strokeLinecap="round" />
            <path d="M 49 60 L 49 66" stroke="url(#chromeMetal)" strokeWidth="1" strokeLinecap="round" />

            {/* 4 Wheels with class selectors for rotation */}
            {/* Wheel 1 */}
            <g className="wheel-1" transform="translate(80, 95)">
              <circle cx="0" cy="0" r="9" fill="#242630" stroke="#000" strokeWidth="1" />
              <circle cx="0" cy="0" r="7.5" fill="url(#chromeMetal)" />
              <circle cx="0" cy="0" r="4" fill="url(#hubcapChrome)" />
              <g className="wheel-inner">
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="#111" strokeWidth="0.8" />
                <line x1="0" y1="-7.5" x2="0" y2="7.5" stroke="#111" strokeWidth="0.8" />
                <line x1="-5.3" y1="-5.3" x2="5.3" y2="5.3" stroke="#111" strokeWidth="0.8" />
                <line x1="-5.3" y1="5.3" x2="5.3" y2="-5.3" stroke="#111" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="#cc0000" />
              </g>
            </g>

            {/* Wheel 2 */}
            <g className="wheel-2" transform="translate(104, 95)">
              <circle cx="0" cy="0" r="9" fill="#242630" stroke="#000" strokeWidth="1" />
              <circle cx="0" cy="0" r="7.5" fill="url(#chromeMetal)" />
              <circle cx="0" cy="0" r="4" fill="url(#hubcapChrome)" />
              <g className="wheel-inner">
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="#111" strokeWidth="0.8" />
                <line x1="0" y1="-7.5" x2="0" y2="7.5" stroke="#111" strokeWidth="0.8" />
                <line x1="-5.3" y1="-5.3" x2="5.3" y2="5.3" stroke="#111" strokeWidth="0.8" />
                <line x1="-5.3" y1="5.3" x2="5.3" y2="-5.3" stroke="#111" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="#cc0000" />
              </g>
            </g>

            {/* Wheel 3 */}
            <g className="wheel-3" transform="translate(216, 95)">
              <circle cx="0" cy="0" r="9" fill="#242630" stroke="#000" strokeWidth="1" />
              <circle cx="0" cy="0" r="7.5" fill="url(#chromeMetal)" />
              <circle cx="0" cy="0" r="4" fill="url(#hubcapChrome)" />
              <g className="wheel-inner">
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="#111" strokeWidth="0.8" />
                <line x1="0" y1="-7.5" x2="0" y2="7.5" stroke="#111" strokeWidth="0.8" />
                <line x1="-5.3" y1="-5.3" x2="5.3" y2="5.3" stroke="#111" strokeWidth="0.8" />
                <line x1="-5.3" y1="5.3" x2="5.3" y2="-5.3" stroke="#111" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="#cc0000" />
              </g>
            </g>

            {/* Wheel 4 */}
            <g className="wheel-4" transform="translate(240, 95)">
              <circle cx="0" cy="0" r="9" fill="#242630" stroke="#000" strokeWidth="1" />
              <circle cx="0" cy="0" r="7.5" fill="url(#chromeMetal)" />
              <circle cx="0" cy="0" r="4" fill="url(#hubcapChrome)" />
              <g className="wheel-inner">
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="#111" strokeWidth="0.8" />
                <line x1="0" y1="-7.5" x2="0" y2="7.5" stroke="#111" strokeWidth="0.8" />
                <line x1="-5.3" y1="-5.3" x2="5.3" y2="5.3" stroke="#111" strokeWidth="0.8" />
                <line x1="-5.3" y1="5.3" x2="5.3" y2="-5.3" stroke="#111" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="#cc0000" />
              </g>
            </g>
          </svg>
);


const Hero = ({ onExploreKnowledgeHub }) => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const tramRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    // --- SCROLL-LINKED PARALLAX & TRAM TIMELINE ---
    const ctx = gsap.context(() => {
      // --- ENTRY ANIMATIONS (GSAP) ---
      const entryTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      entryTimeline
        .from('.hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 })
        .from('.hero-heading', { opacity: 0, y: 40, duration: 1 }, '-=0.6')
        .from('.hero-subheading', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
        .from('.hero-desc', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
        .from('.hero-cta-btn', { opacity: 0, y: 15, duration: 0.8, stagger: 0.15 }, '-=0.6')
        .from('.hero-stat-card', { opacity: 0, x: -50, stagger: 0.15, duration: 0.8 }, '-=0.6')
        .from('.skyline-layer-1', { 
          opacity: 0, 
          y: 50, 
          duration: 1.4, 
          ease: 'power2.out' 
        }, '-=1');

      // Create master ScrollTrigger timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // 1.2s lag for cinematic smooth catch-up
        }
      });

      // 1. Fade out and slide up hero text
      mainTl.to(textRef.current, {
        opacity: 0,
        y: -60,
        ease: 'power1.inOut'
      }, 0.5); // Start at halfway through the scroll

      // 2. Fade out and slide left stats panel
      if (statsRef.current) {
        mainTl.to(statsRef.current, {
          opacity: 0,
          x: -40,
          ease: 'power1.inOut'
        }, 0);
      }

      // 3. Move Tram left-to-right across viewport
      // Starts offscreen left (-25%) to offscreen right (110%)
      mainTl.fromTo(tramRef.current,
        { left: '-25%' },
        { left: '110%', ease: 'none' },
        0
      );

      // 4. Parallax Skyline Horizontal Sliding (in opposite direction for depth)
      mainTl.to('.skyline-layer-4', { xPercent: -3, ease: 'none' }, 0);
      mainTl.to('.skyline-layer-2', { xPercent: -15, ease: 'none' }, 0);
      mainTl.to('.skyline-layer-1', { xPercent: -22, ease: 'none' }, 0);

      // 5. Spin Wheels (synced to scroll progress)
      mainTl.to(
        '.wheel-1 .wheel-inner, .wheel-2 .wheel-inner, .wheel-3 .wheel-inner, .wheel-4 .wheel-inner',
        { rotation: 1800, transformOrigin: '0px 0px', ease: 'none' },
        0
      );

      // 6. Sticky section background color transition from pure white to soft gray-50
      mainTl.to(stickyRef.current, {
        backgroundColor: '#f9fafb', // gray-50
        ease: 'none'
      }, 0.85); // Happens at the very end of scroll

      // --- DYNAMIC/VELOCITY ANIMATIONS ---
      // A secondary ScrollTrigger to listen to scrolling velocity for spark & blur effects
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          
          // Motion blur trails: scale opacity with velocity
          const normalizedBlurOpacity = Math.min(velocity / 1200, 0.75);
          gsap.to('.tram-motion-blur', {
            opacity: normalizedBlurOpacity,
            duration: 0.15,
            overwrite: 'auto'
          });

          // Pantograph sparks: flicker when velocity is high
          if (velocity > 30) {
            // Rapid spark flickers
            gsap.to('.pantograph-spark', {
              opacity: Math.random() > 0.4 ? 0.95 : 0.1,
              scale: Math.random() * 1.5 + 0.5,
              duration: 0.04,
              overwrite: 'auto'
            });
          } else {
            // Turn off spark when stationary or slow
            gsap.to('.pantograph-spark', {
              opacity: 0,
              duration: 0.1,
              overwrite: 'auto'
            });
          }
        }
      });

      // --- TRAM ENGINE SUSPENSION VIBRATION ---
      // Constant small idle rocking/vibration
      gsap.to(tramRef.current, {
        y: '+=1.0',
        yoyo: true,
        repeat: -1,
        duration: 0.12,
        ease: 'power1.inOut'
      });

      // Subtle suspension tilt (pitching) as it goes forward
      gsap.to(tramRef.current, {
        rotation: 0.5,
        yoyo: true,
        repeat: -1,
        duration: 0.8,
        ease: 'sine.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="Home"
      ref={containerRef}
      className="relative w-full h-[180vh] bg-white select-none"
    >
      {/* Modern Gridlines Background Utility */}
      <style>{`
        .grid-lines-bg {
          background-size: 8.3333% 80px; /* 12 columns, 80px high rows */
          background-image: 
            linear-gradient(to right, rgba(204, 0, 0, 0.04) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(204, 0, 0, 0.04) 1px, transparent 1px);
        }
      `}</style>

      {/* Sticky viewport container (remains fixed on screen as page scrolls) */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center pb-32 pt-8 bg-white"
      >
        {/* Gridlines Background */}
        <div className="absolute inset-0 pointer-events-none grid-lines-bg opacity-30 z-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/40 to-white z-0" />

        {/* Left Panel Stats */}
        <div 
          ref={statsRef}
          className="absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-6 select-none"
        >
          {/* Stat Item 1 */}
          <div className="hero-stat-card flex items-center gap-4 bg-white backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-lg hover:scale-[1.02] transition-transform duration-200">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#cc0000] border border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20c-2.202 0-4.275-.626-6.029-1.706L3 18.25M15 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM6.912 14.5A7.125 7.125 0 001 20.125c0 .3.036.597.105.88M12 7a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 leading-none">1000+</p>
              <p className="text-xs text-gray-500 font-bold mt-1">Community Members</p>
            </div>
          </div>

          {/* Stat Item 2 */}
          <div className="hero-stat-card flex items-center gap-4 bg-white backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-lg hover:scale-[1.02] transition-transform duration-200">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#cc0000] border border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 leading-none">50+</p>
              <p className="text-xs text-gray-500 font-bold mt-1">Events Hosted</p>
            </div>
          </div>
        </div>



        {/* Text Section */}
        <div 
          ref={textRef}
          className="relative z-40 flex flex-col items-center px-4 max-w-4xl text-center select-none mt-6"
        >
          {/* Red Decorative Tag */}
          <div className="hero-tag inline-flex items-center gap-2.5 px-4.5 py-2 bg-red-50 border border-red-200 rounded-full text-[#cc0000] text-[11px] font-extrabold uppercase tracking-wider mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#cc0000] animate-pulse shadow-[0_0_8px_rgba(204,0,0,0.4)]" />
            Kolkata Oracle User Group
          </div>

          {/* Heading */}
          <h1 
            className="hero-heading text-7xl sm:text-8xl md:text-[102px] font-extrabold text-gray-900 mb-3 tracking-tight leading-none"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Connect.
          </h1>
          
          {/* Subheading */}
          <h2 
            className="hero-subheading text-2xl sm:text-4xl md:text-[40px] font-black text-[#cc0000] tracking-widest uppercase mb-6 leading-none"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            COLLABORATE. CREATE.
          </h2>

          {/* Short Descriptive Text */}
          <p 
            className="hero-desc text-sm sm:text-base md:text-lg font-black max-w-2xl leading-relaxed mb-10 px-6 py-3 rounded-2xl shadow-md inline-block"
            style={{ 
              color: '#000000', 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            A community of developers, students, architects, and administrators pushing database and cloud frontiers together.
          </p>

          {/* Redesigned CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 z-30 mb-16">
            <button
              onClick={() => {
                const element = document.getElementById('ContactUs');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
              }}
              className="hero-cta-btn bg-[#cc0000] hover:bg-[#ff3333] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:scale-[1.02] transition-all duration-250 tracking-wider text-sm flex items-center justify-center gap-3 cursor-pointer group"
            >
              Join Community
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
            
            <button
              onClick={() => {
                if (onExploreKnowledgeHub) {
                  onExploreKnowledgeHub();
                }
              }}
              className="hero-cta-btn bg-gray-900 hover:bg-black text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.02] transition-all duration-200 tracking-wider text-sm flex items-center justify-center gap-3 cursor-pointer group"
            >
              Explore Knowledge Hub
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Multi-layer SVG Kolkata Skyline (Parallax) */}
        <KolkataSkyline />

        {/* Sleek Overhead Tram Guide Wire */}
        <div className="absolute left-0 w-full h-[0.5px] bg-[#cc0000]/25 z-20 pointer-events-none bottom-[70px]" />

        {/* 2D SVG Kolkata Tram (GSAP Scroll-linked) */}
        <div 
          ref={tramRef}
          className="absolute pointer-events-auto select-none z-25 h-[68px] bottom-[26px] transform-gpu flex items-end justify-center"
          style={{ width: '320px' }}
        >
          {/* Dynamic Motion Blur Speed Trails behind tram */}
          <div className="tram-motion-blur absolute right-full top-1/2 -translate-y-1/2 flex flex-col gap-1.5 pr-4 pointer-events-none opacity-0">
            <div className="w-16 sm:w-28 h-[2px] bg-gradient-to-l from-[#cc0000]/65 to-transparent blur-[0.5px]" />
            <div className="w-24 sm:w-36 h-[3px] bg-gradient-to-l from-[#cc0000]/50 to-transparent blur-[1px]" />
            <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-l from-[#cc0000]/65 to-transparent blur-[0.5px]" />
          </div>

          {/* Rear Compartment */}
          <div className="relative z-10 mr-[-24px]">
            <TramCar isFront={false} />
          </div>

          {/* Authentic Dark Gray Accordion Joint */}
          <div className="relative z-0 h-[40px] w-[16px] bg-[#1a1a1a] mb-[9px] flex flex-col justify-evenly px-[2px] border-y-2 border-[#111] shadow-inner shrink-0">
            <div className="w-full h-[1px] bg-[#000]" />
            <div className="w-full h-[1px] bg-[#333]" />
            <div className="w-full h-[1px] bg-[#000]" />
            <div className="w-full h-[1px] bg-[#333]" />
            <div className="w-full h-[1px] bg-[#000]" />
          </div>

          {/* Front Compartment */}
          <div className="relative z-10 ml-[-24px]">
            <TramCar isFront={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;