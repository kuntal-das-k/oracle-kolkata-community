import { row1Partners, row2Partners } from '../Details/CrausalDetails';

/* ─────────────────────────── Logo Card ─────────────────────────────── */
function LogoCard({ partner }) {
  return (
    <div
      style={{
        margin: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '175px',
        height: '98px',
        flexShrink: 0,
        cursor: 'default',
        userSelect: 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.06)';
        const img = e.currentTarget.querySelector('img');
        if (img) {
          img.style.filter = 'none';
          img.style.opacity = '1';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        const img = e.currentTarget.querySelector('img');
        if (img) {
          img.style.filter = 'grayscale(1)';
          img.style.opacity = '0.4';
        }
      }}
    >
      <img
        src={partner.logo}
        alt={partner.alt}
        style={{
          maxWidth: '150px',
          maxHeight: '80px',
          objectFit: 'contain',
          filter: 'grayscale(1)',
          opacity: 0.4,
          transition: 'all 0.3s ease',
        }}
        draggable={false}
      />
    </div>
  );
}

/* ─────────────────────────── Main Component ─────────────────────────── */
export default function Carousel() {
  const track1 = [...row1Partners, ...row1Partners];
  const track2 = [...row2Partners, ...row2Partners];

  return (
    <>
      <style>{`
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%);   }
        }
        @keyframes scrollLeft {
          from { transform: translateX(0%);   }
          to   { transform: translateX(-50%); }
        }
        .carousel-right {
          animation: scrollRight 30s linear infinite;
          will-change: transform;
        }
        .carousel-left {
          animation: scrollLeft 30s linear infinite;
          will-change: transform;
        }
        .carousel-right:hover,
        .carousel-left:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section style={{ width: '100%', background: '#ffffff', overflow: 'hidden', margin: 0, padding: '20px 0' }}>

        {/* Red divider — top */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#cc0000', opacity: 0.12, margin: '10px 0' }} />

        {/* ── Row 1 — scrolls RIGHT ── */}
        <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '10px' }}>
          <div style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0, height: '100%', width: '112px', zIndex: 10, background: 'linear-gradient(to right, #ffffff, transparent)' }} />
          <div style={{ pointerEvents: 'none', position: 'absolute', right: 0, top: 0, height: '100%', width: '112px', zIndex: 10, background: 'linear-gradient(to left, #ffffff, transparent)' }} />
          <div className="flex carousel-right" style={{ width: 'max-content' }}>
            {track1.map((partner, i) => (
              <LogoCard key={`r1-${i}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Red divider — middle */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#cc0000', opacity: 0.12, margin: '10px 0' }} />

        {/* ── Row 2 — scrolls LEFT ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0, height: '100%', width: '112px', zIndex: 10, background: 'linear-gradient(to right, #ffffff, transparent)' }} />
          <div style={{ pointerEvents: 'none', position: 'absolute', right: 0, top: 0, height: '100%', width: '112px', zIndex: 10, background: 'linear-gradient(to left, #ffffff, transparent)' }} />
          <div className="flex carousel-left" style={{ width: 'max-content' }}>
            {track2.map((partner, i) => (
              <LogoCard key={`r2-${i}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Red divider — bottom */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#cc0000', opacity: 0.12, margin: '10px 0' }} />

      </section>
    </>
  );
}
