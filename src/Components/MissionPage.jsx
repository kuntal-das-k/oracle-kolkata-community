const MISSION_STYLES = `
  /* ── Infinite scroll animations ── */
  @keyframes marqueeLeft {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marqueeRight {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .marquee-left  { animation: marqueeLeft  32s linear infinite; display:flex; width:max-content; }
  .marquee-right { animation: marqueeRight 36s linear infinite; display:flex; width:max-content; }
  .marquee-left:hover,
  .marquee-right:hover { animation-play-state: paused; }

  /* ── Card float on hover ── */
  .m-card {
    transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.3s;
  }
  .m-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 15px 35px rgba(255,255,255,0.15), 0 8px 32px 0 rgba(0, 0, 0, 0.15) !important;
    border-color: rgba(255,255,255,0.25) !important;
  }

  /* ── Title letter shimmer ── */
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  .mission-title {
    background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.3) 80%);
    background-size: 400px 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
    font-family: 'Outfit', sans-serif;
    letter-spacing: 0.25em;
  }

  /* ── Learn more button ── */
  .learn-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .learn-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: white;
    transform: translateX(-105%);
    transition: transform 0.35s cubic-bezier(.22,1,.36,1);
    border-radius: 50px;
  }
  .learn-btn:hover::before { transform: translateX(0); }
  .learn-btn:hover { color: #5a0000 !important; transform: scale(1.03); }
  .learn-btn span { position: relative; z-index: 1; }

  /* ── Scan line texture overlay ── */
  .scanlines::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.06) 2px,
      rgba(0,0,0,0.06) 4px
    );
    pointer-events: none;
    border-radius: inherit;
  }

  /* ── Number counter accent ── */
  @keyframes countUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .stat-item { animation: countUp 0.7s ease both; }
`;

const ROW1 = [
  { icon: "☁️", title: "Cloud Architecture", desc: "Design scalable Oracle Cloud solutions with enterprise-grade resilience and zero-downtime deployments." },
  { icon: "🗃️", title: "Database Mastery", desc: "Deep dive into Oracle DB tuning, advanced indexing strategies, and high-performance SQL optimization." },
  { icon: "⚙️", title: "DevOps & CI/CD", desc: "Automate pipelines with OCI DevOps, Terraform, and cutting-edge container orchestration toolchains." },
  { icon: "📊", title: "Data Analytics", desc: "Unlock real-time insights with Oracle Analytics Cloud and Autonomous Data Warehouse at any scale." },
  { icon: "🔐", title: "Security Best Practices", desc: "Harden your Oracle stack with IAM policies, VCN security lists, and end-to-end encryption patterns." },
  { icon: "☕", title: "Java on OCI", desc: "Build and deploy production-grade Java applications on Oracle Cloud with GraalVM performance boosts." },
];

const ROW2 = [
  { icon: "🐳", title: "Kubernetes & Containers", desc: "Orchestrate production workloads with OKE, Helm charts, and GitOps on Oracle infrastructure." },
  { icon: "🤖", title: "AI & ML Foundations", desc: "Leverage OCI AI Vision, Language & Speech services to build intelligent, production-ready applications." },
  { icon: "🌐", title: "Networking Deep Dive", desc: "Master VCNs, load balancers, DRGs, and FastConnect routing for bulletproof cloud networking." },
  { icon: "📝", title: "PL/SQL Mastery", desc: "Write blazing-fast stored procedures, triggers, and packages that scale with your enterprise workload." },
  { icon: "⚡", title: "Serverless Functions", desc: "Go fully serverless with Oracle Functions and event-driven architectures for infinite scalability." },
  { icon: "🔄", title: "Integration Cloud", desc: "Connect enterprise systems seamlessly with Oracle Integration Cloud's 500+ pre-built adapters." },
];

const STATS = [
  { value: "1000+", label: "Community Members" },
  { value: "50+", label: "Events Hosted" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "15+", label: "Expert Speakers" },
];

function CarouselRow({ items, direction }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
      <div className={direction === "left" ? "marquee-left" : "marquee-right"} style={{ gap: "14px" }}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className="m-card"
            style={{
              width: "280px",
              flexShrink: 0,
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "26px 22px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              cursor: "default",
            }}
          >
            <div style={{ fontSize: "26px", marginBottom: "10px" }}>{item.icon}</div>
            <h4 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "19px",
              color: "#fff",
              letterSpacing: "0.02em",
              margin: "0 0 8px 0",
              fontWeight: 700,
            }}>
              {item.title}
            </h4>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.65,
              margin: 0,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MissionPage() {
  return (
    <>
      <style>{MISSION_STYLES}</style>

      <section id="about-us" style={{ background: "#ffffff", position: "relative", overflow: "hidden" }} className="py-10 px-0 sm:py-16 md:py-20">

        <div style={{ maxWidth: "1260px", margin: "0 auto", padding: "0 16px" }} className="sm:px-6 md:px-8">

          {/* ── Main card container — red gradient ── */}
          <div
            className="scanlines"
            style={{
              position: "relative",
              background: "linear-gradient(150deg, #cc0000 0%, #9b0000 35%, #6b0000 70%, #3a0000 100%)",
              borderRadius: "28px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >

            {/* ── Inner mesh grid texture ── */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.04,
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              pointerEvents: "none",
            }} />

            {/* ── Header with wave notch ── */}
            <div style={{ position: "relative", padding: "32px 20px 0" }} className="sm:px-8 md:px-12 lg:px-[60px]">

              {/* eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "2px", background: "rgba(255,255,255,0.3)" }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>
                  Oracle Kolkata Community
                </span>
                <div style={{ width: "32px", height: "2px", background: "rgba(255,255,255,0.3)" }} />
              </div>

              {/* MISSION title */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <h2 className="mission-title" style={{ fontSize: "clamp(54px, 8vw, 90px)", margin: 0, lineHeight: 0.9, fontWeight: 900 }}>
                  MISSION
                </h2>
                {/* underline accent */}
                <div style={{
                  position: "absolute", bottom: "-8px", left: 0,
                  width: "100%", height: "3px",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)",
                  borderRadius: "2px",
                }} />
              </div>

              {/* decorative right element - Hidden on mobile */}
              <div className="hidden md:block" style={{
                position: "absolute", top: "40px", right: "60px",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13px", letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.1)",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}>
                ORACLE · KOLKATA · 2026
              </div>
            </div>

            {/* ── Description + Stats row ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px 20px 32px", alignItems: "flex-start" }} className="sm:flex-row sm:items-center sm:gap-8 md:gap-12 sm:px-8 md:px-12 lg:px-[60px] lg:py-[36px] lg:pb-[48px]">
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.85)",
                maxWidth: "520px",
                margin: 0,
                flex: "1 1 300px",
                fontWeight: 400,
              }} className="sm:text-[15px] sm:leading-[1.85]">
                Empowering the local developer ecosystem by hosting regular technical meetups, sharing resources, and mentoring students. 
                Our community bridges the gap between academics and enterprise cloud technology to build 
                <strong style={{ color: "#ffffff", fontWeight: 700 }}> valuable skills</strong> and foster local career growth.
              </p>

              {/* Stats strip */}
              <div style={{ display: "flex", gap: "16px", flex: "1 1 auto", justifyContent: "flex-start" }} className="sm:gap-6 md:gap-8 sm:flex-wrap sm:justify-end md:gap-[32px]">
                {STATS.map((s, i) => (
                  <div key={i} className="stat-item" style={{ animationDelay: `${i * 0.12}s`, textAlign: "center" }}>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "28px",
                      color: "#fff",
                      letterSpacing: "0.02em",
                      lineHeight: 1,
                      fontWeight: 800,
                    }} className="sm:text-[32px] md:text-[38px]">{s.value}</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }} className="sm:text-[11px]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Divider line ── */}
            <div style={{ margin: "0 20px 24px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.15) 60%, transparent)" }} className="sm:mx-8 md:mx-12 lg:mx-[60px] sm:mb-8 md:mb-10" />

            {/* ── Carousel rows ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", paddingBottom: "16px" }}>
              <CarouselRow items={ROW1} direction="left" />
              <CarouselRow items={ROW2} direction="right" />
            </div>

            {/* ── Bottom bar: tag cloud + CTA ── */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "24px 20px 32px",
              gap: "16px",
            }} className="sm:flex-row sm:items-center sm:px-8 md:px-12 lg:px-[60px] sm:pb-11 sm:gap-5">
              {/* tag pills */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["Cloud", "Database", "DevOps", "AI/ML", "Security", "PL/SQL"].map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.75)",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "5px 12px",
                    borderRadius: "50px",
                  }}># {tag}</span>
                ))}
              </div>

              {/* Learn more */}
              <button
                className="learn-btn"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  padding: "13px 32px",
                  borderRadius: "50px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span>Learn More</span>
                <span style={{ fontSize: "17px" }}>↗</span>
              </button>
            </div>

            {/* ── Corner accent ── */}
            <div style={{
              position: "absolute", bottom: 0, left: 0,
              width: "200px", height: "200px",
              background: "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
          </div>
        </div>
      </section>
    </>
  );
}