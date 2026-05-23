import Logo from '../assets/Logo.png';
import KolkataCity from '../assets/kolkata_design.svg';

export default function CommunityArea() {
  return (
    <section className="relative w-full bg-gray-50 overflow-hidden flex flex-col">
      {/* Left vertical line - Hidden on mobile */}
      <div className="hidden md:block absolute top-0 left-[70px] w-[1.5px] h-[900px] bg-[#cc0000] z-20 opacity-10" />
      {/* Right vertical line - Hidden on mobile */}
      <div className="hidden md:block absolute top-0 right-[70px] w-[1.5px] h-[900px] bg-[#cc0000] z-20 opacity-10" />

      {/* Top content row: Logo left, Stats right */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-24">
        {/* Left — Oracle Kolkata Community logo */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img
            src={Logo}
            alt="Oracle Kolkata Community Logo"
            className="w-48 sm:w-64 md:w-80 lg:w-[420px] xl:w-[480px] h-auto z-20"
          />
        </div>

        {/* Right — Stats */}
        <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start mt-6 md:mt-0 md:pt-2 md:ml-auto">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-extrabold text-gray-900 leading-none tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              12+
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[32px] text-gray-500 mt-1 font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Meetups
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-extrabold text-gray-900 leading-none tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              10+
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[32px] text-gray-500 mt-1 font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Missions
            </p>
          </div>
        </div>
      </div>

      {/* Kolkata City Skyline — full width */}
      <div className="relative z-[5] mt-4 sm:mt-6 lg:mt-0">
        <img
          src={KolkataCity}
          alt="Kolkata City Skyline"
          className="w-full block object-cover object-center-top px-4 sm:px-6 md:px-[70px] opacity-100"
        />
      </div>
    </section>
  );
}
