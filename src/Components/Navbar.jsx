import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logo from '../assets/Logo.png';
import LoginModal from './LoginModal';
import { auth } from '../lib/firebase';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navItems = ['Home', 'StudentCorner', 'About us'];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (item) => {
    setActiveItem(item);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
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
      await signOut(auth);
      return;
    }

    setIsLoginOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between absolute w-full px-4 sm:px-8 lg:px-16 pt-2 sm:pt-3 z-50">
        {/* Logo */}
        <img className='h-16 sm:h-24 lg:h-32 w-auto object-contain' src={Logo} alt="Oracle Kolkata Community" />

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[#b31b1b] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#b31b1b] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#b31b1b] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-12 bg-[#1f0404] rounded-full px-6 xl:px-10 py-3 shadow-2xl">
          {/* Navigation Links */}
          <div className="flex items-center gap-8 xl:gap-14">
            {navItems.map((item) => (
              <div
                key={item}
                onClick={() => handleNavClick(item)}
                className="relative cursor-pointer flex flex-col items-center"
              >
                <span
                  className={`${activeItem === item
                    ? 'text-white text-lg xl:text-[22px]'
                    : 'text-[#b31b1b] text-base xl:text-lg hover:text-red-500'
                    } font-normal tracking-wide pb-1 transition-all duration-300 whitespace-nowrap`}
                >
                  {item}
                </span>
                {activeItem === item && (
                  <div className="absolute bottom-0 w-[70%] h-[3px] bg-red-500 rounded-full transition-all duration-300"></div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 xl:gap-6 pl-4 border-l border-[#3a0b0b]">
            <button
              onClick={handleAuthAction}
              className="bg-white text-black px-6 xl:px-10 py-2 rounded-full text-xs xl:text-sm font-medium hover:bg-gray-200 transition-colors tracking-widest"
            >
              {currentUser ? 'LOGOUT' : 'LOGIN'}
            </button>

            <button className="border-[1.5px] border-[#b31b1b] text-[#b31b1b] px-4 xl:px-6 py-2 rounded-full text-xs xl:text-[15px] font-normal hover:bg-[#b31b1b] hover:text-white transition-all whitespace-nowrap">
              Talk to an expert
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <div
                key={item}
                onClick={() => handleNavClick(item)}
                className="relative cursor-pointer flex flex-col items-center"
              >
                <span
                  className={`${activeItem === item
                    ? 'text-white text-2xl'
                    : 'text-[#b31b1b] text-xl hover:text-red-500'
                    } font-normal tracking-wide pb-2 transition-all duration-300 whitespace-nowrap`}
                >
                  {item}
                </span>
                {activeItem === item && (
                  <div className="absolute bottom-0 w-[70%] h-[3px] bg-red-500 rounded-full transition-all duration-300"></div>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleAuthAction();
                }}
                className="bg-white text-black px-12 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors tracking-widest"
              >
                {currentUser ? 'LOGOUT' : 'LOGIN'}
              </button>

              <button className="border-[1.5px] border-[#b31b1b] text-[#b31b1b] px-8 py-3 rounded-full text-sm font-normal hover:bg-[#b31b1b] hover:text-white transition-all">
                Talk to an expert
              </button>
            </div>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}

export default Navbar