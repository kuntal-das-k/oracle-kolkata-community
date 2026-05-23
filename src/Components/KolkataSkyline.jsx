import { forwardRef } from 'react';
import premiumSkyline from '../assets/kolkata_skyline_red.png';

const KolkataSkyline = forwardRef((props, ref) => {
  return (
    <div 
      ref={ref} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-10"
    >
      {/* 
        LAYER 2: Kolkata Skyline image.
        - Positioned absolute at bottom-[36px] so it sits flush above the tram tracks.
        - w-[120%] gives extra horizontal room for the GSAP parallax slide.
        - h-auto lets the image scale naturally from its width, so it is always
          the correct height on every screen size (no object-fit fighting).
        - mix-blend-mode: multiply makes the white/light background of the PNG
          completely invisible on the white hero, while the red building silhouettes
          remain perfectly rendered with crisp, anti-aliased edges. No Python
          processing or broken pixel artifacts.
        - opacity 0.82 keeps it elegant and not overpowering the text.
      */}
      <div
        className="skyline-layer-2 absolute bottom-0 left-0 w-[120%] z-10"
        style={{ opacity: 0.8 }}
      >
        <img
          src={premiumSkyline}
          alt="Kolkata Skyline"
          className="absolute bottom-0 left-0 w-full h-auto block"
          style={{ mixBlendMode: 'multiply', transform: 'translateY(9.1%)' }}
        />
      </div>

      {/* 
        Soft white fade at the very bottom so the skyline blends into the
        tram track ground strip seamlessly.
      */}
      <div className="skyline-layer-1 absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/70 to-transparent z-20 pointer-events-none" />

      {/* 
        LAYER 0: Ground Plane & Tracks
      */}
      <div className="skyline-layer-0 absolute bottom-0 left-0 w-full h-[36px] bg-white z-30">
        <div className="absolute top-1 left-0 w-full h-[6px] flex flex-col justify-between opacity-90">
          <div className="w-full h-full absolute inset-0 flex justify-around items-center opacity-10">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="w-[3px] h-[5px] bg-[#cc0000]" />
            ))}
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-red-600/30 via-red-600 to-red-600/30 shadow-[0_0.5px_2px_rgba(204,0,0,0.3)]" />
          <div className="w-full h-[1px] bg-gradient-to-r from-red-600/30 via-red-600 to-red-600/30 shadow-[0_0.5px_2px_rgba(204,0,0,0.3)] mt-[2.5px]" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[30px] bg-gradient-to-b from-white/95 to-white" />
      </div>
    </div>
  );
});

KolkataSkyline.displayName = 'KolkataSkyline';

export default KolkataSkyline;
