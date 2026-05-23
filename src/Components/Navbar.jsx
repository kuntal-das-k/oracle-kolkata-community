import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logo from '../assets/Logo.png';
import LoginModal from './LoginModal';
import { auth, firebaseEnabled } from '../lib/firebase';

const Navbar = ({ activeItem, onNavClick }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navItems = ['Home', 'Student Corner', 'Professional Corner', 'Knowledge Hub', 'About us'];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(item);
    }
  };

  useEffect(() => {
    if (!firebaseEnabled) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsLoginOpen(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthAction = async () => {
    if (currentUser) {
      if (firebaseEnabled) {
        await signOut(auth);
      }
      return;
    }

    setIsLoginOpen(true);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full flex items-center justify-between z-50 bg-[#0c0d12]/90 backdrop-blur-lg py-3 px-4 sm:px-8 lg:px-16 rounded-b-[24px] sm:rounded-b-[32px] border-b border-red-950/40 shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
      >
        {/* Logo with inverted color filter (Red stays red, black text becomes white) */}
        <img
          className="object-contain cursor-pointer transition-transform hover:scale-[1.02] dark-logo-filter"
          src={Logo}
          alt="Oracle Kolkata Community"
          style={{
            height: "54px",
            width: "auto",
          }}
          onClick={() => handleNavClick('Home')}
        />

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[#cc0000] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#cc0000] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#cc0000] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop Navigation (Floating Glassmorphic Navbar) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 xl:px-6 py-1.5 transition-all duration-300">
          {/* Navigation Links */}
          <div className="flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <div
                key={item}
                onClick={() => handleNavClick(item)}
                className="relative cursor-pointer flex flex-col items-center py-1 group"
              >
                <span
                  className={`nav-custom-link ${
                    activeItem === item
                      ? 'active font-bold scale-[1.02]'
                      : 'font-medium opacity-80'
                  } text-sm xl:text-base tracking-wide transition-all duration-200 whitespace-nowrap`}
                >
                  {item}
                </span>
                {/* Underline Slide Indicator */}
                <div
                  className={`absolute bottom-0 w-[80%] h-[2px] bg-red-600 rounded-full transition-all duration-300 origin-center ${
                    activeItem === item ? 'scale-x-100 opacity-100 shadow-[0_0_8px_rgba(204,0,0,0.5)]' : 'scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-50'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <button
              onClick={handleAuthAction}
              className="bg-[#cc0000] text-white px-4 xl:px-5 py-1.5 rounded-full text-xs xl:text-sm font-bold hover:bg-[#ff3333] hover:shadow-lg hover:shadow-red-500/20 transition-all tracking-wider cursor-pointer"
            >
              {currentUser ? 'LOGOUT' : 'LOGIN'}
            </button>

            <button
              onClick={() => handleNavClick('About us')}
              className="border border-white/20 text-white hover:bg-white hover:text-black hover:border-white px-4 xl:px-5 py-1.5 rounded-full text-xs xl:text-sm font-semibold hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
            >
              Talk to an expert
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed inset-0 bg-[#0c0d12]/98 backdrop-blur-xl z-40 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navItems.map((item) => (
              <div
                key={item}
                onClick={() => handleNavClick(item)}
                className="relative cursor-pointer flex flex-col items-center"
              >
                <span
                  className={`${
                    activeItem === item
                      ? 'text-xl font-bold text-[#ff3333]'
                      : 'text-lg font-medium text-gray-300'
                  } tracking-wide transition-all duration-200 whitespace-nowrap`}
                >
                  {item}
                </span>
                <div
                  className={`w-12 h-[2px] bg-red-600 rounded-full mt-1 transition-all ${
                    activeItem === item ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </div>
            ))}

            <div className="flex flex-col gap-3 mt-6 w-48">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleAuthAction();
                }}
                className="bg-[#cc0000] text-white py-2.5 rounded-full text-sm font-semibold hover:bg-[#ff3333] transition-colors tracking-widest cursor-pointer"
              >
                {currentUser ? 'LOGOUT' : 'LOGIN'}
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavClick('About us');
                }}
                className="border border-white/20 text-white hover:bg-white hover:text-black hover:border-white py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
              >
                Talk to an expert
              </button>
            </div>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;